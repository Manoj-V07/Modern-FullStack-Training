"use client";

import { useState } from "react";
import { Task } from "@/components/taskTypes";

type TaskListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TaskList({
  tasks,
  setTasks,
}: TaskListProps) {
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState<"Low" | "Medium" | "High">("Low");

  const handleDelete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.taskId !== id)
    );
  };

  const handleEdit = (task: Task) => {
    setEditId(task.taskId);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
  };

  const handleSave = (id: number) => {
    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) {
      alert("Title is required");
      return;
    }

    const isDuplicate = tasks.some(
      (task) =>
        task.taskId !== id &&
        task.title.trim().toLowerCase() ===
          trimmedTitle.toLowerCase()
    );

    if (isDuplicate) {
      alert("Task already exists");
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.taskId === id
          ? {
              ...task,
              title: trimmedTitle,
              description: editDescription.trim(),
              priority: editPriority,
            }
          : task
      )
    );

    setEditId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("Low");
  };

  const handleCancel = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("Low");
  };

  if (tasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  const handleToggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.taskId === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
            }
          : task
      )
    );
  };

  return (
    <div>
      <h2>Task List</h2>

      {tasks.map((task) => (
        <div key={task.taskId}>
          {editId === task.taskId ? (
            <>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) =>
                    setEditTitle(e.target.value)
                  }
                />
              </div>
              <br />

              <div>
                <label>Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) =>
                    setEditDescription(e.target.value)
                  }
                />
              </div>
              <br />

              <div>
                <label>Priority</label>
                <select
                  value={editPriority}
                  onChange={(e) =>
                    setEditPriority(
                      e.target.value as "Low" | "Medium"
                    )
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <br />

              <button onClick={() => handleSave(task.taskId)}>
                Save
              </button>
              <br />

              <button onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>ID:</strong> {task.taskId}
              </p>

              <p>
                <strong>Title:</strong> {task.title}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {task.description}
              </p>

              <p>
                <strong>Priority:</strong> {task.priority}
              </p>

              <button onClick={() => handleToggleComplete(task.taskId)}>
                {task.isCompleted
                  ? "Mark as Pending"
                  : "Mark as Completed"}
              </button>
              <br />

              
              <button onClick={() => handleEdit(task)}>
                Edit
              </button>
              <br />

              <button onClick={() => handleDelete(task.taskId)}>
                Delete
              </button>
              <br />
            </>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}