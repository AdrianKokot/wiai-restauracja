document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector('.burger'),
        pageNav = document.querySelector('.page-nav'),
        pageNavUl = pageNav.querySelector('ul'),
        pageNavHr = pageNav.querySelector('hr'),
        pageHeader = document.querySelector('.page-header'),
        anchors = document.querySelectorAll('a'),
        form = document.querySelector('.form'),
        formSubmit = form.querySelector('#submit'),
        dishesUl = document.querySelector('.dishes ul'),
        menuButtons = document.querySelectorAll('.menu-nav ul li'),
        hostnameLocation = window.location.href;

    let windowLastWidth = 0,
        pageHeaderHeight = 0,
        padding = 0,
        activeCategory = document.querySelector('.menu-nav ul li.active');

    function pageNavScrollAnimation() {
        if (window.scrollY > pageHeaderHeight) {
            pageNav.classList.add('rest');
        } else {
            let hrPercentage = Math.ceil(window.scrollY / pageHeaderHeight * 100)
            pageNavHr.style.width = `${hrPercentage}%`;
            pageNav.classList.remove('rest');
        }
    }

    function initSizes() {
        let windowWidth = window.innerWidth;
        if (windowWidth != windowLastWidth) {
            pageHeader.style.height = `${window.innerHeight}px`;
            windowLastWidth = windowWidth;
            if (windowWidth > 1000) {
                padding = 64;
                window.addEventListener('scroll', pageNavScrollAnimation);
            } else {
                padding = 54;
                window.removeEventListener('scroll', pageNavScrollAnimation);
            }
            pageHeaderHeight = window.innerHeight - 120 - padding;
        }
    }

    function loadDishes(category = "") {
        dishesUl.innerHTML = "";
        fetch(`${hostnameLocation}dishes/${category}`)
            .then(res => res.json())
            .then(dishes => {
                dishes.forEach(dish => {
                    const liEl = document.createElement('li'),
                        spanEl = document.createElement('span');
                    spanEl.textContent = dish.price;
                    liEl.textContent = dish.name;
                    liEl.appendChild(spanEl);
                    dishesUl.appendChild(liEl);
                });
            });
    }

    function init() {
        burger.addEventListener('click', () => {
            pageNav.classList.toggle('active');
        });
        pageNavUl.classList.add("loaded");
        window.addEventListener('resize', initSizes);
        menuButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                activeCategory.classList.remove('active');
                activeCategory = btn;
                activeCategory.classList.add('active');
                loadDishes(btn.dataset.category);
            });
        });

        loadDishes();

        initSizes();
        pageNavScrollAnimation();

        anchors.forEach((anchor) => {
            let link = anchor.getAttribute('href');
            if (link[0] === '#') {
                anchor.addEventListener('click', ev => {
                    ev.preventDefault();
                    pageNav.classList.remove('active');
                    window.scrollTo({
                        behavior: 'smooth',
                        top: Math.ceil(document.querySelector(link).getBoundingClientRect().y + window.scrollY) - padding
                    });
                });
            }
        });

        // formSubmit.addEventListener('click', (ev) => {
        //     ev.preventDefault();

        // });
    }

    init();
});