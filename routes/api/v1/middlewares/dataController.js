const csv = require("csv-parser");
const fs = require('fs');
var express = require("express");

const xlsx = require("xlsx");
var router = express.Router();
const converter = require('json-2-csv');

let Product = require("../../../../models/product");

var path = require("path");

const __basedir = path.resolve();

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Upload een csv bestand!");
    }

    console.log(req.file);

    let path =
      __basedir + "/uploads/" + req.file.filename;

    console.log(path);
    
    var csvData = [];
    fs.createReadStream(path)
    .pipe(csv({ delimiter: ',' }))
    .on('data',
      function(row){
        var product = {
            ean: row[0].toString(),
            product_: row[1],
            //merk: row[2],
            //product: row[3],
            type: row[4],
            //volume: row[6],
            giftset_inhoud: row[7],
            aantal: row[8],
            inkoop_prijs: row[9],
            //groothandel_prijs: row[10],
            //inkoop_min: row[11],
            //inkoop_max: row[12],
            //verkoop_berekend: row[13],
            //store_prijs: row[14],
            //winst_min: row[15],
            //winst_max: row[16],
            //winst: row[17],
            //sku: row[18],
            eu_clean: row[19],
            //notities: row[20],
            //images: [row[0] + '.jpg' ]
        }; 
        /*
        Product.exists({ean:row[0].toString()}, function (err, doc) { 
          if (err){ 
              console.log(err) 
          }else{ 
              console.log("Result :", doc) // false 
          } 
      }); 
      */
        
      const item = new Product({
          ean: row[0],
          product_: row[1],
          merk: row[2],
          product: row[3],
          type: row[4],
          volume: row[6],
          giftset_inhoud: row[7],
          aantal: row[8],
          inkoop_prijs: row[9],
          groothandel_prijs: row[10],
          inkoop_min: row[11],
          inkoop_max: row[12],
          verkoop_berekend: row[13],
          store_prijs: row[14],
          winst_min: row[15],
          winst_max: row[16],
          winst: row[17],
          sku: row[18],
          eu_clean: row[19],
          notities: row[20],
          images: [row[0] + '.jpg' ]
      }) 

      item.save().then((value)=>{console.log(value)}).catch(err=> console.log(err));
      

      csvData.push(product);

    }).on('end', function() {
      converter.json2csv(csvData, (err, csv) => {
          if (err) {
              throw err;
          }

          let date = new Date();
          var str =  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " om " + date.getHours() + ":" + date.getMinutes();

          fs.writeFileSync(`./export/import-door-${req.user}-${str}.csv`, csv);

      });

      console.log("done")

    });

    return res.status(200).send({ fire: true });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Kon het bestand niet uploaden: " + req.file.originalname,
    });
  }

};

module.exports = {
    upload
  };