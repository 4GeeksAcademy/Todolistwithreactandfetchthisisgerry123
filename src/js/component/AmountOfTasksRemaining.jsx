import React from "react";

function AmountOfTasksRemaining({ tasks }) {
    let amountOfTasksRemaining = tasks.length; // Get the length of the tasks array

    return (
        <p>{amountOfTasksRemaining} item{amountOfTasksRemaining !== 1 ? 's' : ''} left</p>
    );
}

export default AmountOfTasksRemaining;
