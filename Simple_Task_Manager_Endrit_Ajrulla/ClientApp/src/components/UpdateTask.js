import React, { useState } from 'react';

const UpdateTask = ({ task, onTaskUpdated }) => {

    const adjustDateForTimezone = (dateString) => {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
        return adjustedDate.toISOString().split('T')[0];
    };

    const [updatedTask, setUpdatedTask] = useState({
        ...task,
        dueDate: task.dueDate ? adjustDateForTimezone(task.dueDate) : ''
});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`/taskitem/updateTaskById/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
            .then(response => {
                if (response.ok) {
                    onTaskUpdated();
                }
            })
            .catch(error => console.error('Error updating task:', error));
    };



    return (
        <div className="container mt-3">
            <h2>Update Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Task Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={updatedTask.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                    <input type="date" className="form-control" id="dueDate" name="dueDate" value={updatedTask.dueDate} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={updatedTask.description} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select className="form-select" id="status" name="status" value={updatedTask.status} onChange={handleChange} required>
                        <option value="incomplete">Incomplete</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;
