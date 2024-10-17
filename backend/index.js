import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/mongodb.js";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import path from "path";

import dotenv from "dotenv";
dotenv.config({});

const app = express();
const port = process.env.PORT || 3000;

const _dirname = path.resolve();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  // methods: "GET, POST, PUT, DELETE"
};
app.use(cors(corsOptions));

// port api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve static assets if in production
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  connectDB();
  console.log(`Server running at http://localhost:${port}`);
});
