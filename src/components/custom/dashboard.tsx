"use client";

import { useState } from "react";
import { Home, Utensils, Dumbbell, TrendingUp, User } from "lucide-react";
import HomeTab from "./dashboard/home-tab";
import MealsTab from "./dashboard/meals-tab";
import WorkoutsTab from "./dashboard/workouts-tab";
import ProgressTab from "./dashboard/progress-tab";
import ProfileTab from "./dashboard/profile-tab";

interface DashboardProps {
  userData: any;
  userId: string;
}

export default function Dashboard({ userData, userId }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "meals", label: "Refeições", icon: Utensils },
    { id: "workouts", label: "Treinos", icon: Dumbbell },
    { id: "progress", label: "Progresso", icon: TrendingUp },
    { id: "profile", label: "Perfil", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "home" && <HomeTab userData={userData} userId={userId} />}
        {activeTab === "meals" && <MealsTab userId={userId} />}
        {activeTab === "workouts" && <WorkoutsTab userId={userId} />}
        {activeTab === "progress" && <ProgressTab userData={userData} userId={userId} />}
        {activeTab === "profile" && <ProfileTab userData={userData} userId={userId} />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                    isActive
                      ? "text-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? "fill-purple-100" : ""}`} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
