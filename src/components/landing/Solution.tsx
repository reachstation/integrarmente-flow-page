
import React from 'react';
import { Brain, MessageSquare, Mic, BarChart3, BookOpen, Calendar } from 'lucide-react';

const Solution = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Chegou a <span className="text-blue-600">IntegrarMente</span>: o primeiro terapeuta digital que acompanha seu progresso com <span className="text-green-600">empatia e método</span>
          </h2>
          
          <div className="bg-gradient-to-r from-blue-100 to-green-100 p-8 rounded-2xl inline-block">
            <p className="text-xl text-gray-800 font-medium">
              Baseado na <strong>Terapia Cognitivo-Comportamental</strong>
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sessões Inteligentes</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Sessões 3x por semana com um agente de IA empático e treinado especificamente para TCC
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-green-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sua Escolha</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Escolha entre voz ou chat, como você preferir e se sentir mais confortável
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-purple-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Progresso Visual</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Relatórios e gráficos de progresso emocional para você acompanhar sua evolução
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-orange-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Caderno Digital</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Tarefas entre sessões, como um caderno terapêutico digital personalizado
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-indigo-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Agenda Inteligente</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Sistema que te ajuda a criar consistência e manter o hábito terapêutico
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-green-500 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 text-white">
            <div className="flex items-center mb-6">
              <Mic className="w-12 h-12 mr-4" />
              <h3 className="text-xl font-bold">Flexibilidade Total</h3>
            </div>
            <p className="leading-relaxed opacity-90">
              Atendimento quando e como você quiser, adaptado ao seu ritmo de vida
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
