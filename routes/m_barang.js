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
    db.query(query, function (err, userData) {
      res.render('m_barang/add', {
        title: "Tambah Data Merk Barang",
        page: "m_barang",
        userData: userData.rows,
        user:req.session.user
      });
    });
  });

  //---------------------------------------------------------------//
  router.post('/add', userChecker, function (req, res) {
    let addData = `INSERT INTO mbarang (kombarang, namebarang, asalnegara)
    VALUES ('${req.body.kombarang}', '${req.body.namebarang}',
    '${req.body.asalnegara}')`

    db.query(addData, function (err, addData) {
      if (err){
        console.log(err);
      }
      res.redirect('/m_barang')
    })
  })



  //---------------------------------------------------------------//
  router.get('/edit/:id', userChecker, function(req, res, next) {
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
        res.render('m_barang/edit', {
          title: "Edit Data Merk Barang",
          page: "m_barang",
          query: req.query,
          idURL: req.params.id,
          userData: userData.rows,
          m_barangData: m_barangData.rows[0],
          user:req.session.user
        });
      });
    });
  });

  //---------------------------------------------------------------//
  router.post('/edit/:id', userChecker, function (req, res) {
    let editM_barang = `UPDATE mbarang SET kombarang = '${req.body.kombarang}',
    namebarang = '${req.body.namebarang}', asalnegara = '${req.body.asalnegara}' WHERE mbarangid = ${req.params.id}`;
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
