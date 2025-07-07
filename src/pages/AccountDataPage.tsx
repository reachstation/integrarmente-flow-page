
import React, { useState } from 'react';
import { ArrowLeft, User, CreditCard, Shield, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';

const AccountDataPage = () => {
  const [name, setName] = useState('Maria Silva');
  const [email, setEmail] = useState('maria@exemplo.com');
  const [sessionPreference, setSessionPreference] = useState('voice');
  const [recordSessions, setRecordSessions] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSaveProfile = () => {
    // Logic to save profile changes
    console.log('Profile saved');
  };

  const handleExportData = () => {
    // Logic to export user data
    console.log('Exporting data...');
  };

  const handleDeleteAccount = () => {
    // Logic to delete account
    console.log('Account deletion requested');
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <GlobalNavigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Minha Conta</h1>
          <p className="text-gray-600">Gerencie suas informações pessoais e preferências</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Perfil
              </CardTitle>
              <CardDescription>
                Suas informações pessoais e preferências de sessão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-base font-medium">Preferência de Sessão</Label>
                <RadioGroup 
                  value={sessionPreference} 
                  onValueChange={setSessionPreference}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="voice" id="voice" />
                    <Label htmlFor="voice">Por voz</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text">Por texto</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>

          {/* Plan Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Plano Atual
              </CardTitle>
              <CardDescription>
                Informações sobre sua assinatura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Plano Gratuito</h3>
                  <p className="text-gray-600 text-sm">Acesso básico às funcionalidades</p>
                  <p className="text-gray-500 text-xs mt-1">Renovação: Não aplicável</p>
                </div>
                <Button variant="outline">
                  Alterar Plano
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Privacidade
              </CardTitle>
              <CardDescription>
                Controle seus dados e privacidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="record-sessions" className="text-base font-medium">
                    Registrar Sessões
                  </Label>
                  <p className="text-sm text-gray-600">
                    Permitir que suas sessões sejam gravadas para análise e melhoria
                  </p>
                </div>
                <Switch
                  id="record-sessions"
                  checked={recordSessions}
                  onCheckedChange={setRecordSessions}
                />
              </div>

              <div className="border-t pt-4">
                <Button onClick={handleExportData} variant="outline" className="w-full md:w-auto">
                  Download dos Meus Dados
                </Button>
                <p className="text-xs text-gray-500 mt-1">
                  Baixe uma cópia de todos os seus dados em formato PDF
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <Trash2 className="w-5 h-5 mr-2" />
                Zona de Perigo
              </CardTitle>
              <CardDescription>
                Ações irreversíveis em sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    Encerrar Conta Permanentemente
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Exclusão da Conta</DialogTitle>
                    <DialogDescription>
                      Esta ação é irreversível. Todos os seus dados, sessões, notas e progresso serão permanentemente excluídos.
                      Tem certeza de que deseja continuar?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Sim, Excluir Minha Conta
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountDataPage;
