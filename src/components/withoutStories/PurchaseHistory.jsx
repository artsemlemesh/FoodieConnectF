import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../features/orderSlice";



const PurchaseHistory = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.orders);
  
    useEffect(() => {
      dispatch(fetchOrders());
    }, [dispatch]);
  
    if (status === 'loading') return <p>Loading your orders...</p>;
    if (status === 'failed') return <p>Error loading orders: {error}</p>;
  
    const currentOrders = orders.filter((order) => order.status !== 'Delivered');
    const pastOrders = orders.filter((order) => order.status === 'Delivered');
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
  
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">Current Orders</h3>
          {currentOrders.length === 0 ? (
            <p>No current orders to track.</p>
          ) : (
            currentOrders.map((order) => (
              <div key={order.id} className="p-4 border rounded mb-4">
                <h4 className="font-bold">Order #{order.id}</h4>
                <p>Status: {order.status}</p>
                <p>Total: ${order.total_amount}</p>
              </div>
            ))
          )}
        </div>
  
        <div>
          <h3 className="text-xl font-bold mb-2">Past Orders</h3>
          {pastOrders.length === 0 ? (
            <p>You have no past orders.</p>
          ) : (
            pastOrders.map((order) => (
              <div key={order.id} className="p-4 border rounded mb-4">
                <h4 className="font-bold">Order #{order.id}</h4>
                <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                <p>Total: ${order.total_amount}</p>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.product}>
                      {item.product}: {item.quantity} x ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };


export default PurchaseHistory;