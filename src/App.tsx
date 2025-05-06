
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserEventProvider } from "./context/UserEventContext";
import { PackageProvider } from "./context/PackageContext";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Vendors from "./pages/Vendors";
import VendorProfile from "./pages/VendorProfile";
import PackageBuilder from "./pages/PackageBuilder";
import Plan from "./pages/Plan";
import Packages from "./pages/Packages";
import AIPlanner from "./pages/AIPlanner";
import BookingCheckout from "./pages/BookingCheckout";
import UserDashboard from "./pages/UserDashboard";
import BookingDetails from "./pages/BookingDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Vendor portal routes
import VendorLogin from "./pages/vendor/VendorLogin";
import VendorProfileSetup from "./pages/vendor/VendorProfileSetup";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorPackages from "./pages/vendor/VendorPackages";
import VendorBookings from "./pages/vendor/VendorBookings";
import VendorPromote from "./pages/vendor/VendorPromote";

// Admin portal routes
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserEventProvider>
        <PackageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="vendors" element={<Vendors />} />
                <Route path="vendor/:id" element={<VendorProfile />} />
                <Route path="package-builder" element={<PackageBuilder />} />
                <Route path="plan" element={<Plan />} />
                <Route path="packages" element={<Packages />} />
                <Route path="ai-planner" element={<AIPlanner />} />
                <Route path="checkout" element={<BookingCheckout />} />
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="dashboard/booking/:id" element={<BookingDetails />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              
              {/* Vendor Portal Routes - using separate layout */}
              <Route path="/vendor/login" element={<VendorLogin />} />
              <Route path="/vendor/profile" element={<VendorProfileSetup />} />
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
              <Route path="/vendor/packages" element={<VendorPackages />} />
              <Route path="/vendor/bookings" element={<VendorBookings />} />
              <Route path="/vendor/promote" element={<VendorPromote />} />
              
              {/* Admin Portal Routes - using separate layout */}
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </BrowserRouter>
        </PackageProvider>
      </UserEventProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
