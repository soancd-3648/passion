
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Context
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/LoginPage'; // Import the login page

// Admin Imports
import AdminLayout from './admin/AdminLayout';
import { Dashboard, ManageMenu, ManageProjects, ManageCollections, ManageNews, ManageAbout, ManageContact, ManageVideos } from './admin/pages';

// --- Protected Route for Admin ---
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />;
};


// --- Page Wrapper for Transitions ---
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

// --- Main Layout for Public Pages ---
const PublicLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> 
      </main>
      {location.pathname !== '/' && location.pathname !== '/contact' && <Footer />}
    </div>
  );
};

const LocationAwareRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Login Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Admin Route Layout */}
                <Route path="/admin" element={<ProtectedRoute />}>
                    <Route index element={<Dashboard />} />
                    <Route path="menu" element={<ManageMenu />} />
                    <Route path="projects" element={<ManageProjects />} />
                    <Route path="collections" element={<ManageCollections />} />
                    <Route path="news" element={<ManageNews />} />
                    <Route path="videos" element={<ManageVideos />} />
                    <Route path="about" element={<ManageAbout />} />
                    <Route path="contact" element={<ManageContact />} />
                </Route>

                {/* Public Route Layout */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="/collections" element={<PageWrapper><Collections /></PageWrapper>} />
                    <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
                    <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                    <Route path="/detail/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
                    <Route path="/about" element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="/news" element={<PageWrapper><Home /></PageWrapper>} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

function App() {
  return (
    <AuthProvider>
        <DataProvider>
          <Router>
            <LocationAwareRoutes />
          </Router>
        </DataProvider>
    </AuthProvider>
  );
}

export default App;
