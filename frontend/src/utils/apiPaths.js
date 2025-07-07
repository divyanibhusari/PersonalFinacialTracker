export const  BASE_URL="http://127.0.0.1:8907"

// utils/apiPaths.js
export const API_PATHS={
    AUTH:{
        LOGIN:"/api/auth/login",
        REGISTER:"/api/auth/register",
        GET_USER_INFO:"/api/auth/getUser",
    
    },
    DASHBOARD:{
        GET_DATA:"/api/dashboard",
    },
    INCOME:{
        ADD_INCOME:"/api/income/add",
        GET_ALL_INCOME:"/api/income/get",
        DELETE_INCOME:(incomeId)=>`/api/income/${incomeId}`,
        DOWNLOAD_INCOME:"/api/income/downloadexcel",
    },
    EXPENSE:{
        ADD_EXPENSE:"/api/expense/add",
        GET_ALL_EXPENSE:"/api/expense/get",
        DELETE_EXPENSE:(incomeId)=>`/api/expense/${incomeId}`,
        DOWNLOAD_EXPENSE:"/api/expense/downloadexcel",
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image"
    },
};