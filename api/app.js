const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.send('Hello World!');
});

const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
