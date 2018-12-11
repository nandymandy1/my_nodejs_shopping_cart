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
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Paintings',
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Paintings',
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Cups',
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Caps',
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Mugs',
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Posters',
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Posters',
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Mobile-Covers',
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'Mobile-Covers',
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'T-Shirts',
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'T-Shirts',
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty - Black OOPS!',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis consectetur, explicabo repudiandae dicta quae accusamus exercitationem soluta itaque ut voluptate cupiditate deserunt libero repellat autem earum quis minus? Velit, esse!',
        category: 'T-Shirts',
        price: 12
    })
];

products.forEach(product => {
    product.save();
});
