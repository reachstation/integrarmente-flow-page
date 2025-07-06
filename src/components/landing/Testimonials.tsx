
import React from 'react';
import { Star, Quote, Shield, Award, Users } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
            💬 O que nossos usuários dizem:
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
            <div className="flex items-center mb-6">
              <Quote className="w-8 h-8 text-blue-500 mr-4" />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
              "Nunca imaginei que uma IA poderia me ajudar a entender meus padrões de pensamento assim. Me sinto mais consciente de mim e menos sozinho."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold">C</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">Camila</p>
                <p className="text-gray-600">29 anos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
            <div className="flex items-center mb-6">
              <Quote className="w-8 h-8 text-green-500 mr-4" />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
              "Consigo fazer sessões antes do trabalho e acompanhar minha evolução emocional. É como um diário que me responde."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-600 font-bold">R</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">Rodrigo</p>
                <p className="text-gray-600">35 anos</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-12 rounded-3xl text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">🧠 Baseado em métodos reconhecidos:</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h4 className="text-xl font-bold mb-2">Técnica TCC</h4>
              <p className="opacity-90">Validada clinicamente</p>
            </div>
            
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h4 className="text-xl font-bold mb-2">Diretrizes OMS</h4>
              <p className="opacity-90">Alinhado com bem-estar emocional</p>
            </div>
            
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h4 className="text-xl font-bold mb-2">Especialistas</h4>
              <p className="opacity-90">Desenvolvido com psicólogos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
