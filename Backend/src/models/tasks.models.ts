import mongoose, { Schema } from "mongoose";
import { ITask } from "../types/tasks.types.js";
const TasksSchema = new Schema({
  title: {
    type: String
  },
  description: { 
    type: String
  },
  status: { 
    type: Boolean
   },
});
TasksSchema.index({ role:1 });
export const Tasks = mongoose.model<ITask>("Task", TasksSchema);
