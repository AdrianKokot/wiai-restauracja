const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    sanitizer = require("express-sanitizer")
bodyParser = require("body-parser");

// mongoose.connect('mongodb://adrian:database123@ds151523.mlab.com:51523/wiai-restauracja');
mongoose.connect("mongodb://localhost:27017/mydb");

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(sanitizer());

var webSchema = new mongoose.Schema({
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

var WebData = mongoose.model('WebSchema', webSchema);

var picturesSchema = new mongoose.Schema({
    src: String,
    alt: String,
    class: String
});

var Pictures = mongoose.model('picturesSchema', picturesSchema);

var dishesSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

var Dishes = mongoose.model('dishesSchema', dishesSchema);

images = [{
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
]


app.get('/admin', (req, res) => {
    WebData.find({}, function (err, foundData) {
        if (err) return console.error(err);
        Pictures.find({}, function (err, foundPictures) {
            if (err) return console.error(err);
            Dishes.find({}, function (err, foundDishes) {
                if (err) return console.log(err);
                res.render('pages/admin', {
                    webData: foundData[0],
                    images: foundPictures,
                    dishes: foundDishes
                });
            });
        });
    });
});

app.get('/dishes/:category', (req, res) => {
    Dishes.find({
        category: req.params.category
    }).lean().exec(function (err, dish) {
        return res.end(JSON.stringify(dish));
    });
});

app.get('/dishes', (req, res) => {
    Dishes.find().lean().exec(function (err, dish) {
        return res.end(JSON.stringify(dish));
    });
});


app.get('/*', (req, res) => {
    WebData.find({}, function (err, foundData) {
        if (err) return console.error(err);
        Pictures.find({}, function (err, foundPictures) {
            if (err) return console.error(err);
            res.render('pages/index', {
                webData: foundData[0],
                images: foundPictures
            });
        });
    });
});

app.post('/webData', (req, res) => {
    req.body.webData.body = req.sanitize(req.body.webData.body);
    WebData.findOneAndUpdate({}, req.body.webData, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin");
        }
    });
});

app.post('/pictures', (req, res) => {
    req.body.pictures.body = req.sanitize(req.body.pictures.body);
    var newImg = new Pictures(req.body.pictures);
    newImg.save().then(res.redirect("/admin"));
});

app.post('/dishes', (req, res) => {
    req.body.dish.body = req.sanitize(req.body.dish.body);
    var newDish = new Dishes(req.body.dish);
    newDish.save().then(res.redirect("/admin"));
});

app.delete('/dishes/:id', (req, res) => {
    Dishes.findOneAndDelete({_id: req.params.id}, ()=>{

    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));