import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProtectedRoutesProvider from './context/ProtectedRoutes.tsx'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent refetch when window gains focus
      retry: false, // Retry only once on failure
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProtectedRoutesProvider>
        <App />
      </ProtectedRoutesProvider>
    </QueryClientProvider>

  </StrictMode>,
)
