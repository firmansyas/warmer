'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')
const moment = require('moment')

module.exports = function(db) {
  router.get('/', userChecker, function(req, res) {
    let m_barangData = `SELECT * FROM mbarang`
    db.query(m_barangData, function (err, m_barangData) {
      if (err){
        console.log(err);
      }
      console.log('data barang', m_barangData);
      res.render('m_barang/m_barang', {
        title: "Data Merk Barang",
        page: "m_barang",
        m_barangData: m_barangData.rows,
        user:req.session.user
      });
    })
  });

  //---------------------------------------------------------------//
  router.get('/add', userChecker, function(req, res) {
    let query = `SELECT * FROM users`
    let supplierData = `SELECT * FROM supplier`
    db.query(query, function (err, userData) {
      db.query(supplierData, function (err, supplierData) {
        console.log('datacos', supplierData);
        res.render('m_barang/add', {
          title: "Tambah Data Merk Barang",
          page: "m_barang",
          userData: userData.rows,
          supplierData: supplierData.rows,
          user:req.session.user
        })
      });
    });
  });

  //---------------------------------------------------------------//
  router.post('/add', userChecker, function (req, res) {
    let addData = `INSERT INTO mbarang (kombarang, namebarang, asalnegara, supplier)
    VALUES ('${req.body.kombarang}','${req.body.namebarang}',
    '${req.body.asalnegara}','${req.body.supplier}')`

    db.query(addData, function (err, addData) {
      if (err){
        console.log(err);
      }
      console.log('data masuk', addData);
      res.redirect('/m_barang')
    })
  })



  //---------------------------------------------------------------//
  router.get('/edit/:id', userChecker, function(req, res) {
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
  });

  //---------------------------------------------------------------//
  router.post('/edit/:id', userChecker, function (req, res) {
    let editM_barang = `UPDATE mbarang SET kombarang = '${req.body.kombarang}',
    namebarang = '${req.body.namebarang}', asalnegara = '${req.body.asalnegara}','${req.body.supplier}' WHERE mbarangid = ${req.params.id}`;
    db.query(editM_barang, function (err, editM_barang) {
      if (err) {
        console.log(err);
      }
      res.redirect('/m_barang')
    })
  })

  //---------------------------------------------------------------//
  router.get('/delete/:id', userChecker, function (req, res) {
    let deleteM_barang = `DELETE FROM mbarang WHERE mbarangid = ${req.params.id}`
    db.query(deleteM_barang, function (err) {
      if (err){
        console.log(err);
      }
      res.redirect('/m_barang')
    })
  })

  return router;
}
