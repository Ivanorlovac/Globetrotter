const mysql2 = require('mysql2');

function deleteTestUser(username) {
  const connection = mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Dunder123!1',
      database: 'Globetrotter'
  });

  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM Users WHERE username = ?';
    connection.query(sql, [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
      connection.end();
    });
  });
}

module.exports = { deleteTestUser };
