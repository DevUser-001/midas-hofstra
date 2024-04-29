async function createUsersTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        agreedToTos ENUM('yes', 'no') NOT NULL,
        agreedToTosDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        accountCreationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        accountAuthorizedByAdmin BOOLEAN DEFAULT FALSE
      )
    `;

    await connection.query(query);
    console.log('Users table created successfully.');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
}

// Create the users table
createUsersTable();
