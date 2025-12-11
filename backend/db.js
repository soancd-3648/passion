const mysql = require('mysql2');

// Thay đổi thông tin kết nối của bạn ở đây
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Tên đăng nhập MySQL của bạn
  password: '',      // Mật khẩu MySQL của bạn
  database: 'passion_interiors'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
