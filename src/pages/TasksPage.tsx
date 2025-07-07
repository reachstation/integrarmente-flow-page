
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckSquare, 
  Calendar, 
  Clock, 
  Plus,
  Edit3,
  Check,
  X
} from 'lucide-react';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';

interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  status: 'pending' | 'completed';
  response?: string;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete seu registro de pensamentos no modelo ABC',
      description: 'Identifique 3 situações desta semana onde você sentiu ansiedade. Para cada uma, anote: A) Situação, B) Pensamento automático, C) Emoção resultante.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'completed',
      response: 'Situação 1: Apresentação no trabalho\nPensamento: "Vou me esquecer de tudo"\nEmoção: Ansiedade intensa\n\nSituação 2: Encontro social\nPensamento: "Ninguém vai gostar de mim"\nEmoção: Nervosismo'
    },
    {
      id: 2,
      title: 'Pratique a técnica de respiração diafragmática',
      description: 'Faça o exercício de respiração 4-7-8 duas vezes por dia: inspire por 4 segundos, segure por 7, expire por 8. Anote como se sentiu antes e depois.',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: 3,
      title: 'Diário de gratidão',
      description: 'Escreva 3 coisas pelas quais você é grato a cada dia desta semana. Podem ser pequenas ou grandes, o importante é reconhecer os aspectos positivos.',
      createdAt: new Date(),
      status: 'pending'
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editResponse, setEditResponse] = useState('');

  const toggleTaskStatus = (taskId: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setEditResponse(task.response || '');
    setIsEditing(false);
  };

  const saveTaskResponse = () => {
    if (selectedTask) {
      setTasks(prev => 
        prev.map(task => 
          task.id === selectedTask.id 
            ? { ...task, response: editResponse, status: 'completed' }
            : task
        )
      );
      setSelectedTask({ ...selectedTask, response: editResponse, status: 'completed' });
      setIsEditing(false);
    }
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <GlobalNavigation />
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/usuario">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao meu espaço
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Minhas Tarefas</h1>
            </div>
            <div className="text-sm text-gray-600">
              {completedTasks} de {totalTasks} concluídas
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Progresso Semanal</h2>
              <span className="text-2xl font-bold text-blue-600">
                {Math.round((completedTasks / totalTasks) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Continue assim! Cada tarefa concluída é um passo importante na sua jornada.
            </p>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      task.status === 'completed'
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {task.status === 'completed' && <Check className="w-3 h-3" />}
                  </button>
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold text-gray-800 mb-2 ${
                      task.status === 'completed' ? 'line-through opacity-70' : ''
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {task.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {task.createdAt.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.status === 'completed' ? 'Concluída' : 'Pendente'}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => openTaskModal(task)}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        {task.response ? 'Ver resposta' : 'Preencher'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating Action Button */}
        <Link to="/sessao">
          <Button 
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </Link>
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{selectedTask.title}</CardTitle>
                <Button
                  onClick={() => setSelectedTask(null)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Instruções:</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedTask.description}
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">Sua resposta:</h4>
                  {selectedTask.response && !isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="ghost"
                      size="sm"
                      className="text-blue-600"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                  )}
                </div>
                
                {isEditing || !selectedTask.response ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editResponse}
                      onChange={(e) => setEditResponse(e.target.value)}
                      placeholder="Digite sua resposta aqui..."
                      className="min-h-32"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={saveTaskResponse}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Salvar
                      </Button>
                      {selectedTask.response && (
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                        >
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {selectedTask.response}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
