"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Plus, Check, Trash2, Circle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  user_id: string;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [addingTask, setAddingTask] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        router.push('/auth');
        return;
      }

      setUser(session.user);
      loadTasks(session.user.id);
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      router.push('/auth');
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim() || !user) return;

    setAddingTask(true);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title: newTask.trim(),
            completed: false,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setTasks([data, ...tasks]);
      setNewTask("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    } finally {
      setAddingTask(false);
    }
  };

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !completed })
        .eq('id', taskId);

      if (error) throw error;

      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !completed } : task
      ));
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Minhas Tarefas
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {user?.email}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
          >
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Card */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Progresso</p>
              <p className="text-3xl font-bold mt-1">
                {completedCount} / {totalCount}
              </p>
            </div>
            <div className="text-right">
              <p className="text-purple-100 text-sm">Concluídas</p>
              <p className="text-3xl font-bold mt-1">
                {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
              </p>
            </div>
          </div>
        </Card>

        {/* Add Task */}
        <Card className="p-4 mb-6 bg-white/80 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              placeholder="Adicionar nova tarefa..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              className="flex-1"
              disabled={addingTask}
            />
            <Button 
              onClick={addTask}
              disabled={!newTask.trim() || addingTask}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <Card className="p-12 text-center bg-white/60 backdrop-blur-sm">
              <div className="text-gray-400 mb-4">
                <CheckCircle2 className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-600 font-medium">Nenhuma tarefa ainda</p>
              <p className="text-gray-500 text-sm mt-2">
                Adicione sua primeira tarefa acima
              </p>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card 
                key={task.id}
                className={`p-4 bg-white/80 backdrop-blur-sm transition-all hover:shadow-md ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id, task.completed)}
                    className="flex-shrink-0 transition-transform hover:scale-110"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-purple-500" />
                    )}
                  </button>
                  
                  <p className={`flex-1 ${
                    task.completed 
                      ? 'line-through text-gray-500' 
                      : 'text-gray-800'
                  }`}>
                    {task.title}
                  </p>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
