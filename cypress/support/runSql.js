const mysql2 = require('mysql2');

function deleteTestUser(username) {

  console.log("KÖRS DENNA ENS?")

  const connection = mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Dunder123!1',
      database: 'Globetrotter'
  });

  connection.connect();

  let row;
  const sql = 'DELETE FROM Users WHERE username = ?';
  connection.query(sql, [username], (error, results) => {
    console.log("Log: ", results)

    if (error) throw error;
    row = results.affectedRows
  });

  connection.end();
  return row;

}

module.exports = {deleteTestUser};
