import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BedDouble, Bath, Users, Waves, Sparkles } from "lucide-react";
import { EASE } from "./ScrollReveal";

export default function VillaCard({ villa, onOpenBooking, index = 0, isFeatured = false }) {
  const reduce = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 36 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE, delay: index * 0.1 },
    },
  };

  return (
    <motion.article
      className={`villa-card-premium ${isFeatured ? "villa-card-panoramic" : ""}`}
      variants={cardVariants}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div className="v-card-media-wrap">
        <motion.div
          className="v-card-media"
          whileHover={reduce ? undefined : { scale: 1.04 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <img src={villa.img} alt={villa.alt || villa.name} loading="lazy" />
        </motion.div>
        <span className="v-card-tag">{villa.tag}</span>
        {villa.badge && <span className="v-card-badge"><Sparkles size={11} /> {villa.badge}</span>}
      </div>

      <div className="v-card-content">
        <div className="v-card-header">
          <span className="v-card-collection">{villa.collection || "Private Sanctuary"}</span>
          <h3 className="v-card-title">{villa.name}</h3>
        </div>

        <p className="v-card-desc">{villa.desc}</p>

        <div className="v-card-specs">
          <span><Users size={14} /> {villa.guests}</span>
          <span><BedDouble size={14} /> {villa.beds}</span>
          <span><Bath size={14} /> {villa.baths}</span>
          {villa.pool && <span><Waves size={14} /> {villa.pool}</span>}
        </div>

        {villa.amenities && (
          <div className="v-card-amenities">
            {villa.amenities.map((item) => (
              <span key={item} className="amenity-chip">{item}</span>
            ))}
          </div>
        )}

        <div className="v-card-footer">
          <div className="v-card-price">
            <small>Starting from</small>
            <b>{villa.price}</b>
          </div>
          <div className="v-card-actions">
            <button
              type="button"
              className="btn btn-gold btn-sm"
              onClick={() => onOpenBooking && onOpenBooking(villa.id)}
            >
              Check Availability
            </button>
            <button
              type="button"
              className="text-link"
              onClick={() => onOpenBooking && onOpenBooking(villa.id)}
            >
              Explore Villa <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
