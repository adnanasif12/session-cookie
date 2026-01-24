const express = require('express');
const app = express();
const port = 3000;  

const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(express.json());
const sessionstorage = {};


// app.get('/set-cookie', (req, res) => {
//   res.cookie('name', 'Adnan', {httpOnly: true });
//   res.send('Cookie has been set!');
// });


// app.get('/check-cookie', (req, res) => {
//   const myCookie = req.cookies.name; 
//   if (myCookie==='Adnan') {
//     res.send(`Cookie value: ${myCookie}`);
//   } else {
//     res.send('No cookie found.');
//   }
// });

// app.post('/login', (req, res) => {
//   // ✅ req.body আছে কি না, আর তার মধ্যে name আছে কি না – আগে চেক
//   if (!req.body || !req.body.name) {
//     return res.status(400).send('name field is required');
//   }

//   const { name } = req.body;
//   res.cookie('name', name, {
//     maxAge: 900000,
//     httpOnly: true
//   });
//   sessionstorage[name] = true; // Simulate session storage  
//   res.send('Logged in and cookie set!');
// });


// app.get('/protected', (req, res) => {
//   const { name } = req.cookies;
//   if (sessionstorage[name] && sessionstorage[name] === true) {
//     res.send(`Welcome back, ${name}!`);
//   } else { 
//     res.status(401).send('Please log in first.');
//   }
// });




app.use(session({
  secret: 'Adnan',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));


// Login route
app.post('/login', (req, res) => {
  const { username} = req.body;

  // Validate input
  if (!username) {
    return res.status(400).json({ message: 'Username required' });
  }

  req.session.username = username;
  req.session.isAuthenticated = true;

    res.send('Login successful');
  }); 

// Protected route
app.get('/protected', (req, res) => {
  if (req.session.isAuthenticated) {
    return res.status(200).json({ 
      message: `Welcome back, ${req.session.username}!`,
      user: req.session.username
    });
  } else {
    return res.status(401).json({ message: 'Please log in first.' });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Auth API!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 