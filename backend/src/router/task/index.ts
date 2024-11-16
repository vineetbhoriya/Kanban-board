import express, { Request, Response } from "express";
import {
  createTask,
  deleteTodoTaskStatus,
  getAllTasks,
  getTaskById,
  updateTaskStatus,
} from "../../controller/Task.service";

const taskRouter = express.Router();

taskRouter.get("/", async (req: Request, res: Response) => {
  res.status(200).json(await getAllTasks());
});

taskRouter.post("/", async (req: Request, res: Response) => {
  const { title, description, status, assigned_User, priority } = req.body;
  res
    .status(200)
    .json(
      await createTask(title, description, status, assigned_User, priority)
    );
});

taskRouter.get("/:taskId", async (req: Request, res: Response) => {
  const { taskId } = req.params;
  res.status(200).json(await getTaskById(taskId));
});

taskRouter.patch("/:taskId", async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { newStatus, description, priority, title } = req.body;
  res
    .status(200)
    .json(
      await updateTaskStatus(taskId, newStatus, description, priority, title)
    );
});

taskRouter.delete("/:taskId", async (req: Request, res: Response) => {
  const { taskId } = req.params;
  res.status(200).json(await deleteTodoTaskStatus(taskId));
});

export default taskRouter;
