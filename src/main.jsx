import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
//	•	Provides the QueryClient instance to all components in the tree, enabling them to use React Query hooks like useQuery or useMutation.

import { Provider } from 'react-redux';
import store from './store/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
      </StrictMode>
    </QueryClientProvider>
  </Provider>
);
