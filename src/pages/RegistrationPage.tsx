
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mic, MessageSquare } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  password: string;
  anxiety: number;
  stress: number;
  energy: number;
  mostFrequentEmotion: string;
  goals: string[];
  otherGoal: string;
  communicationPreference: 'voice' | 'text';
}

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    anxiety: 5,
    stress: 5,
    energy: 5,
    mostFrequentEmotion: '',
    goals: [],
    otherGoal: '',
    communicationPreference: 'text'
  });

  const totalSteps = 4;

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete registration
      navigate('/session');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.password;
      case 2:
        return formData.mostFrequentEmotion;
      case 3:
        return formData.goals.length > 0;
      case 4:
        return formData.communicationPreference;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sua senha"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Nível de ansiedade: {formData.anxiety}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.anxiety}
                onChange={(e) => handleInputChange('anxiety', Number(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>10</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Nível de estresse: {formData.stress}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.stress}
                onChange={(e) => handleInputChange('stress', Number(e.target.value))}
                className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>10</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Nível de energia: {formData.energy}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.energy}
                onChange={(e) => handleInputChange('energy', Number(e.target.value))}
                className="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>10</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Qual destas emoções tem sido mais frequente?
              </label>
              <div className="space-y-3">
                {['Tristeza', 'Raiva', 'Cansaço', 'Medo', 'Outra'].map((emotion) => (
                  <label key={emotion} className="flex items-center">
                    <input
                      type="radio"
                      name="emotion"
                      value={emotion}
                      checked={formData.mostFrequentEmotion === emotion}
                      onChange={(e) => handleInputChange('mostFrequentEmotion', e.target.value)}
                      className="mr-3 text-blue-600"
                    />
                    <span className="text-gray-700">{emotion}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <p className="text-gray-600 text-center mb-6">
              Selecione as metas que mais fazem sentido para você agora:
            </p>
            <div className="space-y-4">
              {[
                'Reduzir ansiedade',
                'Melhorar autoestima',
                'Ter mais controle emocional',
                'Melhorar sono'
              ].map((goal) => (
                <label key={goal} className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.goals.includes(goal)}
                    onChange={() => handleGoalToggle(goal)}
                    className="mr-4 text-blue-600 rounded"
                  />
                  <span className="text-gray-700 font-medium">{goal}</span>
                </label>
              ))}
              <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.goals.includes('Outro')}
                  onChange={() => handleGoalToggle('Outro')}
                  className="mr-4 text-blue-600 rounded"
                />
                <div className="flex-1">
                  <span className="text-gray-700 font-medium">Outro:</span>
                  <input
                    type="text"
                    value={formData.otherGoal}
                    onChange={(e) => handleInputChange('otherGoal', e.target.value)}
                    className="ml-2 flex-1 border-0 focus:ring-0 focus:outline-none"
                    placeholder="Descreva sua meta..."
                  />
                </div>
              </label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <p className="text-gray-600 text-center mb-8">
              Como você prefere se comunicar nas suas sessões?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => handleInputChange('communicationPreference', 'voice')}
                className={`p-8 border-2 rounded-2xl text-center transition-all ${
                  formData.communicationPreference === 'voice'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Mic className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Por voz</h3>
                <p className="text-gray-600 text-sm">Conversas naturais, como uma ligação</p>
              </button>

              <button
                onClick={() => handleInputChange('communicationPreference', 'text')}
                className={`p-8 border-2 rounded-2xl text-center transition-all ${
                  formData.communicationPreference === 'text'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Por texto</h3>
                <p className="text-gray-600 text-sm">Mensagens escritas, no seu ritmo</p>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para início
            </Button>
          </Link>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            {Array.from({ length: totalSteps }, (_, i) => (
              <React.Fragment key={i}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i + 1 <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded ${
                      i + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {currentStep === 1 && 'Cadastro'}
              {currentStep === 2 && 'Como você está se sentindo?'}
              {currentStep === 3 && 'Suas metas emocionais'}
              {currentStep === 4 && 'Preferência de Sessão'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <Button onClick={prevStep} variant="outline">
                  Anterior
                </Button>
              )}
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="ml-auto bg-blue-600 hover:bg-blue-700"
              >
                {currentStep === totalSteps ? 'Ir para minha primeira sessão' : 'Próximo'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {currentStep === totalSteps && (
              <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
                <p className="text-green-800 font-medium">
                  Tudo pronto! Estamos ao seu lado para começar sua evolução emocional. 
                  Sua primeira sessão já está disponível.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationPage;
