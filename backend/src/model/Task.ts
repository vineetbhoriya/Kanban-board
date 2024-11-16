import mongoose, { Schema, Document } from "mongoose";

export interface TaskDoc extends Document {
  title: string;
  description: string;
  status: string;
  priority: string;
  assigned_User: mongoose.Schema.Types.ObjectId;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      default: "Todo",
      enum: ["Todo", "In Progress", "done"],
    },
    priority: {
      type: String,
      default: "low",
      enum: ["low", "high", "done"],
    },
    assigned_User: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Task ||
  mongoose.model<TaskDoc>("Task", TaskSchema);
