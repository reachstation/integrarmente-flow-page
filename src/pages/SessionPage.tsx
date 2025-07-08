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

    console.log('=== INICIANDO WEBHOOK ===');
    console.log('URL do Webhook:', webhookUrl);
    console.log('Mensagem do usuário:', currentMessageText);

    try {
      // Payload otimizado com dados essenciais
      const payload = {
        event: 'message_sent',
        data: {
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
            pageUrl: window.location.href,
            referrer: document.referrer
          }
        }
      };
      
      console.log('=== PAYLOAD SENDO ENVIADO ===');
      console.log(JSON.stringify(payload, null, 2));
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'User-Agent': navigator.userAgent
        },
        body: JSON.stringify(payload),
      });
      
      console.log('=== RESPOSTA DO WEBHOOK ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));
      
      let aiText = 'Desculpe, houve um erro ao obter resposta do agente.';
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);
        
        try {
          if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            console.log('Resposta JSON:', responseData);
            
            // Tenta diferentes campos para a resposta
            aiText = responseData.message || 
                     responseData.response || 
                     responseData.text || 
                     responseData.reply || 
                     responseData.data?.message ||
                     responseData.data?.response ||
                     'Resposta recebida mas formato não reconhecido.';
          } else {
            aiText = await response.text();
            console.log('Resposta em texto:', aiText);
          }
        } catch (parseError) {
          console.error('Erro ao parsear resposta:', parseError);
          aiText = 'Erro ao processar resposta do agente.';
        }
      } else {
        console.error('=== ERRO NO WEBHOOK ===');
        console.error('Status:', response.status);
        console.error('Status Text:', response.statusText);
        
        try {
          const errorText = await response.text();
          console.error('Erro detalhado:', errorText);
          aiText = `Erro ${response.status}: ${response.statusText}`;
        } catch (e) {
          console.error('Erro ao ler resposta de erro:', e);
        }
      }
      
      console.log('=== RESPOSTA FINAL DO AGENTE ===');
      console.log('Texto:', aiText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('=== ERRO DE REDE/CONEXÃO ===');
      console.error('Erro completo:', error);
      console.error('Nome do erro:', error instanceof Error ? error.name : 'Desconhecido');
      console.error('Mensagem do erro:', error instanceof Error ? error.message : String(error));
      
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'Erro de conexão com o servidor. Verifique sua internet e tente novamente.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      console.log('=== WEBHOOK FINALIZADO ===');
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