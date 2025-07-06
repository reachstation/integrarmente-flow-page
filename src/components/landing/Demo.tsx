
import React from 'react';
import { Play, Target, MessageCircle, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Demo = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
            Veja como funciona uma <span className="text-blue-600">sessão</span>:
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 h-full">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Defina sua meta</h3>
                <p className="text-gray-600 leading-relaxed">
                  "Quero reduzir minha ansiedade social"
                </p>
              </div>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-4 border-l-blue-600 border-y-4 border-y-transparent"></div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 h-full">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Converse</h3>
                <p className="text-gray-600 leading-relaxed">
                  A IA conversa por texto ou voz usando modelo TCC
                </p>
              </div>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-4 border-l-green-600 border-y-4 border-y-transparent"></div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 h-full">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-6">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Receba resumo</h3>
                <p className="text-gray-600 leading-relaxed">
                  Resumo + tarefa simples para a semana
                </p>
              </div>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-4 border-l-purple-600 border-y-4 border-y-transparent"></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-green-500 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-white h-full">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-6">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">4. Veja evolução</h3>
              <p className="leading-relaxed opacity-90">
                Em poucas semanas, progresso emocional visível
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300"
          >
            <Play className="w-6 h-6 mr-3" />
            Simular uma sessão agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Demo;
