import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import RequestQuote from "./pages/RequestQuote";
import RequestRepair from "./pages/RequestRepair";
import NotFound from "./pages/NotFound";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminDashboard from "./admin/AdminDashboard";
import QuoteRequests from "./admin/QuoteRequests";
import RepairRequests from "./admin/RepairRequests";
import ServiceRequests from "./admin/ServiceRequests";
import Customers from "./admin/Customers";
import Products from "./admin/Products";
import ProjectsAdmin from "./admin/ProjectsAdmin";
import Testimonials from "./admin/Testimonials";
import FAQsAdmin from "./admin/FAQs";
import Settings from "./admin/Settings";

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request-a-quote" element={<RequestQuote />} />
        <Route path="/request-repair" element={<RequestRepair />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="quote-requests" element={<QuoteRequests />} />
        <Route path="repair-requests" element={<RepairRequests />} />
        <Route path="service-requests" element={<ServiceRequests />} />
        <Route path="customers" element={<Customers />} />
        <Route path="products" element={<Products />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="faqs" element={<FAQsAdmin />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
