const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const UserModel = require('./Models/User'); // Import the User model
const CategoryModel = require('./Models/Category'); // Import the Category model

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

// Route to add a new category
// Route to get categories
app.get('/get-categories', (req, res) => {
    CategoryModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

// Route to add a category
app.post('/add-category', (req, res) => {
    const { name, description, user_id } = req.body;
    CategoryModel.create({ name, description, user_id })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

// Route to add a new user
app.post('/add-user', (req, res) => {
    const { student_id, username, email } = req.body;
    UserModel.create({ student_id, username, email })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
    console.log(id);
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const { task, user_id, category_id } = req.body;
    if (!task || !user_id || !category_id) {
        return res.status(400).json({ error: "All fields must be filled" });
    }
    TodoModel.create({
        task,
        user_id,
        category_id
    })
    .then(result => res.json(result))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "Failed to add task" });
    });
});

app.get('/filter-tasks', (req, res) => {
    const { user_id, category_id } = req.query; // Retrieve query parameters

    let filter = { user_id }; // Start with filtering by user_id
    if (category_id) {
        filter.category_id = category_id; // Add category filter if provided
    }

    TodoModel.find(filter)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: "Failed to filter tasks" }));
});



app.listen(3001, () => {
    console.log("Server is Running")   
})