const bcrypt = require('bcrypt');
const db = require('./db');

async function createAdmin() {
    const username = 'admin';
    const password = 'admin123'; // Đổi password này
    
    try {
        // Tạo bảng admins nếu chưa có
        await new Promise((resolve, reject) => {
            db.connection.query(`
                CREATE TABLE IF NOT EXISTS admins (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Tạo admin user
        await new Promise((resolve, reject) => {
            db.connection.query(
                'INSERT INTO admins (username, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE password = ?',
                [username, passwordHash, passwordHash],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });

        console.log('✅ Admin user created successfully!');
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Login URL: http://localhost:3000/#/login');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();
