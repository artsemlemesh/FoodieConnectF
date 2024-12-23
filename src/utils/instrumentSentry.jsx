import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

const apiUrl = import.meta.env.VITE_APP_API_URL;

//after deployment instead of this can connect sentry webhooks in the dashboard, this mostly for local testing
window.onerror = function (message) {
    fetch(`${apiUrl}/api/sentry-error/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({message}),
    });
  };

  //RETURNS MORE DATA
  // window.onerror = function (message, source, lineno, colno, error) {
//   fetch("http://localhost:8000/api/sentry-error/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ message, source, lineno, colno, stack: error?.stack }),
//   });
// };

Sentry.init({
  dsn: 'https://d8698bd8597ae1dc677b7ecf753d4ebc@o4508514431926272.ingest.us.sentry.io/4508514438086656',
//   debug: true,

  integrations: [
    // See docs for support of different versions of variation of react router
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: ['http://localhost:8000', 'http://0.0.0.0:8000'] , // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
