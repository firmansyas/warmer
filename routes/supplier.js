'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', function(req, res) {
    let supplier = `SELECT * FROM supplier`
    db.query(supplier, function (err, supplier) {
      if (err){
        console.log(err);
      }
      res.render('supplier/supplier', {
        title: "Data Supplier",
        page: "supplier",
        supplier: supplier.rows,
        user:req.session.user
      });
    });
  });

  //---------------------------------------------------------------//
  router.get('/add', function(req, res) {
    let query = `SELECT * FROM users`
    db.query(query, function (err, userData) {
      res.render('supplier/add', {
        title: "Tambah Data Supplier",
        page: "supplier",
        userData: userData.rows,
        user:req.session.user
      });
    });
  });

  //---------------------------------------------------------------//
  router.post('/add', userChecker, function (req, res) {
    let addData = `INSERT INTO supplier (kosup, nasup, npj, alamat, asalnegara, email, cp)
    VALUES ('${req.body.kosup}', '${req.body.nasup}', '${req.body.npj}',
    '${req.body.alamat}', '${req.body.asalnegara}',
    '${req.body.email}', '${req.body.cp}')`

    db.query(addData, function (err, addData) {
      if (err){
        console.log(err);
      }
      res.redirect('/supplier')
    })
  })

  //---------------------------------------------------------------//

  router.get('/edit', function(req, res, next) {
    let userData = `SELECT * FROM users`
    db.query(userData, function (err, userData) {
      if (err){
        console.log(err);
      }
      let m_barangData = `SELECT * FROM mbarang WHERE mbarangid = ${req.params.id}`
      db.query(m_barangData, function (err, m_barangData) {
        if(err){
          console.log(err);
        }
        let supplierData = `SELECT * FROM supplier`
        db.query(supplierData, function (err, supplierData) {
          console.log('data supel', supplierData);
          res.render('m_barang/edit', {
            title: "Edit Data Merk Barang",
            page: "m_barang",
            query: req.query,
            idURL: req.params.id,
            supplierData: supplierData.rows[0],
            m_barangData: m_barangData.rows[0],
            userData: userData.rows,
            user:req.session.user
          });
        });
      });
    });
  })
  return router;
};
