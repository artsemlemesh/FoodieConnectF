import { useEffect, useState } from 'react';
import { axiosClient } from '../../utils/axiosClient';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const SubscriptionPlansPage = ({ plan }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false); // Initial state

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosClient.get(`${apiUrl}/users/plans/`);
        setPlans(response.data);
      } catch (err) {
        setError('Failed to load subscription plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const handleSubscribe = async (planId) => {
    try {
      console.log(`Subscribing to plan with ID: ${planId}`);
      const response = await axiosClient.post(`${apiUrl}/users/subscribe/`, {
        plan: planId,
      });
      console.log('Subscription successful:', response.data);
      setIsSubscribed(true);
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  if (isSubscribed) {
    return <div className="text-center">Thank you for subscribing!</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-center mb-8">
        Choose Your Plan
      </h2>

      {(plan === 'free' || plan === null) && (
        <div className="text-center text-lg text-gray-600 mb-6">
          <span className="text-xl font-semibold">Your current plan:</span> Free
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((planItem) => (
          <div key={planItem.id} className="border rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold">{planItem.name}</h3>
            <p className="mt-2 text-gray-600">{planItem.description}</p>
            <p className="mt-4 text-2xl font-semibold">${planItem.price}</p>
            <ul className="mt-4 space-y-2">
              <li>✔ Access to premium content</li>
              <li>✔ Priority support</li>
              <li>✔ More features...</li>
            </ul>

            {/* {(plan === 'free' || plan === null) && (
              <button
                disabled
                className="mt-6 w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
              >
                Free Plan - Not Available
              </button>
            )} */}

            {plan === 'pro' ? (
              <button
                disabled
                className="mt-6 w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
              >
                Your current plan: Pro
              </button>
            ) : plan === 'premium' ? (
              <button
                disabled
                className="mt-6 w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
              >
                Your current plan: Premium
              </button>
            ) : (
              <button
                onClick={() => handleSubscribe(planItem.id)}
                className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;
