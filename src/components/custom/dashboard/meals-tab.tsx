"use client";

import { useState } from "react";
import { Camera, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MealsTab() {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const meals = [
    {
      id: "breakfast",
      name: "Café da manhã",
      time: "08:30",
      calories: 450,
      items: [
        { name: "Pão integral", calories: 150 },
        { name: "Ovos mexidos", calories: 200 },
        { name: "Café com leite", calories: 100 },
      ],
    },
    {
      id: "lunch",
      name: "Almoço",
      time: "12:45",
      calories: 650,
      items: [
        { name: "Arroz integral", calories: 200 },
        { name: "Frango grelhado", calories: 300 },
        { name: "Salada", calories: 150 },
      ],
    },
    {
      id: "snack",
      name: "Lanche",
      time: "16:00",
      calories: 350,
      items: [
        { name: "Iogurte grego", calories: 150 },
        { name: "Granola", calories: 200 },
      ],
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold text-gray-900">Refeições</h1>
        <p className="text-gray-600 mt-1">Registre suas refeições diárias</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          size="lg"
          className="h-24 flex flex-col gap-2 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg"
        >
          <Camera className="h-7 w-7" />
          <span className="font-semibold">Escanear com IA</span>
        </Button>
        <Button
          size="lg"
          className="h-24 flex flex-col gap-2 bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 shadow-lg"
        >
          <Plus className="h-7 w-7" />
          <span className="font-semibold">Adicionar Manual</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Buscar alimentos..."
          className="pl-10 h-12 text-lg"
        />
      </div>

      {/* Meal Categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full grid grid-cols-4 h-12">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="breakfast">Manhã</TabsTrigger>
          <TabsTrigger value="lunch">Almoço</TabsTrigger>
          <TabsTrigger value="dinner">Jantar</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {meals.map((meal) => (
            <Card key={meal.id} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{meal.name}</h3>
                  <p className="text-sm text-gray-500">{meal.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">
                    {meal.calories}
                  </p>
                  <p className="text-sm text-gray-500">kcal</p>
                </div>
              </div>
              <div className="space-y-2">
                {meal.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.calories} kcal
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={() => setSelectedMeal(meal.id)}
              >
                Adicionar item
              </Button>
            </Card>
          ))}

          {/* Add New Meal */}
          <Card className="p-6 border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors cursor-pointer">
            <div className="flex flex-col items-center justify-center gap-3 text-gray-500 hover:text-purple-600 transition-colors">
              <Plus className="h-8 w-8" />
              <span className="font-medium">Adicionar nova refeição</span>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="breakfast" className="mt-6">
          <Card className="p-6">
            <p className="text-center text-gray-500">
              Nenhuma refeição registrada para o café da manhã
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="lunch" className="mt-6">
          <Card className="p-6">
            <p className="text-center text-gray-500">
              Nenhuma refeição registrada para o almoço
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="dinner" className="mt-6">
          <Card className="p-6">
            <p className="text-center text-gray-500">
              Nenhuma refeição registrada para o jantar
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Suggestion */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          💡 Sugestão da IA
        </h3>
        <p className="text-gray-700 mb-3">
          Baseado no seu objetivo, que tal adicionar mais proteínas no jantar?
        </p>
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Ver receitas
        </Button>
      </Card>
    </div>
  );
}
