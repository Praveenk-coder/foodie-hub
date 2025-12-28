import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./store";
import "./Orders.css";

function Orders() {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allorders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
   
    if (!user) return;

    const userId = user._id || user.id;
    dispatch(fetchOrders(userId));
  }, [dispatch, user]);

  // If user is not logged in
  if (!user) {
    return (
      <div className="center-text" style={{ marginTop: "50px" }}>
        <h2>Please Login To View Your Orders</h2>
        <a href="/login">Login Here</a>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2 className="orders-heading">Your Orders</h2>

      {loading && <p className="center-text">Loading orders...</p>}
      {error && <p className="center-text" style={{ color: "red" }}>{error}</p>}
      {!loading && orders.length === 0 && (
        <p className="center-text">No orders found</p>
      )}

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3 className="order-title">Order ID: {order._id}</h3>

            <p><strong>Order Date:</strong> {order.orderDate}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>

            <div className="items-box">
              <strong>Items:</strong>
              {order.items?.map((item) => (
                <div key={item.id} className="item-row">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                  <span>× {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
