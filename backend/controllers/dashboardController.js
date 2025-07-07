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

    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      Date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ Date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      Date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ Date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
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
      ...lastIncome.map((txn) => ({ ...txn.toObject(), type: "Income" })),
      ...lastExpense.map((txn) => ({ ...txn.toObject(), type: "Expense" })),
    ].sort((a, b) => new Date(b.Date) - new Date(a.Date));

    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncomes: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

export { getDashboardData };
