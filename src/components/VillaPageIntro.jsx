import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { EASE } from "./ScrollReveal";

export default function VillaPageIntro({ onOpenBooking }) {
  const reduce = useReducedMotion();

  const eyebrowAnim = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.1 } },
  };

  const line1Anim = {
    hidden: { y: reduce ? 0 : "105%" },
    show: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: 0.25 } },
  };

  const line2Anim = {
    hidden: { y: reduce ? 0 : "105%" },
    show: { y: "0%", transition: { duration: 1.15, ease: EASE, delay: 0.4 } },
  };

  const descAnim = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.65 } },
  };

  const btnAnim = {
    hidden: { opacity: 0, x: reduce ? 0 : 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE, delay: 0.55 } },
  };

  return (
    <section className="villa-intro-section" aria-label="Introduction to our villas">
      <div className="container">
        <motion.div
          className="villa-intro-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.05 }}
        >
          <div className="villa-intro-left">
            <motion.span className="label" variants={eyebrowAnim}>
              Stay with us
            </motion.span>

            <h1 className="villa-intro-heading">
              <span className="line-mask">
                <motion.span className="line-inner" variants={line1Anim}>
                  Explore our
                </motion.span>
              </span>
              <span className="line-mask">
                <motion.span className="line-inner" variants={line2Anim}>
                  <em className="villas-accent">villas.</em>
                </motion.span>
              </span>
            </h1>

            <motion.p className="villa-intro-desc" variants={descAnim}>
              Discover thoughtfully designed private retreats where nature,
              architecture, and exceptional comfort come together.
            </motion.p>
          </div>

          <div className="villa-intro-right">
            <motion.div className="villa-intro-cta-box" variants={btnAnim}>
              <div className="villa-intro-stats-preview">
                <div>
                  <b>12</b>
                  <span>Private Residences</span>
                </div>
                <div className="stat-divider" />
                <div>
                  <b>38</b>
                  <span>Acres of Nature</span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-gold btn-availability"
                onClick={() => onOpenBooking && onOpenBooking()}
              >
                <Calendar size={15} /> Check Availability <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
