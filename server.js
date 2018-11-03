const express = require('express');
const router = require('./postgres/routes')

const app = express();

app.use(express.static('./build'));

router(app);

// app.get('/', (req, res) => {
//     res.sendFile('/build/index.html');
// });

// const { Pool, Client } = require('pg');
//
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'wishlist',
//     password: '',
//     port: 5432,
//     max: 10
// })
//
// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'wishlist',
//     password: '',
//     port: 5432
// })
//
// client.connect()

app.all("*", (req,res,next) => {
    res.redirect('/')
});

app.listen(8000, () => console.log("Listening on port 8000."))
