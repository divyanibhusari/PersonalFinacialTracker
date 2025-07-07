import xlsx from "xlsx";
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
        const income = await Income.find({ userId }).sort({ Date: -1 }); // Capital "D"

        // Prepare date for each 
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.account,
            Date: item.Date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');

    } catch (err) {
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