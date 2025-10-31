import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OutfitAdminSection from "../components/admin/OutfitAdminSection";
import ActivityAdminSection from "../components/admin/ActivityAdminSection";
import { LogOut, Cloud } from "lucide-react";
import backgroundImage from "figma:asset/795b7537b2f79ce178703d9d142caf45502cf729.png";

export default function AdminPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("weatherly-admin-token");
  const [activeTab, setActiveTab] = useState("outfits");

  const handleLogout = () => {
    localStorage.removeItem("weatherly-admin-token");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
        navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen relative bg-gray-100 text-gray-800">
      {/* Subtle fixed background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Main content container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 mt-12 mb-8">
        {/* Admin Dashboard Header */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200 mb-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Cloud className="text-blue-500 w-12" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm">Welcome back, Admin!</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 bg-gradient-to-r from-amber-500/20 to-red-500/20 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Section Tabs */}
        <div
        className="flex flex-col sm:flex-row gap-4 sm:gap-0 mb-6 mt-12"
        style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
        >
            <div className="flex flex-wrap gap-3">
                <button
                onClick={() => setActiveTab("outfits")}
                className={`px-4 py-2 font-medium rounded-2xl transition-all cursor-pointer ${
                    activeTab === "outfits"
                    ? "bg-gradient-to-r from-[#1299ca] to-[#35bcde] text-white shadow-md scale-105"
                    : "text-gray-700 hover:bg-white/30 hover:scale-105 dark:text-gray-300 dark:hover:bg-white/10"
                }`}
                >
                Outfit Management
                </button>
                <button
                onClick={() => setActiveTab("activities")}
                className={`px-4 py-2 font-medium rounded-2xl transition-all cursor-pointer ${
                    activeTab === "activities"
                    ? "bg-gradient-to-r from-[#35bcde] to-[#6fd7ec] text-white shadow-md scale-105"
                    : "text-gray-700 hover:bg-white/30 hover:scale-105 dark:text-gray-300 dark:hover:bg-white/10"
                }`}
                >
                Activity Suggestions
                </button>
            </div>
        </div>

        {/* Section Container */}
        <div className="backdrop-blur-sm p-6 rounded-b-xl shadow-md">
          {activeTab === "outfits" ? <OutfitAdminSection /> : <ActivityAdminSection />}
        </div>
      </div>
    </div>
  );
}
