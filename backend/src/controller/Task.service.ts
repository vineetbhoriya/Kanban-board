import Task, { TaskDoc } from "../model/Task";
interface TaskWithUserName {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigned_User: string;
}
interface TaskGroupedByStatus {
  todo: TaskWithUserName[];
  inProgress: TaskWithUserName[];
  done: TaskWithUserName[];
}

export const createTask = async (
  title: string,
  description: string,
  status: string = "Todo",
  assigned_User: string,
  priority: string
): Promise<TaskDoc | string> => {
  try {
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return "Invalid title. Title is required and must be a non-empty string.";
    }

    if (
      !assigned_User ||
      typeof assigned_User !== "string" ||
      assigned_User.trim().length === 0
    ) {
      return "Invalid assigned user. Assigned user is required and must be a non-empty string.";
    }

    const validPriorities = ["low", "high", "done"];
    if (!validPriorities.includes(priority)) {
      return `Invalid priority. Valid priorities are: ${validPriorities.join(
        ", "
      )}.`;
    }

    const validStatuses = ["Todo", "In Progress", "done"];
    if (!validStatuses.includes(status)) {
      return `Invalid status. Valid statuses are: ${validStatuses.join(", ")}.`;
    }

    const task = new Task({
      title,
      description,
      status,
      assigned_User,
      priority,
    });

    await task.save();
    return "Task saved successfully.";
  } catch (error) {
    console.error("Error creating task: ", error);
    return "Error creating task. Please try again later.";
  }
};

export const getAllTasks = async (): Promise<TaskGroupedByStatus | string> => {
  try {
    // Fetch tasks with the necessary fields
    const tasks = await Task.find({}, "title description status priority") // Select only necessary fields for Task
      .populate({
        path: "assigned_User",
        select: "name", // Only select the 'name' field from assigned_User
      });

    // Initialize the grouped task object
    const groupedTasks: TaskGroupedByStatus = {
      todo: [],
      inProgress: [],
      done: [],
    };

    // Group tasks based on status
    tasks.forEach((task) => {
      const taskData: TaskWithUserName = {
        id: task._id.toString(), // Convert to string if necessary
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assigned_User: task.assigned_User ? task.assigned_User.name : "", // Fallback if no user found
      };

      if (task.status === "Todo") {
        groupedTasks.todo.push(taskData);
      } else if (task.status === "In Progress") {
        groupedTasks.inProgress.push(taskData);
      } else if (task.status === "done") {
        groupedTasks.done.push(taskData);
      }
    });

    return groupedTasks;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return "Error fetching tasks. Please try again later.";
  }
};

export const getTaskById = async (
  taskId: string
): Promise<TaskDoc | null | string> => {
  try {
    const task = await Task.findById(taskId).populate({
      path: "assigned_User",
      select: "name",
    });
    return task;
  } catch (error) {
    console.error("Error fetching task: ", error);
    return "Error fetching task. Please try again later.";
  }
};

export const updateTaskStatus = async (
  taskId: string,
  newStatus: string,
  description: string,
  priority: string,
  title: string
): Promise<TaskDoc | string> => {
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        status: newStatus,
        description: description,
        priority: priority,
        title: title,
      },
      { new: true }
    );
    return "updateTask successfully";
  } catch (error) {
    return "Error updating task status. Please try again later.";
  }
};

export const deleteTodoTaskStatus = async (
  taskId: string
): Promise<TaskDoc | string> => {
  try {
    const task = await Task.findByIdAndDelete(taskId, { new: true });
    return "Task deleted. Please try again later";
  } catch (error) {
    console.error("Error delete task status: ", error);
    return "Error delete task status. Please try again later.";
  }
};
