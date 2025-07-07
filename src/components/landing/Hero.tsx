
import React from 'react';
import { Brain, Check, MessageCircle, BarChart3, Calendar, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-green-100/40"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      {/* Fixed Login Button - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <Link to="/cadastro">
          <Button 
            variant="ghost"
            className="border border-blue-300 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-sm bg-white/80 backdrop-blur-sm shadow-sm"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Entrar
          </Button>
        </Link>
      </div>
      
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center mb-8">
          <Brain className="w-12 h-12 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">IntegrarMente</h1>
        </div>
        
        {/* Main headline */}
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Transforme sua saúde mental com sessões{' '}
          <span className="text-blue-600">personalizadas 3x por semana</span>
        </h2>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
          Terapia Cognitivo-Comportamental com IA treinada para te acompanhar e te fazer avançar.<br />
          Sinta-se ouvido, evolua com clareza e veja o progresso acontecer.
        </p>
        
        {/* Benefits list */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            <Check className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-gray-800 font-medium">Atendimento por chat ou voz</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            <Check className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-gray-800 font-medium">Relatórios automáticos do seu avanço</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            <Check className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-gray-800 font-medium">Agenda terapêutica inteligente</span>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="space-y-4">
          <Link to="/onboarding">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 mr-4"
            >
              Comece sua jornada gratuitamente
            </Button>
          </Link>
          
          <Link to="/teste-gratuito">
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg rounded-full transition-all duration-300"
            >
              Teste gratuito de 3 minutos
            </Button>
          </Link>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <MessageCircle className="w-12 h-12 text-blue-500 mb-4" />
            <p className="text-gray-600 text-sm">Chat ou Voz</p>
          </div>
          <div className="flex flex-col items-center">
            <BarChart3 className="w-12 h-12 text-green-500 mb-4" />
            <p className="text-gray-600 text-sm">Progresso Visual</p>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="w-12 h-12 text-purple-500 mb-4" />
            <p className="text-gray-600 text-sm">Agenda Inteligente</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
