const PORT = process.env.PORT || 5000
const express = require('express');
const fs = require('fs');

let app = express();

app.get('/getTime', (req, res) => {
    res.send(new Date);
});

app.get('/getFile/:filename',(req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let filename = req.params.filename || "test.txt";
    // fs.readFile(filename,(err, content) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     res.write(content);
    //     res.end();
    // });
    // let fileToRead = req.params.filename || "showMyName.txt";
    const src = fs.createReadStream(filename);
    src.on('error', handler);
    src.pipe(res);
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});

const handler = err => console.error(err);
