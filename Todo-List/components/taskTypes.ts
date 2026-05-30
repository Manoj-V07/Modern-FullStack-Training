export type Priority = "Low" | "Medium" | "High";

export type Task = {
  taskId: number;
  title: string;
  description: string;
  priority: Priority;
  isCompleted: boolean;
};

export type TaskFormValues = {
  title: string;
  description: string;
  priority: Priority;
};
