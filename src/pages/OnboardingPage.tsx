
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Brain, ArrowRight, ArrowLeft, Mic, MessageSquare, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    anxiety: [5],
    stress: [5],
    motivation: [5],
    frequentEmotion: '',
    goals: [] as string[],
    customGoal: '',
    communicationPreference: ''
  });

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const progressPercentage = (currentStep / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">IntegrarMente</h1>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-gray-600">Etapa {currentStep} de 5</p>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Step 1: Registration */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo!</h2>
                <p className="text-gray-600">Vamos começar criando sua conta</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">Nome</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-2 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-2 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-gray-700 font-medium">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="mt-2 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    placeholder="Criar uma senha segura"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Emotional Assessment */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Como você está se sentindo?</h2>
                <p className="text-gray-600">Nos ajude a entender seu momento atual</p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <Label className="text-gray-700 font-medium mb-4 block">Nível de ansiedade</Label>
                  <Slider
                    value={formData.anxiety}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, anxiety: value }))}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>0 - Muito baixo</span>
                    <span className="font-medium text-blue-600">{formData.anxiety[0]}</span>
                    <span>10 - Muito alto</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium mb-4 block">Nível de estresse</Label>
                  <Slider
                    value={formData.stress}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, stress: value }))}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>0 - Muito baixo</span>
                    <span className="font-medium text-blue-600">{formData.stress[0]}</span>
                    <span>10 - Muito alto</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium mb-4 block">Nível de motivação</Label>
                  <Slider
                    value={formData.motivation}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, motivation: value }))}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>0 - Muito baixo</span>
                    <span className="font-medium text-blue-600">{formData.motivation[0]}</span>
                    <span>10 - Muito alto</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium mb-4 block">Qual destas emoções tem sido mais frequente?</Label>
                  <RadioGroup 
                    value={formData.frequentEmotion} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, frequentEmotion: value }))}
                    className="space-y-3"
                  >
                    {['Tristeza', 'Raiva', 'Cansaço', 'Medo', 'Outra'].map((emotion) => (
                      <div key={emotion} className="flex items-center space-x-3">
                        <RadioGroupItem value={emotion} id={emotion} />
                        <Label htmlFor={emotion} className="text-gray-700">{emotion}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Suas metas emocionais</h2>
                <p className="text-gray-600">Selecione as metas que mais fazem sentido para você agora</p>
              </div>
              
              <div className="space-y-4">
                {['Reduzir ansiedade', 'Melhorar autoestima', 'Ter mais controle emocional', 'Melhorar sono'].map((goal) => (
                  <div key={goal} className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                    <Checkbox
                      id={goal}
                      checked={formData.goals.includes(goal)}
                      onCheckedChange={() => handleGoalToggle(goal)}
                    />
                    <Label htmlFor={goal} className="text-gray-700 flex-1">{goal}</Label>
                  </div>
                ))}
                
                <div className="p-4 rounded-xl border border-gray-200">
                  <Label htmlFor="customGoal" className="text-gray-700 font-medium">Outro:</Label>
                  <Input
                    id="customGoal"
                    type="text"
                    value={formData.customGoal}
                    onChange={(e) => setFormData(prev => ({ ...prev, customGoal: e.target.value }))}
                    className="mt-2 border-0 focus:ring-0 p-0"
                    placeholder="Descreva sua meta personalizada"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Communication Preference */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Preferência de Sessão</h2>
                <p className="text-gray-600">Como você prefere se comunicar nas suas sessões?</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className={`p-8 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.communicationPreference === 'voice' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, communicationPreference: 'voice' }))}
                >
                  <div className="text-center">
                    <Mic className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">🎙️ Por voz</h3>
                    <p className="text-gray-600">Converse naturalmente, como se fosse uma conversa pessoal</p>
                  </div>
                </div>
                
                <div 
                  className={`p-8 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.communicationPreference === 'text' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, communicationPreference: 'text' }))}
                >
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">💬 Por texto</h3>
                    <p className="text-gray-600">Escreva no seu ritmo, quando se sentir confortável</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Completion */}
          {currentStep === 5 && (
            <div className="text-center space-y-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Tudo pronto!</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Estamos ao seu lado para começar sua evolução emocional.<br />
                  Sua primeira sessão já está disponível.
                </p>
              </div>
              
              <Link to="/session">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-12 py-6 text-xl rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Ir para minha primeira sessão
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
              {currentStep > 1 ? (
                <Button 
                  variant="ghost" 
                  onClick={handlePrevious}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              ) : (
                <div></div>
              )}
              
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 rounded-full"
              >
                {currentStep === 1 ? 'Começar agora' : 'Continuar'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
