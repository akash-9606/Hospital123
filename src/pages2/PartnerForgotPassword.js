// import React, { useState } from "react";
// import axios from "axios";
// //import "../styles/PartnerForgotPassword.css"; // optional

// function PartnerForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSendResetLink = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/partners-register/forgot-password",
//         { email }
//       );
//       setMessage(response.data.message || "Reset link sent to your email.");
//     } catch (error) {
//       setMessage(
//         error?.response?.data?.message ||
//           "Failed to send reset link. Try again later."
//       );
//     }
//   };

//   return (
//     <div className="partner-forgot-container">
//       <div className="partner-forgot-box">
//         <h2>Forgot Password</h2>
//         <input
//           type="email"
//           placeholder="Enter your registered email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button onClick={handleSendResetLink}>Send Reset Link</button>
//         {message && <p className="message">{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default PartnerForgotPassword;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";
import axios from "axios";

const PartnerForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);

    if (!emailRegex.test(input)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    axios
      .post("http://localhost:3001/api/partners-register/forgot-password", {
        email,
      })
      .then((result) => {
        if (result.data.status) {
          alert("Check your email for the reset password link");
          navigate("/partner-login");
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Partner forgot password error:", err);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="container" style={{ height: "90%" }}>
      <div className="wrapper d-flex align-items-center justify-content-center h-100">
        <div className="card register-form">
          <div className="card-body">
            <h5 className="card-title text-center">Partner Forgot Password</h5>

            <form onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Partner Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                />
              </div>
              {emailError && (
                <div className="invalid-feedback d-block">{emailError}</div>
              )}

              {/* Submit button */}
              <button type="submit" className="btn btn-primary w-100">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>

        <div className="forgot-password-home-icon">
          <a href="/" className="home-icon">
            <i className="fa fa-home"></i>
            <span className="tooltip-text">Home</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnerForgotPassword;
