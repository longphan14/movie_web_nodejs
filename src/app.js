const express = require('express');
const mongoose = require('mongoose');
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

const json = {
    "menu": {
        "id": "file",
        "value": "File",
        "popup": {
            "menuitem": [
                { "value": "New", "onclick": "CreateNewDoc()" },
                { "value": "Open", "onclick": "OpenDoc()" },
                { "value": "Close", "onclick": "CloseDoc()" }
            ]
        }
    }
}

const customer = new Customer({
    name: 'Long',
    industry: 'backend developers'
});


app.get('/', (req, res) => {
    res.send(customer);
});

app.get('/nextpage', (req, res) => {
    res.send({"Data:": json.menu.popup.menuitem});
});

app.post('/', (req, res) => {
    res.send('This is a post request');
});

app.post('/nextpage', (req, res) => {
    console.log(req.body);
    res.send(req.body);
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