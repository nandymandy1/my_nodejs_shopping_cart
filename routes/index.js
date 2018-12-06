var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var csrf = require('csurf');
var Cart = require('../models/Cart');

// Instamojo Payment Portal
var Insta = require('instamojo-nodejs');
var Order = require('../models/Order');


// CSRF Protection
var csrfProtection = csrf();
router.use(csrfProtection);


/* GET home page. */
router.get('/', function (req, res, next) {
  Product.find((err, docs) => {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  });
});


// Adding Products to the cart if User logged in or logged out
router.get('/add-to-cart/:id', (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart((req.session.cart) ? (req.session.cart) : ({}));
  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    // console.log(req.session.cart);
    res.redirect('/');
  });
});


//  removing the products from the cart
router.get('/reduce/:id', (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart((req.session.cart) ? (req.session.cart) : ({}));

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});


// Remve all the item qty from the cart
router.get('/remove-all/:id', (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart((req.session.cart) ? (req.session.cart) : ({}));

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});



// View the Cart if the user is logged in or logged out
router.get('/shopping-cart', (req, res, next) => {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
});




// Redirect to the check out page
router.get('/checkout', isLoggedIn, (req, res, next) => {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = req.session.cart;
  res.render('shop/checkout', { csrfToken: req.csrfToken(), total: cart.totalPrice });

});

// Payments Via Instamojo
router.post('/checkout-pay', isLoggedIn, (req, res, next) => {

  // Insta Mojo Intialization
  Insta.setKeys('test_d15d61868718d34f1ff2921e377', 'test_e2b004847eef5d5e5938f35a399');
  // Initialize Payment Data
  var data = new Insta.PaymentData();
  Insta.isSandboxMode(true);
  data.purpose = req.body.purpose;
  data.name = req.body.name;
  data.address = req.body.address;
  data.phone = req.body.phone;
  data.email = req.body.email;
  data.amount = req.body.total;
  data.send_email = false;
  data.allow_reapeated_payment = false;
  data.setRedirectUrl('http://localhost:3000/payment-success');

  Insta.createPayment(data, (error, response) => {
    if (error) {
      // if there is any error with the payments then we can redirect ot the server not responding page
      req.flash('error', error.message);
      var errMsg = req.flash('error')[0];
      res.render('shop/post-checkout', { errMsg: errMsg, Errors: false });

    } else {
      // Payment redirection link at response.payment_request.longurl
      const responseData = JSON.parse(response);
      // Get the payment URL where to redirect the user
      req.session.name = req.body.name;
      req.session.phone = req.body.phone;
      req.session.address = req.body.address;

      const redirectUrl = responseData.payment_request.longurl;
      res.redirect(redirectUrl);
    }
  });
});

/*
Redirect URL From the Instamojo to recive the payment ID and 
store the cart items with payment success ID in the pyaments 
collectein and destroy the cart items and then redirect to 
generated invoice page.
*/

router.get('/payment-success', isLoggedIn, (req, res, next) => {

  payment_Id = req.query.payment_id;
  payment_request_Id = req.query.payment_request_id;
  // Getting  all Data from the Payment Gateway
  req.flash('success', 'Successfully bought the products');
  // Saving all the data to the Database
  var order = new Order({
    user: req.user,
    cart: req.session.cart,
    name: req.session.name,
    phone: req.session.phone,
    address: req.session.address,
    paymentId: payment_Id,
    paymentRequestId: payment_request_Id
  });
  // Unset the session Address, Name, Email and Phone and Also Cart Item
  req.session.name = null;
  req.session.phone = null;
  req.session.address = null;
  req.session.cart = null;
  // Storing the cart object
  order.save((err, result) => {
    // Redirect user to the User Profile and Shopping Details Page with the Success message
    var sccMsg = req.flash('success')[0];
    res.render('shop/post-checkout', { sccMsg: sccMsg, noErrors: true });
  });

});


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // old Url Field sends the the user to the current page where it was
  req.session.oldUrl = req.url;
  res.redirect('/user/login');
}
