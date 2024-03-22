const handleDelete = async (id) => {
    const response = await fetch(`/taskItem/deleteTaskById/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        setTasks(tasks.filter(task => task.id !== id));
    }
};
