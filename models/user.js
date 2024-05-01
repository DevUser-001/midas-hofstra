const mysql = require('mysql2/promise');

const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  agreedToTos BOOLEAN DEFAULT false
)`;

async function createUsersTable(connection) {
  try {
    // Execute the SQL query to create the table if it does not exist
    const [rows, fields] = await connection.query(createUserTableQuery);
    
    if (rows.warningStatus === 0) {
      console.log('Users table created successfully');
    } else {
      console.log('Users table already exists');
    }
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
}

module.exports = {
  createUsersTable
};
