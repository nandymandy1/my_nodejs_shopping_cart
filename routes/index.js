const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const csrf = require('csurf');
const Cart = require('../models/Cart');

// Instamojo Payment Portal
const Insta = require('instamojo-nodejs');
const Order = require('../models/Order');

// CSRF Protection
const csrfProtection = csrf();
router.use(csrfProtection);


/* GET home page. */
router.get('/', (req, res, next) => {
  // Get All Products
  Product.find((err, docs) => {
    let productChunks = [];
    let chunkSize = 3;
    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }

    // Get all hot arrivals


    // Get all Bestsellers


    res.render('shop/index', {
      page: 'home',
      title: 'Shopping Cart',
      csrfToken: req.csrfToken(),
      products: productChunks
    });
  });
});

// POST Request for Product Search
// Get all products by matching names
router.post('/product/search', (req, res, next) => {
  query = req.body.query;
  // Query Builder need to be updated
  /*
      Search for Full Text
      .find({ $text: { $search: query } })
  */

  Product
    .find({ $or: [{ name: { $regex: new RegExp(query), "$options": "i" } }, { category: { $regex: new RegExp(query), "$options": "i" } }, { description: { $regex: new RegExp(query), "$options": "i" } }] })
    .then(product => {
      return res.json({ products: product, success: true })
    })
    .catch(err => {
      return res.json({ msg: "Unable to fetch the products", err: true });
    });
});


// GET Product Page
router.get('/product/:id', (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {

      // Check for the bestseller

      // Check for the new

      // Check for the Original Price

      // Check for the Latest Price

      // Check for the Discount

      // return res.json({ product });
      res.render('shop/product', {
        product: product,
        title: 'Shopping Cart',
        csrfToken: req.csrfToken()
      });
    })
    .catch(err => console.log(err));
});

//Get all the products by category name
router.get('/products/:category', (req, res, next) => {
  const category = req.params.category;
  Product.find({ category: category })
    .then(products => {
      let productChunks = [];
      let chunkSize = 3;
      for (let i = 0; i < products.length; i += chunkSize) {
        productChunks.push(products.slice(i, i + chunkSize));
      }
      res.render('shop/index', {
        category: category,
        title: 'Shopping Cart',
        products: productChunks,
        csrfToken: req.csrfToken(),
        page: 'home'
      });
    })
    .catch(err => res.json({ msg: 'There are no products of this category' }));
});


// Adding Products to the cart if User logged in or logged out
router.get('/add-to-cart/:id', (req, res, next) => {
  let productId = req.params.id;
  let cart = new Cart((req.session.cart) ? (req.session.cart) : ({}));
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

// Adding Product to the Cart by API
router.post('/add-to-cart', (req, res, next) => {
  let productId = req.body.id;
  let cart = new Cart((req.session.cart) ? (req.session.cart) : ({}));
  Product.findById(productId, (err, product) => {
    if (err) {
      return res.json(err);
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    // console.log(req.session.cart);
    return res.json({ success: true, product: product });
  });
});


router.get('/add/:id', (req, res, next) => {
  let productId = req.params.id;
  let cart = new Cart((req.session.cart) ? (req.session.cart) : ({}));
  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect('/shopping-cart');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    // console.log(req.session.cart);
    res.redirect('/shopping-cart');
  });
});



//  removing the products from the cart
router.post('/reduce', (req, res, next) => {
  let productId = req.body.id;
  let cart = new Cart((req.session.cart) ? (req.session.cart) : ({}));

  cart.reduceByOne(productId);
  req.session.cart = cart;
  // res.redirect('/shopping-cart');
  Product.findById(productId).then(product => {
    return res.json({ success: true, cart: req.session.cart, product: product });
  });
});

// Remve all the item qty from the cart
router.post('/remove-all', (req, res, next) => {
  let productId = req.body.id;
  let cart = new Cart((req.session.cart) ? (req.session.cart) : ({}));

  cart.removeItem(productId);
  req.session.cart = cart;
  Product.findById(productId).then(product => {
    return res.json({ success: true, cart: req.session.cart, product: product });
  });

});


// View the Cart if the user is logged in or logged out
router.get('/shopping-cart', (req, res, next) => {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', { products: null });
  }
  let cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {
    csrfToken: req.csrfToken(),
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
});


// Redirect to the check out page
router.get('/checkout', isLoggedIn, (req, res, next) => {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  let cart = req.session.cart;
  res.render('shop/checkout', { csrfToken: req.csrfToken(), total: cart.totalPrice });

});


// Payments Via Instamojo
router.post('/checkout-pay', isLoggedIn, (req, res, next) => {
  // Insta Mojo Intialization
  Insta.setKeys('test_d15d61868718d34f1ff2921e377', 'test_e2b004847eef5d5e5938f35a399');
  // Initialize Payment Data
  let data = new Insta.PaymentData();
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
      let errMsg = req.flash('error')[0];
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
