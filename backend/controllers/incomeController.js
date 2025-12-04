import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";
import Income from "../models/Income.js";

// add income source
let addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required !" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome)
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}

// getall income source
let getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ Date: -1 }); // Capital "D"
        res.json(income);
    } catch (err) {
        res.status(500).json({ message: "Server Error!" });
    }
};
// download income Excel file 
let downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        // console.log(income)
        const data = income.map((item) => ({
            Source: item.source || "",
            Amount: item.amount || 0,
            Date: item.date ? new Date(item.date).toLocaleDateString() : "",
        }));
        console.log("Formatted CSV data:", data); // ✅ DEBUG

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Income");

        // Ensure public folder exists
        const publicDir = path.join(path.resolve(), "public");
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        const filePath = path.join(publicDir, "income_details.csv");

        // Write the file
        XLSX.writeFile(wb, filePath, { bookType: "csv" });
        // console.log("File written at:", filePath);
        // Send as download
        res.download(filePath, "income_details.csv", (err) => {
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

// delete income source

let deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: "server Error" });
    }
};

export { addIncome, getAllIncome, downloadIncomeExcel, deleteIncome }
