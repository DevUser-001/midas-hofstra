const mongoose = require('mongoose');
const {Schema} = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const ProductSchema  = new mongoose.Schema({
    merk :{
        type  : String
    },
    product :{
        type  : String
    },
    type :{
        type  : String
    },
    giftset_description :{
        type  : String,
        //required : true
    },
    gender :{
        type  : String,
        //required : true
    },             
    eu_clean :{
        type  : String,
        //required : true
    }
},
    {timestamps: true}
);

ProductSchema.virtual('volumes', {
    ref: 'Volumes', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'link', // is equal to foreignField
    options: { sort: { position: -1 } }
});
 
// Set Object and Json property to true. Default is set to false
ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', ProductSchema, 'eigenvoorraad');

module.exports = Product;