module.exports = mongoose => {
    const Product = mongoose.model(
      "Product",
      mongoose.Schema(
        {
                ean :{
                type  : Number,
                //required : true
                },
                product_ :{
                type  : String,
                //required : true
                },
                merk :{
                type  : String,
                //required : true        
                },
                product :{
                type  : String,
                //required : true
                },
                type :{
                type  : String,
                //required : true
                },
                volume :{
                type  : String,
                //required : true
                },
                giftset_inhoud :{
                type  : String,
                //required : true
                },
                aantal :{
                type  : Number,
                //required : true
                },
                inkoop_prijs :{
                type  : Number,
                //required : true
                },
                groothandel_prijs :{
                type  : Number,
                //required : true
                },
                inkoop_min :{
                type  : Number,
                //required : true
                },
                inkoop_max :{
                type  : Number,
                //required : true
                },
                verkoop_berekend :{
                type  : Number,
                //required : true
                },
                store_prijs :{
                type  : Number,
                //required : true
                },
                winst_min :{
                type  : Number,
                //required : true
                },
                winst_max :{
                type  : Array,
                //required : true
                },    
                winst :{
                type  : Number,
                //required : true
                },            
                sku :{
                type  : String,
                //required : true
                },
                eu_clean :{
                type  : String,
                //required : true
                },
                notities :{
                type  : String,
                //required : true
                },
                images :{
                type  : Array,
                //required : true
                },
                added :{
                type : Date,
                default : Date.now
            }
        },
        { timestamps: true }
      )
    );
  
    return Product;
  };