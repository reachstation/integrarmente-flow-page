import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Send, Square, Pause, BookOpen, Pin, TrendingUp } from 'lucide-react';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const SessionPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Que bom estar com você hoje. Como você está se sentindo neste momento?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Entendo. Pode me contar mais sobre isso? O que você sente quando isso acontece?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleEndSession = () => {
    const finalMessage: Message = {
      id: Date.now().toString(),
      text: 'Parabéns por concluir mais uma etapa da sua jornada. Pequenos passos levam a grandes transformações. Já deixei uma tarefa sugerida para você na aba lateral. Até a próxima sessão!',
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, finalMessage]);
    setIsSessionActive(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-beige-50">
      <GlobalNavigation />
      
      <div className="flex pt-16">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto p-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">Sessão em andamento</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto rounded-full"></div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-4 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                      message.isUser
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                        : 'bg-gradient-to-br from-green-100 to-green-50 text-gray-800 border border-green-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className={`text-xs mt-2 block ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {isSessionActive && (
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite aqui ou fale comigo quando quiser…"
                      className="pr-20 py-3 rounded-2xl border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                    />
                    <Button
                      onClick={() => setIsVoiceMode(!isVoiceMode)}
                      variant="ghost"
                      size="sm"
                      className={`absolute right-12 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full ${
                        isVoiceMode ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-blue-600'
                      }`}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-2xl px-6 py-3"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Session Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => setIsSessionActive(!isSessionActive)}
              variant="outline"
              className="rounded-full px-6 py-2 border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Pause className="h-4 w-4 mr-2" />
              Pausar sessão
            </Button>
            <Button
              onClick={handleEndSession}
              variant="outline" 
              className="rounded-full px-6 py-2 border-red-200 text-red-600 hover:bg-red-50"
            >
              <Square className="h-4 w-4 mr-2" />
              Encerrar sessão
            </Button>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 p-4 hidden lg:block">
          <Tabs defaultValue="notes" className="h-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="notes" className="rounded-xl">
                <BookOpen className="h-4 w-4 mr-1" />
                Notas
              </TabsTrigger>
              <TabsTrigger value="tasks" className="rounded-xl">
                <Pin className="h-4 w-4 mr-1" />
                Tarefa
              </TabsTrigger>
              <TabsTrigger value="progress" className="rounded-xl">
                <TrendingUp className="h-4 w-4 mr-1" />
                Progresso
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 h-full">
              <TabsContent value="notes" className="h-full">
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-700 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                      Notas da Sessão
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Aqui você encontrará um resumo dos pontos mais importantes que discutimos.
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-xl border-l-4 border-blue-400">
                        <p className="text-sm text-gray-700">
                          Hoje exploramos os gatilhos de ansiedade social
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-xl border-l-4 border-green-400">
                        <p className="text-sm text-gray-700">
                          Identificamos padrões de pensamento negativos
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tasks" className="h-full">
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-700 flex items-center">
                      <Pin className="h-5 w-5 mr-2 text-green-500" />
                      Tarefa da Semana
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-100">
                      <h4 className="font-medium text-gray-800 mb-2">Registro de Pensamentos ABC</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Complete seu registro de pensamentos no modelo ABC quando sentir ansiedade.
                      </p>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p><strong>A:</strong> Situação ativadora</p>
                        <p><strong>B:</strong> Pensamento/Crença</p>
                        <p><strong>C:</strong> Consequência emocional</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="h-full">
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-700 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                      Progresso Emocional
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-purple-50 rounded-xl">
                        <p className="text-sm text-gray-700 font-medium mb-1">Esta semana</p>
                        <p className="text-xs text-gray-600">
                          Você relatou níveis de ansiedade mais baixos nesta semana.
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <p className="text-sm text-gray-700 font-medium mb-1">Tendência geral</p>
                        <p className="text-xs text-gray-600">
                          Melhoria gradual no manejo de situações sociais.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;
