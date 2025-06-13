import { config as dotEnvConfig } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotEnvConfig();
}

import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import errorHandler from "./utils/errorHandler.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

main()
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("DB connect error");
    console.log(err.message);
  });

async function main() {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/workshop"
  );
}

app.use(bodyParser.json());

const corsOptions = {
  origin: ["http://localhost:5173", "https://fullstackmlworkshop.netlify.app"],
  credentials: true,
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
};

app.use(cors(corsOptions));

app.options("/", cors(corsOptions));

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
