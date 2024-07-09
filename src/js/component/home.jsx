import React, { useState } from "react";
import ToDoList from "./ToDoList.jsx";
import AmountOfTasksRemaining from "./AmountOfTasksRemaining.jsx";


//create your first component
const Home = () => {
    const [tasks, setTasks] = useState(["Eat Breakfast", "Take a shower", "Walk the dog"]);

    return (
        <>
            <div className="title">
                <h1 className="mt-5">todos</h1>
            </div>
            <div className="card">
                <div>
                    <ToDoList tasks={tasks} setTasks={setTasks} />
                </div>
                <span className="tasksRemaining">
                    <AmountOfTasksRemaining tasks={tasks} />
                </span>
            </div>
        </>
    );
};

export default Home;
