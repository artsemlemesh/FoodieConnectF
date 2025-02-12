import { usePostHog } from 'posthog-js/react';
import React, { useEffect } from 'react';

const About = () => {
  const posthog = usePostHog();
  
    useEffect(() => {
      posthog.capture('page view ABOUT', {
          path: window.location.pathname,
      });
  }, [posthog]);
  return (
    <div>
      <h2 className="text-2xl font-bold">About Us</h2>
      <p className="mt-2 text-gray-600">
        FoodieConnect connects you to the best restaurants and food delivery services in your area.
      </p>
    </div>
  );
};

export default About;