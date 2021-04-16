'use strict';
var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req, res) {
    response.ok("Aplikasi Berjalan", res)
}; 

exports.tampilsemuamahasiswa = function(req, res) {
    connection.query("SELECT * FROM mahasiswa", function(error, rows, fields) {
        if (error) {
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};

exports.tampilberdasarkanid = function(req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id], function(error, rows, field) {
        if (error) {
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};

//menambah data
exports.tambahMahasiswa = function (req, res) {

    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    
    // var data = {
    //     nim : req.body.
    // }

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
        [nim, nama, jurusan],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan Data!", res)
            }
        });
};

//Mengubah data
exports.ubahMahasiswa = function(req, res) {
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? where id_mahasiswa=?', [nim, nama, jurusan, id],
    function(error, rows, fields){
        if (error) {
            console.log(error);
        }else{
            response.ok("Berhasil Update Data", res);
        }
    });
}

//Hapus Mahasiwa
exports.deleteMahasiswa = function(req, res){
    var id = req.body.id_mahasiswa;

    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?', [id],
    function(error, rows, fields){
        if (error) {
            console.log(error);
        }else{
            response.ok("Berhasil Delete Data", res);
        }
    });
}

//menampilkan matakulah
exports.tampilgroupmatakuliah = function (req, res) {
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks from krs join matakuliah, mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah and krs.id_mahasiswa = mahasiswa.id_mahasiswa ', function (error, rows, fields) {
        if (error) {
            console.log(error);
        }else{
            response.oknested(rows, res)
        }
    })
}