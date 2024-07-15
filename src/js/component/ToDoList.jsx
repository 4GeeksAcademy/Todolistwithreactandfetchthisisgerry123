import React, { useEffect, useState } from 'react';

const ToDoList = ({ tasks, setTasks, userName, addTask, deleteTask }) => {
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/thisisgerry123`);
            if (!response.ok) {
                throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setTasks(data.todos);
        } catch (error) {
            console.log("Error fetching tasks:", error.message);
        }
    };

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addTask(newTask);
            setNewTask("");
        }
    };

    return (
        <div className="to-do-list">
            <input
                type="text"
                placeholder="What needs to be done?"
                value={newTask}
                onKeyDown={handleKeyPress}
                onChange={handleInputChange}
            />
            <ol>
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        <span className="text">{task.label}</span>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}>
                            <i className="fa-solid fa-x"></i>
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default ToDoList;
