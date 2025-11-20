"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SplashScreen from "@/components/custom/splash-screen";
import OnboardingFlow from "@/components/custom/onboarding-flow";
import Dashboard from "@/components/custom/dashboard";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<"splash" | "onboarding" | "dashboard">("splash");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Verificar sessão do usuário
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        checkUserProfile(session.user.id);
      } else {
        router.push('/auth');
      }
      setLoading(false);
    });

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        checkUserProfile(session.user.id);
      } else {
        router.push('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const checkUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // Se não encontrar perfil, vai para onboarding
        console.log("Perfil não encontrado, iniciando onboarding");
        setCurrentScreen("splash");
        return;
      }

      if (profile && profile.full_name) {
        // Usuário já tem perfil completo
        setUserData(profile);
        setCurrentScreen("dashboard");
      } else {
        // Usuário precisa completar onboarding
        setCurrentScreen("splash");
      }
    } catch (error) {
      console.error("Erro ao verificar perfil:", error);
      setCurrentScreen("splash");
    }
  };

  const handleLanguageSelect = () => {
    setCurrentScreen("onboarding");
  };

  const handleOnboardingComplete = async (data: any) => {
    if (!user) return;

    try {
      // Salvar perfil no Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email!,
          full_name: data.name,
          age: data.age,
          weight: data.weight,
          height: data.height,
          goal: data.goal,
          activity_level: data.activityLevel,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Erro ao salvar perfil:", error);
        return;
      }

      setUserData({ ...data, id: user.id, email: user.email });
      setCurrentScreen("dashboard");
    } catch (error) {
      console.error("Erro ao completar onboarding:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {currentScreen === "splash" && (
        <SplashScreen onLanguageSelect={handleLanguageSelect} />
      )}
      {currentScreen === "onboarding" && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
      {currentScreen === "dashboard" && user && userData && (
        <Dashboard userData={userData} userId={user.id} />
      )}
    </div>
  );
}
