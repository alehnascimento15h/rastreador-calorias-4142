"use client";

import { TrendingDown, TrendingUp, Calendar, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProgressTabProps {
  userData: any;
}

export default function ProgressTab({ userData }: ProgressTabProps) {
  const currentWeight = 72;
  const targetWeight = userData?.targetWeight || 65;
  const startWeight = userData?.currentWeight || 75;
  const weightLost = startWeight - currentWeight;
  const weightToGo = currentWeight - targetWeight;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold text-gray-900">Progresso</h1>
        <p className="text-gray-600 mt-1">Acompanhe sua evolução</p>
      </div>

      {/* Weight Progress Card */}
      <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90">Peso Atual</p>
            <h2 className="text-5xl font-bold mt-1">{currentWeight}</h2>
            <p className="text-sm opacity-90 mt-1">kg</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Meta</p>
            <h3 className="text-4xl font-bold mt-1">{targetWeight}</h3>
            <p className="text-sm opacity-90 mt-1">kg</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            <span className="font-semibold">Perdeu {weightLost}kg</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            <span className="font-semibold">Faltam {weightToGo}kg</span>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Dias Ativos</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">28</p>
          <p className="text-sm text-gray-500 mt-1">Este mês</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Sequência</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-500 mt-1">Dias seguidos</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="weight" className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-12">
          <TabsTrigger value="weight">Peso</TabsTrigger>
          <TabsTrigger value="calories">Calorias</TabsTrigger>
          <TabsTrigger value="workouts">Treinos</TabsTrigger>
        </TabsList>

        <TabsContent value="weight" className="space-y-4 mt-6">
          {/* Weight Chart Placeholder */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Evolução do Peso
            </h3>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingDown className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="font-medium">Gráfico de evolução</p>
                <p className="text-sm mt-1">Últimos 30 dias</p>
              </div>
            </div>
          </Card>

          {/* Weight History */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Histórico</h3>
            <div className="space-y-3">
              {[
                { date: "Hoje", weight: 72, change: -0.3 },
                { date: "Ontem", weight: 72.3, change: -0.2 },
                { date: "2 dias atrás", weight: 72.5, change: -0.4 },
                { date: "3 dias atrás", weight: 72.9, change: -0.1 },
              ].map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{entry.date}</p>
                    <p className="text-sm text-gray-500">{entry.weight} kg</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      entry.change < 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {entry.change < 0 ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : (
                      <TrendingUp className="h-4 w-4" />
                    )}
                    {Math.abs(entry.change)} kg
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="calories" className="space-y-4 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Média Semanal de Calorias
            </h3>
            <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="font-medium">Gráfico de calorias</p>
                <p className="text-sm mt-1">Últimos 7 dias</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5">
              <p className="text-sm text-gray-600 mb-2">Média Diária</p>
              <p className="text-3xl font-bold text-gray-900">1,850</p>
              <p className="text-sm text-gray-500 mt-1">kcal</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm text-gray-600 mb-2">Meta Diária</p>
              <p className="text-3xl font-bold text-gray-900">2,000</p>
              <p className="text-sm text-gray-500 mt-1">kcal</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-4 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Treinos por Semana
            </h3>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="font-medium">Gráfico de treinos</p>
                <p className="text-sm mt-1">Últimas 4 semanas</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5">
              <p className="text-sm text-gray-600 mb-2">Esta Semana</p>
              <p className="text-3xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-500 mt-1">treinos</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm text-gray-600 mb-2">Meta Semanal</p>
              <p className="text-3xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-500 mt-1">treinos</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Achievements */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Conquistas 🏆</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { emoji: "🔥", name: "7 dias", unlocked: true },
            { emoji: "💪", name: "10 treinos", unlocked: true },
            { emoji: "🎯", name: "Meta atingida", unlocked: true },
            { emoji: "⭐", name: "30 dias", unlocked: false },
            { emoji: "🏃", name: "50km", unlocked: false },
            { emoji: "👑", name: "100 dias", unlocked: false },
          ].map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl text-center ${
                achievement.unlocked
                  ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300"
                  : "bg-gray-100 opacity-50"
              }`}
            >
              <div className="text-3xl mb-2">{achievement.emoji}</div>
              <p className="text-xs font-medium text-gray-900">
                {achievement.name}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
