import express, { Request, Response } from "express";
import { createUser, getAllUsers } from "../../controller/User.service";

const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  res.status(200).json(await getAllUsers());
});

userRouter.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.status(200).json(await createUser(name, email));
});


export default userRouter;
