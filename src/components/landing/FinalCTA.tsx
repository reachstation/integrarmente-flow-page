
import React from 'react';
import { Shield, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FinalCTA = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-green-700">
      <div className="max-w-4xl mx-auto text-center text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
            <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">🔒 Privacidade total garantida</h3>
            <p className="text-lg opacity-90 leading-relaxed">
              Seu progresso é seu. Seus dados são seus. Seu bem-estar vem em primeiro lugar.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
            <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">💡 Resultado em 7 dias</h3>
            <p className="text-lg opacity-90 leading-relaxed">
              Comece agora e veja sua evolução em 7 dias – com total liberdade para cancelar a qualquer momento.
            </p>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            👉 Você merece esse cuidado.
          </h2>
        </div>
        
        <Button 
          size="lg" 
          className="bg-white text-blue-700 hover:bg-gray-100 px-12 py-6 text-2xl rounded-full shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 font-bold"
        >
          Comece gratuitamente agora mesmo
          <ArrowRight className="w-6 h-6 ml-3" />
        </Button>
        
        <p className="mt-8 text-lg opacity-80">
          Sem cartão de crédito. Sem compromisso. Só você e seu bem-estar.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
