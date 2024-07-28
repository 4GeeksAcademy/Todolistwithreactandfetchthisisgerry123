import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList.jsx";
import AmountOfTasksRemaining from "./AmountOfTasksRemaining.jsx";
import {
    fetchTasks,
    addTasksToApi,
    deleteTaskFromApi,
    deleteAllTasksAndUserFromApi,
    handleCreateUser
} from "../updateApi.js";

const Home = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks(setTasks);
    }, []);

    const addTask = async (newTask) => {
        await addTasksToApi(tasks, newTask, setTasks);
    };

    const deleteTask = async (taskId) => {
        await deleteTaskFromApi(taskId, setTasks);
    };

    const clearAllTasks = async () => {
        await deleteAllTasksAndUserFromApi(setTasks);
    };

    const deleteUser = async () => {
        await deleteAllTasksAndUserFromApi(setTasks);
        handleCreateUser(setTasks);
    };

    return (
        <>
            <div className="title">
                <h1 className="mt-5">todos</h1>
            </div>
            <div className="card">
                <div>
                    <ToDoList tasks={tasks} setTasks={setTasks} addTask={addTask} deleteTask={deleteTask} />
                </div>
                <span className="tasksRemaining">
                    <AmountOfTasksRemaining tasks={tasks} addTask={addTask} clearAllTasks={clearAllTasks} />
                </span>
                <button onClick={deleteUser}> Delete User</button>
            </div>
        </>
    );
};

export default Home;
