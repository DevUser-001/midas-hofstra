const mongoose = require('mongoose');
const {Schema} = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const volumeSchema = new Schema({ 
    ean: {
      type: String
      required: true
    },
    sku :{
      type  : String
      //unique: true
      required : true
    },
    volume: {
      type: String
      required: true,
    },
    price: {
      bolMax:Float,
      bolMin: Float,
      bolPrice: Float,
      purchasePrice: Float,
      storePrice: Float,
    },
    storePrice: {
      type:Float
    },
    offers:{
      type:Object
    },
    price_history:[{
      type:Object
    }],
    stock: {
      type: Number
      required: true
    },
    inStock: {
      type: Boolean
      required: true
    },
    link: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
},
{timestamps: true})

const Volume = mongoose.model('Volumes', volumeSchema, 'eigenvoorraad-volumes');

module.exports = Volume;