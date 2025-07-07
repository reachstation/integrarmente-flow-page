import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Download,
  ArrowLeft,
  Clock,
  Filter
} from 'lucide-react';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';

interface SessionNote {
  id: number;
  date: Date;
  duration: number;
  emotion: string;
  topic: string;
  summary: string;
  fullNotes: string;
  type: 'session' | 'task';
}

const NotesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<SessionNote | null>(null);

  // Mock data for session notes
  const [sessionNotes, setSessionNotes] = useState<SessionNote[]>([
    {
      id: 1,
      date: new Date(2024, 0, 15),
      duration: 30,
      emotion: 'Calmo',
      topic: 'Estratégias de enfrentamento',
      summary: 'Discussão sobre técnicas de respiração e mindfulness para lidar com a ansiedade.',
      fullNotes: 'Durante a sessão, exploramos diferentes técnicas de respiração e mindfulness para ajudar a lidar com a ansiedade em situações de estresse. Foi recomendado praticar esses exercícios diariamente.',
      type: 'session'
    },
    {
      id: 2,
      date: new Date(2024, 0, 10),
      duration: 0,
      emotion: 'Neutro',
      topic: 'Registro de pensamentos',
      summary: 'Preenchimento do registro de pensamentos ABC para identificar padrões negativos.',
      fullNotes: 'O registro de pensamentos ABC foi preenchido com o objetivo de identificar padrões de pensamento negativos e distorções cognitivas. Foram identificadas algumas situações em que o paciente tende a ter pensamentos automáticos negativos.',
      type: 'task'
    },
    {
      id: 3,
      date: new Date(2023, 11, 28),
      duration: 25,
      emotion: 'Motivado',
      topic: 'Definição de metas',
      summary: 'Definição de metas realistas e alcançáveis para o próximo mês.',
      fullNotes: 'A sessão foi focada na definição de metas realistas e alcançáveis para o próximo mês. O paciente se mostrou motivado e engajado no processo.',
      type: 'session'
    },
  ]);

  const filteredNotes = sessionNotes.filter(note => {
    const searchTermLower = searchTerm.toLowerCase();
    const topicLower = note.topic.toLowerCase();
    const summaryLower = note.summary.toLowerCase();

    const matchesSearch = topicLower.includes(searchTermLower) || summaryLower.includes(searchTermLower);
    const matchesType = filterType === 'all' || note.type === filterType;

    return matchesSearch && matchesType;
  });

  const openNoteModal = (note: SessionNote) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeNoteModal = () => {
    setIsModalOpen(false);
  };

  const totalSessions = sessionNotes.filter(note => note.type === 'session').length;
  const totalTasks = sessionNotes.filter(note => note.type === 'task').length;
  const averageSessionDuration = sessionNotes.filter(note => note.type === 'session').reduce((acc, note) => acc + note.duration, 0) / totalSessions || 0;

  const exportToPDF = () => {
    alert('Exportar para PDF (implementação futura)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <GlobalNavigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Link to="/usuario">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao meu espaço
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                  <FileText className="w-8 h-8 mr-3 text-blue-600" />
                  Minhas Sessões e Notas
                </h1>
              </div>
              <p className="text-gray-600">Histórico completo das suas sessões e anotações terapêuticas</p>
            </div>
            <Button 
              onClick={exportToPDF}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <Input
              type="search"
              placeholder="Buscar por tópico ou resumo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-50 border-gray-200 focus:border-blue-300"
            />
          </div>
          <div>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Filter className="w-4 h-4" />
              Filtrar por
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-blue-50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Sessões Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-700">{totalSessions}</div>
              <p className="text-sm text-gray-600">Sessões terapêuticas realizadas</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Tarefas Concluídas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-700">{totalTasks}</div>
              <p className="text-sm text-gray-600">Tarefas e exercícios finalizados</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Tempo em Sessões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-700">{averageSessionDuration}m</div>
              <p className="text-sm text-gray-600">Tempo médio por sessão</p>
            </CardContent>
          </Card>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{note.topic}</h3>
                    <p className="text-gray-600 text-sm mt-1">{note.summary}</p>
                    <div className="flex items-center text-gray-500 text-xs mt-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {note.date.toLocaleDateString()}
                      {note.type === 'session' && (
                        <>
                          <span className="mx-2">•</span>
                          <Clock className="w-3 h-3 mr-1" />
                          {note.duration} minutos
                        </>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => openNoteModal(note)}>
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Session Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedNote?.topic}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Data:</p>
                <p className="text-gray-600">{selectedNote?.date.toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Tipo:</p>
                <Badge className="bg-blue-100 text-blue-700">{selectedNote?.type === 'session' ? 'Sessão' : 'Tarefa'}</Badge>
              </div>
              {selectedNote?.type === 'session' && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Duração:</p>
                  <p className="text-gray-600">{selectedNote?.duration} minutos</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">Emoção:</p>
                <p className="text-gray-600">{selectedNote?.emotion}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Resumo:</p>
              <p className="text-gray-600">{selectedNote?.summary}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Anotações Completas:</p>
              <p className="text-gray-600 whitespace-pre-line">{selectedNote?.fullNotes}</p>
            </div>
            <Button onClick={closeNoteModal} className="mt-6">Fechar</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NotesPage;
