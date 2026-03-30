import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ChatWidget } from "@/components/ChatWidget";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";

const Technology = lazy(() => import("./pages/Technology"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Compliance = lazy(() => import("./pages/Compliance"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Demo = lazy(() => import("./pages/Demo"));
const DemoCreerOffre = lazy(() => import("./pages/DemoCreerOffre"));
const DemoOffre = lazy(() => import("./pages/DemoOffre"));
const DemoDashboard = lazy(() => import("./pages/DemoDashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <BackgroundPaths />
          <div className="relative z-10">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/technologie" element={<Technology />} />
              <Route path="/a-propos" element={<AboutPage />} />
              <Route path="/conformite" element={<Compliance />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-confidentialite" element={<Privacy />} />
              <Route path="/cgu" element={<Terms />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/demo/creer-offre" element={<DemoCreerOffre />} />
              <Route path="/demo/offre/:id" element={<DemoOffre />} />
              <Route path="/demo/dashboard/:id" element={<DemoDashboard />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/inscription" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <ChatWidget />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
