"use client";

import { useState, useRef, useEffect } from "react";
import { Flame, Target, Droplet, Camera, Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HomeTabProps {
  userData: any;
}

export default function HomeTab({ userData }: HomeTabProps) {
  const [caloriesConsumed, setCaloriesConsumed] = useState(1450);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const caloriesGoal = 2000;
  const caloriesRemaining = caloriesGoal - caloriesConsumed;
  const progressPercentage = (caloriesConsumed / caloriesGoal) * 100;

  // Gerar sugestão personalizada com IA
  useEffect(() => {
    const generateAISuggestion = async () => {
      setIsLoadingSuggestion(true);
      
      try {
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: "Você é um nutricionista especializado em dar sugestões personalizadas de alimentação. Seja direto, motivador e prático. Dê apenas UMA sugestão específica e acionável em no máximo 2 frases curtas."
              },
              {
                role: "user",
                content: `Baseado no perfil do usuário:
- Nome: ${userData?.name || "Usuário"}
- Objetivo: ${userData?.goal || "perder peso"}
- Peso: ${userData?.weight || "70"}kg
- Altura: ${userData?.height || "170"}cm
- Idade: ${userData?.age || "25"} anos
- Nível de atividade: ${userData?.activityLevel || "moderado"}
- Calorias consumidas hoje: ${caloriesConsumed} de ${caloriesGoal} kcal
- Progresso: ${progressPercentage.toFixed(0)}%

Dê UMA sugestão prática e específica para hoje (máximo 2 frases curtas). Seja direto e motivador.`
              }
            ],
            model: "gpt-4o",
            temperature: 0.7,
            max_tokens: 100
          }),
        });

        if (!response.ok) {
          throw new Error("Erro ao gerar sugestão");
        }

        const data = await response.json();
        setAiSuggestion(data.choices[0].message.content.trim());
      } catch (error) {
        console.error("Erro ao gerar sugestão:", error);
        setAiSuggestion("Mantenha o foco! Você está no caminho certo para atingir sua meta de hoje. 💪");
      } finally {
        setIsLoadingSuggestion(false);
      }
    };

    generateAISuggestion();
  }, [userData, caloriesConsumed, caloriesGoal, progressPercentage]);

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const processImageWithAI = async (file: File) => {
    setIsScanning(true);
    
    try {
      // Simular processamento com IA (aqui você integraria com uma API real de visão computacional)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Resultado simulado - substitua por chamada real à API de IA
      const mockResult = {
        foodName: "Prato de Frango Grelhado com Arroz e Salada",
        calories: 520,
        macros: {
          carbs: 45,
          protein: 42,
          fat: 18
        },
        confidence: 92,
        ingredients: [
          "Peito de frango grelhado (150g)",
          "Arroz branco (100g)",
          "Alface e tomate",
          "Azeite (1 colher)"
        ]
      };

      setScanResult(mockResult);
      setShowResultDialog(true);
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
      alert("Erro ao processar imagem. Tente novamente.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await processImageWithAI(file);
    }
  };

  const addMealFromScan = () => {
    if (scanResult) {
      setCaloriesConsumed(prev => prev + scanResult.calories);
      setShowResultDialog(false);
      setScanResult(null);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Olá, {userData?.name || "Usuário"}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      {/* Result Dialog */}
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Alimento Identificado! 🎉</DialogTitle>
            <DialogDescription>
              A IA analisou sua imagem com {scanResult?.confidence}% de confiança
            </DialogDescription>
          </DialogHeader>
          
          {scanResult && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-2">
                  {scanResult.foodName}
                </h4>
                <div className="flex items-center gap-2 text-2xl font-bold text-cyan-600">
                  <Flame className="h-6 w-6" />
                  {scanResult.calories} kcal
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold text-gray-900">Macronutrientes:</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 bg-orange-50 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Carboidratos</p>
                    <p className="text-lg font-bold text-orange-600">{scanResult.macros.carbs}g</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Proteínas</p>
                    <p className="text-lg font-bold text-blue-600">{scanResult.macros.protein}g</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Gorduras</p>
                    <p className="text-lg font-bold text-yellow-600">{scanResult.macros.fat}g</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold text-gray-900">Ingredientes detectados:</h5>
                <ul className="space-y-1">
                  {scanResult.ingredients.map((ingredient: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => setShowResultDialog(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={addMealFromScan}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  Adicionar Refeição
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Suggestion Card */}
      <Card className="flex flex-col gap-6 rounded-xl shadow-sm p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              💡 Sugestão da IA
            </h3>
            {isLoadingSuggestion ? (
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p className="text-sm">Analisando seu perfil...</p>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {aiSuggestion}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Calories Card */}
      <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90">Meta de Calorias</p>
            <h2 className="text-4xl font-bold mt-1">{caloriesGoal}</h2>
            <p className="text-sm opacity-90 mt-1">kcal/dia</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Restante</p>
            <h3 className="text-3xl font-bold mt-1">{caloriesRemaining}</h3>
            <p className="text-sm opacity-90 mt-1">kcal</p>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-3 bg-white/20" />
        <div className="flex justify-between mt-3 text-sm">
          <span>Consumido: {caloriesConsumed} kcal</span>
          <span>{progressPercentage.toFixed(0)}%</span>
        </div>
      </Card>

      {/* Macros */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Macronutrientes de Hoje
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Carboidratos
              </span>
              <span className="text-sm font-bold text-gray-900">180g / 250g</span>
            </div>
            <Progress value={72} className="h-2 bg-orange-100" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Proteínas</span>
              <span className="text-sm font-bold text-gray-900">85g / 120g</span>
            </div>
            <Progress value={71} className="h-2 bg-blue-100" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Gorduras</span>
              <span className="text-sm font-bold text-gray-900">45g / 65g</span>
            </div>
            <Progress value={69} className="h-2 bg-yellow-100" />
          </div>
        </div>
      </Card>

      {/* Daily Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Flame className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Queimadas</p>
              <p className="text-xl font-bold text-gray-900">450 kcal</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Droplet className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Água</p>
              <p className="text-xl font-bold text-gray-900">1.5L / 2L</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Meals Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Refeições de Hoje</h3>
        <div className="space-y-3">
          {[
            { name: "Café da manhã", calories: 450, time: "08:30" },
            { name: "Almoço", calories: 650, time: "12:45" },
            { name: "Lanche", calories: 350, time: "16:00" },
          ].map((meal, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{meal.name}</p>
                <p className="text-sm text-gray-500">{meal.time}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{meal.calories} kcal</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly Challenge */}
      <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-yellow-400 rounded-xl">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Desafio da Semana
            </h3>
            <p className="text-gray-700 mb-3">5 treinos esta semana</p>
            <Progress value={60} className="h-2 bg-yellow-200" />
            <p className="text-sm text-gray-600 mt-2">3 de 5 completos</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
