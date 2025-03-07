import React, { useState } from 'react';
import OrderTracking from '../components/withoutStories/newWS/OrderTracking';

const Contact = () => {
  const orderId = 1
  return (
    <div>
      <h2 className="text-2xl font-bold">Contact Us</h2>
      <form className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Message"
          className="w-full p-2 border rounded"
          rows="5"
        />
        <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit
        </button>
      </form>

      {/* <OrderTracking orderId={orderId} /> */}
    </div>
  );
};

export default Contact;
