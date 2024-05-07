const mysql2 = require('mysql2');

function deleteTestUser(username) {
  const connection = mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Dunder123!1',
      database: 'Globetrotter'
  });

  connection.connect();


  const sql = 'DELETE FROM Users WHERE username = ?';
  connection.query(sql, [username], (error, results) => {
    console.log("Log: ", results)
    console.log("ERROR: ", error)
    return true
  });

  connection.end();

}

module.exports = {deleteTestUser};
