const mongoose = require('mongoose')
const User = require('../models/User');
const Stock = require('../models/Stock')
const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../server');
const assert = chai.assert
let should = chai.should();

chai.use(chaiHttp);
describe('/Get request to /api/stock-prices/', () => {
    it('should view on stock', (done) => {
        chai.request(server).get('/api/stock-prices?stock=goog').end((err, res) => {
            res.should.have.status(200)
            res.body.stockData.stock.should.be.equal('GOOG')
            done()
        })
    })
})
