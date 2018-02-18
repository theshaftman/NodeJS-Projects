
const XLSX = require('xlsx');
const formidable = require('formidable');
const PORT = 3000;
const express = require('express');
const app = express();
let html = [
    '<pre>',
    '<form method="POST" enctype="multipart/form-data" action="/">',
    '<input type="file" id="file" name="file"/>',
    '<select name="bookType">',
    '<option value="xlsx">XLSX</option>',
    '</select>',
    '<input type="submit" value="Submit Form">',
    '</form>',
    '</pre>'
].join("\n");


app.get('/', (req, res) => {
    return res.end(html);
});

app.post('/', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let f = files[Object.keys(files)[0]];
        let wb = XLSX.readFile(f.path);
        let json = XLSX.utils.sheet_to_json(wb.Sheets.UploadData);
        console.log(json);

        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
