const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    sanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    passport = require('passport'),
    flash = require('connect-flash'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user'),
    WebData = require('./models/webSchema'),
    Pictures = require('./models/Pictures'),
    Dishes = require('./models/Dishes');

mongoose.connect('mongodb://adrian:database123@ds151523.mlab.com:51523/wiai-restauracja');
// mongoose.connect("mongodb://localhost:27017/mydb");

app.set('view engine', 'ejs');
app.use(require('express-session')({
    secret: "okraglinek",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('public'));
app.use(sanitizer());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

const isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('message', 'Najpierw musisz się zalogować!');
    res.redirect('/login');
}

app.get('/login', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/admin');
    } else {
        res.render('pages/login', {message: req.flash('message')});
    }  
});

app.post('/login',passport.authenticate("local", {
    successRedirect: '/admin',
    failureRedirect: '/login'
}));

app.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});

app.get('/admin', isLoggedIn, (req, res) => {
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

app.post('/webData', isLoggedIn, (req, res) => {
    req.body.webData.body = req.sanitize(req.body.webData.body);
    WebData.findOneAndUpdate({}, req.body.webData, function (err) {
        if (err) {
            console.error(err);
        } else {
            res.redirect("/admin");
        }
    });
});

app.post('/pictures', isLoggedIn, (req, res) => {
    req.body.pictures.body = req.sanitize(req.body.pictures.body);
    const newImg = new Pictures(req.body.pictures);
    newImg.save().then(res.redirect("/admin"));
});

app.post('/dishes', isLoggedIn, (req, res) => {
    req.body.dish.body = req.sanitize(req.body.dish.body);
    const newDish = new Dishes(req.body.dish);
    newDish.save().then(res.redirect("/admin"));
});

app.delete('/dishes/:id', isLoggedIn, (req, res) => {
    Dishes.findOneAndDelete({_id: req.params.id}, ()=>{});
});

app.listen(port, () => console.log(`App listening on port ${port}!`));