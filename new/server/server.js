import express from "express";
import cors from "cors";

const app = express();

const PORT = 8081;

const corsOption = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOption));

app.post("/start-bid", (req, res) => {
  console.log("start bid successfully hit");

  const data = req.body;
  console.log(req.body.obj);

  res.status(200).json({ message: "success", data: data });
});

app.listen(PORT, () => {
  console.log("Server runnig at localhost://8081");
});
