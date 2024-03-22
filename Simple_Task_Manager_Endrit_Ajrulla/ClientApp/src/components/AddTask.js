import React, { useState } from 'react';
import { createTask } from './api';

const AddTask = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, isCompleted: false };
        const response = await createTask(newTask);
        onTaskAdded(response.data);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add new task"
                required
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTask;
