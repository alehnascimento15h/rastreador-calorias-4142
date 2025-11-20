"use client";

import { useState } from "react";
import { Camera, Plus, Flame, TrendingUp, Target, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface HomeTabProps {
  userData: any;
}

export default function HomeTab({ userData }: HomeTabProps) {
  const [caloriesConsumed, setCaloriesConsumed] = useState(1450);
  const caloriesGoal = 2000;
  const caloriesRemaining = caloriesGoal - caloriesConsumed;
  const progressPercentage = (caloriesConsumed / caloriesGoal) * 100;

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

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          size="lg"
          className="h-32 flex flex-col gap-3 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg"
        >
          <Camera className="h-8 w-8" />
          <span className="font-semibold">Escanear Refeição</span>
        </Button>
        <Button
          size="lg"
          className="h-32 flex flex-col gap-3 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg"
        >
          <Plus className="h-8 w-8" />
          <span className="font-semibold">Adicionar Manual</span>
        </Button>
      </div>

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
