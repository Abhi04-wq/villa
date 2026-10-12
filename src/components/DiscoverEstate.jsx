import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollReveal, { fadeUp } from "./ScrollReveal";

const MAIN = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop";
const DETAIL = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop";

export default function DiscoverEstate() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 70, reduce ? 0 : -30]);

  return (
    <section className="section-pad" id="estate" ref={ref} aria-label="Discover the estate">
      <div className="container estate-grid">
        <div className="estate-copy">
          <ScrollReveal variant={fadeUp}><span className="label">The art of slow living</span></ScrollReveal>
          <ScrollReveal variant={fadeUp} delay={0.1}>
            <h2 className="h-editorial">A world away<br />from the <em>everyday.</em></h2>
          </ScrollReveal>
          <ScrollReveal variant={fadeUp} delay={0.2}>
            <p className="body">
              Tucked within thirty-eight acres of ancient woodland, The Willow Estate
              is a sanctuary of privacy and quiet grandeur — where hand-finished
              stone, warm timber and glass dissolve the line between architecture
              and nature.
            </p>
          </ScrollReveal>
          <ScrollReveal variant={fadeUp} delay={0.3}>
            <p className="body">
              Each arrival is personal. Each stay is unhurried. From dawn
              birdsong over the lake to candlelit dinners beneath the canopy,
              every detail is considered, every moment unmistakably yours.
            </p>
          </ScrollReveal>
          <ScrollReveal variant={fadeUp} delay={0.35}>
            <div className="estate-stats">
              <div><b>38</b><span>Acres of woodland</span></div>
              <div><b>12</b><span>Private villas</span></div>
              <div><b>25</b><span>Years of hospitality</span></div>
            </div>
          </ScrollReveal>
          <ScrollReveal variant={fadeUp} delay={0.4}>
            <a className="text-link" href="#stories">Our Story <ArrowRight /></a>
          </ScrollReveal>
        </div>

        <div className="estate-media">
          <ScrollReveal variant={fadeUp} amount={0.2}>
            <motion.div className="estate-main" style={{ y: yMain }}>
              <img src={MAIN} alt="Architectural view of The Willow Estate villa at golden hour" loading="lazy" />
            </motion.div>
          </ScrollReveal>
          <motion.div className="estate-small" style={{ y: ySmall }}>
            <img src={DETAIL} alt="Intimate interior detail with natural materials" loading="lazy" />
          </motion.div>
          <ScrollReveal variant={fadeUp} delay={0.35}>
            <div className="estate-badge"><i /> Est. 2001 · Private Estate</div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
