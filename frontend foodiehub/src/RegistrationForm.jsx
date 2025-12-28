import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./store";
import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css";
import { useEffect } from "react";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector(
    (state) => state.newuser
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (userDetails) => {
    dispatch(registerUser(userDetails));
  };

  // Redirect to login page after successful registration
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate("/login");
      }, 1500); // small delay so user can see success message
    }
  }, [successMessage, navigate]);

  return (
    <div className="registration-container">
      <form className="registration-box" onSubmit={handleSubmit(onSubmit)}>
        <h2>New User Registration</h2>

        {/* Name */}
        <label>Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Enter your name"
        />
        {errors.name && <p className="error-msg">{errors.name.message}</p>}

        {/* Email */}
        <label>Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error-msg">{errors.email.message}</p>}

        {/* Password */}
        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="error-msg">{errors.password.message}</p>
        )}

        {/* Phone */}
        <label>Phone</label>
        <input
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone must be 10 digits",
            },
          })}
          placeholder="Enter phone number"
        />
        {errors.phone && <p className="error-msg">{errors.phone.message}</p>}

        {/* Address */}
        <label>Address</label>
        <textarea
          {...register("address", { required: "Address is required" })}
          placeholder="Enter address"
        ></textarea>
        {errors.address && (
          <p className="error-msg">{errors.address.message}</p>
        )}

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Backend Messages */}
        {error && <p className="error-msg">{error}</p>}
        {successMessage && <p className="success-msg">{successMessage}</p>}

        {/* Already a user link */}
        <p className="login-link">
          Already a Foodie-Hub user?{" "}
          <span onClick={() => navigate("/login")}>Login here</span>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
