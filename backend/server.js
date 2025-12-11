const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// --- PROJECTS ---
app.get('/api/projects', (req, res) => {
    db.query('SELECT * FROM projects ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
app.post('/api/projects', (req, res) => {
    const { title, category, img, description } = req.body;
    db.query('INSERT INTO projects (title, category, img, description) VALUES (?, ?, ?, ?)', 
    [title, category, img, description], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});
app.delete('/api/projects/:id', (req, res) => {
    db.query('DELETE FROM projects WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- COLLECTIONS ---
app.get('/api/collections', (req, res) => {
    db.query('SELECT * FROM collections ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
app.post('/api/collections', (req, res) => {
    const { name, img, description } = req.body;
    db.query('INSERT INTO collections (name, img, description) VALUES (?, ?, ?)', 
    [name, img, description], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});
app.delete('/api/collections/:id', (req, res) => {
    db.query('DELETE FROM collections WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- NEWS ---
app.get('/api/news', (req, res) => {
    db.query('SELECT * FROM news ORDER BY date DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
app.post('/api/news', (req, res) => {
    const { title, date, summary, img } = req.body;
    db.query('INSERT INTO news (title, date, summary, img) VALUES (?, ?, ?, ?)', 
    [title, date, summary, img], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});
app.delete('/api/news/:id', (req, res) => {
    db.query('DELETE FROM news WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- VIDEOS ---
app.get('/api/videos', (req, res) => {
    db.query('SELECT * FROM videos ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
app.post('/api/videos', (req, res) => {
    const { title, thumbnail, video_url } = req.body;
    db.query('INSERT INTO videos (title, thumbnail, video_url) VALUES (?, ?, ?)', 
    [title, thumbnail, video_url], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});
app.delete('/api/videos/:id', (req, res) => {
    db.query('DELETE FROM videos WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- MENU ---
app.get('/api/menu', (req, res) => {
    // Map snake_case DB columns to camelCase API response
    db.query('SELECT id, label, sub_label as subLabel, path, sort_order as `order` FROM menu_items ORDER BY sort_order ASC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
app.post('/api/menu', (req, res) => {
    const { label, subLabel, path, order } = req.body;
    db.query('INSERT INTO menu_items (label, sub_label, path, sort_order) VALUES (?, ?, ?, ?)', 
    [label, subLabel, path, order], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});
app.put('/api/menu/:id', (req, res) => {
    const { label, subLabel, path, order } = req.body;
    db.query('UPDATE menu_items SET label=?, sub_label=?, path=?, sort_order=? WHERE id=?', 
    [label, subLabel, path, order, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});
app.delete('/api/menu/:id', (req, res) => {
    db.query('DELETE FROM menu_items WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- ABOUT ---
app.get('/api/about', (req, res) => {
    db.query('SELECT * FROM about_info WHERE id = 1', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0] || {});
    });
});
app.put('/api/about', (req, res) => {
    const { title, description, img } = req.body;
    db.query('UPDATE about_info SET title=?, description=?, img=? WHERE id=1', 
    [title, description, img], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- CONTACT ---
app.get('/api/contact', (req, res) => {
    db.query('SELECT * FROM contact_info WHERE id = 1', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0] || {});
    });
});
app.put('/api/contact', (req, res) => {
    const { address, hotline, email, map_img } = req.body;
    db.query('UPDATE contact_info SET address=?, hotline=?, email=?, map_img=? WHERE id=1', 
    [address, hotline, email, map_img], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
