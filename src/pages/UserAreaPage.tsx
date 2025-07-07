
import React from 'react';
import { Calendar, MessageSquare, BarChart3, CheckSquare, FileText, Settings, LogOut, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';

const UserAreaPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <GlobalNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo, Maria</h1>
          <Link to="/sessao">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Iniciar Sessão Agora
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resumo da Semana */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Resumo da Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Esta semana você demonstrou progresso significativo no controle da ansiedade. 
                Completou 2 de 3 sessões programadas e realizou 4 das 5 tarefas semanais. 
                Seu nível de estresse diminuiu 20% comparado à semana anterior.
              </p>
            </CardContent>
          </Card>

          {/* Humor Recente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Humor Recente</CardTitle>
              <CardDescription>Últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-600">Gráfico de humor em tendência positiva ↗️</p>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Ansiedade: -15% • Motivação: +25%
              </p>
            </CardContent>
          </Card>

          {/* Tarefas em Aberto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tarefas em Aberto</CardTitle>
              <CardDescription>3 pendentes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Exercício de respiração</span>
                <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">Pendente</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Diário de gratidão</span>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Concluída</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reestruturação cognitiva</span>
                <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">Pendente</span>
              </div>
              <Link to="/tarefas">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Ver todas as tarefas
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Próxima Sessão */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próxima Sessão Agendada</CardTitle>
              <CardDescription>Quinta-feira, 14:30</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <p className="text-sm text-gray-600">
                  Tema sugerido: Técnicas de relaxamento e mindfulness
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Baseado no seu progresso atual
                </p>
              </div>
              <div className="flex gap-2">
                <Link to="/calendario">
                  <Button variant="outline" size="sm">
                    Ver Calendário
                  </Button>
                </Link>
                <Link to="/sessao">
                  <Button size="sm">
                    Iniciar Agora
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserAreaPage;
