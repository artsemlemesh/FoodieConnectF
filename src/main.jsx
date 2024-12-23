// Sentry initialization should be imported first!
import './utils/instrumentSentry';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { AppProvider } from './context/GlobalContext.jsx';
import { setupAxiosInterceptors } from './utils/axiosClient.jsx';
import * as Sentry from '@sentry/react';

const queryClient = new QueryClient();
//	•	Provides the QueryClient instance to all components in the tree, enabling them to use React Query hooks like useQuery or useMutation.

setupAxiosInterceptors(store.dispatch);
const container = document.getElementById('root');

// Use the enhanced Sentry setup for React 19
const root = createRoot(container, {
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn('Uncaught error', error, errorInfo.componentStack);
  }),
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: Sentry.reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </QueryClientProvider>
  // </StrictMode>
);
