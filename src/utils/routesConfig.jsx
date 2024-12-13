
export const rawRoutes = [
  {
    path: '/',
    children: [
      { path: '', label: 'Home' },
      { path: 'about', label: 'About' },
      { path: 'contact', label: 'Contact' },
      { path: 'order-food', label: 'Order Food' },
      { path: '/cart', label: 'Cart' },
      { path: '/success', label: 'Success' },
      { path: '/cancel', label: 'Cancel' },
      { path: '/payment', label: 'Payment' },
      { path: '/orders/:orderId/track', label: 'Order Tracking' },
      { path: '/restaurants', label: 'Restaurants' },
      { path: '/restaurants/:id', label: null },
      { path: '/dashboard', label: 'Dashboard' },
    ],
  },
];
