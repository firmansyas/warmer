'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')
const moment = require('moment')

module.exports = function(db) {
  router.get('/', userChecker, function(req, res, next) {
    let barangData = `SELECT barangid, kobarang, nomorizin, nambar, supplierid, nasup, barang.asalnegara, kbarangid, nakabar, mbarangid, mbarang.
    namebarang, spk, hbeli, stockawal, currentstock FROM barang, supplier, kbarang, mbarang
    WHERE supplier.supplierid = barang.supplier AND mbarang.mbarangid = barang.mbarang AND kbarang.kbarangid = barang.kbarang`

    db.query(barangData, function (err, barangData) {
      db.query (`select * from users where userid = ${req.session.user.userid}`, (err, data) => {
        if (err){
          console.log(err);
        }
        console.log('data barang', barangData);
        res.render('barang/barang', {
          title: "Data Barang",
          page: "barang",
          item: data.rows[0],
          barangData: barangData.rows,
          user:req.session.user
        })
      });
    });
  });

  //---------------------------------------------------------------//
  router.get('/add', userChecker, function(req, res) {

    let supplierData = `SELECT supplierid, nasup FROM supplier ORDER BY supplierid`
    let m_barangData = `SELECT mbarangid, namebarang, asalnegara FROM mbarang ORDER BY mbarangid`
    let k_barangData = `SELECT kbarangid, nakabar FROM kbarang ORDER BY kbarangid`
    db.query (`select * from users where userid = ${req.session.user.userid}`, (err, data) => {
      db.query(supplierData, function (err, supplierData) {
        db.query(m_barangData, function (err, m_barangData) {
          db.query(k_barangData, function (err, k_barangData) {
            // console.log('data supplierData', supplierData);
            // console.log('data m_barangData', m_barangData);
            // console.log('data k_barangData', k_barangData);
            res.render('barang/add', {
              title: "Tambah Data Barang",
              page: "barang",
              item: data.rows[0],
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
    let addBarang= `INSERT INTO barang(supplier, kobarang, nomorizin, nambar, asalnegara, spk, hbeli, stockawal, kbarang, mbarang)
    VALUES ('${req.body.supplier}', '${req.body.kobarang}', '${req.body.nomorizin}',
    '${req.body.nambar}', '${req.body.asalnegara}', '${req.body.spk}', '${req.body.hbeli}',
    '${req.body.stockawal}', '${req.body.kbarang}', '${req.body.mbarang}')`

    db.query(addBarang, function (err, addBarang) {
      if (err){
        console.log(err);
      }
      res.redirect('/barang')
    })
  })

  //---------------------------------------------------------------//
  router.get('/edit/:id', userChecker, function(req, res) {

    let barangData = `SELECT * FROM barang WHERE barangid = '${req.params.id}'`;
    let supplierData = `SELECT supplierid, nasup FROM supplier`;
    let k_barangData = `SELECT kbarangid, nakabar FROM kbarang`;
    let m_barangData = `SELECT mbarangid, namebarang FROM mbarang`;
    db.query (`select * from users where userid = ${req.session.user.userid}`, (err, data) => {
      db.query(barangData, function (err, barangData) {
        db.query(supplierData, function (err, supplierData) {
          db.query(k_barangData, function (err, k_barangData) {
            db.query(m_barangData, function (err, m_barangData) {
              console.log('data barang', barangData);
              res.render('barang/edit', {
                title: "Edit Data Barang",
                page: "barang",
                idURL: req.params.id,
                item: data.rows[0],
                barangData: barangData.rows[0],
                supplierData: supplierData.rows,
                k_barangData: k_barangData.rows,
                m_barangData: m_barangData.rows,
                user:req.session.user
              });
            });
          });
        });
      });
    });
  });

  //---------------------------------------------------------------//
  router.post('/edit/:id', userChecker, function(req, res) {
    let editBarang = `UPDATE barang SET supplier =${req.body.supplier}, kobarang ='${req.body.kobarang}',
    nomorizin = '${req.body.nomorizin}', nambar = '${req.body.nambar}', asalnegara='${req.body.asalnegara}',
    spk ='${req.body.spk}', hbeli = '${req.body.hbeli}', kbarang = '${req.body.kbarang}', mbarang='${req.body.mbarang}' WHERE barangid = ${req.params.id}`
    db.query(editBarang, function(err, editBarang) {
      if(err){
        console.log(err);
      }
      console.log('edit', editBarang);
      res.redirect('/barang')
    });
  })


  //---------------------------------------------------------------//
  router.get('/details/:id', userChecker, function(req, res, next) {
    let namaBarang = `SELECT nambar FROM barang WHERE barangid = '${req.params.id}'`
    db.query (`select * from users where userid = ${req.session.user.userid}`, (err, data) => {
      db.query(namaBarang, function (err, namaBarang) {
        if (err) {
          console.log(err);
        }
        console.log('barang', namaBarang);
        res.render('barang/details', {
          title: "Details Data Barang",
          page: "barang",
          item: data.rows[0],
          idURL: req.params.id,
          namaBarang: namaBarang.rows[0],
          user:req.session.user
        })
      })
    });
  });

  return router
};
