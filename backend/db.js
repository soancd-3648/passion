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

const getAdminByUsername = (username, callback) => {
  connection.query('SELECT * FROM admins WHERE username = ?', [username], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

module.exports = { connection, getAdminByUsername };
