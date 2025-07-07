
import React, { useState } from 'react';
import { FileText, Search, Download, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

const NotesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState<any>(null);

  // Mock data for sessions
  const sessions = [
    {
      id: 1,
      date: '2024-01-15',
      time: '14:30',
      emotion: 'Ansiedade',
      topic: 'Técnicas de respiração e mindfulness',
      summary: 'Sessão focada em exercícios de respiração para controle da ansiedade. Praticamos a técnica 4-7-8 e discutimos estratégias para momentos de crise.',
      notes: 'A paciente demonstrou boa receptividade às técnicas apresentadas. Relatou que já havia tentado meditação antes, mas sem orientação adequada. Mostrou-se motivada para praticar diariamente.'
    },
    {
      id: 2,
      date: '2024-01-10',
      time: '15:00',
      emotion: 'Estresse',
      topic: 'Reestruturação cognitiva',
      summary: 'Trabalhamos identificação e questionamento de pensamentos automáticos negativos relacionados ao trabalho.',
      notes: 'Identificamos padrões de pensamento catastrófico relacionados a prazos e avaliações profissionais. Aplicamos a técnica de questionamento socrático.'
    },
    {
      id: 3,
      date: '2024-01-05',
      time: '16:00',
      emotion: 'Tristeza',
      topic: 'Estabelecimento de metas e rotina',
      summary: 'Definimos objetivos terapêuticos e criamos uma rotina diária estruturada para melhorar o humor.',
      notes: 'Paciente estabeleceu 3 metas principais: melhorar qualidade do sono, retomar atividades prazerosas e fortalecer vínculos sociais.'
    }
  ];

  const filteredSessions = sessions.filter(session =>
    session.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.emotion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEmotionColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      'Ansiedade': 'bg-yellow-100 text-yellow-800',
      'Estresse': 'bg-red-100 text-red-800',
      'Tristeza': 'bg-blue-100 text-blue-800',
      'Raiva': 'bg-orange-100 text-orange-800',
      'Medo': 'bg-purple-100 text-purple-800'
    };
    return colors[emotion] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/usuario">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              Minhas Sessões e Notas
            </h1>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por tema, emoção ou conteúdo das notas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sessions List */}
        <div className="space-y-6">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{session.topic}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(session.date).toLocaleDateString('pt-BR')} às {session.time}
                      </span>
                    </CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEmotionColor(session.emotion)}`}>
                    <Tag className="w-3 h-3 mr-1 inline" />
                    {session.emotion}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{session.summary}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Ver Notas Completas
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{session.topic}</DialogTitle>
                      <DialogDescription>
                        Sessão de {new Date(session.date).toLocaleDateString('pt-BR')} às {session.time}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Resumo da Sessão</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{session.summary}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Notas Detalhadas</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{session.notes}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Emoção principal:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getEmotionColor(session.emotion)}`}>
                          {session.emotion}
                        </span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm ? 'Nenhuma sessão encontrada com os termos pesquisados.' : 'Nenhuma sessão registrada ainda.'}
              </p>
              <Link to="/sessao" className="inline-block mt-4">
                <Button>Iniciar Primera Sessão</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
