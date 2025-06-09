// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/PartnerAuth.css"; // Make sure this file exists and has updated styles

// const PartnerRegister = () => {
//   const [formData, setFormData] = useState({
//     hospitalName: "",
//     hospitalPhone: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const newErrors = {};
//     const nameRegex = /^[A-Za-z\s]+$/;
//     const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     const phoneRegex = /^\d{10}$/;

//     if (!formData.hospitalName || !nameRegex.test(formData.hospitalName)) {
//       newErrors.hospitalName = "Valid hospital name is required";
//     }

//     if (!formData.hospitalPhone || !phoneRegex.test(formData.hospitalPhone)) {
//       newErrors.hospitalPhone = "Phone number must be exactly 10 digits";
//     }

//     if (!formData.email || !gmailRegex.test(formData.email)) {
//       newErrors.email = "Valid Gmail is required (e.g., example@gmail.com)";
//     }

//     if (!formData.password || formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);

//     try {
//       const res = await fetch(
//         "http://localhost:3001/api/partners-register/register",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );

//       let data;
//       try {
//         data = await res.json();
//       } catch {
//         const text = await res.text();
//         console.error("Server response (not JSON):", text);
//         alert(
//           "Server returned an unexpected response. Check console for details."
//         );
//         return;
//       }

//       if (res.status === 201 && data.status === "success") {
//         localStorage.setItem("partner", JSON.stringify(data.partner));
//         localStorage.setItem("partnerToken", data.token);

//         alert("Partner registered successfully!");
//         navigate("/partner-dashboard", { replace: true });
//       } else {
//         alert(data.message || "Registration failed");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form className="partner-form" onSubmit={handleSubmit}>
//         <h2 className="form-title">Partner Registration</h2>

//         {[
//           { label: "Hospital Name", name: "hospitalName", type: "text" },
//           { label: "Hospital Phone", name: "hospitalPhone", type: "text" },
//           { label: "Email", name: "email", type: "email" },
//           { label: "Password", name: "password", type: "password" },
//         ].map(({ label, name, type }) => (
//           <div className="form-group" key={name}>
//             <label className="form-label" htmlFor={name}>
//               {label}
//             </label>
//             <input
//               className="form-control"
//               type={type}
//               id={name}
//               name={name}
//               value={formData[name]}
//               onChange={handleChange}
//               required
//             />
//             {errors[name] && <span className="error">{errors[name]}</span>}
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="btn-primary full-width"
//           disabled={loading}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PartnerRegister;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PartnerAuth.css";

const PartnerRegister = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    hospitalPhone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict hospitalPhone to numbers only and max 10 digits
    if (name === "hospitalPhone") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-digits
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.hospitalName || !nameRegex.test(formData.hospitalName)) {
      newErrors.hospitalName = "Valid hospital name is required";
    }

    if (!formData.hospitalPhone || !phoneRegex.test(formData.hospitalPhone)) {
      newErrors.hospitalPhone = "Phone number must be exactly 10 digits";
    }

    if (!formData.email || !gmailRegex.test(formData.email)) {
      newErrors.email = "Valid Gmail is required (e.g., example@gmail.com)";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3001/api/partners-register/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        console.error("Server response (not JSON):", text);
        alert("Unexpected server response. Check console for details.");
        return;
      }

      if (res.status === 201 && data.status === "success") {
        localStorage.setItem("partner", JSON.stringify(data.partner));
        localStorage.setItem("partnerToken", data.token);

        alert("Partner registered successfully!");
        navigate("/partner-dashboard", { replace: true });
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="partner-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Partner Registration</h2>

        {[
          { label: "Hospital Name", name: "hospitalName", type: "text" },
          { label: "Hospital Phone", name: "hospitalPhone", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
        ].map(({ label, name, type }) => (
          <div className="form-group" key={name}>
            <label className="form-label" htmlFor={name}>
              {label}
            </label>
            <input
              className="form-control"
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
            {errors[name] && <span className="error">{errors[name]}</span>}
          </div>
        ))}

        <button
          type="submit"
          className="btn-primary full-width"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default PartnerRegister;
