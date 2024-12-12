const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // References the 'users' collection
        required: true // Ensure each task is linked to a user
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories', // References the 'categories' collection
    }
})

const TodoModel = mongoose.model("todos", TodoSchema)
module.exports = TodoModel