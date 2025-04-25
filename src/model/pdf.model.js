import mongoose from "mongoose";
import { type } from "os";
import { title } from "process";

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pdf: {
    type: Buffer,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Report", reportSchema);
