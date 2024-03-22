import React, { useState } from 'react';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import ViewTask from './components/ViewTask';
import UpdateTask from './components/UpdateTask';

const App = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [refreshList, setRefreshList] = useState(false);

    const handleSelectTask = (task) => {
        setSelectedTask(task);
        setIsUpdating(false);
    };

    const handleDeleteTask = (id) => {
        fetch(`/taskitem/deleteTaskById/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setRefreshList(prev => !prev);
                    setSelectedTask(null);
                }
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    const handleTaskCreated = () => {
        setRefreshList(prev => !prev);
    };

    const handleTaskUpdated = () => {
        setIsUpdating(false);
        setSelectedTask(null);
        setRefreshList(prev => !prev);
    };

    const handleEditTask = () => {
        setIsUpdating(true);
    };

    return (
        <div>
            <CreateTask onTaskCreated={handleTaskCreated} />
            <TaskList onSelectTask={handleSelectTask} onDeleteTask={handleDeleteTask} refreshList={refreshList} />
            {selectedTask && !isUpdating && (
                <div className="container mt-3">
                    <ViewTask task={selectedTask} />
                    <div className="mt-3">
                        <button className="btn btn-primary" onClick={handleEditTask}>Edit Task</button>
                    </div>
                </div>
            )}
            {selectedTask && isUpdating && (
                <UpdateTask task={selectedTask} onTaskUpdated={handleTaskUpdated} />
            )}
        </div>
    );
};

export default App;


