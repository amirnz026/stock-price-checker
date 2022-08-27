'use strict';
const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/User')

router.get('/stock-prices', async (req, res) => {

    try {
        const response = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${req.query.stock}/quote`);
        // noinspection JSUnresolvedVariable

        res.status(200).json({
            stockData: {
                stock: response.data.symbol,
                price: response.data.latestPrice,
                likes: 5
            }
        })

        const user1 = new User({ip: 10, likedStocks: 'stocks'})
        user1.save((err, user) => {
            if (err) return console.error(err)
            console.log(user.ip + " saved to user collection.")
        })


    } catch (err) {
        res.status(500).json({message: err})
    }
    
})

module.exports = router

