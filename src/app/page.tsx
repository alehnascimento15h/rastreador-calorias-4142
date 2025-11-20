"use client";

import { useState } from "react";
import SplashScreen from "@/components/custom/splash-screen";
import OnboardingFlow from "@/components/custom/onboarding-flow";
import Dashboard from "@/components/custom/dashboard";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "onboarding" | "dashboard">("splash");
  const [userData, setUserData] = useState<any>(null);

  const handleLanguageSelect = () => {
    setCurrentScreen("onboarding");
  };

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setCurrentScreen("dashboard");
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "splash" && (
        <SplashScreen onLanguageSelect={handleLanguageSelect} />
      )}
      {currentScreen === "onboarding" && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
      {currentScreen === "dashboard" && (
        <Dashboard userData={userData} />
      )}
    </div>
  );
}
