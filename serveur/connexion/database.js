var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'react-node-compo'
});
 
connection.connect();

module.exports=connection