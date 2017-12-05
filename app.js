"use strict"
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');


//connecting to database
const { Client } = require('pg')

const client = new Client({
  user: 'firmansyah',
  host: '127.0.0.1',
  database: 'warmer',
  password: '123456',
  port: 5432
})
//
// const client = new Client({
//   user: 'ycuwshadjszecl',
//   host: 'ec2-50-16-204-127.compute-1.amazonaws.com',
//   database: 'dcvda8poqnc3mo',
//   password: '8ccf7f701590712840eebd66f40383b2c3ff829f308a724eae6b226cdf58d9ac',
//   port: 5432
// })

client.connect()

//connecting to the routes
var index = require("./routes/index") (client); //Passing arguments to require (when loading module)
var users = require("./routes/users") (client);
var setting = require("./routes/setting") (client);
var customers = require("./routes/customers") (client);
var barang = require("./routes/barang") (client);
var m_barang = require("./routes/m_barang") (client);
var k_barang = require("./routes/k_barang") (client);
var supplier = require("./routes/supplier") (client);
var t_penjualan = require("./routes/t_penjualan") (client);
var t_pembelian = require("./routes/t_pembelian") (client);
var calendar = require("./routes/calendar") (client);


var app = express();
app.use(helmet())
app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'firmansyah',
  resave: false,
  saveUninitialized: false
}))

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.use(helmet.noCache())
app.use(helmet.frameguard())

app.use(helmet({
  frameguard: {
    action: 'deny'
  }
}))

app.use('/', index);
app.use('/users', users);
app.use('/setting', setting);
app.use('/customers', customers);
app.use('/barang', barang);
app.use('/m_barang', m_barang);
app.use('/k_barang', k_barang);
app.use('/supplier', supplier);
app.use('/t_penjualan', t_penjualan);
app.use('/t_pembelian', t_pembelian);
app.use('/calendar', calendar);




app.use(function(req, res, next) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.header("Pragma", "no-cache"); // HTTP 1.0.
  res.header("Expires", "-1"); // Proxies.
  next();
});

app.use("/", index);
app.use("/users", users);
app.use("/setting", setting);
app.use('/customers', customers);
app.use("/barang", barang);
app.use("/k_barang", k_barang);
app.use("/supplier", supplier);
app.use("/t_penjualan", t_penjualan);
app.use("/t_pembelian", t_pembelian);
app.use("/calendar", calendar);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
