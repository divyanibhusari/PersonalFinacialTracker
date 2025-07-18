import express from "express"

import { addIncome, getAllIncome, downloadIncomeExcel, deleteIncome } from "../controllers/incomeController.js";

import protect from "../middleware/authMiddleware.js"

let router = express()

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

export default router