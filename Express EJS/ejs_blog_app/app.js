// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware Setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// In-memory user and posts data for simplicity
let currentUser = '';
let posts = [];

// Routes
// Root - Return the static index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Login - Accept GET or POST for different security levels
app.route('/login')
  .get((req, res) => {
    currentUser = req.query.name;
    res.render('test', { name: currentUser, method: 'GET' });
  })
  .post((req, res) => {
    currentUser = req.body.name;
    res.render('test', { name: currentUser, method: 'POST' });
  });

// Home - Display blog posts if user is logged in
app.get('/home', (req, res) => {
  if (!currentUser) {
    return res.redirect('/');
  }
  res.render('home', { name: currentUser, posts });
});

// New Post - Handle form submission for new blog posts
app.post('/new-post', (req, res) => {
  if (!currentUser) {
    return res.redirect('/');
  }
  const { title, content } = req.body;
  posts.push({ id: posts.length + 1, title, content });
  res.redirect('/home');
});

// Post Detail - View, edit, or delete a post
app.get('/post/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  res.render('post', { post });
});

app.post('/post/:id/edit', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    post.content = req.body.content;
  }
  res.redirect('/home');
});

app.post('/post/:id/delete', (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/home');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
