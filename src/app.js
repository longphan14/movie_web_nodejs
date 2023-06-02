const express = require('express');
const mongoose = require('mongoose');
const customer = require('./models/customer');
const Customer = require('./models/customer');
const app = express();
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;






app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.get('/api/customers/:id/', async (req, res) => {
    console.log({
        requestParams: req.params,
        requestQuery: req.query
    });
    try {
        const { id: customerID } = req.params;
        console.log(customerID);
        const cus = await Customer.findById(customerID);
        console.log(cus);
        if (!cus) {
            res.status(404).json({ error: "User not Found!" });
        }
        else {
            res.json({ cus });
        }
    } catch (e){
        res.status(500).json({ error: 'Error' });
    }
});

app.get('/api/customers', async (req, res) => {
    //console.log(await mongoose.connection.db.listCollections().toArray());
    try {
        const result = await Customer.find();
        res.json({ "Data:": result });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/', (req, res) => {
    res.send('This is a post request');
});

app.post('/api/customers', async (req, res) => {
    console.log(req.body);
    const customer = new Customer(req.body);
    try {
        await customer.save();
        res.status(201).json({customer: customer});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
})


const start = async () => {
    try {
        await mongoose.connect(CONNECTION);

            app.listen(PORT, () => {
                console.log('App listening on PORT ' + PORT);
            });
    }
    catch(error) {
        console.log(error.message);
    }
}

start();