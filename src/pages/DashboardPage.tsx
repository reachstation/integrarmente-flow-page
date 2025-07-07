
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Calendar, 
  Target, 
  CheckSquare, 
  Play, 
  Settings, 
  LogOut,
  TrendingUp,
  Clock
} from 'lucide-react';

const DashboardPage = () => {
  const userName = "Ana"; // This would come from user context/auth

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Bem-vindo de volta, {userName}
            </h1>
            <div className="flex items-center gap-4">
              <Link to="/session">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar nova sessão
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <Link to="/session" className="flex-1">
            <Button className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg">
              <Play className="w-6 h-6 mr-3" />
              Iniciar nova sessão
            </Button>
          </Link>
          <Link to="/tasks" className="flex-1">
            <Button variant="outline" className="w-full h-16 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 text-lg">
              <CheckSquare className="w-6 h-6 mr-3" />
              Ver todas tarefas
            </Button>
          </Link>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Mood Chart Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
                Humor Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-20 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-end justify-center gap-1 p-2">
                  {[6, 7, 5, 8, 7, 8, 9].map((height, index) => (
                    <div
                      key={index}
                      className="bg-blue-500 rounded-sm flex-1 opacity-80"
                      style={{ height: `${height * 6}px` }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 text-center">
                  Tendência: <span className="text-green-600 font-medium">Melhorando</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Session History Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-green-600" />
                Histórico de Sessões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">12</div>
                  <div className="text-xs text-gray-600">Sessões este mês</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Última sessão:</span>
                    <span className="text-gray-800">Hoje, 14:30</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Duração média:</span>
                    <span className="text-gray-800">22 min</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Target className="w-4 h-4 mr-2 text-purple-600" />
                Minhas Metas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700">Reduzir ansiedade</span>
                    <span className="text-xs text-green-600">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700">Melhorar sono</span>
                    <span className="text-xs text-blue-600">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Tasks Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <CheckSquare className="w-4 h-4 mr-2 text-orange-600" />
                Tarefas da Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">2/5</div>
                  <div className="text-xs text-gray-600">Tarefas concluídas</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-700">Registro de pensamentos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-xs text-gray-500">Exercício de respiração</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-xs text-gray-500">Diário de gratidão</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Sessão concluída</p>
                  <p className="text-xs text-gray-600">Hoje às 14:30 • Duração: 25 min</p>
                </div>
                <span className="text-xs text-green-600 font-medium">Concluída</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Tarefa completada</p>
                  <p className="text-xs text-gray-600">Ontem às 09:15 • Registro de pensamentos ABC</p>
                </div>
                <span className="text-xs text-blue-600 font-medium">Completa</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Meta atualizada</p>
                  <p className="text-xs text-gray-600">2 dias atrás • "Reduzir ansiedade" - 70% progresso</p>
                </div>
                <span className="text-xs text-yellow-600 font-medium">Progresso</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Plano atual: Evolução</h3>
              <p className="text-sm text-gray-600">3 sessões por semana • Relatórios avançados</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Próxima cobrança: 15/01/2024</p>
              <Button variant="outline" size="sm" className="mt-2">
                Gerenciar plano
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
