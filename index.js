var express = require('express');
var path = require('path');
var bparser = require('body-parser');
var session = require('express-session');
var cookieparser = require('cookie-parser');

var product = require('./product');

const productList = [
    new product('Product Name 1', 'This is a first product', 15, 'https://google.com/a1'),
    new product('Product Name 2', 'This is a second product', 12, 'https://google.com/a2'),
];

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bparser.urlencoded());
app.use(session({secret : 'mysecretkey'}));
app.use(cookieparser());
app.use('/js', express.static(path.join(__dirname, 'views', 'js')));

app.get('/', (req, res)=>{
    let cart=[];
    if(req.session.cart) cart = req.session.cart;
    res.render('index.ejs', {productList : productList, cart_size : cart.length});
});

app.get('/p',(req, res)=>{
    let productNumber = req.query.pnumber;
    let product = productList[productNumber];
    let cart = [];
    if(req.session.cart) cart = req.session.cart;
    res.render('product.ejs', {product : product, cart_size : cart.length});
});

app.post('/add', (req, res)=>{
    let productIndex = req.body.i;
    let cart = []
    if(req.session.cart){
        cart = req.session.cart;
    }
    cart.push(productList[productIndex]);
    req.session.cart = cart;
    res.redirect('/');
});

app.get('/cart', (req, res)=>{
    let cart = [];
    if(req.session.cart) {
        cart = req.session.cart;
    }

    // cookie part
    let cookieValue = productList;
    res.cookie('productListCookie', cookieValue);


    // res.render('cart.ejs', {cart : cart, cart_size: cart.length});
    // res.render('cart.ejs', {cart : req.cookies.productListCookie, cart_size: cart.length});
    res.render('cart.ejs', {cart : productList, cart_size: cart.length});
});

app.get('/contact', (req, res)=>{
    let cart=[];
    if (req.session.cart) {
        cart = req.session.cart
    }
    res.render('contact.ejs', {cart : cart, cart_size : cart.length});
})

app.listen('4000', ()=> {console.log('server started at port 4000')});