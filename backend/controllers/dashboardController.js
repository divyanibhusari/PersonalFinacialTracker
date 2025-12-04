
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import { Types } from "mongoose";

let getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const last60DaysIncomeTransactionsRaw = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const last30DaysExpenseTransactionsRaw = await Expense.find({
      userId: userObjectId,
      Date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ Date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactionsRaw.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    const expenseLast30Days = last30DaysExpenseTransactionsRaw.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    const lastIncome = await Income.find({ userId: userObjectId })
      .sort({ Date: -1 })
      .limit(5);

    const lastExpense = await Expense.find({ userId: userObjectId })
      .sort({ Date: -1 })
      .limit(5);

    const lastTransactions = [
      ...lastIncome.map((txn) => ({
        ...txn.toObject(),
        type: "Income",
        date: txn.date, //  ensures consistency for frontend
      })),
      ...lastExpense.map((txn) => ({
        ...txn.toObject(),
        type: "Expense",
        date: txn.Date,
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    //  Add lowercase `date` to each income/expense transaction
    const formatTransactionsWithDate = (transactions) =>
      transactions.map((txn) => ({
        ...txn.toObject(),
        date: txn.Date, //  add this lowercase field
      }));

    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: formatTransactionsWithDate(last30DaysExpenseTransactionsRaw),
      },
      last60DaysIncomes: {
        total: incomeLast60Days,
        transactions: formatTransactionsWithDate(last60DaysIncomeTransactionsRaw),
      },
      recentTransactions: lastTransactions,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

export { getDashboardData };
