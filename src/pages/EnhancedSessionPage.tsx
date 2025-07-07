
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Mic, Send, Square, Pause, FileText, CheckSquare, TrendingUp } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

const EnhancedSessionPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Que bom estar com você hoje. Como você está se sentindo neste momento?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [weeklyTasks, setWeeklyTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete seu registro de pensamentos no modelo ABC',
      description: 'Identifique 3 situações desta semana onde você sentiu ansiedade. Para cada uma, anote: A) Situação, B) Pensamento automático, C) Emoção resultante.',
      completed: false,
      createdAt: new Date()
    }
  ]);
  const [isSessionPaused, setIsSessionPaused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim() || isSessionPaused) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Obrigado por compartilhar isso comigo. É importante que você reconheça esses sentimentos. Vamos explorar um pouco mais - o que você acha que pode estar contribuindo para você se sentir assim?",
        "Entendo. Na Terapia Cognitivo-Comportamental, observamos como nossos pensamentos influenciam nossas emoções. Quando você teve esse sentimento, que pensamentos passaram pela sua cabeça?",
        "Isso é muito válido. Vamos tentar identificar se há algum padrão nesses pensamentos. Você já percebeu se costuma pensar assim em outras situações similares?",
        "Muito bem! Essa consciência já é um grande passo. Agora vamos trabalhar em estratégias para lidar com esses pensamentos de forma mais equilibrada."
      ];
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      
      // Update session notes
      setSessionNotes(prev => 
        prev + `\n• ${new Date().toLocaleTimeString()}: Cliente expressou ${newMessage.text.substring(0, 50)}...`
      );
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEndSession = () => {
    const finalMessage: Message = {
      id: messages.length + 1,
      text: "Parabéns por concluir mais uma etapa da sua jornada. Pequenos passos levam a grandes transformações. Já deixei uma tarefa sugerida para você na aba lateral. Até a próxima sessão!",
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, finalMessage]);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setWeeklyTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-green-50 flex">
      {/* Chat Area - Left Panel */}
      <div className="flex-1 flex flex-col max-w-4xl">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800">
              Sessão em andamento
            </h1>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsSessionPaused(!isSessionPaused)}
                variant="outline"
                size="sm"
                className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
              >
                <Pause className="w-4 h-4 mr-2" />
                {isSessionPaused ? 'Continuar' : 'Pausar'} sessão
              </Button>
              <Button
                onClick={handleEndSession}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Square className="w-4 h-4 mr-2" />
                Encerrar sessão
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 shadow-sm rounded-bl-sm border'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t">
          <div className="flex gap-3 items-end">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite aqui ou fale comigo quando quiser..."
              className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              disabled={isSessionPaused}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 hover:bg-blue-50 p-3"
                disabled={isSessionPaused}
              >
                <Mic className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isSessionPaused}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-96 bg-white border-l shadow-lg">
        <Tabs defaultValue="notes" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 m-4">
            <TabsTrigger value="notes" className="text-xs">
              <FileText className="w-4 h-4 mr-1" />
              Notas
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">
              <CheckSquare className="w-4 h-4 mr-1" />
              Tarefas
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-xs">
              <TrendingUp className="w-4 h-4 mr-1" />
              Progresso
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="notes" className="h-full p-4 pt-0">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-sm">Notas da Sessão</CardTitle>
                  <p className="text-xs text-gray-600">
                    Aqui você encontrará um resumo dos pontos mais importantes que discutimos.
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <Textarea
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="As notas da sessão aparecerão aqui automaticamente..."
                    className="h-64 resize-none"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="h-full p-4 pt-0">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-sm">Tarefa da Semana</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weeklyTasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="mt-1 text-blue-600"
                        />
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-2">
                            {task.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="h-full p-4 pt-0">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-sm">Progresso Emocional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800 font-medium mb-2">
                      Esta semana
                    </p>
                    <p className="text-xs text-green-700">
                      Você relatou níveis de ansiedade mais baixos nesta semana. Continue praticando as técnicas de respiração!
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      Progresso geral
                    </p>
                    <p className="text-xs text-blue-700">
                      5 sessões concluídas este mês. Você está desenvolvendo maior consciência emocional.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedSessionPage;
