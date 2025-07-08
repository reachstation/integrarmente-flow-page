import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';

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
  const webhookUrl = 'https://n8n.rcdigitais.com.br/webhook/integrarmente-sessao';
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
    const currentMessageText = inputText;
    setInputText('');

    try {
      // Comprehensive payload for n8n webhook
      const payload = {
        userId: userId,
        sessionId: sessionId,
        sessionStartTime: sessionStartTime,
        currentMessage: currentMessageText,
        messageCount: messages.length + 1,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        history: messages.map(msg => ({ 
          text: msg.text, 
          isUser: msg.isUser,
          timestamp: msg.timestamp.toISOString()
        })),
        sessionContext: {
          totalMessages: messages.length + 1,
          sessionDuration: Date.now() - new Date(sessionStartTime).getTime(),
          pageUrl: window.location.href
        }
      };
      
      console.log('Enviando payload para n8n:', JSON.stringify(payload, null, 2));
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify(payload),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      let aiText = 'Desculpe, houve um erro ao obter resposta.';
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        console.log('Content type:', contentType);
        
        if (contentType && contentType.includes('application/json')) {
          const responseData = await response.json();
          console.log('JSON response:', responseData);
          aiText = responseData.message || responseData.text || responseData.response || JSON.stringify(responseData);
        } else {
          aiText = await response.text();
          console.log('Text response:', aiText);
        }
      } else {
        console.error('Webhook failed with status:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erro ao chamar webhook:', error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'Erro de conexão com o servidor. Tente novamente.',
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
    <div className="min-h-screen bg-background">
      <GlobalNavigation />
      
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg px-4 py-3 max-w-[80%] ${
                      msg.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground border'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground border rounded-lg px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse">Pensando...</div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t bg-background p-4">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
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
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            
            {isSessionActive && (
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  onClick={handleEndSession}
                  className="text-destructive hover:text-destructive"
                >
                  Finalizar Sessão
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;