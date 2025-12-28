import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./Nonveg";
import Aboutus from "./Aboutus";
import Cart from "./Cart";
import Orders from "./Orders";
import RegistrationForm from "./registrationForm";
import Login from "./Login";
import { logout } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./footer.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // cart state
  const cartitems = useSelector((state) => state.cart);
  const TotalItems = cartitems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // auth state
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/Login");
  };

  return (
    <div className="app-wrapper">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
        <div className="container-fluid p-0">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={"foodie-hub.png"}
              alt="Logo"
              height={60}
              className="me-2 logo-img"
            />
            <div>
              <span className="fw-bold fs-3 brand-name">Foodie Hub</span>
              <p className="mb-0 small fst-italic tagline">
                Eat Healthy · Live Happily
              </p>
            </div>
          </Link>

          <ToastContainer />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/Veg">
                  Veg
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/NonVeg">
                  Non Veg
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/Aboutus">
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/Orders">
                  Orders
                </Link>
              </li>

              {!user && (
                <li className="nav-item">
                  <Link
                    className="nav-link nav-link-custom"
                    to="/RegistrationForm"
                  >
                    Register
                  </Link>
                </li>
              )}

              <li className="nav-item">
                {user ? (
                  <button
                    onClick={logoutHandler}
                    className="nav-link nav-link-custom btn btn-link"
                    style={{ textDecoration: "none" }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link className="nav-link nav-link-custom" to="/Login">
                    Login
                  </Link>
                )}
              </li>

              <li className="nav-item position-relative">
                <Link className="nav-link nav-link-custom" to="/Cart">
                  <img src="cart.png" alt="Cart" height={38} />
                  <span className="cart-badge">{TotalItems}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Veg" element={<Veg />} />
          <Route path="/NonVeg" element={<NonVeg />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
  <div className="footer-container">
    {/* Logo Section */}
    <div className="footer-section">
      <img src="/foodie-hub.png" alt="Foodie Hub Logo" className="footer-logo" />
      <p className="footer-text">Eat Healthy · Live Happily</p>
    </div>

    {/* Quick Links */}
    <div className="footer-section">
      <h4>Quick Links</h4>
      <Link to="/">Home</Link>
      <Link to="/Veg">Veg</Link>
      <Link to="/NonVeg">Non-Veg</Link>
      <Link to="/Aboutus">About Us</Link>
      <Link to="/Orders">Orders</Link>
    </div>

    {/* Social Media */}
    <div className="footer-section">
      <h4>Follow Us</h4>
      <div className="footer-social">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <img src="/insta logo.png" alt="Instagram" />
        </a>

        <a href="https://wa.me/919676996830" target="_blank" rel="noreferrer">
          <img src="/whatsapp logo.png" alt="WhatsApp" />
        </a>

        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <img src="/facebook logo.png" alt="Facebook" />
        </a>
      </div>
    </div>

    {/* Contact */}
    <div className="footer-section">
      <h4>Contact</h4>
      <p>Email: support@foodiehub.com</p>
      <p>Phone: +91 9676996830</p>
    </div>
  </div>

  <div className="footer-bottom">
    © 2025 Foodie Hub | All Rights Reserved
  </div>
</footer>
    </div>
  );
}

export default App;
