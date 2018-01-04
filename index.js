const PORT = process.env.PORT || 5000
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());


app.get('/getFile/:filename',(req, res) => {
    let filename = req.params.filename || "test.txt";
    const src = fs.createReadStream(filename);
    src.on('error', handler);
    src.pipe(res);
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});

const handler = err => console.error(err);
