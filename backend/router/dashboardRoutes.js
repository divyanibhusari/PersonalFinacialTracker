import express from "express"

import protect from "../middleware/authMiddleware.js"

import { getDashboardData } from "../controllers/dashboardController.js"

let router = express()
router.get("/", protect, getDashboardData)

export default router