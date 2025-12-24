import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";

/* Helper */
const getInitials = (name = "") =>
    name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();

const SideMenu = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (path) => {
        if (path === "logout") {
            localStorage.removeItem("authToken");
            clearUser();
            navigate("/login");
            alert("Logout successfully");
        } else {
            navigate(path);
        }
    };

    return (
        <aside className="w-72 h-screen bg-gradient-to-br from-slate-100 to-slate-50 p-6 sticky">
            {/* Profile */}
            <div className="flex flex-col items-center mb-8 mt-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {getInitials(user?.fullName || "User")}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mt-4">
                    {user?.fullName || "User Name"}
                </h3>
                <p className="text-sm text-slate-500">Personal Finance</p>
            </div>

            {/* Menu */}
            <nav className="space-y-2">
                {SIDE_MENU_DATA.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleClick(item.path)}
                            className={`w-full h-16 group relative overflow-hidden rounded-2xl
    transition-all duration-300
    ${isActive
                                    ? "scale-[1.02] shadow-lg shadow-black/10"
                                    : "hover:scale-[1.02]"
                                }`}
                        >
                            {/* Background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-r ${item.gradient}
      transition-opacity duration-300
      ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-90 "}`}
                            />

                            {/* Content */}
                            <div className="relative flex items-center justify-between h-full px-6">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`p-2.5 rounded-xl transition-all
          ${isActive ? "bg-white/20" : "bg-white"}`}
                                    >
                                        <Icon
                                            className={`w-5 h-5
            ${isActive ? "text-white" : "text-slate-700"}`}
                                        />
                                    </div>

                                    <span
                                        className={`p-2.5 rounded-2xl transition-all font-semibold text-base 
          ${isActive ? "text-white" : "text-slate-700"}`}
                                    >
                                        {item.label}
                                    </span>
                                </div>

                                <ChevronRight
                                    className={`w-5 h-5 transition-all
        ${isActive
                                            ? "text-white opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                        }`}
                                />
                            </div>
                        </button>

                    );
                })}
            </nav>
        </aside>
    );
};

export default SideMenu;
