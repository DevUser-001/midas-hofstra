const mysql = require('mysql2/promise');

const createVolumesTableQuery = `
CREATE TABLE IF NOT EXISTS volumes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ean VARCHAR(255) NOT NULL,
  sku VARCHAR(255) NOT NULL,
  volume VARCHAR(255) NOT NULL,
  bolMax DECIMAL(10, 2),
  bolMin DECIMAL(10, 2),
  bolPrice DECIMAL(10, 2),
  purchasePrice DECIMAL(10, 2),
  storePrice DECIMAL(10, 2),
  storePrice DECIMAL(10, 2),
  offers JSON,
  price_history JSON,
  stock INT NOT NULL,
  inStock BOOLEAN NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
)`;

async function createVolumesTable(connection) {
  try {
    // Execute the SQL query to create the table if it does not exist
    const [rows, fields] = await connection.query(createVolumesTableQuery);

    if (rows.warningStatus === 0) {
      console.log('Volumes table created successfully');
    } else {
      console.log('Volumes table already exists');
    }
  } catch (error) {
    console.error('Error creating volumes table:', error);
    throw error;
  }
}

module.exports = {
  createVolumesTable
};
