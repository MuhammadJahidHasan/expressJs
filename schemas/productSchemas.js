const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

       name: {
           type: String,
           required: true
       },
       description: String,

       price: {
        type: String,
        required: true
     },
       brand: {
        type: String,
        required: true
     },

     postedDate: {
        type: Date,
        default: Date.now
     },


});

module.exports = productSchema;