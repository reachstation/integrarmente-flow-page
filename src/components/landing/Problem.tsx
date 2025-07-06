
import React from 'react';
import { AlertCircle, Clock, DollarSign, Heart } from 'lucide-react';

const Problem = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Você sente que está <span className="text-red-600">estagnado emocionalmente</span>, mas não tem tempo, dinheiro ou coragem para começar uma terapia tradicional?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100">
            <Clock className="w-12 h-12 text-red-500 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">A rotina atropela</h3>
            <p className="text-gray-600">Horários rígidos e deslocamento tornam impossível manter consistência no cuidado emocional.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100">
            <DollarSign className="w-12 h-12 text-red-500 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Os custos são altos</h3>
            <p className="text-gray-600">Sessões custam entre R$100-300, tornando o tratamento inacessível para a maioria.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100">
            <Heart className="w-12 h-12 text-red-500 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Falta coragem</h3>
            <p className="text-gray-600">O primeiro passo para marcar uma sessão pode parecer inalcançável.</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-12 rounded-3xl text-center border-l-4 border-red-400">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Você não está sozinho.</h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Mais de <strong className="text-red-600">40 milhões de brasileiros</strong> sofrem com ansiedade ou depressão – e menos de <strong className="text-red-600">20%</strong> têm acesso a acompanhamento adequado.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
