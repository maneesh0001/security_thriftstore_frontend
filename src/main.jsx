import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './router/AppRouter.jsx';
import AuthProvider from './auth/AuthProvider.jsx';
import SessionManager from './Components/SessionManager.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './auth/AuthProvider.jsx';

const queryClient = new QueryClient();

// Wrapper component to access auth context
const AppWithSession = () => {
  const { isAuthenticated } = useAuth();

  return (
    <SessionManager isAuthenticated={isAuthenticated}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </SessionManager>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppWithSession />
    </AuthProvider>
  </React.StrictMode>
);