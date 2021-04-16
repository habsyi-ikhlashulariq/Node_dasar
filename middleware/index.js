var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi'); 

//Daftar data
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//alamat auth
router.get('/api/v1/rahasia', verifikasi(), auth.halamanrahasia);

module.exports = router;