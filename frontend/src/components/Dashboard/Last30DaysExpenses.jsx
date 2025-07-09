import React, { useEffect, useState } from 'react';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareExpenseBarChartData } from '../../utils/helper.js';

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // console.log("Incoming data:", data); // check what you're receiving
    if (data && data.length > 0) {
      const result = prepareExpenseBarChartData(data);
      // console.log("Chart data:", result);
      setChartData(result);
    }
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
      {chartData.length > 0 ? (
        <CustomBarChart data={chartData} />
      ) : (
        <p className="text-gray-500 mt-4">No data to display</p>
      )
      }
    </div>
  );
};

export default Last30DaysExpenses;
