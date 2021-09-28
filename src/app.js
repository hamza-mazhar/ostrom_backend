const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use(require('./routes/students'))

app.use('/', indexRouter);
app.get('*', function (req, res) {
  // res.status(404).json({
  //   error: { message: 'No Route Found' }
  // })
  res.json({
    message: { message: 'No Route Found' },
    error: { message: 'No Route Found' }
  });
});

module.exports = app;
