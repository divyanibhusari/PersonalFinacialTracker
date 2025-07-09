import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";
import Expense from "../models/Expense.js";

// add expense source

let addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            Date: new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// getall expense source
let getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ Date: -1 }); // Capital "D"
        res.json(expense);
    } catch (err) {
        res.status(500).json({ message: "Server Error!" });
    }
};
// download expense Excel file 

let downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        // console.log(expense)
        const data = expense.map((item) => ({
            Category: item.category || "",
            Amount: item.amount || 0,
            Date: item.Date ? new Date(item.Date).toLocaleDateString() : "",
        }));
        console.log("Formatted CSV data:", data); // ✅ DEBUG

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Expense");

        // ✅ Ensure public folder exists
        const publicDir = path.join(path.resolve(), "public");
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        const filePath = path.join(publicDir, "expense_details.csv");

        // ✅ Write the file
        XLSX.writeFile(wb, filePath, { bookType: "csv" });
        // console.log("✅ File written at:", filePath);
        // ✅ Send as download
        res.download(filePath, "expense_details.csv", (err) => {
            if (err) {
                console.error("Download error:", err);
                res.status(500).json({ message: "Download failed" });
            } else {
                fs.unlinkSync(filePath); // optional cleanup
            }
        });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ message: "Server Error!" });
    }
};
// delete expense source

let deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: "server Error" });
    }
};

export { addExpense, getAllExpense, downloadExpenseExcel, deleteExpense }