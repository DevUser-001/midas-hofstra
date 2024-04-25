const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);
const offerSchema  = new mongoose.Schema({
    ean :{
    type  : String,
    //required : true
    },
    bolId :{
    type  : String,
    //required : true
    },
    price :{
    type  : Float,
    //required : true
    },
    priceBol :{
    type  : Float,
    //required : true
    },
    priceLvb :{
    type  : Float,
    //required : true
    },
    listPrice :{
    type  : Float,
    //required : true
    },
    sellerId :{
    type  : String,
    //required : true
    },
    displayName :{
    type  : String,
    //required : true
    },
    availabilityDescription :{
    type  : String,
    //required : true
    },
    position :{
    type  : String,
    //required : true
    },
    lowestBolLvbName :{
    type  : String,
    //required : true
    },
    lowestBolName :{
    type  : String,
    //required : true
    }
},{timestamps:true});

const Offer = mongoose.model('Offer', offerSchema, 'bolv4-catalog-Offers');
module.exports = Offer;