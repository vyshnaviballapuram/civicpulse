import React, { useState } from "react";
import { FaTimes, FaSignInAlt, FaUserPlus, FaUser, FaUserShield, FaBuilding, FaInfoCircle } from "react-icons/fa";
import "../styles/modal.css";

export default function AuthModal({ initialMode = "login", onClose }) {
  const [mode, setMode] = useState(initialMode); // "login" or "register"
  const [loginRole, setLoginRole] = useState("user"); // "user" or "admin"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    department: "roads",
    officerId: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-title">
            <div className="modal-header-icon" style={{ color: loginRole === "admin" && mode === "login" ? "#D97706" : "var(--primary-blue)" }}>
              {mode === "login" ? (loginRole === "admin" ? <FaUserShield /> : <FaSignInAlt />) : <FaUserPlus />}
            </div>
            <h3>
              {mode === "login"
                ? loginRole === "admin"
                  ? "Admin / Officer Login"
                  : "Citizen Login"
                : "Citizen Registration"}
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "2rem 0", color: "var(--secondary-green)" }}>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                {mode === "login"
                  ? loginRole === "admin"
                    ? "Welcome Admin Officer!"
                    : "Citizen Login Successful!"
                  : "Citizen Account Registered!"}
              </h3>
              <p style={{ color: "var(--text-muted)" }}>
                {loginRole === "admin" && mode === "login"
                  ? "Redirecting to Municipal Admin Control Center..."
                  : "Redirecting to Citizen Grievance Portal..."}
              </p>
            </div>
          ) : (
            <>
              {/* Role Selection Tabs for Login Mode */}
              {mode === "login" ? (
                <div className="role-tabs-container">
                  <button
                    type="button"
                    className={`role-tab-btn ${loginRole === "user" ? "active" : ""}`}
                    onClick={() => setLoginRole("user")}
                  >
                    <FaUser /> Citizen Login
                  </button>
                  <button
                    type="button"
                    className={`role-tab-btn ${loginRole === "admin" ? "active admin-active" : ""}`}
                    onClick={() => setLoginRole("admin")}
                  >
                    <FaUserShield /> Admin Login
                  </button>
                </div>
              ) : (
                <div className="reg-info-notice">
                  <FaInfoCircle style={{ fontSize: "1.2rem", flexShrink: 0 }} />
                  <span>Citizen Registration Portal. (Municipal Admin accounts are provisioned internally by the Government).</span>
                </div>
              )}

              <form className="modal-form" onSubmit={handleSubmit}>
                {/* Registration Fields (Citizen Only) */}
                {mode === "register" && (
                  <>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Mobile Number (for Verification) *</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </>
                )}

                {/* Admin-Specific Login Fields */}
                {mode === "login" && loginRole === "admin" ? (
                  <>
                    <div className="form-group">
                      <label>Officer Govt Email / Employee ID *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. officer.1042@civicpulse.gov.in"
                        value={formData.officerId}
                        onChange={(e) => setFormData({ ...formData, officerId: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Municipal Department *</label>
                      <select
                        className="form-control"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      >
                        <option value="roads">Roads &amp; Traffic Infrastructure</option>
                        <option value="water">Water Supply &amp; Drainage</option>
                        <option value="electricity">Electricity &amp; Power Grid</option>
                        <option value="sanitation">Sanitation &amp; Waste Management</option>
                        <option value="superadmin">General Municipal Command Center</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Admin Access Code / Security PIN *</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                  </>
                ) : (
                  /* Citizen Login / Registration Shared Fields */
                  <>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="e.g. citizen@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Password *</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`modal-btn-submit ${mode === "login" && loginRole === "admin" ? "admin-btn" : ""}`}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                >
                  {mode === "login"
                    ? loginRole === "admin"
                      ? "Sign In to Admin Portal"
                      : "Sign In as Citizen"
                    : "Create Citizen Account"}
                </button>

                {/* Bottom Toggle Footer */}
                <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  {mode === "login" ? (
                    <>
                      Don't have a citizen account?{" "}
                      <span
                        style={{ color: "var(--primary-blue)", fontWeight: "700", cursor: "pointer" }}
                        onClick={() => setMode("register")}
                      >
                        Register Now
                      </span>
                    </>
                  ) : (
                    <>
                      Already registered?{" "}
                      <span
                        style={{ color: "var(--primary-blue)", fontWeight: "700", cursor: "pointer" }}
                        onClick={() => setMode("login")}
                      >
                        Login Here
                      </span>
                    </>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
