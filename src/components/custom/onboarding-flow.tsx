"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Star } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthDate: "",
    gender: "",
    workoutsPerWeek: "",
    goal: "",
    currentWeight: "",
    targetWeight: "",
    obstacles: [] as string[],
    achievements: [] as string[],
  });

  const totalSteps = 8;

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleArrayItem = (field: string, value: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    if (currentArray.includes(value)) {
      updateFormData(
        field,
        currentArray.filter((item) => item !== value)
      );
    } else {
      updateFormData(field, [...currentArray, value]);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full">
        {/* Step 1: Nome */}
        {step === 1 && (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Bem-vindo ao AI RC! 👋
              </h2>
              <p className="text-gray-600">Vamos começar com o básico</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-900 font-medium">
                  Qual é o seu nome?
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder="Digite seu nome"
                  className="mt-2 h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-900 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="seu@email.com"
                  className="mt-2 h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-900 font-medium">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="••••••••"
                  className="mt-2 h-12 text-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Data de nascimento e gênero */}
        {step === 2 && (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Conte-nos mais sobre você
              </h2>
              <p className="text-gray-600">Isso nos ajuda a personalizar sua experiência</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="birthDate" className="text-gray-900 font-medium">
                  Data de nascimento
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateFormData("birthDate", e.target.value)}
                  className="mt-2 h-12 text-lg"
                />
              </div>
              <div>
                <Label className="text-gray-900 font-medium mb-3 block">
                  Gênero (opcional)
                </Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => updateFormData("gender", value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="flex-1 cursor-pointer text-gray-900">
                      Masculino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="flex-1 cursor-pointer text-gray-900">
                      Feminino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="flex-1 cursor-pointer text-gray-900">
                      Outro
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Treinos por semana */}
        {step === 3 && (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Quantos treinos faz por semana? 💪
              </h2>
              <p className="text-gray-600">Isso nos ajuda a calcular suas metas</p>
            </div>
            <RadioGroup
              value={formData.workoutsPerWeek}
              onValueChange={(value) => updateFormData("workoutsPerWeek", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer">
                <RadioGroupItem value="2" id="workout-2" />
                <Label htmlFor="workout-2" className="flex-1 cursor-pointer text-lg text-gray-900">
                  2 vezes por semana
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer">
                <RadioGroupItem value="3-5" id="workout-3-5" />
                <Label htmlFor="workout-3-5" className="flex-1 cursor-pointer text-lg text-gray-900">
                  3 a 5 vezes por semana
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer">
                <RadioGroupItem value="6+" id="workout-6" />
                <Label htmlFor="workout-6" className="flex-1 cursor-pointer text-lg text-gray-900">
                  6+ vezes por semana
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 4: Meta atual */}
        {step === 4 && (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Qual é sua meta atual? 🎯
              </h2>
              <p className="text-gray-600">Escolha o que melhor descreve seu objetivo</p>
            </div>
            <RadioGroup
              value={formData.goal}
              onValueChange={(value) => updateFormData("goal", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer">
                <RadioGroupItem value="lose" id="goal-lose" />
                <Label htmlFor="goal-lose" className="flex-1 cursor-pointer">
                  <div className="text-lg font-medium text-gray-900">Perder peso</div>
                  <div className="text-sm text-gray-500">Reduzir gordura corporal</div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer">
                <RadioGroupItem value="gain" id="goal-gain" />
                <Label htmlFor="goal-gain" className="flex-1 cursor-pointer">
                  <div className="text-lg font-medium text-gray-900">Ganhar peso</div>
                  <div className="text-sm text-gray-500">Aumentar massa muscular</div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer">
                <RadioGroupItem value="maintain" id="goal-maintain" />
                <Label htmlFor="goal-maintain" className="flex-1 cursor-pointer">
                  <div className="text-lg font-medium text-gray-900">Manter peso</div>
                  <div className="text-sm text-gray-500">Manter forma atual</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 5: Peso atual e desejado */}
        {step === 5 && (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Vamos definir suas metas ⚖️
              </h2>
              <p className="text-gray-600">Isso nos ajuda a calcular seu progresso</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentWeight" className="text-gray-900 font-medium">
                  Qual é seu peso atual? (kg)
                </Label>
                <Input
                  id="currentWeight"
                  type="number"
                  value={formData.currentWeight}
                  onChange={(e) => updateFormData("currentWeight", e.target.value)}
                  placeholder="70"
                  className="mt-2 h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="targetWeight" className="text-gray-900 font-medium">
                  Qual é seu peso desejado? (kg)
                </Label>
                <Input
                  id="targetWeight"
                  type="number"
                  value={formData.targetWeight}
                  onChange={(e) => updateFormData("targetWeight", e.target.value)}
                  placeholder="65"
                  className="mt-2 h-12 text-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Obstáculos */}
        {step === 6 && (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                O que está impedindo você? 🤔
              </h2>
              <p className="text-gray-600">Selecione todos que se aplicam</p>
            </div>
            <div className="space-y-3">
              {[
                { id: "consistency", label: "Falta de consistência" },
                { id: "habits", label: "Hábitos alimentares ruins" },
                { id: "support", label: "Falta de apoio" },
                { id: "schedule", label: "Agenda lotada" },
                { id: "inspiration", label: "Falta de inspiração para refeições" },
              ].map((obstacle) => (
                <div
                  key={obstacle.id}
                  className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer"
                  onClick={() => toggleArrayItem("obstacles", obstacle.id)}
                >
                  <Checkbox
                    id={obstacle.id}
                    checked={formData.obstacles.includes(obstacle.id)}
                    onCheckedChange={() => toggleArrayItem("obstacles", obstacle.id)}
                  />
                  <Label
                    htmlFor={obstacle.id}
                    className="flex-1 cursor-pointer text-gray-900"
                  >
                    {obstacle.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: O que gostaria de alcançar */}
        {step === 7 && (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                O que você gostaria de alcançar? ✨
              </h2>
              <p className="text-gray-600">Selecione todos que se aplicam</p>
            </div>
            <div className="space-y-3">
              {[
                { id: "healthy", label: "Comer e viver de forma mais saudável" },
                { id: "energy", label: "Aumentar energia e melhorar humor" },
                { id: "motivated", label: "Manter-se motivado e consistente" },
                { id: "confident", label: "Sentir-se melhor com o corpo" },
              ].map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer"
                  onClick={() => toggleArrayItem("achievements", achievement.id)}
                >
                  <Checkbox
                    id={achievement.id}
                    checked={formData.achievements.includes(achievement.id)}
                    onCheckedChange={() => toggleArrayItem("achievements", achievement.id)}
                  />
                  <Label
                    htmlFor={achievement.id}
                    className="flex-1 cursor-pointer text-gray-900"
                  >
                    {achievement.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 8: Prova social */}
        {step === 8 && (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Junte-se a milhares de usuários! 🌟
              </h2>
              <p className="text-gray-600">Veja o que nossos usuários dizem</p>
            </div>
            <div className="space-y-4">
              {[
                {
                  text: "Perdi 8kg em 2 meses com o AI RC, recomendo!",
                  author: "Maria S.",
                },
                {
                  text: "Aplicativo simples e completo, me ajudou muito!",
                  author: "João P.",
                },
                {
                  text: "A IA de calorias é surpreendente, amei!",
                  author: "Ana L.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100"
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-900 mb-2 italic">"{testimonial.text}"</p>
                  <p className="text-sm text-gray-600 font-medium">
                    - {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 w-full">
          {step > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 h-12 text-lg border-2"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1 h-12 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold"
          >
            {step === totalSteps ? "Começar" : "Continuar"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Step indicator */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Passo {step} de {totalSteps}
        </div>
      </div>
    </div>
  );
}
