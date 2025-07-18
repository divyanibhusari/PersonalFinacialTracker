import React from 'react'
import CustomPieChart from "../Charts/CustomPieChart"
const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinacialOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    const balanceData = [
        { name: "Toatal Balance", amount: totalBalance },
        { name: "Toatal Expense", amount: totalExpense },
        { name: "Toatal Income", amount: totalIncome },
    ];
    return <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className='text-lg'>Financial Overview</h5>
        </div>

        <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`Rs.${totalBalance}`}
            colors={COLORS}
            showTextAnchor
        />
    </div>

}

export default FinacialOverview