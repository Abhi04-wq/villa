import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal, { fadeUp } from "./ScrollReveal";

// Clearly-marked sample placeholders — replace with verified guest reviews before launch.
const QUOTES = [
  {
    text: "We arrived as guests and left as family. The Forest Residence at dawn — mist on the water, coffee on the terrace — is something we will carry with us for years.",
    name: "Eleanor & James Whitmore", detail: "Stayed in The Forest Residence · Sample review",
  },
  {
    text: "Impeccable without ever feeling formal. Dinner beneath the stars, a spa morning in the garden pavilion — every detail felt quietly personal.",
    name: "Sofia Marchetti", detail: "Stayed in The Azure Villa · Sample review",
  },
  {
    text: "The most restful week of our lives. Our host arranged walks, transfers and celebrations so seamlessly we barely lifted a finger.",
    name: "Daniel Okafor", detail: "Stayed in The Glasshouse Retreat · Sample review",
  },
];

export default function Testimonials() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 7000);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const q = QUOTES[i];

  return (
    <section
      className="testi section-pad"
      id="stories"
      aria-label="Stories from our guests"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container" style={{ maxWidth: 900 }}>
        <ScrollReveal><span className="label centered" style={{ justifyContent: "center" }}>Guest stories</span></ScrollReveal>
        <ScrollReveal delay={0.1}><h2 className="h-editorial">Stories from <em>our guests.</em></h2></ScrollReveal>
        <ScrollReveal delay={0.15} variant={fadeUp}>
          <span className="testi-mark" aria-hidden="true">&ldquo;</span>
          <div className="testi-stars" aria-label="Rated 5 out of 5">
            {[0, 1, 2, 3, 4].map((s) => <Star key={s} />)}
          </div>
          <div style={{ minHeight: 220 }}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -14 }}
                transition={{ duration: 0.6 }}
                style={{ margin: 0 }}
              >
                <blockquote className="testi-quote">{q.text}</blockquote>
                <figcaption className="testi-who">
                  <b>{q.name}</b>
                  <span>{q.detail}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="testi-nav">
            <button onClick={() => setI((i - 1 + QUOTES.length) % QUOTES.length)} aria-label="Previous testimonial"><ArrowLeft /></button>
            <button onClick={() => setI((i + 1) % QUOTES.length)} aria-label="Next testimonial"><ArrowRight /></button>
          </div>
          <div className="testi-dots" aria-hidden="true">
            {QUOTES.map((_, d) => <i key={d} className={d === i ? "on" : ""} />)}
          </div>
          <p style={{ marginTop: 22, fontSize: "0.8rem", color: "var(--gray-warm)", fontWeight: 300 }}>
            Sample testimonials shown for design purposes — to be replaced with verified guest reviews.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
