import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Page Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ModulePage from './pages/ModulePage';
import ChapterPage from './pages/ChapterPage';
import PortfolioPage from './pages/PortfolioPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/modules/:moduleId" element={<ModulePage />} />
          <Route path="/chapters/:chapterId" element={<ChapterPage />} />
          <Route path="/portfolio/:slug?" element={<PortfolioPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;