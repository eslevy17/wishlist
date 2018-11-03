const express = require('express')
const bp = require('body-parser');
const api = require('./connector')

const app = express();

function router(app) {
    app.use(bp.json());

    app.get('/api/needs', api.getNeeds)
    app.get('/api/wants', api.getWants)
    app.get('/api/purchases', api.getPurchases)
    app.get('/api/limits', api.getLimits)

    app.post('/api/needs', api.addNeed)
    app.post('/api/wants', api.addWant)
    app.post('/api/purchases', api.purchase)

    app.post('/api/limits', api.updateMonthlyLimit)

    app.put('/api/needs', api.updateNeed)
    app.put('/api/wants', api.updateWant)
    app.put('/api/purchases', api.updatePurchasedItem)
    // app.put('/api/limits', api.updateMonthlyLimit)

    app.delete('/api/needs/:id', api.deleteNeed)
    app.delete('/api/wants/:id', api.deleteWant)
    app.delete('/api/purchases/:id', api.deletePurchasedItem)

}

module.exports = router;
