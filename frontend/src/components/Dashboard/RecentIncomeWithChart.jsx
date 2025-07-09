import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {

        const dataArr = data?.map((item) => ({
            name: item?.source || "Unknown",
            amount: Number(
                typeof item?.amount === "string"
                    ? item.amount.replace(/,/g, "")
                    : item.amount
            )
        }));

        console.log("Formatted chart data:", dataArr);
        setChartData(dataArr);
    };

    useEffect(() => {
        console.log("Income data received:", data);
        prepareChartData();

        return () => { };
    }, [data]);


    return (
        <div className='card'>
            <div className="flex items-center justify-between">
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`Rs.${chartData.reduce((sum, item) => sum + item.amount, 0)}`}

                showTextAnchor
                colors={COLORS}
            />
        </div>
    )
}

export default RecentIncomeWithChart