const mongoose = require("mongoose");

mongoose
    .connect('mongodb://127.0.0.1:27017/mean-employees', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then((db) => console.log('Database connected!'))
    .catch((err) => console.error(err));

module.exports = mongoose;





