const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Manager = require('./models/manager');
const Task = require('./models/task');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [];
const SECRET_KEY = 'your_secret_key';

mongoose.connect('mongodb://localhost:27017/manager', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Database connection error:', err);
});

app.get('/', (req, res) => {
    res.send('Welcome to the API server!');
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    console.log('Registered:', { email });
    res.status(201).send({ message: 'User registered' });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ email }, SECRET_KEY); 
        console.log('Login successful for:', { email });
        res.status(200).send({ message: 'Login successful', token });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

app.get('/api/search', (req, res) => {
    console.log('Search query:', req.query);
    res.send([{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }]); 
});

app.get('/api/user/:id', (req, res) => {
    console.log('User ID:', req.params.id);
    res.send({ id: req.params.id, name: 'John Doe' });
});

app.post('/api/manager', async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const newManager = new Manager({ name, email, role });
        await newManager.save();
        res.status(201).json({ message: 'Manager created successfully', newManager });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/managers', async (req, res) => {
    try {
        const managers = await Manager.find();
        res.status(200).json(managers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/manager/:id', async (req, res) => {
    try {
        const manager = await Manager.findById(req.params.id);
        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }
        res.status(200).json(manager);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/manager/:id', async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const manager = await Manager.findByIdAndUpdate(req.params.id, {
            name,
            email,
            role
        }, { new: true });

        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }
        res.status(200).json({ message: 'Manager updated successfully', manager });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/manager/:id', async (req, res) => {
    try {
        const manager = await Manager.findByIdAndDelete(req.params.id);
        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }
        res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/api/tasks', async (req, res) => {
    try {
        const { name, description, userId } = req.body;
        const newTask = new Task({ name, description, userId });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/tasks/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, completed } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { name, description, completed },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
