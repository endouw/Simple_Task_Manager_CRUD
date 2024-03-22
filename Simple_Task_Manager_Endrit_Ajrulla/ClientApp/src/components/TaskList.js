import React, { useEffect, useState } from 'react';



const TaskList = ({ onSelectTask, onDeleteTask, refreshList }) => {
    const [tasks, setTasks] = useState([]);

    const adjustDateForTimezone = (dateString) => {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
        return adjustedDate.toISOString().split('T')[0];
    };

    useEffect(() => {
        fetch('/taskitem/getTasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, [refreshList]);

    return (
        <div className="container mt-3">
            <h2>Tasks</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Due Date</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>{adjustDateForTimezone(task.dueDate)}   </td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={() => onSelectTask(task)}>View</button>
                                <button className="btn btn-danger" onClick={() => onDeleteTask(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
