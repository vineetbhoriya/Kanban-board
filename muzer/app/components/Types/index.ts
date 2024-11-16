export interface ToDoItem {
  id: string;
  title: string;
  description: string;
  status?: string;
  priority: "low" | "high" | "done";
}
export interface ToDoItems {
  todo: ToDoItem[];
  inProgress: ToDoItem[];
  done: ToDoItem[];
}