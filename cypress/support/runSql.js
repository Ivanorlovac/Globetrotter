const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'mypassword',
    database: 'Globetrotter',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function deleteTestUser(username) {
  try {
    const sql = 'DELETE FROM Users WHERE username = ?';
    const [results] = await pool.query(sql, [username]);
    return results;
  } catch (error) {
    console.error('Error in deleteTestUser:', error);
    throw error;
  }
}

async function deleteBuyerBids(username) {
  try {
    const getUserIdSql = 'SELECT id FROM Users WHERE username = ?';
    const [userResults] = await pool.query(getUserIdSql, [username]);
    
    if (userResults.length === 0) {
        console.log("No user found, Skipping deletion of bids.");
        return { message: 'No user found, no bids deleted.' };
    }

    const userId = userResults[0].id;
    const deleteSql = 'DELETE FROM Bids WHERE userId = ?';
    const [deleteResults] = await pool.query(deleteSql, [userId]);
    return deleteResults;
  } catch (error) {
    console.error('Error in deleteBuyerBids:', error);
    throw error;
  }
}


module.exports = { deleteTestUser, deleteBuyerBids };