const mongoose = require('mongoose');
mongoose.connect('mongodb://adrian:database123@ds151523.mlab.com:51523/wiai-restauracja');

const webSchema = new mongoose.Schema({
    phone: Number,
    mail: String,
    address: String,
    bookingContent: String,
    bookingClass: String,
    bookingAlt: String,
    bookingSrc: String,
    day1: String,
    hours1: String,
    day2: String,
    hours2: String,
    about: String
});

const WebData = mongoose.model('WebSchema', webSchema);

const picturesSchema = new mongoose.Schema({
    src: String,
    alt: String,
    class: String
});

const Pictures = mongoose.model('picturesSchema', picturesSchema);

const dishesSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

const Dishes = mongoose.model('dishesSchema', dishesSchema);

const images = [{
            src: 'img/joseph-gonzalez-176749-unsplash-thumb.jpg',
            alt: 'Suspendisse arcu diam, porta a tortor sit amet, sollicitudin consequat nisl.',
            class: 'size-1'
        },
        {
            src: 'img/tomas-anton-escobar-502606-unsplash-thumb.jpg',
            alt: 'Suspendisse arcu diam, porta a tortor sit amet, sollicitudin consequat nisl.',
            class: 'size-2'
        },
        {
            src: 'img/pablo-merchan-montes-772142-unsplash-thumb.jpg',
            alt: 'Suspendisse arcu diam, porta a tortor sit amet, sollicitudin consequat nisl.',
            class: 'size-2'
        },
        {
            src: 'img/quentin-dr-178096-unsplash-thumb.jpg',
            alt: 'Suspendisse arcu diam, porta a tortor sit amet, sollicitudin consequat nisl.',
            class: 'size-1'
        }
    ],
    dishes = [{
            name: "Smażone szprotki podane z sosem",
            price: 21,
            category: "snack"
        },
        {
            name: "Krewetki w sosie - winno maślanym",
            price: 23,
            category: "snack"
        },
        {
            name: "Pierogi z konfiturą z porów",
            price: 18,
            category: "snack"
        },
        {
            name: "Tatar wołowy podwędzany",
            price: 29,
            category: "snack"
        },
        {
            name: "Carpaccio z buraków",
            price: 18,
            category: "snack"
        },
        {
            name: "Sałata z grillowanym łososiem",
            price: 15,
            category: "salad"
        },
        {
            name: "Sałata rzymska",
            price: 18,
            category: "salad"
        },
        {
            name: "Cezar z kurczakiem",
            price: 16,
            category: "salad"
        },
        {
            name: "Sałata nicejska",
            price: 22,
            category: "salad"
        },
        {
            name: "Rosół drobiowo-wołowy",
            price: 10,
            category: "soup"
        },
        {
            name: "Żurek",
            price: 13,
            category: "soup"
        },
        {
            name: "Pomidorowa",
            price: 8,
            category: "soup"
        },
        {
            name: "Ogórkowa",
            price: 8,
            category: "soup"
        },
        {
            name: "Barszcz",
            price: 10,
            category: "soup"
        },
        {
            name: "Sernik z konfiturą malinową",
            price: 15,
            category: "dessert"
        },
        {
            name: "Pucharek lodowy z bitą śmietaną",
            price: 13,
            category: "dessert"
        },
        {
            name: "Beza pavlova",
            price: 15,
            category: "dessert"
        },
        {
            name: "Pralina",
            price: 10,
            category: "dessert"
        },
        {
            name: "Golonka wieprzowa duszona w warzywach",
            price: 32,
            category: "meat"
        },
        {
            name: "Kotlet de volaille z frytkami",
            price: 32,
            category: "meat"
        },
        {
            name: "Pierś z kaczki",
            price: 39,
            category: "meat"
        },
        {
            name: "Stek z antrykotu",
            price: 40,
            category: "meat"
        },
        {
            name: "Sznycel wieprzowy",
            price: 42,
            category: "meat"
        }
    ];

const webObj = new WebData({
    phone: 758965214,
    mail: 'adres@domena.pl',
    address: 'Ulica 00, Miasto',
    bookingContent: "Teraz nie wąchał pieniędzy i stanęli kołem. W takim Litwinka tylko widział we zbożach i w grób się przyciągnąć do tych pól przed ganek wysiadł z boku rzuciwszy wzrok surowy znać człowieka rodu, obyczajów! Dość, że przeniosłem stoły z rana, bo tak piękny i cap! - tak i zgasło. I wnet sierpy gromadnie dzwoniąc we dworze jak zdrowie.",
    bookingClass: "size-3",
    bookingAlt: "Suspendisse arcu diam, porta a tortor sit amet, sollicitudin consequat nisl.",
    bookingSrc: "img/nick-hillier-254650-unsplash.jpg",
    day1: 'pn-pt',
    hours1: '9-21',
    day2: 'sob-ndz',
    hours2: '9-20',
    about: 'Dziś piękność widziana więc choć przez wzgląd na siano. w gościnę zaprasza. Właśnie dwukonną bryką wjechał młody ja Ruski, teraz wzrostem dorodniejsza bo tak Suwarów w bitwie, gdzie podział się? szukać mody jeździł Hreczecha. Tu śmiech młodzieży mowę Wojskiego Woźny pas słucki, pas mu odwiązał, pas słucki, pas lity przy pełnym kielich nalać i od powicia. Lecz mniej krzykliwy i cap! - wprawdzie chartów, bo tak Suwarów w drukarskich kramarniac lub papugą w lisa, tak mędrsi fircykom oprzeć się uczyli. u niego nie szpieg.'
});

WebData.remove({}, () => {
    console.log('WebData usunieta');
}).then(() => {
    webObj.save().then(() => {
        console.log('WebData dodana');
    });
});

Pictures.remove({}, () => {
    console.log('Zdjecia usuniete');
}).then(() => {
    images.forEach((img, idx) => {
        setTimeout(() => {
            const imgObj = new Pictures(img);
            imgObj.save().then(() => {
                console.log('Dodano zdjecie');
            });
        }, 2000 * idx);

    });
});

Dishes.remove({}, () => {
    console.log("Dania usuniete");
}).then(() => {
    dishes.forEach((dish) => {
        const dishObj = new Dishes(dish);
        dishObj.save().then(() => {
            console.log('Dodano danie');
        });
    });
});