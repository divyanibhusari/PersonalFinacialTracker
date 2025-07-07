import React from 'react'
import { LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from 'react-icons/lu'


const TransactionInfoCard = ({
    title, icon, date, amount, type, hideDeleteBtn, onDelete
}) => {
    const getAmountStyles = ()=>
        type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";
    
    return <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-300/60">
        <div className="w-12 h-12 flex items-center justify-center text-lg text-gray-800 bg-gray-300 rounded-full">
            {icon ? (
                <img src={icon} alt={title} className='w-6 h-6' />
            ) : (
                <LuUtensils />
            )}
        </div>
        <div className="flex-1 flex items-center justify-between">
            <div className="">
                <p className='text-sm text-gray-700 font-medium'>{title}</p>
                <p className="text-sm text-gray-600 mt-2">{date}</p>
            </div>
            <div className="flex items-center gap-2">
                {!hideDeleteBtn && (
                    <button className='text-gray-700 hover:text-red-500 opacity-1 group-hover:opacity-100 transition-opacity cursor-pointer'
                        onClick={onDelete}>
                        <LuTrash2 size={18} />
                    </button>
                )}
                <div className={`flex item-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                    <h6 className='text-xs font-medium '>
                        {type === "income" ? "+" : "-"} Rs.{amount}
                    </h6>
                    {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                </div>
            </div>
        </div>
    </div>
}

export default TransactionInfoCard