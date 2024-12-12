import React, { useState } from 'react'
import axios from 'axios'
function Create({ categories, userId, onTaskAdded }) {
    const [task, setTask] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleAdd = () => {
        if (!task || !selectedCategory) {
            alert("Please fill in all fields");
            return;
        }
        axios.post('http://localhost:3001/add', {
            task: task,
            user_id: userId,
            category_id: selectedCategory
        })
        .then(result => {
            onTaskAdded(result.data);
            setTask('');
            setSelectedCategory('');
        })
        .catch(err => {
            console.error("Error adding task:", err);
            alert("Failed to add task!");
        });
    };

    return (
        <div className='create_form'>
            <input 
                type="text" 
                placeholder='Enter Task' 
                value={task}
                onChange={(e) => setTask(e.target.value)} 
            />
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={!categories.length}
            >
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            <button type="button" onClick={handleAdd} disabled={!userId || !categories.length}>Add Task</button>
        </div>
    )
}

export default Create;
