const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3003; // Different port

const SECRET_KEY = 'your-secret-key'; // Use environment variable in production

app.use(express.json());

// Mock user for demonstration
const mockUser = {
  id: 1,
  username: 'Adnan',
  password: '12345'
};

// POST /signin route
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check credentials (in real app, check against database)
  if (username === mockUser.username && password === mockUser.password) {
    // Create JWT token
    const token = jwt.sign(
      { id: mockUser.id, username: mockUser.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Send token to client
    res.json({
      message: 'Sign in successful',
      token: token,
      user: { id: mockUser.id, username: mockUser.username }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Simple route to test
app.get('/', (req, res) => {
  res.send('JWT Auth Server - POST /signin to get token');
});

app.listen(port, () => {
  console.log(`JWT Auth server running on http://localhost:${port}`);
});
