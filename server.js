const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./js/routes')



app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/file', express.static(__dirname + '/file'));
app.use('/OwlCarousel', express.static(__dirname + '/OwlCarousel'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


app.use(router)




app.listen(8080, () => console.log('Server started on port 8080'));
