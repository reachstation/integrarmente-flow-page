import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const SessionPage = () => {
  // Generate or get user ID from localStorage
  const getUserId = () => {
    let userId = localStorage.getItem('integrarmente_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('integrarmente_user_id', userId);
    }
    return userId;
  };

  // Generate session ID on each page load
  const [sessionId] = useState(() => 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
  const [userId] = useState(() => getUserId());
  const [sessionStartTime] = useState(() => new Date().toISOString());

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
        userId: userId,
        sessionId: sessionId,
        text: inputText,
        timestamp: new Date().toISOString(),
        sessionStartTime: sessionStartTime,
        messageCount: messages.length + 1,
        history: messages.map(msg => ({ 
          text: msg.text, 
          isUser: msg.isUser,
          timestamp: msg.timestamp.toISOString()
        })),
      };
      
      console.log('Enviando para n8n:', payload);
      
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

  return (
    <div className="flex flex-col h-screen bg-muted">
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-xl mx-auto flex flex-col space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  msg.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white text-black border'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form
        className="w-full max-w-xl mx-auto flex gap-2 p-4 bg-background"
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <Input
          type="text"
          placeholder="Digite sua mensagem..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={!isSessionActive || isLoading}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={!inputText.trim() || isLoading || !isSessionActive}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>
    </div>
  );
};

export default SessionPage;