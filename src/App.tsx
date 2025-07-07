
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SessionPage from "./pages/SessionPage";
import OnboardingPage from "./pages/OnboardingPage";
import FreeTrialPage from "./pages/FreeTrialPage";
import RegistrationPage from "./pages/RegistrationPage";
import EnhancedSessionPage from "./pages/EnhancedSessionPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import UserAreaPage from "./pages/UserAreaPage";
import CalendarPage from "./pages/CalendarPage";
import NotesPage from "./pages/NotesPage";
import AccountDataPage from "./pages/AccountDataPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sessao" element={<EnhancedSessionPage />} />
          <Route path="/session" element={<EnhancedSessionPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/teste-gratuito" element={<FreeTrialPage />} />
          <Route path="/cadastro" element={<RegistrationPage />} />
          <Route path="/usuario" element={<UserAreaPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tarefas" element={<TasksPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/notas" element={<NotesPage />} />
          <Route path="/dados" element={<AccountDataPage />} />
          {/* Legacy routes for backward compatibility */}
          <Route path="/old-session" element={<SessionPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
