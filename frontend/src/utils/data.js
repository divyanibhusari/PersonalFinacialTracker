import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
        gradient: "from-indigo-500 to-purple-500",
    },
    {
        id: "02",
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income",
        gradient: "from-purple-500 to-purple-700",
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense",
        gradient: "from-indigo-500 to-purple-500",
    },
    {
        id: "04",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
        gradient: "from-purple-500 to-purple-700",
    },
];
