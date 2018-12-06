if (process.env.NODE_ENV === 'production') {
    module.exports = { database: 'mongodb://nandymandy:nandymandy@ds239368.mlab.com:39368/shopping', secret: 'yoursecret' }
} else {
    module.exports = { database: 'mongodb://localhost:27017/shopping', secret: 'yoursecret' }
}
