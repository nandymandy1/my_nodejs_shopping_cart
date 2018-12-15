var Product = require('../models/Product');

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


const products = [
    new Product({
        imagePath: '/images/products/happy_person/h_1.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Paintings',
        price: 12
    }),
    new Product({
        imagePath: '/images/products/happy_person/h_2.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Paintings',
        price: 12
    }),
    new Product({
        imagePath: '/images/products/happy_person/h_3.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Cups',
        price: 12
    }),
    new Product({
        imagePath: '/images/products/happy_person/h_4.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Caps',
        price: 12
    }),
    new Product({
        imagePath: '/images/products/happy_person/h_5.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Mugs',
        price: 12
    }),
    new Product({
        imagePath: '/images/products/happy_person/h_9.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Posters',
        price: 12
    }),
    new Product({
        imagePath: '/images/products/happy_person/h_10.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Posters',
        price: 12
    }),
    new Product({
        imagePath: '/images/products/happy_person/h_11.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Mobile-Covers',
        price: 12
    }),
    new Product({
        imagePath: '/images/products/happy_person/h_12.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Mobile-Covers',
        price: 12
    }),
    new Product({
        imagePath: '/images/products/happy_person/h_13.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'T-Shirts',
        price: 12
    }),
    new Product({
        imagePath: '/images/products/happy_person/h_15.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'T-Shirts',
        price: 12
    }),
    new Product({
        imagePath: '/images/products/happy_person/h_16.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'T-Shirts',
        price: 12
    })
];

products.forEach(product => {
    product.save();
});
