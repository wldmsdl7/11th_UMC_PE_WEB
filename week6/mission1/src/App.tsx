import { RouterProvider } from 'react-router-dom';
import './App.css'
import { router } from './Router';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV &&
        <ReactQueryDevtools initialIsOpen={false} />
      }
    </QueryClientProvider>
  );
}

export default App
