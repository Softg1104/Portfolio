const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let names = [];
let tasks = [];

app.get('/', (req, res) => {
    res.render('index', { names, tasks, error: null });
});

app.get('/greet', (req, res) => {
    const { name } = req.query;
    if (name) {
        names.push(name);
        res.redirect('/');
    } else {
        res.render('index', { names, tasks, error: 'Please provide a name.' });
    }
});

app.get('/greet/:name', (req, res) => {
    const { name } = req.params;
    if (names.includes(name)) {
        res.render('wazzup', { name });
    } else {
        res.render('index', { names, tasks, error: 'Name not found in the list.' });
    }
});

app.put('/greet/:name', (req, res) => {
    const { name } = req.params;
    if (!names.includes(name)) {
        names.push(name);
    }
    res.json({ names });
});

app.post('/task', (req, res) => {
    const { task } = req.body;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/');
});

app.get('/task', (req, res) => {
    res.json({ tasks });
});

app.delete('/task/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((_, index) => index !== parseInt(id, 10));
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
