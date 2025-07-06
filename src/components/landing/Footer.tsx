
import React from 'react';
import { Brain, Shield, FileText, Phone, Info } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold">IntegrarMente</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              O primeiro terapeuta digital que acompanha seu progresso com empatia e método, baseado na Terapia Cognitivo-Comportamental.
            </p>
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
              <p className="text-red-300 text-sm">
                <strong>Importante:</strong> Não é um substituto para diagnóstico médico. Para emergências, acesse{' '}
                <a href="https://cvv.org.br/" target="_blank" rel="noopener noreferrer" className="text-red-400 underline hover:text-red-300">
                  CVV
                </a>
              </p>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Sobre a TCC
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">Suporte</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Fale Conosco
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Central de Ajuda
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 IntegrarMente. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
