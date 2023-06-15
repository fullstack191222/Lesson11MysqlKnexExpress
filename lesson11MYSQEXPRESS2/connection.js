const mysql2 = require('mysql2')
//the parameters need to change accoridng to your mysql
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin1234',
    database: "test"
});

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : 'admin1234',
      database : 'test'
    }
  });


  module.exports = {
    connection,
    knex
  }