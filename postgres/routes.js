const express = require('express')
const bp = require('body-parser');
const api = require('./connector')

const app = express();

function router(app) {
    app.use(bp.json());

    app.get('/api/needs', api.getNeeds)

    app.get('/api/wants', api.getWants)

    app.post('/api/needs', api.addNeed)

    app.post('/api/wants', api.addWant)

    app.put('/api/needs', api.updateNeed)

    app.put('/api/wants', api.updateWant)

    app.delete('/api/needs/:id', api.deleteNeed)

    app.delete('/api/wants/:id', api.deleteWant)
}

module.exports = router;
