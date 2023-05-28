const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;
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

app.get('/', (req, res) => {
    res.send("Hello World");
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

app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});