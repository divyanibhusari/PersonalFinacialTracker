// import csv from "csv";
import Expense from "../models/Expense.js";

// add expense source



let addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;

        // if (!source || !amount || !date) {
        //     return res.status(400).json({ message: "All fields are required!" });
        // }

        // const newExpense = new Expense({
        //     userId,
        //     icon,
        //     category,
        //     amount,
        //     Date: new Date(date), // ✅ Use capital "D" to match schema
        // });

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
        const expense = await Expense.find({ userId }).sort({ Date: -1 }); // Capital "D"

        // Prepare date for each 
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.Date,
        }));

        const wb = csv.utils.book_new();
        const ws = csv.utils.json_to_sheet(data);
        csv.utils.book_append_sheet(wb, ws, "Expense");
        csv.writeFile(wb, 'expense_details.csv');
        res.download('expense_details.csv');

    } catch (err) {
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