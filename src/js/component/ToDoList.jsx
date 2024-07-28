import React, { useState } from 'react';

const ToDoList = ({ tasks, setTasks, addTask, deleteTask }) => {
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
            {/* <button onClick={() => { addTask(newTask); setNewTask(""); }}>Add Task</button> */}
            <ol>
                {tasks.length === 0 ? (
                    <li className = "No-tasks-in-list">No tasks, add a task</li>
                ) : (
                    tasks.map((task, index) => (
                        <li key={index} className="task-item">
                            <span className="text">{task.label}</span>
                            <button
                                className="delete-button"
                                onClick={() => deleteTask(task.id)}>
                                <i className="fa-solid fa-x"></i>
                            </button>
                        </li>
                    ))
                )}
            </ol>
        </div>
    );
};

export default ToDoList;
