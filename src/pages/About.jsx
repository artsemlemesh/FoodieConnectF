import { usePostHog } from 'posthog-js/react';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/GlobalContext';
import SubscriptionPlansPage from '../components/withoutStories/SubscriptionPlansPage';
import { axiosClient } from '../utils/axiosClient';
const apiUrl = import.meta.env.VITE_APP_API_URL;

const About = () => {
  const posthog = usePostHog();
  const [hasSubscription, setHasSubscription] = useState(null);  // null for initial loading state
  const [plan, setPlan] = useState(null)
  const { user } = useAppContext();
  console.log('sub', hasSubscription)
  console.log('plan', plan)
  useEffect(() => {
    if (user ) {  // Ensure user is available before fetching subscription status
      posthog.capture('page view ABOUT', {
        path: window.location.pathname,
      });

      const fetchSubStatus = async () => {
        try {
          console.log('Fetching subscription status...');
          const response = await axiosClient.get(`${apiUrl}/users/status/`);
          console.log('Subscription status response:', response.data);
          setHasSubscription(response.data.active);
          setPlan(response.data.plan)
        } catch (error) {
          console.error('Failed to fetch subscription status', error);
          setHasSubscription(false);  // Assume no subscription on error
        }
      };

      fetchSubStatus();
    }
  }, [posthog, user]);

  if (hasSubscription === null) {
    return <div className="text-center">Loading...</div>;  // Show loading spinner
  }

  if (!hasSubscription) {
    return <SubscriptionPlansPage plan={plan}/>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">About Us</h2>
      <p className="mt-2 text-gray-600">
        FoodieConnect connects you to the best restaurants and food delivery
        services in your area.
      </p>
      <SubscriptionPlansPage plan={plan}/>
    </div>
  );
};

export default About;