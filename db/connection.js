const mysql = require("mysql")
require("../questions.js")


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Gladiator5972!",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId + "\n");
});


module.exports= connection