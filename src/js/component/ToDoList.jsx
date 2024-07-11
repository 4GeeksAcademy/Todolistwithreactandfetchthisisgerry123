import React, { useState } from 'react';

function ToDoList({ tasks, setTasks }) {
    const [newTask, setNewTask] = useState("");
    

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }


    async function addTask(event) {
        if (event.key !== "Enter") return;
        const trimmedTask = newTask.trim();
        if (trimmedTask !== "") {
            try {
                const response = await fetch(`https://playground.4geeks.com/todo/users/todos/${userName}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify([{ label: trimmedTask, done: false }])
                });
                if (response.ok) {
                    setTasks([...tasks, { label: trimmedTask, done: false }]);
                    setNewTask("");
                }
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    }

    async function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        try {
            const response = await fetch(BASE_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTasks)
            });
            if (response.ok) {
                setTasks(updatedTasks);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }
    
    async function clearAllTasks() {
        try {
            const response = await fetch(BASE_URL, {
                method: 'DELETE'
            });
            if (response.ok) {
                setTasks([]);
            }
        } catch (error) {
            console.error("Error clearing tasks:", error);
        }
    }
    function addTask(event) {
        if (event.key !== "Enter")
            return;
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    return (
        <div className="to-do-list">
            <input
                type="text"
                placeholder="What needs to be done?"
                value={newTask}
                onKeyDown={addTask}
                onChange={handleInputChange}
            />
            <ol>
                {tasks.map((task, index) =>
                    <li key={index} className="task-item">
                        <span className="text">{task}</span>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}>
                            <i class="fa-solid fa-x"></i>
                        </button>
                    </li>
                )}
            </ol>
            <button className="clear-button" onClick={clearAllTasks}>
                Clear All Tasks
            </button>
        </div>
    );
}

export default ToDoList;
