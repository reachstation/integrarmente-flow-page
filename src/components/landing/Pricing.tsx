
import React from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
            Comece agora — escolha o plano ideal para seu <span className="text-blue-600">momento</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Essencial Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Essencial</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">
                R$59<span className="text-lg text-gray-600">/mês</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">2 sessões por semana</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">Atendimento por chat</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">Relatórios simples</span>
              </li>
            </ul>
            
            <Button 
              variant="outline" 
              className="w-full py-3 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Começar Essencial
            </Button>
          </div>
          
          {/* Evolução Plan - Featured */}
          <div className="bg-gradient-to-br from-blue-600 to-green-600 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-white relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold flex items-center">
                <Star className="w-4 h-4 mr-2" />
                MAIS POPULAR
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Evolução</h3>
              <div className="text-4xl font-bold mb-4">
                R$129<span className="text-lg opacity-80">/mês</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-300 mr-3" />
                <span>3 sessões por semana</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-300 mr-3" />
                <span>Voz e chat</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-300 mr-3" />
                <span>Agenda terapêutica</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-300 mr-3" />
                <span>Relatórios avançados</span>
              </li>
            </ul>
            
            <Button 
              className="w-full py-3 bg-white text-blue-600 hover:bg-gray-100 font-bold"
            >
              Começar Evolução
            </Button>
          </div>
          
          {/* Intensivo Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Intensivo</h3>
              <div className="text-4xl font-bold text-purple-600 mb-4">
                R$219<span className="text-lg text-gray-600">/mês</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">5 sessões por semana</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">Gráficos detalhados</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">Histórico completo</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">Exportação de dados</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">Rotina emocional</span>
              </li>
            </ul>
            
            <Button 
              variant="outline" 
              className="w-full py-3 border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Começar Intensivo
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xl text-gray-700 mb-8">
            Sem contratos. Sem julgamentos. Só cuidado e consistência.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg rounded-full"
            >
              Escolher meu plano
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-full"
            >
              Quero testar grátis primeiro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
