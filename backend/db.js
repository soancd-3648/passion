const mysql = require('mysql2');

// Thay đổi thông tin kết nối của bạn ở đây
const connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,        // MAMP MySQL port (thật sự là 8889, không phải 8888)
  user: 'root',      // Tên đăng nhập MySQL của bạn
  password: 'root',  // MAMP default password là 'root'
  database: 'passion_interiors'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

const getAdminByUsername = (username, callback) => {
  connection.query('SELECT * FROM admins WHERE username = ?', [username], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Export connection.query as db.query for compatibility
module.exports = { 
  connection, 
  getAdminByUsername,
  query: connection.query.bind(connection)  // Bind để giữ đúng context
};
