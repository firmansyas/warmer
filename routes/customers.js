'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')
const moment = require('moment')

module.exports = function(db) {
  router.get('/', function(req, res, next) {
    let customerData = `SELECT * FROM customers`

    db.query(customerData, function (err, customerData) {
      if (err){
        console.log(err);
      }
      res.render('customers/customers', {
        title: "Data Pelanggan",
        page: "customers",
        customerData: customerData.rows,
        user:req.session.user
      });
    })


  });

  //---------------------------------------------------------------//
  router.get('/add', userChecker, function(req, res) {
    db.query("SELECT * FROM users", function(err, userData) {
      res.render('customers/add', {
        title: "Tambah Data Pelanggan",
        page: "customers",
        userData: userData.rows,
        user:req.session.user
      });
    });
  });

  //---------------------------------------------------------------//
  router.post('/add', userChecker, function (req, res) {
    db.query(`INSERT INTO customers(kocus, namap, namcus, npwp, alamat, daerah, kodepos, email, npp, npk)
    VALUES ('${req.body.kocus}', '${req.body.namap}', '${req.body.namcus}', '${req.body.npwp}',
    '${req.body.alamat}', '${req.body.daerah}', '${req.body.kodepos}', '${req.body.email}',
    '${req.body.npp}', '${req.body.npk}')`, function(err, customersAdd) {

      if(err) {
        console.error(err);
      }
      res.redirect('/customers')
    });
  });

  //---------------------------------------------------------------//
  router.get('/edit/:id', userChecker, function(req, res) {
    let userData = `SELECT * FROM users`;
    db.query(userData, function(err, userData) {
      if (err) {
        console.log(err);
      }

      let customerData = `SELECT * FROM customers WHERE customersid = ${req.params.id}`;
      db.query(customerData, function (err, customerData) {
        if (err){
          console.log(err);
        }
        res.render('customers/edit', {
          title: "Edit Data Pelanggan",
          page: "customers",
          query: req.query,
          idURL: req.params.id,
          moment: moment,
          userData: userData.rows,
          customerData: customerData.rows[0],
          user:req.session.user
        })
      });
    });
  });

  //---------------------------------------------------------------//
  router.post('/edit/:id', userChecker, function(req, res) {
    let editCustomers = `UPDATE customers SET kocus = '${req.body.kocus}', namap = '${req.body.namap}', namcus = '${req.body.namcus}',
    npwp = '${req.body.npwp}', alamat ='${req.body.alamat}', daerah = '${req.body.daerah}', kodepos = '${req.body.kodepos}',
    email = '${req.body.email}', npp = '${req.body.npp}', npk = '${req.body.npk}'`

    db.query(editCustomers, function (err, editCustomers) {
      if (err){
        console.log(err);
      }
      res.redirect(`/customer/edit/${req.params.id}`)
    })
  });

  //---------------------------------------------------------------//
  return router;
}
