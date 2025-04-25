// import dotenv from 'dotenv';
import connectDB from "./src/DB/dataBase.js";
import reportRouter from "./uploadController.js";
import express from "express";
const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/report", reportRouter);

app.get("/", (req, res) => {
  res.send("Hellow world");
});
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
