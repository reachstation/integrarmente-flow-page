
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
          <Route path="/session" element={<EnhancedSessionPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/teste-gratuito" element={<FreeTrialPage />} />
          <Route path="/cadastro" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
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
