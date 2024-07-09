import React, { useState } from 'react';

function ToDoList({ tasks, setTasks }) {
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
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
        </div>
    );
}

export default ToDoList;
