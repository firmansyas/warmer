'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', function(req, res, next) {

    res.render('m_barang/m_barang', {title: "Data Merk Barang", page: "m_barang", user:req.session.user} );
  });
  return router;
}
