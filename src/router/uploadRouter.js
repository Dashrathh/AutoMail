// import { Router } from "express";
import express from "express";
import upload from "../moddleware/upload.js";
import {
  uploadReport,
  sendReportByMail,
} from "../controller/uploadandSendMail.js";

const router = express.Router();

router.post("/upload", upload.single("pdf"), uploadReport);

router.post("/sendmail/:id", sendReportByMail);

export default router;
