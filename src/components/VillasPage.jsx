import { useState, useEffect } from "react";
import VillaPageIntro from "./VillaPageIntro";
import FeaturedVilla from "./FeaturedVilla";
import VillaCollection from "./VillaCollection";
import CinematicExperience from "./CinematicExperience";
import VillaAmenities from "./VillaAmenities";
import VillaGallery from "./VillaGallery";
import FinalCTA from "./FinalCTA";
import BookingPanel from "./BookingPanel";

export default function VillasPage({ onNavigate }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVillaId, setSelectedVillaId] = useState(null);

  // Scroll to top when VillasPage mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleOpenBooking = (villaId = null) => {
    setSelectedVillaId(villaId);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedVillaId(null);
  };

  return (
    <div className="villas-page" id="villas-top">
      {/* 1. Immersive Editorial Intro */}
      <VillaPageIntro onOpenBooking={handleOpenBooking} />

      {/* 2. Large Signature Featured Villa Section */}
      <FeaturedVilla onOpenBooking={handleOpenBooking} />

      {/* 3. Premium Asymmetric Villa Collection Grid */}
      <VillaCollection onOpenBooking={handleOpenBooking} />

      {/* 4. Full-Width Cinematic Parallax Experience */}
      <CinematicExperience onOpenBooking={handleOpenBooking} />

      {/* 5. Features and Amenities with Delicate Icons */}
      <VillaAmenities />

      {/* 6. Editorial Photography Gallery with Lightbox */}
      <VillaGallery />

      {/* 7. Closing Cinematic Sunset Call-To-Action */}
      <FinalCTA onOpenBooking={handleOpenBooking} />

      {/* Interactive Booking & Availability Drawer/Modal */}
      <BookingPanel
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        initialVillaId={selectedVillaId}
      />
    </div>
  );
}
