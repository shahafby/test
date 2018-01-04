const PORT = process.env.PORT || 5000
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.set('port', (PORT));

app.get('/getTime', (req, res) => {
	let time = calcTime();
	res.send(`The time now is: ${time}`);
});

app.get('/getFile/:filename',(req, res) => {
    let filename = req.params.filename || "test.txt";
    const src = fs.createReadStream(filename);
    src.on('error', handler);
    src.pipe(res);
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});

let calcTime = () => {
	let date = new Date(),
	hours = (date.getHours() < 10 ? '0' : '') + date.getHours(),
	minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	
	return  (hours + ':' + minutes);
}

const handler = err => console.error(err);