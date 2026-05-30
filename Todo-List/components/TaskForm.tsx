"use client"
import React, { useState } from "react";
import { Task } from "@/components/taskTypes"

type TaskFormProps = {
    tasks : Task[];
    setTasks : React.Dispatch<React.SetStateAction<Task[]>>;
    nextId : number;
    setnextId : React.Dispatch<React.SetStateAction<number>>;
};



function TaskForm({tasks, setTasks, nextId, setnextId} : TaskFormProps) {
    
    const [taskTitle, settaskTitle] = useState("");
    const [taskDesc, settaskDesc] = useState("");
    const [taskPriority, settaskPriority] = useState<"Low" | "Medium" | "High">("Low");

    function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        settaskTitle(e.target.value);
    }

    function handleChangeDesc(e: React.ChangeEvent<HTMLInputElement>){
        settaskDesc(e.target.value);
    }

    function handleChangePriority(e: any){
        settaskPriority(e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const trimmedTitle = taskTitle.trim();

        if(!trimmedTitle) {
            alert("Title is required");
            return;
        }

        const isDuplicate = tasks.some(
            (task) => task.title.trim().toLowerCase() === trimmedTitle.toLowerCase()
        );

        if(isDuplicate){
            alert("This task already exist");
            return ;
        }

        const newTask : Task = {
            taskId : nextId,
            title : trimmedTitle,
            description : taskDesc.trim(),
            priority : taskPriority,
            isCompleted : false
        }

        setnextId((prevId) => prevId + 1);
        setTasks((prevTasks) => [...prevTasks, newTask]);

        settaskTitle("");
        settaskDesc("");
        settaskPriority("Low");

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <br />
                <label htmlFor="taskTitle">Task Title : </label>
                <input type="text" id="taskTitle" name="taskTitle" placeholder="Enter your task title" value={taskTitle} onChange={handleChangeTitle} required/>
                <br />
                <br />

                <label htmlFor="taskDesc">Task Description : </label>
                <input type="text" id="taskDesc" name="taskDesc" placeholder="Enter your task description" value={taskDesc} onChange={handleChangeDesc} required/>
                <br />
                <br />

                <label htmlFor="taskPriority">Task Priority : </label>
                <select name="taskPriority" id="taskPriority" value={taskPriority} onChange={handleChangePriority}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <br />
                <br />

                <button type="submit">Add Task</button>

            </form>
        </div>
    );
}

export default TaskForm;