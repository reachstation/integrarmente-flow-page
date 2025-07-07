
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Calendar, CheckSquare, BarChart3, FileText, MessageSquare, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const GlobalNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Meu Espaço', href: '/usuario', icon: User },
    { label: 'Sessões', href: '/sessao', icon: MessageSquare },
    { label: 'Tarefas', href: '/tarefas', icon: CheckSquare },
    { label: 'Evolução', href: '/dashboard', icon: BarChart3 },
    { label: 'Calendário', href: '/calendario', icon: Calendar },
    { label: 'Notas', href: '/notas', icon: FileText },
    { label: 'Minha Conta', href: '/dados', icon: Settings },
  ];

  const isActive = (href: string) => location.pathname === href;

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onItemClick}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(item.href)
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            } ${mobile ? 'w-full justify-start' : ''}`}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </Link>
        );
      })}
      <Link
        to="/"
        onClick={onItemClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors ${
          mobile ? 'w-full justify-start' : ''
        }`}
      >
        <LogOut className="w-4 h-4" />
        Sair
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/usuario" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Integrarmente</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks mobile onItemClick={() => setIsOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavigation;
