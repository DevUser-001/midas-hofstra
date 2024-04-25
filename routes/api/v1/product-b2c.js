const csv = require("csv-parser");
const fs = require('fs');
var express = require("express");
const mongoose  = require('mongoose');
const xlsx = require("xlsx");
var router = express.Router();
const converter = require('json-2-csv');

const Product = require("../../../models/product");
const Volume = require("../../../models/volume");

const upload = require("./middlewares/upload");
const { WSASERVICE_NOT_FOUND } = require("constants");

const typeproduct = ['EDT','EDP', 'EDC', 'Deostick', 'BL'];


router.get("/", (request, response, next) => {
    response.redirect("/index")
})  

router.get("/index", (request, response, next) => {
    response.render("index", {user: request.user})
})  

router.get("/producten", (request, response, next) => {
    response.render("producten", {user: request.user})
}) 

router.get("/export", (request, response, next) => {
    response.render("export", {user: request.user})
}) 

router.get("/import", async (request, response, next) => {
    response.render("import-b2c", {user: request.user})
})  

router.get('/get', async (req, res) => {
    try {
        const data = await Product.find(/*{merk:"Aerin", product:"Amber Musk", type:"EDP"}*/)
                                 .populate({path: 'volumes', select: 'ean volume voorraad prijs'});

            res.status(200).json({success: true, data});
          
    } catch (err) {
       res.status(400).json({success: false, message:err.message});
    }
 })

router.post("/import",  (request, response, next) => {
    

    fs.createReadStream('./data/csv/Voorbeeld.csv').pipe(csv({ delimiter: ',' })).on('data',
    async function(row){

        let arrBestaand = [];
        let arrNiet = [];
        let found;
        try {
            //product_: row[1]
            
            Product.find({merk:{$eq: row[2]}, product: {$eq: row[3]}, type: {$eq: row[4]}}, function(err, data){
                if(err) console.log(err);
                if (data){
                    console.log("This has already been saved");
                    found = true;
                    arrBestaand.push(data._id)
                } else if(!data){
                    
                    found = false;
                    const item = new Product({
                        merk: row[2],
                        product: row[3],
                        type: row[4],
                        giftset_description: row[7],
                        eu_clean: row[19]
                    })
                    item.link = item._id;
                    arrNiet.push(item._id);
    
                    item.save(function(err, data) {
                        if(err) console.log(err);
                        
                        console.log("This is a new product saved", item.merk, item.product, item.type);
                        //res.redirect(`/`);
                    });
                }
            });

            
        } catch (err) {
            console.log({success: false, message:err.message})
        }
        /*
        try {
            //product_: row[1]
                    Volume.findOne({ean:row[0], volume: row[6]}, function(err, data){
                        if(err) console.log(err);
                        if (data){
                            console.log("This Volume has already been saved", data);
                        } else {
                            console.log(found);
                            if(found == false){
                                let volume = new Volume({
                                    ean: row[0], 
                                    sku: row[18], 
                                    volume: row[6], 
                                    voorraad: row[8], 
                                    prijs: row[14],
                                })

                                volume.link = arrNiet[0];
                                //console.log(volume);
                                
                                volume.save(function(err, data) {
                                    if(err) console.log(err);
                                    console.log("New volume created", data);
                                    //res.redirect(`/`);
                                });
            
                            }else if(found === true){
                                let volume = new Volume({
                                    ean: row[0], 
                                    sku: row[18], 
                                    volume: row[6], 
                                    voorraad: row[8], 
                                    prijs: row[14],
                                })
                            volume.link = arrBestaand[0];
                            console.log(arrBestaand[0]);
            
                            volume.save(function(err, data) {
                                if(err) console.log(err);
                                //console.log("New product created", data);
                                //res.redirect(`/`);
                            });
            
                        }
                        }
                    });
            
        } catch (err) {
            console.log({success: false, message:err.message})
        }
        
    */
    }).on('end', function() {
    
        console.log("done")

    });

});


 router.post("/import2",  async (request, response, next) => {
    

    fs.createReadStream('./data/csv/Voorbeeld.csv').pipe(csv({ delimiter: ',' })).on('data',
    async function(row){

        try {

            const exists = await Product.exists({merk:row[2], product: row[3], type:row[4]});
            const exists2 = await Volume.exists({ean:row[0], volume: row[6]});
            let arr = [];
            var productId = mongoose.Types.ObjectId();
            
            if(exists === false){

                const item = new Product({
                    _id: productId,
                    merk: row[2],
                    product: row[3],
                    type: row[4],
                    giftset_description: row[7],
                    eu_clean: row[19]
                })
                console.log("Product not Found.")
                item.link = productId;
                await item.save();

                    if(exists2 === false){

                        let volume = new Volume({
                            ean: row[0], 
                            sku: row[18], 
                            volume: row[6], 
                            voorraad: row[8], 
                            prijs: row[14],
                        })
                        
                        console.log("Volume not Found.")
                        volume.link = item.link;
                        await volume.save();
        
                    } else if(exists2 === true){
                        console.log("Volume Found.")
                        arr = [];
                        let product = await Product.find({merk:row[2], product: row[3], type:row[4]});
                        arr.push(product[0]._id);
                    }

                    console.log(exists, exists2);

            } else if (exists === true && exists2 === false){
                console.log("Product Found -- Volume not Found.")
                arr = [];
                let product = await Product.find({merk:row[2], product: row[3], type:row[4]});
                arr.push(product[0]._id);

                    let volume = new Volume({
                        ean: row[0], 
                        sku: row[18], 
                        volume: row[6], 
                        voorraad: row[8], 
                        prijs: row[14],
                    })
                    volume.link = arr[0];
                    
                    await volume.save();

            }


        } catch (err) {
           console.log({success: false, message:err.message})
        }
    
    
        }).on('end', function() {
    
            console.log("done")

        });

});


router.post("/import3",  async (request, response, next) => {
    

    fs.createReadStream('./data/csv/Voorbeeld.csv').pipe(csv({ delimiter: ',' })).on('data',
    async function(row){

        try {

            var productId = mongoose.Types.ObjectId();
            var exists = false;

            await Product.exists({merk:row[2], product: row[3], type:row[4]}, function (err, doc) { 
                if (doc == true){ 
                    exists = true;
                } else if (err){
                    console.log(err) 
                }
            }); 

            if(exists == true){
                const product = await Product.find({merk:row[2], product: row[3], type:row[4]})
                console.log(`A Record is found: Grabbing Product.  :  ${product[0]._id}`)
                let exists2;
                await Volume.exists({ean: row[0], volume: row[6]}, function (err, doc) { 
                    if (doc == false){ 
                        exists2 = false;
                    } else if (err){
                        console.log(err) 
                    }
                });
                    if(exists2 == false){
                    const volume = new Volume({
                        ean: row[0], 
                        sku: row[18], 
                        volume: row[6], 
                        voorraad: row[8], 
                        prijs: row[14],
                    })
                    volume.link = product[0]._id
                    await volume.save();
                    console.log(`Volume has been linked to  :  ${product[0]._id}.`)
            } else {
                console.log("No record found: Saving new Product.")
                
                const item = new Product({
                    _id: productId,
                    merk: row[2],
                    product: row[3],
                    type: row[4],
                    giftset_description: row[7],
                    eu_clean: row[19]
                })
                item.link = productId;
                await item.save();

                const volume = new Volume({
                    ean: row[0], 
                    sku: row[18], 
                    volume: row[6], 
                    voorraad: row[8], 
                    prijs: row[14],
                })
                volume.link = item.link;
                
                await volume.save();
                console.log("Volume has been linked to Product.")
                }
            }
            /*  
            const product = await Product.findById({_id:item.link})

            var query = { link: item.link },
            update = { link: arr[0]._id},
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

            await Volume.findOneAndUpdate(query, update, options, function(error, result) {
                if (error) return;
                //console.log(result);
                // do something with the document
            });*/

            //product.volumes.push(volume);
            //console.log(product);

            //if ( product.volumes !== []){
            //    console.log(product[0].volumes)
            //}

            //await product.save();

        } catch (err) {
           console.log({success: false, message:err.message})
        }
    
    
        }).on('end', function() {
    
            console.log("done")

        });

});

module.exports = router;