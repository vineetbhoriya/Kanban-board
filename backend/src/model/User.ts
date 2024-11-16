import mongoose, { Schema, Document } from "mongoose";

export interface UserDoc extends Document {
  name: string;
  email: string;
  role: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model<UserDoc>("User", UserSchema);
