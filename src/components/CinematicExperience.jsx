import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE } from "./ScrollReveal";

const CINEMATIC_IMG =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2400&auto=format&fit=crop";

export default function CinematicExperience({ onOpenBooking }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : "-10%", reduce ? "0%" : "10%"]);

  const line1Anim = {
    hidden: { opacity: 0, y: reduce ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE, delay: 0.2 } },
  };

  const line2Anim = {
    hidden: { opacity: 0, y: reduce ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.05, ease: EASE, delay: 0.4 } },
  };

  const subAnim = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.6 } },
  };

  const ctaAnim = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.8 } },
  };

  return (
    <section className="cinematic-section" ref={ref} aria-label="The Willow Estate experience">
      {/* Parallax Background Media */}
      <motion.div className="cinematic-bg" style={{ y: imgY }}>
        <img
          src={CINEMATIC_IMG}
          alt="Panoramic dusk vista of luxury villa architecture nestled in ancient forest canopy"
          loading="lazy"
        />
      </motion.div>

      {/* Darkened Cinematic Overlay */}
      <div className="cinematic-overlay" aria-hidden="true" />

      {/* Centered Editorial Content */}
      <div className="container cinematic-content-wrap">
        <motion.div
          className="cinematic-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.span className="label on-dark centered" variants={line1Anim}>
            The Willow Immersion
          </motion.span>

          <h2 className="cinematic-headline">
            <motion.span className="cinematic-line" variants={line1Anim}>
              More Than a Stay.
            </motion.span>
            <motion.span className="cinematic-line" variants={line2Anim}>
              <em>A Feeling That Stays.</em>
            </motion.span>
          </h2>

          <motion.p className="cinematic-sub" variants={subAnim}>
            Reconnect with nature, rediscover quiet moments, and experience hospitality shaped around you.
          </motion.p>

          <motion.div className="cinematic-cta-wrap" variants={ctaAnim}>
            <a href="#experiences" className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>
              Discover the Experience <ArrowRight size={15} />
            </a>
            <button
              type="button"
              className="btn btn-gold"
              onClick={() => onOpenBooking && onOpenBooking()}
            >
              Reserve Your Sanctuary
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="cinematic-bottom-blend" aria-hidden="true" />
    </section>
  );
}
