const express = require('express');
const mongoose = require('mongoose');
const productHandler = require('./routeHandler/productHandler');
const app = express();

app.use(express.json());

// connect database with mongoose
mongoose.connect('mongodb://localhost/products')
        .then(() => console.log('connection established successfully'))
        .catch((err) => console.log(err));


app.use('/product', productHandler);        


//default error handler
const errorHandler = function(err, req, res, next){
      if(res.headerSent){
          return next(err);
      }
      res.status(500).json({error:err});

};

    app.listen(3000,() => {
        console.log('Listening to 3000');
    });