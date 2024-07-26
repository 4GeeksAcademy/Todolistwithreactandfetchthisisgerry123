import React, {useEffect, useState} from "react";


export const checkUserExists = async () => {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/users//users?limit=100`);
        if (!response.ok) {
            throw new Error("Failed to fetch users. Status: " + response.status);
        }
        const data = await response.json();
        const userExists = data.users.some(user => user.name === "thisisgerry123");
        return userExists;
    } catch (error) {
        console.error("Error checking if user exists:", error);
        return false;
    }
};

// export const fetchTasks = async (setTasks) => {
//     try {
//         const response = await fetch(`https://playground.4geeks.com/todo/users/thisisgerry123`);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
//         }
//         const data = await response.json();
//         setTasks(data.todos);
//     } catch (error) {
//         console.log("Error fetching tasks:", error.message);
//     }
// };

export const fetchTasks = (setTasks) => {
    fetch("https://playground.4geeks.com/todo/users/thisisgerry123")
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Failed to fetch todo list. Status: " + resp.status);
            }
            return resp.json();
        })
        .then((data) => {
            console.log("Todo List from API", data);
            if (Array.isArray(data.todos)) {
                setTasks(data.todos);
            } else {
                console.error("Fetched data is not an array:", data.todos);
                setTasks([]);
            }
        })
        .catch((error) => {
            console.error("There has been a problem with your fetch operation:", error);
        });
};

export const FetchAll = ({setTasks}) =>{
    const [initialFetchDone, setInitialFetchDone] = useState(false);

    useEffect(() => {
        if (!initialFetchDone) {
            fetchTasks(setTasks);
            setInitialFetchDone(true);
        }
    }, [setTasks, initialFetchDone]);
    return null;
};

export const addTasksToApi = async( tasks, newTask, setTasks) => {
    try {
        const userExists = await checkUserExists();
        if (!userExists) {
            await handleCreateUser(setTasks);
        }
        const sendTask = {
            label: newTask,
            is_done: false
        };
        const response = await fetch(`https://playground.4geeks.com/todo/todos/thisisgerry123`, {
            method: "POST",
            body: JSON.stringify(sendTask),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("failed to add task. status: " + response.status);
        }
        const data = await response.json();
        updatedTasks = [
            ...tasks,
            { ...sendTask, id: data.id },
        ];
        setTasks(updatedTasks);
        fetchTasks(setTasks);

    } catch (error) {
        console.error("error adding taks to API:", error);
    }
};

export const deleteTaskFromApi = async (taskId, setTasks)=> {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("failed to delete task. status: " + response.status);
        }
        fetchTasks(setTasks);

    }  catch (error) {
        console.error("error deleting taks to API:", error);
    }
};

export const deleteAllTasksAndUserFromApi = async (setTasks)=> {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/users/thisisgerry123}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("failed to delete user and tasks. status: " + response.status);
        }
        console.log("User and tasks deleted successfully from API");
        setTasks(
            []
        );

    }  catch (error) {
        console.error("error deleting user and tasks from API:", error);
    }
};

export const handleCreateUser = (setTasks) => {
    fetch(`https://playground.4geeks.com/todo/users/thisisgerry123}`, {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((resp) => {
        if (resp.ok) {
            console.log("User has been created succesfully in API")
            fetchTasks(setTasks);
        }
    })
    .catch((error) => console.error("error creating user in API:", error));
};