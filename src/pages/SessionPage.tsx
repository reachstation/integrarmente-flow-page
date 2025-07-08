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
  const webhookUrl = 'https://n8n.rcdigitais.com.br/webhook-test/Integrarmente-saas';
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    setIsLoading(true);

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    try {
      const payload = {
        text: inputText,
        timestamp: new Date().toISOString(),
        history: messages.map(msg => ({ text: msg.text, isUser: msg.isUser })),
      };
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const aiText = response.ok ? await response.text() : 'Desculpe, houve um erro ao obter resposta.';
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'Erro de conexão. Tente novamente.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
};

export default SessionPage;
