document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector('.burger'),
        pageNav = document.querySelector('.page-nav'),
        anchors = document.querySelectorAll('a'),
        dishesDel = document.querySelectorAll('.dishes ul li span.del'),
        hostnameLocation = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    let padding = 54;

    burger.addEventListener('click', () => {
        pageNav.classList.toggle('active');
    });

    anchors.forEach((anchor) => {
        let link = anchor.getAttribute('href');
        if (link[0] === '#') {
            anchor.addEventListener('click', ev => {
                ev.preventDefault();
                pageNav.classList.remove('active');
                padding = window.innerWidth > 999 ? 66 : 54;
                window.scrollTo({
                    behavior: 'smooth',
                    top: Math.ceil(document.querySelector(link).getBoundingClientRect().y + window.scrollY) - padding
                });
            });
        }
    });

    dishesDel.forEach(dishDel => {
        dishDel.addEventListener('click', () => {
            fetch(`${hostnameLocation}/dishes/${dishDel.parentElement.dataset.id}`, {
                method: 'delete'
            }).then(dishDel.parentElement.remove());
        });
    });
});