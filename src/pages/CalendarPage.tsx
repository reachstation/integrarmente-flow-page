import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for events
  const events = {
    '2024-01-15': { type: 'session', title: 'Sessão de TCC', completed: true },
    '2024-01-17': { type: 'task', title: 'Exercício de respiração', completed: false },
    '2024-01-20': { type: 'session', title: 'Sessão agendada', completed: false },
    '2024-01-22': { type: 'task', title: 'Diário de gratidão', completed: true },
  };

  const getEventForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events[dateStr as keyof typeof events];
  };

  const handleDateClick = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const event = getEventForDate(date);
      if (event) {
        setIsModalOpen(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <GlobalNavigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <CalendarIcon className="w-8 h-8 mr-3 text-blue-600" />
            Calendário Terapêutico
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Janeiro 2024</CardTitle>
                <CardDescription>
                  Clique em um dia para ver detalhes das sessões e tarefas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateClick}
                  className="rounded-md border"
                  modifiers={{
                    session: (date) => {
                      const event = getEventForDate(date);
                      return event?.type === 'session';
                    },
                    task: (date) => {
                      const event = getEventForDate(date);
                      return event?.type === 'task';
                    },
                    completed: (date) => {
                      const event = getEventForDate(date);
                      return event?.completed === true;
                    }
                  }}
                  modifiersStyles={{
                    session: { backgroundColor: '#3b82f6', color: 'white' },
                    task: { backgroundColor: '#f59e0b', color: 'white' },
                    completed: { backgroundColor: '#10b981', color: 'white' }
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Legend and Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm">Sessões concluídas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm">Sessões agendadas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-amber-500 rounded"></div>
                  <span className="text-sm">Tarefas pendentes</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Mês</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Sessões realizadas</p>
                  <p className="text-2xl font-bold text-green-600">8</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Tarefas concluídas</p>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Próxima sessão</p>
                  <p className="text-sm text-gray-600">20 de Janeiro, 14:30</p>
                </div>
              </CardContent>
            </Card>

            <Link to="/sessao">
              <Button className="w-full">
                Agendar Nova Sessão
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDate?.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </DialogTitle>
            <DialogDescription>
              Detalhes do dia selecionado
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedDate && getEventForDate(selectedDate) && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">{getEventForDate(selectedDate)?.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Status: {getEventForDate(selectedDate)?.completed ? 'Concluída' : 'Pendente'}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    Reagendar
                  </Button>
                  {!getEventForDate(selectedDate)?.completed && (
                    <Button size="sm">
                      Marcar como Concluída
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
