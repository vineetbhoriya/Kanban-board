import axios from "axios";
import { ToDoItem, ToDoItems } from "../components/Types";

// Define the base URL
const baseUrl = "http://localhost:5000/api";

// Function to create a user
export const createUser = async (userData: { name: string; email: string }) => {
  try {
    const response = await axios.post(`${baseUrl}/user`, userData);
    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// Function to fetch users from the API
export const getUsers = async () => {
  try {
    const response = await axios.get<{ _id: string; name: string }[]>(
      `${baseUrl}/user`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

// Function to create a task (to-do item)
export const createTask = async (taskData: {
  title: string;
  description: string;
  priority: string;
  assigned_User: string;
}) => {
  try {
    const response = await axios.post(`${baseUrl}/task`, taskData);
    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// Function to fetch to-dos from API
export const getTodos = async () => {
  try {
    const response = await axios.get<{
      todo: ToDoItem[];
      inProgress: ToDoItem[];
      done: ToDoItem[];
    }>(`${baseUrl}/task`);

    if (response.status === 200) {
      return response.data;
    } else {
      return { todo: [], inProgress: [], done: [] };
    }
  } catch (error) {
    console.error("Error:", error);
    return { todo: [], inProgress: [], done: [] };
  }
};

// Function to delete to-dos from API
export const deleteTodo = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/task/${id}`);

    if (response.status === 200) {
      return response.data;
    } else {
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
// Function to update to-dos from API
export const updateTodo = async (taskData: {
  id: string;
  title: string;
  description: string;
  priority: string;
}) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/task/${taskData.id}`,
      taskData
    );
    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// update to-dos
export const updateTodoStatus = async (taskData: {
  id: string;
  newStatus: string;
}) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/task/${taskData.id}`,
      taskData
    );
    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
