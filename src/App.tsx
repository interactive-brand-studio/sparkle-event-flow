
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserEventProvider } from "./context/UserEventContext";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Vendors from "./pages/Vendors";
import Plan from "./pages/Plan";
import Packages from "./pages/Packages";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserEventProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="vendors" element={<Vendors />} />
              <Route path="plan" element={<Plan />} />
              <Route path="packages" element={<Packages />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserEventProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
