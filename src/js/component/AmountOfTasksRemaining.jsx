import React from "react";

function AmountOfTasksRemaining({ tasks, addTask, clearAllTasks }) {
    let amountOfTasksRemaining = tasks.length; // Get the length of the tasks array

    return (
        <div className="tasks-info">
            <p>{amountOfTasksRemaining} item{amountOfTasksRemaining !== 1 ? 's' : ''} left</p>
            <button onClick={() => addTask("New Task")}>Add Task</button>
            <button onClick={clearAllTasks}>Clear All Tasks</button>
        </div>
    );
}

export default AmountOfTasksRemaining;
