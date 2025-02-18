import { useEffect, useState } from 'react';
import { axiosClient } from '../../utils/axiosClient';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const SubscriptionPlansPage = ({ plan }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      await axiosClient.post(`${apiUrl}/users/subscribe/`, { plan: planId });
      window.location.reload(); // Refresh page to reflect new subscription
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-center mb-8">
        Choose Your Plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((planItem) => {
          const isCurrentPlan = plan === planItem.name.toLowerCase();

          return (
            <div key={planItem.id} className="border rounded-lg p-6 shadow-md">
              <div className="flex flex-col h-full">
                {/* Plan details */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold">{planItem.name}</h3>
                  <p className="mt-2 text-gray-600">{planItem.description}</p>
                  <p className="mt-4 text-2xl font-semibold">
                    ${planItem.price}
                  </p>

                  {/* Features */}
                  {planItem.name.toLowerCase() === 'free' && (
                    <ul className="mt-4 space-y-2">
                      <li>✔ Limited content access</li>
                    </ul>
                  )}
                  {planItem.name.toLowerCase() === 'premium' && (
                    <ul className="mt-4 space-y-2">
                      <li>✔ Access to premium content</li>
                      <li>✔ Priority support</li>
                      <li>✔ Ad-free experience</li>
                    </ul>
                  )}
                  {planItem.name.toLowerCase() === 'pro' && (
                    <ul className="mt-4 space-y-2">
                      <li>✔ All premium features</li>
                      <li>✔ Advanced analytics</li>
                      <li>✔ Customization options</li>
                      <li>✔ Dedicated support</li>
                    </ul>
                  )}
                </div>

                {/* Button (sticks to bottom) */}
                {planItem.name.toLowerCase() === 'free' ? (
                  <div className="mt-6 text-gray-600 font-semibold text-center">
                    Default plan
                  </div>
                ) : (
                  <button
                    onClick={() => handleSubscribe(planItem.id)}
                    className={`mt-auto w-full text-white py-2 px-4 rounded ${
                      isCurrentPlan
                        ? 'bg-gray-400 cursor-not-allowed'
                        : planItem.name.toLowerCase() === 'premium'
                          ? 'bg-yellow-500 hover:opacity-90 transition'
                          : 'bg-red-600 hover:opacity-90 transition'
                    }`}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? 'Your current plan' : 'Subscribe'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;
