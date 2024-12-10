import React from 'react';
import LiveOrderStatus from './LiveOrderStatus';
import { useAppContext } from '../../context/GlobalContext';

const SuccessPage = () => {
  const { state } = useAppContext();

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      {state.orderId && <LiveOrderStatus orderId={state.orderId} />}
    </div>
  );
};

export default SuccessPage;
