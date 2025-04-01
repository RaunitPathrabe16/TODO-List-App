const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/todoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);


app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const { name, description } = req.body;
    const newTask = new Task({ name, description });
    await newTask.save();
    res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    res.json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
