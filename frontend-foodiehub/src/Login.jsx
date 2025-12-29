import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./store";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { clearAuthMessages } from "./store";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  // Get auth state from Redux
  const { loading, error, successMessage, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(clearAuthMessages());
  }, [dispatch]);

  // Redirect to Veg page if user is logged in
 useEffect(() => {
  if (successMessage && user) {
    navigate("/veg");
  }
}, [successMessage, user, navigate]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit(submitHandler)}>
        <h2>Login</h2>

        {/* Backend Success */}
        {successMessage && <p className="success-msg">{successMessage}</p>}

        {/* Backend Error */}
        {error && <p className="error-msg">{error}</p>}

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter Email"
            {...register("email", { required: "*Email is required*" })}
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "*Password is required*",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            })}
          />
          {errors.password && (
            <p className="error-msg">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="register-link">
          New to Foodie-Hub?{" "}
          <Link to="/RegistrationForm" className="register-text">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
