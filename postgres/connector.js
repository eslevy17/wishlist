const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'wishlist',
    password: '',
    port: 5432,
    max: 10
})

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'wishlist',
    password: '',
    port: 5432
})

client.connect()

function getNeeds (req, res) {
    client.query('SELECT * FROM needs', (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data.rows)
        }
    })
}

function getWants (req, res) {
    client.query('SELECT * FROM wants', (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data.rows)
        }
    })
}

function addNeed (req, res) {
    const text = 'INSERT INTO needs (name, price) VALUES ($1, $2) RETURNING *';
    const values = [req.body.name, req.body.price];
    client.query(text, values, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data.rows)
        }
    })
}

function addWant (req, res) {
    const text = 'INSERT INTO wants (name, price) VALUES ($1, $2) RETURNING *';
    const values = [req.body.name, req.body.price];
    client.query(text, values, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data.rows)
        }
    })
}

function updateNeed (req, res) {
    const text = 'UPDATE needs SET name = ($1), price = ($2) WHERE id = ($3)'
    const values = [req.body.name, req.body.price, req.body.id]
    client.query(text, values, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data.rows)
        }
    })
}

function updateWant (req, res) {
    const text = 'UPDATE wants SET name = ($1), price = ($2) WHERE id = ($3)'
    const values = [req.body.name, req.body.price, req.body.id]
    client.query(text, values, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data.rows)
        }
    })
}

function deleteNeed (req, res) {
    const text = 'DELETE FROM needs WHERE id = ($1)';
    const values = [req.params.id];
    client.query(text, values, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data.rows)
        }
    })
}

function deleteWant (req, res) {
    const text = 'DELETE FROM wants WHERE id = ($1)';
    const values = [req.params.id];
    client.query(text, values, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data.rows)
        }
    })
}

module.exports = {
    getNeeds: getNeeds,
    getWants: getWants,
    addNeed: addNeed,
    addWant: addWant,
    updateNeed: updateNeed,
    updateWant: updateWant,
    deleteNeed: deleteNeed,
    deleteWant: deleteWant
}
