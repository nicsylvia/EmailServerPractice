import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import router from "./Routes/TestRoutes";

const port: number = 4000;

const app: Application = express();
const DB_URL = "mongodb://localhost/EmailServerPractice";

app.use(express.json());

mongoose.connect(DB_URL);
mongoose.connection
  .on("open", () => {
    console.log(`Database is connected to port `);
  })
  .once("error", () => {
    console.log(`Couldn't connect to database`);
  });

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Api is ready for consumption",
  });
});

app.use("/api", router);

app.listen(port, () => {
  console.log("Port is connected to port ", port);
});
