import React, { useEffect, useState } from 'react';

const ToDoList = ({ tasks, setTasks, userName, addTask, deleteTask }) => {
    const [newTask, setNewTask] = useState("");

    

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
