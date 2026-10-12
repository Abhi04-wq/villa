import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";
import { EASE } from "./ScrollReveal";

const GALLERY_PHOTOS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop",
    title: "Resort Infinity Edge & Volcanic Stone Terrace",
    category: "Architecture & Pools",
    aspect: "wide",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1600&auto=format&fit=crop",
    title: "Master Suite with Panoramic Forest Canopy View",
    category: "Bedrooms & Suites",
    aspect: "tall",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    title: "The Living Pavilion in Natural Oak & Travertine",
    category: "Interiors",
    aspect: "square",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop",
    title: "Freestanding Marble Soaking Tub overlooking Oak Woods",
    category: "Bathrooms & Spas",
    aspect: "square",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
    title: "Candlelit Garden Dining Pavilion at Dusk",
    category: "Dining & Terraces",
    aspect: "tall",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
    title: "Lakeside Villa Floating Travertine Deck",
    category: "Lakeside Views",
    aspect: "wide",
  },
];

export default function VillaGallery() {
  const [activePhoto, setActivePhoto] = useState(null);
  const reduce = useReducedMotion();

  const handleStep = useCallback((dir) => {
    setActivePhoto((cur) => {
      if (cur === null) return cur;
      return (cur + dir + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    });
  }, []);

  useEffect(() => {
    if (activePhoto === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActivePhoto(null);
      if (e.key === "ArrowRight") handleStep(1);
      if (e.key === "ArrowLeft") handleStep(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePhoto, handleStep]);

  const imgReveal = (idx) => ({
    hidden: { opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 28 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE, delay: idx * 0.08 },
    },
  });

  return (
    <section className="villa-gallery-section" id="gallery" aria-label="Visual exploration of our residences">
      <div className="container">
        <div className="v-gallery-head">
          <span className="label">Visual Exploration</span>
          <h2 className="v-gallery-title">
            Architecture, Light &amp; <em>Landscape</em>
          </h2>
          <p className="v-gallery-subtitle">
            A glimpse into the quiet details, handcrafted materials, and breathtaking views that define The Willow Estate.
          </p>
        </div>

        {/* Asymmetric Gallery Arrangement */}
        <motion.div
          className="v-gallery-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
        >
          {GALLERY_PHOTOS.map((photo, idx) => (
            <motion.div
              key={photo.id}
              className={`v-gallery-item item-${photo.aspect}`}
              variants={imgReveal(idx)}
              onClick={() => setActivePhoto(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setActivePhoto(idx)}
              aria-label={`View photo: ${photo.title}`}
            >
              <div className="v-gallery-media">
                <img src={photo.src} alt={photo.title} loading="lazy" />
              </div>
              <div className="v-gallery-overlay">
                <div className="overlay-info">
                  <span className="overlay-cat">{photo.category}</span>
                  <h4 className="overlay-title">{photo.title}</h4>
                </div>
                <div className="overlay-btn" aria-hidden="true">
                  <Expand size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
          >
            <button
              className="lightbox-close"
              onClick={() => setActivePhoto(null)}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            <button
              className="lightbox-nav-btn btn-prev"
              onClick={(e) => {
                e.stopPropagation();
                handleStep(-1);
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              className="lightbox-nav-btn btn-next"
              onClick={(e) => {
                e.stopPropagation();
                handleStep(1);
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={28} />
            </button>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={GALLERY_PHOTOS[activePhoto].src}
                src={GALLERY_PHOTOS[activePhoto].src}
                alt={GALLERY_PHOTOS[activePhoto].title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              />
              <div className="lightbox-caption">
                <span>{GALLERY_PHOTOS[activePhoto].category}</span>
                <h3>{GALLERY_PHOTOS[activePhoto].title}</h3>
                <small>{activePhoto + 1} of {GALLERY_PHOTOS.length}</small>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
