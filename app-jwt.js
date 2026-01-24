// const express = require('express');
// const jwt = require('jsonwebtoken');
// const app = express();
// const port = 3002; // Different port to avoid conflict

// const SECRET_KEY = 'your-secret-key'; // In production, use environment variable

// app.use(express.json());

// // Mock user database
// const users = [
//   { id: 1, username: 'user1', password: 'pass1' },
//   { id: 2, username: 'user2', password: 'pass2' }
// ];

// // Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

//   if (!token) {
//     return res.status(401).json({ message: 'Access token required' });
//   }

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid or expired token' });
//     }
//     req.user = user;
//     next();
//   });
// };

// // Login route - generates JWT token
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Validate input
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password required' });
//   }

//   // Find user
//   const user = users.find(u => u.username === username && u.password === password);
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   // Generate JWT token
//   const token = jwt.sign(
//     { id: user.id, username: user.username },
//     SECRET_KEY,
//     { expiresIn: '1h' }
//   );

//   res.json({
//     message: 'Login successful',
//     token: token,
//     user: { id: user.id, username: user.username }
//   });
// });

// // Protected route - requires valid JWT token
// app.get('/protected', authenticateToken, (req, res) => {
//   res.json({
//     message: `Welcome back, ${req.user.username}!`,
//     user: req.user
//   });
// });

// // Public route
// app.get('/', (req, res) => {
//   res.send('JWT Auth API - Use POST /login to get token, then GET /protected with Authorization: Bearer <token>');
// });

// // Logout is handled client-side by deleting the token
// app.post('/logout', (req, res) => {
//   res.json({ message: 'Logout successful - delete token on client side' });
// });

// app.listen(port, () => {
//   console.log(`JWT Auth Server running at http://localhost:${port}`);
// });


const express = require('express');
const crypto = require('crypto');

// const jwt = require('jsonwebtoken');
const app = express();
const port = 3002; // Different port to avoid conflict

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post('/signin', (req, res) => {
  const { password, username } = req.body;
  const data ={
    password: password,
    username: username
  }

  if (!password) {
    return res.status(400).send('Password is required');
  }
  const hash = crypto.createHmac('sha256', "wewfwe373994h3g3",data).digest('hex');
  res.send({ message: `Hashed password: ${hash}` });
});


app.get('/protected', (req, res) => {
  const hash =req.body.hash;

  const data ={
    
    username: "Adnan",
    password: "12345"
  }

  const verifyHash = crypto.createHmac('sha256', "wewfwe373994h3g3",data).digest('hex');

  if (hash === verifyHash) {
    res.send(`Welcome back, Adnan!`);
  } else { 
    res.status(401).send('Please log in first.'); 
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});