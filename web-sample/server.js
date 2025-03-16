const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure users.json exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Get all users
app.get('/api/users', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE);
        const users = JSON.parse(data);
        res.json(users);
    } catch (error) {
        console.error('Error reading users:', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

// Add a new user
app.post('/api/users', (req, res) => {
    try {
        const { name, email, country } = req.body;
        
        // Basic validation
        if (!name || !email || !country) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Read existing users
        const data = fs.readFileSync(DATA_FILE);
        const users = JSON.parse(data);
        
        // Add new user
        const newUser = { name, email, country };
        users.push(newUser);
        
        // Save to file
        fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
        
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
