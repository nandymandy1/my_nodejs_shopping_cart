var Category = require('../models/Category');

// Mongodb Connection
var mongoose = require('mongoose');

const config = require('../config/config');

mongoose.connect(config.database, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to database" + config.database);
    })
    .catch((err) => {
        console.log("Connection to database is fialed" + config.database);
    });


const categories = [
    new Category({
        name: 'T-Shirts'
    }),
    new Category({
        name: 'Mobile Covers'
    }),
    new Category({
        name: 'Mugs'
    }),
    new Category({
        name: 'Notebooks'
    }),
    new Category({
        name: 'Posters'
    }),
    new Category({
        name: 'Paintings'
    }),
    new Category({
        name: 'Caps'
    })
];

categories.forEach(category => {
    category.save();
});

console.log('Categories Seeded');