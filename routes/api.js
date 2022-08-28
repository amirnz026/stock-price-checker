'use strict';
const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/User')
const Stock = require('../models/Stock')
const md5 = require('md5')


router.get('/stock-prices', async (req, res) => {
    const userStock = req.query.stock
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    try {
        const stockData = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${userStock}/quote`);
        if (req.query.like) {
            console.log('like is true')
            const foundUser = await User.findOne({hashedIp: md5(userIp)})
            if (!foundUser) {
                console.log('foundUser: false')
                const newUser = new User({
                    hashedIp: md5(userIp),
                    likedStocks: [`${userStock}`]
                })

                await newUser.save()
                console.log('newUser saved')

            } else {
                if (!foundUser.likedStocks.includes(userStock)) {
                    foundUser.likedStocks.push(userStock)
                    await foundUser.save()
                    console.log('the user have not liked the current stock')
                    const foundStock = await Stock.findOne({stock: userStock})
                    if (foundStock) {
                        console.log('there is a stock that the user is liking it now')
                        foundStock.likes += 1
                        await foundStock.save()
                        console.log('stock likes added by 1')
                    } else {

                        const newStock = new Stock({
                            stock: userStock,
                            likes: 1
                        })
                        await newStock.save()
                        console.log('new stock with likes of 1')
                    }
                }
            }
            const foundStocks = await Stock.findOne({stock: userStock})
            console.log('main if done')
            return res.status(200).json({
                stockData: {
                    stock: userStock,
                    price: stockData.data.latestPrice,
                    likes: foundStocks.likes
                }
            })

        } else {
            console.log('user does not want to like')
            let likeCount = 0
            const foundStock = await Stock.findOne({stock: userStock})
            if (foundStock) {
                console.log('a stock with that query is found')
                likeCount = foundStock.likes
            }
            return res.status(200).json({
                stockData: {
                    stock: userStock.toUpperCase(),
                    price: stockData.data.latestPrice,
                    likes: likeCount
                }
            })
        }
    } catch (err) {
        console.log('catch')
        res.status(500).json({message: err})
    }


})


module.exports = router

