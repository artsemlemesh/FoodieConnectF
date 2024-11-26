import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { AppProvider } from './context/GlobalContext.jsx';

const queryClient = new QueryClient();
//	•	Provides the QueryClient instance to all components in the tree, enabling them to use React Query hooks like useQuery or useMutation.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppProvider>
          <App />
        </AppProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
