"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SplashScreenProps {
  onLanguageSelect: () => void;
}

const languages = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export default function SplashScreen({ onLanguageSelect }: SplashScreenProps) {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("pt");

  const handleContinue = () => {
    setShowLanguageModal(false);
    onLanguageSelect();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <span className="text-6xl font-bold text-white">AI</span>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white mb-3">AI RC</h1>
        <p className="text-xl text-gray-300">Rastreador de Calorias</p>
        <p className="text-sm text-gray-400 mt-2">Seu assistente inteligente para saúde</p>
      </div>

      {/* Language Button */}
      <Button
        onClick={() => setShowLanguageModal(true)}
        size="lg"
        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <Globe className="mr-2 h-5 w-5" />
        Selecionar Idioma
      </Button>

      {/* Language Selection Modal */}
      <Dialog open={showLanguageModal} onOpenChange={setShowLanguageModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Escolha seu idioma
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedLanguage === lang.code
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium text-gray-900">{lang.name}</span>
                  </div>
                  {selectedLanguage === lang.code && (
                    <Check className="h-5 w-5 text-purple-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
          <Button
            onClick={handleContinue}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-6 text-lg rounded-xl"
          >
            Continuar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
