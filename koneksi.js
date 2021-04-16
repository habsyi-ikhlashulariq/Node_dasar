var mysql = require('mysql');

const conn = mysql.createConnection({
    host:"localhost",
    user : "root",
    pass : "",
    database: "restapidb"
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('Mysql Terkoneksi');
});

module.exports = conn;