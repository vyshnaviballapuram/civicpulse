import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Statistics from "../components/Statistics";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import ComplaintModal from "../components/ComplaintModal";
import AuthModal from "../components/AuthModal";

export default function Home() {
  // Modal states
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);
  const [complaintMode, setComplaintMode] = useState("file"); // "file" or "track"
  const [selectedCategory, setSelectedCategory] = useState("roads");

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"

  const handleOpenFileModal = (category = "roads") => {
    setComplaintMode("file");
    setSelectedCategory(category);
    setComplaintModalOpen(true);
  };

  const handleOpenTrackModal = () => {
    setComplaintMode("track");
    setComplaintModalOpen(true);
  };

  const handleOpenAuth = (mode = "login") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="home-page-wrapper">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenFileModal={handleOpenFileModal}
        onOpenTrackModal={handleOpenTrackModal}
      />

      {/* 2. Hero Section */}
      <Hero
        onOpenFileModal={handleOpenFileModal}
        onOpenTrackModal={handleOpenTrackModal}
      />

      {/* 3. About CivicPulse */}
      <About />

      {/* 4. Complaint Categories */}
      <Services onOpenFileModal={handleOpenFileModal} />

      {/* 5. How CivicPulse Works */}
      <HowItWorks />

      {/* 6. Key Features */}
      <Features />

      {/* 7. Statistics Section */}
      <Statistics />

      {/* 8. Contact Section */}
      <Contact />

      {/* 9. Footer */}
      <Footer />

      {/* Modals */}
      {complaintModalOpen && (
        <ComplaintModal
          mode={complaintMode}
          initialCategory={selectedCategory}
          onClose={() => setComplaintModalOpen(false)}
        />
      )}

      {authModalOpen && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setAuthModalOpen(false)}
        />
      )}
    </div>
  );
}