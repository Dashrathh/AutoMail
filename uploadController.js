import { Router } from "express";
import express from "express";
import upload from "./src/moddleware/upload.js";
import Report from "./src/model/pdf.model.js";

const router = express.Router();

router.post(
  "/upload",
  upload.single("pdf"),

  async (req, res) => {
    try {
      const { title } = req.body;
      const pdfBuffer = req.file.buffer;

      const newreport = new Report({
        title,
        pdf: pdfBuffer,
      });
      return res
        .status(201)
        .json({ message: "pdf uploaded successfully", newreport });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "error while upload report || server error " });
    }
  }
);

export default router;
