"use client";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList"
import { useState } from "react";
import { Task } from "@/components/taskTypes"

export default function Home() {
  
  const[tasks, setTasks] = useState<Task[]>([]);
  const[nextId, setnextId] = useState<number>(1);

  return (
    <div>
      <TaskForm tasks={tasks} setTasks={setTasks} nextId={nextId} setnextId={setnextId} />

      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}