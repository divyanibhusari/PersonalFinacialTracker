import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import path from "path";

import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import authRoutes from "./router/authRoutes.js";
import incomeRoutes from "./router/IncomeRoutes.js"
import expenseRoutes from "./router/expenseRoutes.js"
import dashboardRoutes from "./router/dashboardRoutes.js"

dotenv.config({ path: "./config.env" });

let app = express();

let port = process.env.port || 3267;

// middleware to handle CORS
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
})
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);



// Recreate __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "upload")));

app.listen(port, () => {

    console.log(`server is running on port:${port} || http://127.0.0.1:${port}`)

})