"use client";

import { User, Mail, Calendar, Target, Bell, Globe, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ProfileTabProps {
  userData: any;
}

export default function ProfileTab({ userData }: ProfileTabProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold text-gray-900">Perfil</h1>
        <p className="text-gray-600 mt-1">Gerencie suas informações</p>
      </div>

      {/* Profile Card */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {userData?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {userData?.name || "Usuário"}
            </h2>
            <p className="text-gray-600">{userData?.email || "email@exemplo.com"}</p>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Editar Perfil
        </Button>
      </Card>

      {/* Personal Info */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Informações Pessoais
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <User className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Nome</p>
              <p className="font-medium text-gray-900">
                {userData?.name || "Não informado"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">
                {userData?.email || "Não informado"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Data de Nascimento</p>
              <p className="font-medium text-gray-900">
                {userData?.birthDate || "Não informado"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Goals */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Metas</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Target className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Objetivo</p>
              <p className="font-medium text-gray-900">
                {userData?.goal === "lose"
                  ? "Perder peso"
                  : userData?.goal === "gain"
                  ? "Ganhar peso"
                  : "Manter peso"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Target className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Peso Atual → Meta</p>
              <p className="font-medium text-gray-900">
                {userData?.currentWeight || "70"} kg → {userData?.targetWeight || "65"} kg
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Configurações</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-400" />
              <Label htmlFor="notifications" className="text-gray-900 cursor-pointer">
                Notificações
              </Label>
            </div>
            <Switch id="notifications" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-900 font-medium">Idioma</p>
                <p className="text-sm text-gray-500">Português (Brasil)</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Alterar
            </Button>
          </div>
        </div>
      </Card>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
      >
        <LogOut className="mr-2 h-5 w-5" />
        Sair da Conta
      </Button>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pb-4">
        <p>AI RC - Rastreador de Calorias</p>
        <p className="mt-1">Versão 1.0.0</p>
      </div>
    </div>
  );
}
