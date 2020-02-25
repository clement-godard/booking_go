const functions = require('./app')
const express = require('express')

// Server config
const app = express()
const port = 3000

//Endpoints
app.get('/fetchSupplier', (req, res) => {
    if (!req.query.supplier) {
        res.type('json').status(400).send({ message: "Invalid supplier" })
    } else if (!req.query.min) {
        res.type('json').status(400).send({ message: "Invalid nb of passangers" })
    } else {
        fetchSupplier(req.query.supplier, req.query.pickup, req.query.dropoff, req.query.min)
            .then(response => {
                if (response != null)
                    res.type('json').status(200).send(response);
                else
                    res.type('json').status(200).send({ message: "No result" });
            }).catch(error => {
                res.type('json').status(500).send({ error: error });
            })
    }
})

app.get('/fetchAllSuppliers', (req, res) => {
    if (!req.query.min) {
        res.type('json').status(400).send({ message: "Invalid nb of passangers" })
    } else {
        fetchAllSuppliers(req.query.pickup, req.query.dropoff, req.query.min)
            .then(response => {
                if (response != null)
                    res.type('json').status(200).send(response);
                else
                    res.type('json').status(200).send({ message: "No result" });

            }).catch(error => {
                res.type('json').status(500).send({ error: error });
            })
    }
})

module.exports = server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))