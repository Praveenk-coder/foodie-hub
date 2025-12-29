import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removefromcart,
  incrementQuantity,
  decrementQuantity,
  placeOrder,
  clearCart,
  resetCoupon,} from './store';
import CouponApply from './CouponApply';
import SendOrderEmail from './SendOrderEmail';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const { cdiscount, applied, message } = useSelector((state) => state.coupon);
  const { error, successMessage } = useSelector(
    (state) => state.orders
  );

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [discount, setDiscount] = useState(0);
  const [customerEmail, setCustomerEmail] = useState('');
  const [showQR, setShowQR] = useState(false);

  const discountAmount = (totalPrice * discount) / 100;
  const couponAmount = (totalPrice * cdiscount) / 100;
  const priceAfterDiscount = totalPrice - discountAmount - couponAmount;
  const gst = (priceAfterDiscount * 18) / 100;
  const discountedPrice = discountAmount + couponAmount;
  const finalPrice = priceAfterDiscount + gst;

  const handlecheckout = () => {
    const orderData = {
      items: cartItems,
      totalAmount: finalPrice,
      orderdate: new Date(),
    }

    dispatch(placeOrder(orderData))
    .unwrap()
    .then((res)=>{
      dispatch(clearCart());
      dispatch(resetCoupon());
      setDiscount(0);
      Swal.fire({
        title:"Success.!",
        text:res.message||"Order Placed Successfully",
        icon:"success",
        confirmButtonText:"Go To Orders",
        confirmButtonColor:"#3085d6",
      }).then(()=>{
        Navigate("/orders");
      }
      )})
      .catch(()=>{
        Swal.fire({
          title:"Error...!",
          text:"Order failed, Try again..!",
          icon:"error",
          confirmButtonText:"ok",
          confirmButtonColor:"#d65930ff",

        })
      })
  };

  useEffect(() => {
  if (message && applied) {
    toast.success("yahoo...Coupon Applied....", {
      position: 'top-center',
      autoClose: 2500,
      pauseOnHover: true
    });
      return () => {
    dispatch(resetCoupon());
  };


  }
}, [message, applied,dispatch]);

  // UPI Details
  const upiID = '9676996830@axl';
  const payerName = 'Foodie-Hub';
  const upilink = `upi://pay?pa=${upiID}&pn=${payerName}&am=${finalPrice}&cu=INR`;

return (
  <div className="container mt-5 cart-layout">
    <p className="discountmsg">
      Shop more and save more with our exclusive discounts!
    </p>
    <h2 className="mb-4 text-center text-success">🛒 Your Cart</h2>

    {cartItems.length > 0 ? (
      <div className="row">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="col-md-7">
          <table className="table table-hover">
            <thead className="table-success text-center">
              <tr>
                <td>Item Name</td>
                <td>Image</td>
                <td>Price (₹)</td>
                <td>Quantity</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="fw-semibold">{item.name}</td>
                  <td>
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{ width: '50px', height: '50px' }}
                    />
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger me-1"
                      onClick={() => dispatch(decrementQuantity(item))}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="btn btn-sm btn-outline-success ms-1"
                      onClick={() => dispatch(incrementQuantity(item))}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {dispatch(removefromcart({ id: item.id }));toast.error(`oho...!..${item.name} Removed`,
                              {
                                position:'top-right',
                                closeOnClick:true,
                                autoClose:2500,
                                pauseOnHover:true
                              })}}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT SIDE - PAYMENT & ACTIONS */}
        <div className="col-md-5 payment-section text-center">
          <CouponApply />
          {message && (
            <p className={applied ? 'text-success' : 'text-danger'}>
              {message}
            </p>
          )}

          <h5>Total Price: ₹{totalPrice}</h5>
          <button
            className="btn btn-outline-primary mx-1"
            onClick={() => {setDiscount(10);toast.success(`yahoo...you got 10% off....`,
                              {
                                position:'top-center',
                                closeOnClick:true,
                                autoClose:2500,
                                pauseOnHover:true
                              })}}
            disabled={totalPrice < 300}
          >
            10%
          </button>
          <button
            className="btn btn-outline-warning mx-1"
            onClick={() =>{setDiscount(20);toast.success(`yahoo...you got 20% off....`,
                              {
                                position:'top-center',
                                closeOnClick:true,
                                autoClose:2500,
                                pauseOnHover:true
                              })}}
            disabled={totalPrice < 600}
          >
            20%
          </button>
          <button
            className="btn btn-outline-danger mx-1"
            onClick={() => {setDiscount(30);toast.success(`yahoo...you got 30% off....`,
                              {
                                position:'top-center',
                                closeOnClick:true,
                                autoClose:2500,
                                pauseOnHover:true
                              })}}
            disabled={totalPrice < 1000}
          >
            30%
          </button>

          <h6>Selected Discount: {discount}%</h6>
          <h6>Discount Amount: ₹{discountAmount.toFixed(2)}</h6>
          <h6>Coupon Discount: ₹{couponAmount.toFixed(2)}</h6>
          <h6>Price After Discount: ₹{priceAfterDiscount.toFixed(2)}</h6>
          <h6>GST (18%): ₹{gst.toFixed(2)}</h6>
          <h4 className="text-success">
            Final Price: ₹{finalPrice.toFixed(2)}
          </h4>

          <div className="EmailSection mt-4">
            <h5>Get order summary via Email</h5>
            <input
              type="email"
              placeholder="Enter your email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            <SendOrderEmail
              cartItems={cartItems}
              finalPrice={finalPrice.toFixed(2)}
              customerEmail={customerEmail}
              GST={gst.toFixed(2)}
              priceAfterDiscount={priceAfterDiscount.toFixed(2)}
              totalPrice={totalPrice.toFixed(2)}
              discountedPrice={discountedPrice.toFixed(2)}
            />
          </div>

          <button
            className="btn btn-success mt-2"
            onClick={() => setShowQR(true)}
          >
            Scanner (Paynow)
          </button>

          {showQR && (
            <div className="qr-box mt-3">
              <h2>Total Amount: ₹{finalPrice}</h2>
              <QRCodeCanvas value={upilink} size={200} />
            </div>
          )}

          <div className="placeorder mt-4">
            <button className="btn btn-primary" onClick={handlecheckout}>
              Checkout
            </button>
            <h6>{successMessage}{error}</h6>
          </div>
        </div>
      </div>
    ) : (
      <div className="alert alert-warning text-center" role="alert">
        Your cart is currently empty 😔
      </div>
    )}
  </div>
);}


export default Cart;
