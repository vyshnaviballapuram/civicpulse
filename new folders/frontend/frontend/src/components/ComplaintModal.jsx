import React, { useState } from "react";
import { FaTimes, FaFileAlt, FaSearch, FaCheckCircle, FaUpload, FaSpinner } from "react-icons/fa";
import "../styles/modal.css";

export default function ComplaintModal({ mode = "file", initialCategory = "roads", onClose }) {
  // File Complaint state
  const [fileForm, setFileForm] = useState({
    title: "",
    category: initialCategory,
    address: "",
    description: "",
    imageName: "",
  });
  const [fileSubmitted, setFileSubmitted] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState("");

  // Track Complaint state
  const [ticketInput, setTicketInput] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackLoading, setTrackLoading] = useState(false);

  // File Submit handler
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (!fileForm.title || !fileForm.description) return;

    setFileLoading(true);
    setTimeout(() => {
      setFileLoading(false);
      const ticketId = "CP-" + Math.floor(100000 + Math.random() * 900000);
      setGeneratedTicket(ticketId);
      setFileSubmitted(true);
    }, 1200);
  };

  // Track Submit handler
  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!ticketInput) return;

    setTrackLoading(true);
    setTimeout(() => {
      setTrackLoading(false);
      setTrackingResult({
        ticketId: ticketInput.toUpperCase(),
        status: "In Progress - Department Action",
        category: "Road Infrastructure",
        assignedOfficer: "Eng. R. K. Varma (Ward 14)",
        estimatedDate: "Aug 10, 2026",
        lastUpdate: "Field survey completed. Maintenance team dispatched.",
      });
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-title">
            <div className="modal-header-icon">
              {mode === "file" ? <FaFileAlt /> : <FaSearch />}
            </div>
            <h3>{mode === "file" ? "Submit New Civic Grievance" : "Track Complaint Status"}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {mode === "file" ? (
            fileSubmitted ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <FaCheckCircle style={{ fontSize: "3.5rem", color: "var(--secondary-green)", marginBottom: "1rem" }} />
                <h3 style={{ fontSize: "1.4rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>
                  Complaint Successfully Filed!
                </h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  Your grievance has been auto-routed to the respective Municipal Department.
                </p>
                <div style={{ background: "var(--primary-blue-bg)", padding: "1rem", borderRadius: "10px", fontWeight: "700", color: "var(--primary-blue)", fontSize: "1.2rem", marginBottom: "1.5rem" }}>
                  Tracking ID: {generatedTicket}
                </div>
                <button className="modal-btn-submit" onClick={onClose}>
                  Done
                </button>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleFileSubmit}>
                <div className="form-group">
                  <label>Complaint Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Large pothole near Sector 4 Main Market"
                    value={fileForm.title}
                    onChange={(e) => setFileForm({ ...fileForm, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Select Department Category *</label>
                  <select
                    className="form-control"
                    value={fileForm.category}
                    onChange={(e) => setFileForm({ ...fileForm, category: e.target.value })}
                  >
                    <option value="roads">Roads &amp; Traffic Infrastructure</option>
                    <option value="water">Water Supply &amp; Pipeline Leaks</option>
                    <option value="electricity">Electricity &amp; Streetlights</option>
                    <option value="sanitation">Sanitation &amp; Garbage Clearance</option>
                    <option value="others">Other Public Services</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Exact Location / Address *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Landmark, Street name, Ward number"
                    value={fileForm.address}
                    onChange={(e) => setFileForm({ ...fileForm, address: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Detailed Description *</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Explain the severity and details of the issue..."
                    value={fileForm.description}
                    onChange={(e) => setFileForm({ ...fileForm, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Upload Photo Proof (Optional)</label>
                  <div
                    style={{
                      border: "2px dashed var(--border-light)",
                      borderRadius: "10px",
                      padding: "1rem",
                      textAlign: "center",
                      backgroundColor: "var(--bg-main)",
                      cursor: "pointer",
                    }}
                  >
                    <FaUpload style={{ fontSize: "1.5rem", color: "var(--primary-blue)", marginBottom: "0.4rem" }} />
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      Click to upload JPEG / PNG (Max 5MB)
                    </div>
                  </div>
                </div>

                <div className="modal-actions-footer">
                  <button type="button" className="modal-btn-cancel" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="modal-btn-submit" disabled={fileLoading}>
                    {fileLoading ? "Submitting..." : "Submit Complaint"}
                  </button>
                </div>
              </form>
            )
          ) : (
            <div>
              <form className="modal-form" onSubmit={handleTrackSubmit}>
                <div className="form-group">
                  <label>Enter Complaint Tracking ID *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. CP-489201"
                    value={ticketInput}
                    onChange={(e) => setTicketInput(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="modal-btn-submit" style={{ width: "100%" }} disabled={trackLoading}>
                  {trackLoading ? "Searching Portal..." : "Track Live Status"}
                </button>
              </form>

              {trackingResult && (
                <div className="tracking-result-box">
                  <div style={{ fontWeight: "700", color: "var(--text-main)", fontSize: "1.1rem" }}>
                    Ticket: {trackingResult.ticketId}
                  </div>
                  <div className="tracking-status-badge">{trackingResult.status}</div>
                  
                  <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div><strong>Category:</strong> {trackingResult.category}</div>
                    <div><strong>Assigned Officer:</strong> {trackingResult.assignedOfficer}</div>
                    <div><strong>Expected Resolution:</strong> {trackingResult.estimatedDate}</div>
                    <div><strong>Latest Remark:</strong> {trackingResult.lastUpdate}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
