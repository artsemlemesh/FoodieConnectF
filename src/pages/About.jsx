import { usePostHog } from 'posthog-js/react';
import React, { useEffect } from 'react';
import { useAppContext } from '../context/GlobalContext';

const About = () => {
  const posthog = usePostHog();

  const { user, openModal } = useAppContext();

  useEffect(() => {
    posthog.capture('page view ABOUT', {
      path: window.location.pathname,
    });
  }, [posthog]);

  if (!user.is_premium) {
    return (
      <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-red-600">Access Restricted</h2>
        <p className="mt-2 text-gray-700">
          Upgrade to a <strong>Premium Plan</strong> to access this content and
          enjoy full features.
        </p>
        <button
          onClick={openModal}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upgrade Now
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">About Us</h2>
      <p className="mt-2 text-gray-600">
        FoodieConnect connects you to the best restaurants and food delivery
        services in your area.
      </p>
    </div>
  );
};

export default About;
