import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Skeleton from "./components/ui/Skeleton";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const RequestQuote = lazy(() => import("./pages/RequestQuote.jsx"));
const RequestRepair = lazy(() => import("./pages/RequestRepair.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const AdminLogin = lazy(() => import("./admin/AdminLogin.jsx"));
const AdminLayout = lazy(() => import("./admin/AdminLayout.jsx"));
import ProtectedRoute from "./admin/ProtectedRoute";
const AdminDashboard = lazy(() => import("./admin/AdminDashboard.jsx"));
const QuoteRequests = lazy(() => import("./admin/QuoteRequests.jsx"));
const RepairRequests = lazy(() => import("./admin/RepairRequests.jsx"));
const ServiceRequests = lazy(() => import("./admin/ServiceRequests.jsx"));
const Customers = lazy(() => import("./admin/Customers.jsx"));
const Products = lazy(() => import("./admin/Products.jsx"));
const ProjectsAdmin = lazy(() => import("./admin/ProjectsAdmin.jsx"));
const Testimonials = lazy(() => import("./admin/Testimonials.jsx"));
const FAQsAdmin = lazy(() => import("./admin/FAQs.jsx"));
const Settings = lazy(() => import("./admin/Settings.jsx"));

export default function App() {
  return (
    <Suspense
      fallback={(
        <main role="status" aria-label="Loading page" className="container-page py-16">
          <Skeleton className="mb-8 h-7 w-48" />
          <Skeleton className="mb-4 h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => <Skeleton key={index} className="h-44 w-full" />)}
          </div>
        </main>
      )}
    >
      <Routes>
        {/* Public site */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-a-quote" element={<RequestQuote />} />
          <Route path="/quote" element={<RequestQuote />} />
          <Route path="/request-repair" element={<RequestRepair />} />
          <Route path="/repair-request" element={<RequestRepair />} />
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
    </Suspense>
  );
}
