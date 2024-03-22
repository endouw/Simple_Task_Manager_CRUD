import React, { useState, useEffect } from 'react';
import { getTask, updateTask } from './api';

const EditTask = ({ taskId, onTaskUpdated }) => {
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            const response = await getTask(taskId);
            setTask(response.data);
        };

        fetchTask();
    }, [taskId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedTask = { ...task, title: e.target.title.value };
        await updateTask(taskId, updatedTask);
        onTaskUpdated(updatedTask);
    };

    return task ? (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                defaultValue={task.title}
                required
            />
            <button type="submit">Save</button>
        </form>
    ) : (
        <p>Loading...</p>
    );
};

export default EditTask;
