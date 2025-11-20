import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// Enable Cross-Origin Resource Sharing
// Allows frontend (different domain/port) to access backend
// credentials:true → allows cookies/sessions to be sent
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Parse incoming JSON data from request bodies
// limit:16kb → protects server from very large JSON payloads
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded data (form submissions)
// extended:true → allows nested objects in form data
// limit:16kb → again protects from large payloads
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files (images, css, js) from the "public" folder
// Makes http://localhost:8000/filename.png work
// Makes your public folder behave like a web folder where files can be accessed directly using the browser.
app.use(express.static("public"));

// Parse cookies in incoming requests
// Adds req.cookies so you can read tokens/session IDs
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export default app;
