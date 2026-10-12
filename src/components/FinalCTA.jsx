import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollReveal, { fadeUp } from "./ScrollReveal";

export default function FinalCTA() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.12, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : "-6%", reduce ? "0%" : "6%"]);

  return (
    <section className="final-cta" ref={ref} aria-label="Reserve your stay">
      <motion.div className="final-bg" style={{ scale, y }}>
        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2400&auto=format&fit=crop"
          alt="Sunset over the villa infinity pool"
          loading="lazy"
        />
      </motion.div>
      <div className="final-veil" aria-hidden="true" />
      <div className="container final-content">
        <ScrollReveal><span className="label on-dark centered" style={{ justifyContent: "center" }}>Your private escape</span></ScrollReveal>
        <ScrollReveal variant={fadeUp} delay={0.1}>
          <h2>Your Private <em>Escape Awaits.</em></h2>
        </ScrollReveal>
        <ScrollReveal variant={fadeUp} delay={0.2}>
          <p>Leave the ordinary behind and discover a stay designed around you.</p>
        </ScrollReveal>
        <ScrollReveal variant={fadeUp} delay={0.3}>
          <a className="btn btn-light" href="#booking" style={{ fontSize: 13, padding: "19px 44px" }}>
            Reserve Your Stay <ArrowRight />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
