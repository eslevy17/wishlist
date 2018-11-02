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

function getLimits (req, res) {
    client.query('SELECT * FROM limits', (err, data) => {
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
    console.log(req.params.id)
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

function purchase (req, res) {
    const text = 'INSERT INTO purchases (name, price, list, month, year) VALUES ($1, $2, $3, $4, $5)';
    const values = [req.body.name, req.body.price, req.body.list, req.body.month, req.body.year];
    client.query(text, values, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data.rows)
        }
    })
}

function getPurchases (req, res) {
    const text = 'SELECT * FROM purchases ORDER BY year, month, id';
    client.query(text, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data.rows)
        }
    })
}

function updatePurchasedItem (req, res) {
    const text = 'UPDATE purchases SET name = ($1), price = ($2) WHERE id = ($3)';
    const values = [req.body.name, req.body.price, req.body.id];
    client.query(text, values, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data.rows)
        }
    })
}

function deletePurchasedItem (req, res) {
    const text = 'DELETE FROM purchases WHERE id = ($1)';
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

function updateMonthlyLimit (req, res) {
    const selecttext = 'SELECT * FROM limits WHERE year = ($1) AND month = ($2) ORDER BY year, month, id';
    const selectvalues = [req.body.year, req.body.month]
    client.query(selecttext, selectvalues, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            if (data.rows.length == 0) {
                const inserttext = 'INSERT INTO limits (year, month, limitation) VALUES ($1, $2, $3) RETURNING *'
                const insertvalues = [req.body.year, req.body.month, req.body.limitation];
                client.query(inserttext, insertvalues, (err, data) => {
                    if (err) {
                        res.json(err)
                    }
                    else {
                        res.json(data.rows)
                    }
                })
            }
            if (data.rows.length == 1) {
                const updatetext = 'UPDATE limits SET limitation = ($1) WHERE year = ($2) AND month = ($3)';
                const updatevalues = [req.body.limitation, req.body.year, req.body.month];
                client.query(updatetext, updatevalues, (err, data) => {
                    if (err) {
                        res.json(err)
                    }
                    else {
                        res.json(data.rows)
                    }
                })
            }
        }
    })
}

module.exports = {
    getNeeds: getNeeds,
    getWants: getWants,
    getLimits: getLimits,
    addNeed: addNeed,
    addWant: addWant,
    updateNeed: updateNeed,
    updateWant: updateWant,
    deleteNeed: deleteNeed,
    deleteWant: deleteWant,
    purchase: purchase,
    getPurchases: getPurchases,
    updatePurchasedItem: updatePurchasedItem,
    deletePurchasedItem: deletePurchasedItem,
    updateMonthlyLimit: updateMonthlyLimit,
}
