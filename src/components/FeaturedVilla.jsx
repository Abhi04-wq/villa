import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BedDouble, Users, Waves, MapPin, Sparkles, Check } from "lucide-react";
import { EASE } from "./ScrollReveal";

const FEATURED_IMG =
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop";

export default function FeaturedVilla({ onOpenBooking, onSelectVilla }) {
  const reduce = useReducedMotion();

  const imgReveal = {
    hidden: { opacity: 0, scale: reduce ? 1 : 1.04 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.0, ease: EASE },
    },
  };

  const panelAnim = {
    hidden: { opacity: 0, y: reduce ? 0 : 36 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE, delay: 0.2 },
    },
  };

  const detailItemAnim = (delay) => ({
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE, delay },
    },
  });

  return (
    <section className="featured-villa-section" aria-label="Featured residence">
      <div className="container">
        <motion.div
          className="featured-villa-wrapper"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.05 }}
        >
          {/* Large Hero Image Container (65% width) */}
          <div className="featured-villa-media-wrap">
            <motion.div className="featured-villa-media" variants={imgReveal}>
              <motion.img
                src={FEATURED_IMG}
                alt="The Forest Residence — Signature private luxury villa in woodland with heated infinity pool"
                loading="lazy"
                whileHover={reduce ? undefined : { scale: 1.03 }}
                transition={{ duration: 1.2, ease: EASE }}
              />
              <div className="featured-villa-badge">
                <Sparkles size={13} className="badge-icon" />
                <span>Signature Collection · Flagship</span>
              </div>
              <div className="featured-img-caption">
                Upper Forest Ridge · Heated Infinity Edge overlooking Ancient Canopy
              </div>
            </motion.div>
          </div>

          {/* Complementary Information Panel */}
          <motion.div className="featured-villa-panel" variants={panelAnim}>
            <div className="featured-villa-sub">
              <span className="label">The Signature Collection</span>
            </div>

            <h2 className="featured-villa-title">
              The Forest <em>Residence</em>
            </h2>

            <blockquote className="featured-villa-quote">
              “A private sanctuary framed by nature, designed for slow mornings, quiet evenings, and unforgettable stays.”
            </blockquote>

            <p className="featured-villa-desc">
              Our flagship retreat — a soaring timber-and-glass residence wrapped in ancient oak woodland.
              Floor-to-ceiling glass pavilions open seamlessly to heated volcanic stone terraces and private forest trails.
            </p>

            {/* Verified Details Grid */}
            <div className="featured-specs-grid">
              <motion.div className="f-spec-item" variants={detailItemAnim(0.3)}>
                <Users size={17} />
                <div>
                  <small>Capacity</small>
                  <b>8 Guests</b>
                </div>
              </motion.div>

              <motion.div className="f-spec-item" variants={detailItemAnim(0.36)}>
                <BedDouble size={17} />
                <div>
                  <small>Bedrooms</small>
                  <b>4 Suites · 5 Baths</b>
                </div>
              </motion.div>

              <motion.div className="f-spec-item" variants={detailItemAnim(0.42)}>
                <Waves size={17} />
                <div>
                  <small>Private Pool</small>
                  <b>Heated Infinity Edge</b>
                </div>
              </motion.div>

              <motion.div className="f-spec-item" variants={detailItemAnim(0.48)}>
                <MapPin size={17} />
                <div>
                  <small>Setting</small>
                  <b>Upper Forest Ridge</b>
                </div>
              </motion.div>
            </div>

            {/* Highlights List */}
            <motion.ul className="featured-highlights" variants={detailItemAnim(0.52)}>
              <li><Check size={14} /> Private on-demand chef &amp; kitchen team</li>
              <li><Check size={14} /> Forest-facing Finnish sauna &amp; plunge bath</li>
              <li><Check size={14} /> Private cinema room &amp; wine collection</li>
            </motion.ul>

            {/* Price & Actions */}
            <motion.div className="featured-villa-footer" variants={detailItemAnim(0.58)}>
              <div className="featured-price-tag">
                <small>Starting from</small>
                <div className="price-val">
                  <b>$890</b>
                  <span>/ night</span>
                </div>
              </div>

              <div className="featured-actions">
                <button
                  type="button"
                  className="btn btn-gold"
                  onClick={() => onOpenBooking && onOpenBooking("forest")}
                >
                  Discover This Villa <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  className="text-link check-link"
                  onClick={() => onOpenBooking && onOpenBooking("forest")}
                >
                  Check Availability
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
