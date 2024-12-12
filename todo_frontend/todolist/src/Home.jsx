import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);
    const [categories, setCategories] = useState([]); // State for categories
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [showUserForm, setShowUserForm] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(''); // Added user ID state
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(''); // For filtering tasks

    useEffect(() => {
        if (userId) {
            // Fetch todos and categories only if userId is set
            axios.get(`http://localhost:3001/get/${userId}`)
                .then(result => setTodos(result.data))
                .catch(err => console.log(err));
    
            axios.get(`http://localhost:3001/get-categories/${userId}`)
                .then(result => setCategories(result.data))
                .catch(err => console.log(err));
        }
    }, [userId]);

    const handleEdit = (id) => {
        axios.put(`http://localhost:3001/update/${id}`)
            .then(result => {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === id ? { ...todo, done: true } : todo
                    )
                );
            })
            .catch(err => console.log(err));
    };

    const handleAddTask = newTask => {
        setTodos(prevTodos => [...prevTodos, newTask]);
    };

    const handleAddCategory = () => {
        axios.post('http://localhost:3001/add-category', {
            name: categoryName,
            description: categoryDescription,
            user_id: userId // Pass the user ID when adding a category
        })
        .then(response => {
            console.log('Category added:', response.data);
            setShowCategoryForm(false); // Close the form after submission
            setCategories([...categories, response.data]); // Update state with new category
        })
        .catch(err => console.log('Error adding category:', err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(result => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    const handleAddUser = () => {
        axios.post('http://localhost:3001/add-user', {
            student_id: studentId,
            username: username,
            email: email
        })
        .then(response => {
            console.log('User added:', response.data);
            setUserId(response.data._id); // Set the new user ID after user is created
            setShowUserForm(false); // Close the form after submission
        })
        .catch(err => console.log('Error adding user:', err));
    };

    const handleFilter = () => {
        axios.get(`http://localhost:3001/filter-tasks`, {
            params: {
                user_id: userId,
                category_id: selectedCategoryFilter || undefined
            }
        })
        .then(result => setTodos(result.data))
        .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h1> Todo List</h1>
            <Create categories={categories} userId={userId} onTaskAdded={handleAddTask} />

            <button onClick={() => setShowCategoryForm(true)} disabled={!userId}>Add New Category</button>
            {showCategoryForm && (
                <div className='modal'>
                    <div className='modal_content'>
                        <h2>Add New Category</h2>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Category Description"
                            value={categoryDescription}
                            onChange={(e) => setCategoryDescription(e.target.value)}
                        />
                        <button onClick={handleAddCategory}>Submit</button>
                        <button onClick={() => setShowCategoryForm(false)}>Close</button>
                    </div>
                </div>
            )}

            <button onClick={() => setShowUserForm(true)}>Add New User</button>
            {showUserForm && (
                <div className='modal'>
                    <div className='modal_content'>
                        <h2>Add New User</h2>
                        <input 
                            type="text" 
                            placeholder="Student ID" 
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <button onClick={handleAddUser}>Submit</button>
                        <button onClick={() => setShowUserForm(false)}>Close</button>
                    </div>
                </div>
            )}

            <div>
                <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                <button onClick={handleFilter} disabled={!userId}>Filter Tasks</button>
            </div>

            <div className="todo_container">
            {
                todos.length === 0 ?
                <div><h2>No Record</h2></div>
                :
                todos.map(todo => (
                    <div className='task'>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ? 
                            <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill> :
                            <BsCircleFill className='icon' style={{ color: 'transparent', border: '1px solid #333' }} />
                            }
                            <p className = {todo.done ? "line_through": ""}>{todo.task}</p>
                        </div>
                        <div> 
                            <span> <BsFillTrashFill className='icon' 
                            onClick={() => handleDelete(todo._id)}/></span>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    );
}

export default Home;
