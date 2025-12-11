const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_super_secret_key'; // Replace with a strong secret

app.use(cors());
app.use(bodyParser.json());

// --- AUTHENTICATION ---

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM admins WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const admin = results[0];
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
};


// --- PROJECTS (Protected) ---
app.get('/api/projects', (req, res) => {
    db.query('SELECT * FROM projects ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
app.post('/api/projects', verifyToken, (req, res) => {
    const { title, category, img, description } = req.body;
    db.query('INSERT INTO projects (title, category, img, description) VALUES (?, ?, ?, ?)', 
    [title, category, img, description], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});
app.put('/api/projects/:id', verifyToken, (req, res) => {
    const { title, category, img, description } = req.body;
    db.query('UPDATE projects SET title = ?, category = ?, img = ?, description = ? WHERE id = ?',
    [title, category, img, description, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, ...req.body });
    });
});
app.delete('/api/projects/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM projects WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- COLLECTIONS (Protected) ---
app.get('/api/collections', (req, res) => {
    db.query('SELECT * FROM collections ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
app.post('/api/collections', verifyToken, (req, res) => {
    const { name, img, description } = req.body;
    db.query('INSERT INTO collections (name, img, description) VALUES (?, ?, ?)', 
    [name, img, description], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});
app.put('/api/collections/:id', verifyToken, (req, res) => {
    const { name, img, description } = req.body;
    db.query('UPDATE collections SET name = ?, img = ?, description = ? WHERE id = ?',
    [name, img, description, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, ...req.body });
    });
});
app.delete('/api/collections/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM collections WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- NEWS (Protected) ---
app.get('/api/news', (req, res) => {
    db.query('SELECT * FROM news ORDER BY date DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
app.post('/api/news', verifyToken, (req, res) => {
    const { title, date, summary, img } = req.body;
    db.query('INSERT INTO news (title, date, summary, img) VALUES (?, ?, ?, ?)', 
    [title, date, summary, img], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});
app.put('/api/news/:id', verifyToken, (req, res) => {
    const { title, date, summary, img } = req.body;
    db.query('UPDATE news SET title = ?, date = ?, summary = ?, img = ? WHERE id = ?',
    [title, date, summary, img, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, ...req.body });
    });
});
app.delete('/api/news/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM news WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- VIDEOS (Protected) ---
app.get('/api/videos', (req, res) => {
    db.query('SELECT * FROM videos ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
app.post('/api/videos', verifyToken, (req, res) => {
    const { title, thumbnail, video_url } = req.body;
    db.query('INSERT INTO videos (title, thumbnail, video_url) VALUES (?, ?, ?)', 
    [title, thumbnail, video_url], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});
app.put('/api/videos/:id', verifyToken, (req, res) => {
    const { title, thumbnail, video_url } = req.body;
    db.query('UPDATE videos SET title = ?, thumbnail = ?, video_url = ? WHERE id = ?',
    [title, thumbnail, video_url, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, ...req.body });
    });
});
app.delete('/api/videos/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM videos WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- MENU (Protected) ---
app.get('/api/menu', (req, res) => {
    db.query('SELECT id, label, sub_label as subLabel, path, sort_order as `order` FROM menu_items ORDER BY sort_order ASC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
app.post('/api/menu', verifyToken, (req, res) => {
    const { label, subLabel, path, order } = req.body;
    db.query('INSERT INTO menu_items (label, sub_label, path, sort_order) VALUES (?, ?, ?, ?)', 
    [label, subLabel, path, order], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});
app.put('/api/menu/:id', verifyToken, (req, res) => {
    const { label, subLabel, path, order } = req.body;
    db.query('UPDATE menu_items SET label=?, sub_label=?, path=?, sort_order=? WHERE id=?', 
    [label, subLabel, path, order, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});
app.delete('/api/menu/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM menu_items WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- ABOUT (Protected) ---
app.get('/api/about', (req, res) => {
    db.query('SELECT * FROM about_info WHERE id = 1', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0] || {});
    });
});
app.put('/api/about', verifyToken, (req, res) => {
    const { title, description, img } = req.body;
    db.query('UPDATE about_info SET title=?, description=?, img=? WHERE id=1', 
    [title, description, img], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- CONTACT (Protected) ---
app.get('/api/contact', (req, res) => {
    db.query('SELECT * FROM contact_info WHERE id = 1', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0] || {});
    });
});
app.put('/api/contact', verifyToken, (req, res) => {
    const { address, hotline, email, map_img } = req.body;
    db.query('UPDATE contact_info SET address=?, hotline=?, email=?, map_img=? WHERE id=1', 
    [address, hotline, email, map_img], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});


// Setup endpoint to create admin (run once)
app.get('/setup-admin', async (req, res) => {
    try {
        const username = 'admin';
        const password = 'admin'; // Use a more secure password in production
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error creating admin:', err);
                return res.status(500).json({ message: 'Failed to create admin user.', error: err });
            }
            res.status(201).json({ message: 'Admin user created successfully!', userId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during admin setup.', error });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});