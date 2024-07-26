import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList.jsx";
import AmountOfTasksRemaining from "./AmountOfTasksRemaining.jsx";
import {
    fetchTasks,
    addTasksToApi,
    deleteTaskFromApi,
    deleteAllTasksAndUserFromApi,
    FetchAll,
} from "../updateApi.js"

const Home = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/thisisgerry123");
            if (!response.ok) {
                throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setTasks(data.todos);
        } catch (error) {
            console.log("Error fetching tasks:", error.message);
        }
    };

    const updateServerTasks = async (updatedTasks) => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/thisisgerry123", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTasks),
            });
            if (!response.ok) {
                throw new Error("Failed to update tasks on the server");
            }
        } catch (error) {
            console.error("Error updating tasks on the server:", error);
        }
    };

    const addTask = async (newTask) => {
        const updatedTasks = [...tasks, { label: newTask, is_done: false }];
        setTasks(updatedTasks);
        await updateServerTasks(updatedTasks);
    };

    const deleteTask = async (taskId) => {
        const updatedTasks = tasks.filter((task, index) => index !== taskId);
        setTasks(updatedTasks);
        await updateServerTasks(updatedTasks);
    };

    const clearAllTasks = async () => {
        const emptyTasks = [];
        setTasks(emptyTasks);
        await updateServerTasks(emptyTasks);
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
            </div>
        </>
    );
};

export default Home;
