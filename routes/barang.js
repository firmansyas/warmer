'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')
const moment = require('moment')

module.exports = function(db) {
  router.get('/', function(req, res, next) {
    let barangData = `SELECT barangid, kobarang, nomorizin, nambar, supplierid, nasup, barang.asalnegara, kbarangid, nakabar, mbarangid, mbarang.
    namebarang, spk, hbeli, stockawal, currentstock FROM barang, supplier, kbarang, mbarang
    WHERE supplier.supplierid = barang.supplier AND mbarang.mbarangid = barang.mbarang AND kbarang.kbarangid = barang.kbarang`

    db.query(barangData, function (err, barangData) {
      if (err){
        console.log(err);
      }
      console.log('data barang', barangData);
      res.render('barang/barang', {
        title: "Data Barang",
        page: "barang",
        barangData: barangData.rows,
        user:req.session.user
      });
    });
  });

  //---------------------------------------------------------------//
  router.get('/add', userChecker, function(req, res) {
    let userData = `SELECT * FROM users`
    let supplierData = `SELECT supplierid, nasup FROM supplier ORDER BY supplierid`
    let m_barangData = `SELECT mbarangid, namebarang FROM mbarang ORDER BY mbarangid`
    let k_barangData = `SELECT kbarangid, nakabar FROM kbarang ORDER BY kbarangid`
    db.query(userData, function (err, userData) {
      db.query(supplierData, function (err, supplierData) {
        db.query(m_barangData, function (err, m_barangData) {
          db.query(k_barangData, function (err, k_barangData) {
            // console.log('data supplierData', supplierData);
            // console.log('data m_barangData', m_barangData);
            // console.log('data k_barangData', k_barangData);
            res.render('barang/add', {
              title: "Tambah Data Barang",
              page: "barang",
              userData: userData.rows,
              supplierData: supplierData.rows,
              m_barangData: m_barangData.rows,
              k_barangData: k_barangData.rows,
              user:req.session.user
            })
          })
        });
      });
    });
  });

  //---------------------------------------------------------------//

  router.post('/add', userChecker, function(req, res) {
    let addBarang= `INSERT INTO barang (supplier, kobarang, nomorizin, nambar, asalnegara, spk, hbeli, stockawal, kbarang, mbarang)
    VALUES ('${req.body.supplier}', '${req.body.kobarang}', '${req.body.nomorizin}',
    '${req.body.nambar}', '${req.body.asalnegara}', '${req.body.spk}', '${req.body.hbeli}',
    '${req.body.stockawal}', '${req.body.kbarang}', '${req.body.mbarang}')`

    db.query(addBarang, function (err, addBarang) {
      if (err){
        console.log(err);
        res.redirect('/barang')
      }
    })
  })

  //---------------------------------------------------------------//
  router.get('/edit', function(req, res, next) {

    res.render('barang/edit', {title: "Edit Data Barang", page: "barang", user:req.session.user} );
  });

  router.get('/details', function(req, res, next) {

    res.render('barang/details', {title: "Details Data Barang", page: "barang", user:req.session.user} );
  });

  return router
};
