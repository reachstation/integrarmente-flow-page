
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mic, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const FreeTrialPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Que bom estar com você hoje. Como você está se sentindo neste momento?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isSessionEnded, setIsSessionEnded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timeLeft > 0 && !isSessionEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsSessionEnded(true);
    }
  }, [timeLeft, isSessionEnded]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || isSessionEnded) return;

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
        "Entendo. Isso é muito válido e importante. Pode me contar um pouco mais sobre o que tem contribuído para você se sentir assim?",
        "É normal ter essas sensações. Vamos tentar identificar juntos alguns padrões. O que você costuma pensar quando se sente dessa forma?",
        "Obrigado por compartilhar isso comigo. Na Terapia Cognitivo-Comportamental, exploramos a conexão entre nossos pensamentos, sentimentos e comportamentos. Você já percebeu alguma conexão assim?",
        "Muito bem! Reconhecer esses padrões já é um grande passo. Como você geralmente reage quando esses pensamentos aparecem?"
      ];
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isSessionEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Gostou da experiência?
          </h2>
          <p className="text-gray-600 mb-8">
            Cadastre-se gratuitamente e continue sua jornada emocional.
          </p>
          <Link to="/cadastro">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full text-lg font-medium">
              Criar minha conta agora
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="w-full mt-4 text-gray-600">
              Voltar para início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para a página inicial
            </Button>
          </Link>
          
          <h1 className="text-lg font-semibold text-gray-800 text-center flex-1">
            Teste gratuito - 3 minutos para começar sua evolução emocional
          </h1>
          
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-mono font-medium">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col p-4">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
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
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-2xl shadow-lg p-4 border">
          <div className="flex gap-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite aqui ou fale comigo..."
              className="flex-1 resize-none border-0 focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400"
              rows={1}
              disabled={isSessionEnded}
            />
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-50 p-2"
                disabled={isSessionEnded}
              >
                <Mic className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isSessionEnded}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialPage;
