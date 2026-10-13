import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import DiscoverEstate from "./components/DiscoverEstate";
import VillaPageIntro from "./components/VillaPageIntro";
import FeaturedVilla from "./components/FeaturedVilla";
import VillaCollection from "./components/VillaCollection";
import CinematicExperience from "./components/CinematicExperience";
import VillaAmenities from "./components/VillaAmenities";
import ExperienceSection from "./components/ExperienceSection";
import VillaGallery from "./components/VillaGallery";
import Testimonials from "./components/Testimonials";
import BookingForm from "./components/BookingForm";
import LocationSection from "./components/LocationSection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import BookingPanel from "./components/BookingPanel";

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVillaId, setSelectedVillaId] = useState(null);

  const openBooking = (villaId = null) => {
    setSelectedVillaId(villaId);
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setSelectedVillaId(null);
  };

  return (
    <div className="App" id="top">
      <a className="skip-link" href="#main">Skip to content</a>

      {/* Global Navbar with smooth anchor scrolling */}
      <Navbar onOpenBooking={() => openBooking()} />

      <main id="main">
        {/* 1. Cinematic Scroll-Controlled 9-Scene Villa Exploration */}
        <HeroSection onOpenBooking={() => openBooking()} />

        {/* 2. Discover Estate */}
        <DiscoverEstate />


        <div id="villas" className="villas-master-section">
          <VillaPageIntro onOpenBooking={openBooking} />
          <FeaturedVilla onOpenBooking={openBooking} />
          <VillaCollection onOpenBooking={openBooking} />
          <CinematicExperience onOpenBooking={openBooking} />
        </div>

        <VillaAmenities />
        <ExperienceSection />
        <VillaGallery />
        <Testimonials />
        <BookingForm />
        <LocationSection />
        <FinalCTA onOpenBooking={() => openBooking()} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Interactive Booking & Availability Drawer/Modal */}
      <BookingPanel
        isOpen={bookingOpen}
        onClose={closeBooking}
        initialVillaId={selectedVillaId}
      />
    </div>
  );
}

export default App;
