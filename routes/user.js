const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// CSRF Protection
var csrfProtection = csrf();
router.use(csrfProtection);

// Protecting the routes which logged in users can see
router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.redirect('/');
});

// Redirect to Profile Page
router.get('/profile', isLoggedIn, (req, res, next) => {

    Order.find({ user: req.user }).sort({ datefield: -1 }).exec((err, orders) => {
        if (err) {
            return res.write('Error');
        }
        var cart;
        orders.forEach(order => {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        // console.log(orders);
        res.render('users/profile', { orders: orders });
    });

});

// Protecting the routes which no logged in users can only see
router.use('/', notLoggedIn, (req, res, next) => {
    next();
});

// REGISTER ROUTES
router.get('/register', (req, res, next) => {
    var messages = req.flash('error');
    res.render('users/register', { csrfToken: req.csrfToken(), messages: messages, hasErrors: (messages.length) > 0 });
});

// To Register the User
router.post('/register', passport.authenticate('local.register', {
    failureRedirect: '/user/register',
    failureFlash: true
}), (req, res, next) => {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

// LOGIN ROUTES
router.get('/login', (req, res, next) => {
    var messages = req.flash('error');
    res.render('users/login', { csrfToken: req.csrfToken(), messages: messages, hasErrors: (messages.length) > 0 });
});

// To login the user
router.post('/login', passport.authenticate('local.login', {
    failureRedirect: '/user/login',
    failureFlash: true
}), (req, res, next) => {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

module.exports = router;

// Check for Logged In status and then redirect
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

// Check for Logged Out status and then redirect
function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}