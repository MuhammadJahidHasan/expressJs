const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const productSchema = require('../schemas/productSchemas');

const Product = new mongoose.model('Product', productSchema);
router.get('/',  (req, res) => {
       Product.find().select({
          _id : 0,
          postedDate : 0
      }).exec((err, data) => {
        if(!err){
            res.status(200).json({result: data});
        }else{
            res.status(500).json({error: 'Internal server error!'});
        }
      });
});

router.get('/:id',  (req, res) => {
     Product.find({_id: req.param.id},(err, data) => {
        if(!err){
            res.status(200).json({result: data});
        }else{
            res.status(500).json({error: 'Internal server error!'});
        }
    });
});

router.post('/', (req, res) => {
    const newProduct = new Product(req.body);

     newProduct.save((err) => {
        if(!err){
            res.status(200).json({message: 'Product insert successfully'});
        }else{
            res.status(500).json({error: 'Internal server error!'});
        }
    });
});

router.put('/:id',(req, res) => {
   
        Product.updateOne({_id: req.params.id},{
           $set:{
               price:179000
           }
       }, (err) => {
        if(!err){
            res.status(200).json({message: 'Product updated successfully'});
        }else{
            res.status(500).json({error: 'Internal server error!'});
        }
       });
});

router.delete('/:id', async (req, res) => {

        try{
            await Product.deleteOne({_id: req.param.id});
            res.status(200).json({result: 'Product deleted successfully'});
        }catch(err){

            res.status(500).json({error: 'Internal server error!'});
         }
       
});

module.exports = router;