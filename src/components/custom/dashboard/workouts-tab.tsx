"use client";

import { useState } from "react";
import { Play, MapPin, Clock, Flame, Activity, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WorkoutsTab() {
  const workouts = [
    {
      id: 1,
      type: "Corrida",
      date: "Hoje, 07:30",
      duration: "35 min",
      distance: "5.2 km",
      calories: 320,
      pace: "6:44 /km",
    },
    {
      id: 2,
      type: "Caminhada",
      date: "Ontem, 18:00",
      duration: "45 min",
      distance: "3.8 km",
      calories: 180,
      pace: "11:50 /km",
    },
    {
      id: 3,
      type: "Treino",
      date: "23 Jan, 06:00",
      duration: "50 min",
      distance: "-",
      calories: 400,
      pace: "-",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold text-gray-900">Treinos</h1>
        <p className="text-gray-600 mt-1">Registre suas atividades físicas</p>
      </div>

      {/* Quick Start */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          size="lg"
          className="h-32 flex flex-col gap-3 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg"
        >
          <Play className="h-8 w-8" />
          <span className="font-semibold">Iniciar Corrida</span>
        </Button>
        <Button
          size="lg"
          className="h-32 flex flex-col gap-3 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-0 shadow-lg"
        >
          <Activity className="h-8 w-8" />
          <span className="font-semibold">Iniciar Treino</span>
        </Button>
      </div>

      {/* Weekly Stats */}
      <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl">
        <h3 className="text-lg font-semibold mb-4 opacity-90">
          Estatísticas da Semana
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm opacity-90 mt-1">Treinos</p>
          </div>
          <div>
            <p className="text-3xl font-bold">18.5</p>
            <p className="text-sm opacity-90 mt-1">km</p>
          </div>
          <div>
            <p className="text-3xl font-bold">1,450</p>
            <p className="text-sm opacity-90 mt-1">kcal</p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-12">
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="plans">Planos</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4 mt-6">
          {workouts.map((workout) => (
            <Card key={workout.id} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {workout.type}
                  </h3>
                  <p className="text-sm text-gray-500">{workout.date}</p>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Completo
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Duração</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {workout.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Distância</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {workout.distance}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Calorias</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {workout.calories} kcal
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Ritmo</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {workout.pace}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="plans" className="space-y-4 mt-6">
          {/* Workout Plans */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Planos de Treino
            </h3>
            <div className="space-y-3">
              {[
                {
                  name: "Iniciante - Corrida",
                  duration: "4 semanas",
                  level: "Fácil",
                },
                {
                  name: "Perda de Peso",
                  duration: "8 semanas",
                  level: "Moderado",
                },
                {
                  name: "Ganho de Massa",
                  duration: "12 semanas",
                  level: "Avançado",
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {plan.duration} • {plan.level}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Iniciar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Premium Feature */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-400 rounded-xl">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Planos Premium
                </h3>
                <p className="text-gray-700 mb-3">
                  Acesse treinos exclusivos e personalizados
                </p>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  Ver Planos
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Smartwatch Connection */}
      <Card className="p-6 border-2 border-dashed border-gray-300">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Activity className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">Conectar Smartwatch</h3>
            <p className="text-sm text-gray-600 mt-1">
              Sincronize seus dados automaticamente
            </p>
          </div>
          <Button variant="outline" size="sm">
            Conectar
          </Button>
        </div>
      </Card>
    </div>
  );
}
