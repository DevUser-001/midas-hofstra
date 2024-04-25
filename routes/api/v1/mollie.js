require('dotenv').config();
const express = require('express');
const axios = require('axios');
var router = express.Router();

router.get('/', async (req, res) => {

    try {
        const { data } = await axios("https://api.mollie.com/v2/payments", 
        { headers: { 'Authorization': `Bearer ${process.env.TEST_KEY}`, 'Accept': 'application/json' }});
        return res.json(data);
      } catch (error) {
        return res.json(error.message);
      }
});


router.get('/getSingleOrder', async (req, res) => {

    let {id} = req.query;

    try {
        const { data } = await axios(`https://api.mollie.com/v2/orders/${id}`, 
        { headers: { 'Authorization': `Bearer ${process.env.TEST_KEY}`, 'Accept': 'application/json' }});
        return res.json(data);
      } catch (error) {
        return res.json(error.message);
      }
});

router.get('/getAllOrders', async (req, res) => {

    try {
        const { data } = await axios("https://api.mollie.com/v2/orders", 
        { headers: { 'Authorization': `Bearer ${process.env.TEST_KEY}`, 'Accept': 'application/json' }});
        return res.json(data);
      } catch (error) {
        return res.json(error.message);
      }
});



  module.exports = router;