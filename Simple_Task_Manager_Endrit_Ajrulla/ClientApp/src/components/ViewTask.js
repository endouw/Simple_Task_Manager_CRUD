import React from 'react';

const ViewTask = ({ task }) => {

    const adjustDateForTimezone = (dateString) => {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
        return adjustedDate.toISOString().split('T')[0];
    };

    const formattedDueDate = task.dueDate ? adjustDateForTimezone(task.dueDate) : '';


    return (
        <div className="container mt-3">
            <h2>View Task</h2>
            <div className="mb-3">
                <label className="form-label">Task Name</label>
                <input type="text" className="form-control" value={task.name} readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input type="date" className="form-control" value={formattedDueDate} readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" value={task.description} readOnly></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <input type="text" className="form-control" value={task.status} readOnly />
            </div>
        </div>
    );
};

export default ViewTask;
