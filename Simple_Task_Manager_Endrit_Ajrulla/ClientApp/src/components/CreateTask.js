import React, { useState } from 'react';

const CreateTask = ({ onTaskCreated }) => {
    const [task, setTask] = useState({
        name: '',
        dueDate: '',
        description: '',
        status: 'incomplete'
    });

    const [isCollapsed, setIsCollapsed] = useState(true);


    const handleChange = (event) => {
        const { name, value } = event.target;
        let formattedValue = value;
        if (name === 'dueDate') {
            const date = new Date(value);
            formattedValue = date.toISOString().split('T')[0];
        }
        setTask(prevTask => ({
            ...prevTask,
            [name]: formattedValue
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/taskitem/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then(response => {
                if (response.ok) {
                    onTaskCreated();
                    setTask({ name: '', dueDate: '', description: '', status: 'incomplete' });
                }
            })
            .catch(error => console.error('Error creating task:', error));
    };

    return (
        <div className="container mt-3">
            <button className="btn btn-primary" onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? 'Create Task' : 'Close'}
            </button>
            <div className={isCollapsed ? 'collapse' : ''}>
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Task Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={task.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dueDate" className="form-label">Due Date</label>
                        <input type="date" className="form-control" id="dueDate" name="dueDate" value={task.dueDate} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" value={task.description} onChange={handleChange} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;
