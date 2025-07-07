
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    anxiety: [5],
    stress: [5],
    energy: [5],
    emotion: '',
    goals: [] as string[],
    customGoal: '',
    preference: ''
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - redirect to user area
      navigate('/usuario');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Crie uma senha segura"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Label>Nível de Ansiedade (0-10)</Label>
              <Slider
                value={formData.anxiety}
                onValueChange={(value) => setFormData(prev => ({ ...prev, anxiety: value }))}
                max={10}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-gray-600">Atual: {formData.anxiety[0]}</p>
            </div>

            <div className="space-y-4">
              <Label>Nível de Estresse (0-10)</Label>
              <Slider
                value={formData.stress}
                onValueChange={(value) => setFormData(prev => ({ ...prev, stress: value }))}
                max={10}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-gray-600">Atual: {formData.stress[0]}</p>
            </div>

            <div className="space-y-4">
              <Label>Nível de Energia (0-10)</Label>
              <Slider
                value={formData.energy}
                onValueChange={(value) => setFormData(prev => ({ ...prev, energy: value }))}
                max={10}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-gray-600">Atual: {formData.energy[0]}</p>
            </div>

            <div className="space-y-4">
              <Label>Qual destas emoções tem sido mais frequente?</Label>
              <div className="grid grid-cols-2 gap-3">
                {['Tristeza', 'Raiva', 'Cansaço', 'Medo', 'Outra'].map((emotion) => (
                  <Button
                    key={emotion}
                    variant={formData.emotion === emotion ? "default" : "outline"}
                    onClick={() => setFormData(prev => ({ ...prev, emotion }))}
                    className="justify-start"
                  >
                    {formData.emotion === emotion && <Check className="w-4 h-4 mr-2" />}
                    {emotion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">
                Selecione as metas que mais fazem sentido para você agora:
              </Label>
            </div>
            <div className="space-y-4">
              {['Reduzir ansiedade', 'Melhorar autoestima', 'Ter mais controle emocional', 'Melhorar sono'].map((goal) => (
                <div key={goal} className="flex items-center space-x-3">
                  <Checkbox
                    id={goal}
                    checked={formData.goals.includes(goal)}
                    onCheckedChange={() => handleGoalToggle(goal)}
                  />
                  <Label htmlFor={goal} className="text-sm font-normal cursor-pointer">
                    {goal}
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="custom"
                  checked={formData.goals.includes('custom')}
                  onCheckedChange={() => handleGoalToggle('custom')}
                />
                <Label htmlFor="custom" className="text-sm font-normal">Outro:</Label>
                <Input
                  placeholder="Digite sua meta personalizada"
                  value={formData.customGoal}
                  onChange={(e) => setFormData(prev => ({ ...prev, customGoal: e.target.value }))}
                  className="flex-1"
                  disabled={!formData.goals.includes('custom')}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">
                Como você prefere se comunicar nas suas sessões?
              </Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${formData.preference === 'voice' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}
                onClick={() => setFormData(prev => ({ ...prev, preference: 'voice' }))}
              >
                <CardContent className="flex flex-col items-center p-6">
                  <div className="text-4xl mb-4">🎙️</div>
                  <CardTitle className="text-lg mb-2">Por voz</CardTitle>
                  <CardDescription className="text-center">
                    Converse naturalmente falando com a IA
                  </CardDescription>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${formData.preference === 'text' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}
                onClick={() => setFormData(prev => ({ ...prev, preference: 'text' }))}
              >
                <CardContent className="flex flex-col items-center p-6">
                  <div className="text-4xl mb-4">💬</div>
                  <CardTitle className="text-lg mb-2">Por texto</CardTitle>
                  <CardDescription className="text-center">
                    Digite suas mensagens no chat
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Cadastro';
      case 2: return 'Como você está se sentindo?';
      case 3: return 'Suas metas emocionais';
      case 4: return 'Preferência de Sessão';
      default: return '';
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 1: return 'Começar agora';
      case 4: return 'Ir para minha área pessoal';
      default: return 'Próximo';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para página inicial
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo ao IntegrarMente</h1>
          <p className="text-gray-600">Vamos personalizar sua jornada terapêutica</p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep
                      ? 'bg-blue-600 text-white'
                      : step < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">{getStepTitle()}</CardTitle>
            <CardDescription>
              Etapa {currentStep} de 4
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
              <Button onClick={handleNext}>
                {getButtonText()}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Final message for step 4 */}
        {currentStep === 4 && (
          <Card className="mt-6 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <p className="text-center text-green-800 font-medium">
                Tudo pronto! Estamos ao seu lado para começar sua evolução emocional. 
                Sua primeira sessão já está disponível.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
