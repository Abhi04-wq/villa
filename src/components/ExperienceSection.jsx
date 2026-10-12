import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollReveal, { fadeUp } from "./ScrollReveal";

const ITEMS = [
  {
    n: "01",
    title: <>Private dining <em>beneath the stars.</em></>,
    desc: "A candlelit table in the walled garden or on the lake jetty — menus composed by our chef around the season and your palate.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    alt: "Candlelit private dining table at night",
  },
  {
    n: "02",
    title: <>Infinity-pool <em>relaxation.</em></>,
    desc: "Heated waters that dissolve into the treeline. In-villa treatments, chilled towels, and not a single reason to hurry.",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
    alt: "Infinity pool overlooking tropical greenery",
  },
  {
    n: "03",
    title: <>Wellness <em>&amp; spa rituals.</em></>,
    desc: "Forest yoga at dawn, deep-tissue massages in the garden pavilion, cedar sauna and cold-plunge therapy on request.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop",
    alt: "Spa still life with towels and orchid",
  },
  {
    n: "04",
    title: <>Nature walks <em>&amp; excursions.</em></>,
    desc: "Guided rambles through ancient woodland, sunrise lake crossings, and picnic hampers packed for two — or ten.",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    alt: "Sunlight streaming through forest path",
  },
  {
    n: "05",
    title: <>Celebrations <em>&amp; gatherings.</em></>,
    desc: "Intimate weddings, anniversaries and reunions for up to forty guests — planned quietly, executed flawlessly.",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    alt: "Romantic outdoor celebration table setting",
  },
];

export default function ExperienceSection() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgShift = useTransform(scrollYProgress, [0, 1], [reduce ? "0px" : "60px", reduce ? "0px" : "-60px"]);

  return (
    <section className="experiences section-pad" id="experiences" ref={ref} aria-label="Signature experiences">
      <motion.div style={{ y: bgShift }} className="container">
        <div className="exp-head">
          <ScrollReveal><span className="label on-dark">Signature experiences</span></ScrollReveal>
          <ScrollReveal delay={0.1}><h2 className="h-editorial on-dark">Moments worth <em style={{ color: "var(--gold-light)" }}>remembering.</em></h2></ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="lede" style={{ color: "rgba(247,245,239,0.7)", marginTop: 22 }}>
              Days here are not scheduled — they are composed. Tell us the mood,
              and our hosts will arrange the rest.
            </p>
          </ScrollReveal>
        </div>

        <div className="exp-list">
          {ITEMS.map((e, i) => (
            <ScrollReveal key={e.n} variant={fadeUp} delay={Math.min(i * 0.06, 0.25)} amount={0.2}>
              <a className="exp-row" href="#booking" aria-label={`${e.n} — ${typeof e.title === "string" ? e.title : "experience"}`}>
                <span className="exp-num">{e.n}</span>
                <div>
                  <h3>{e.title}</h3>
                  <p>{e.desc}</p>
                </div>
                <div className="exp-img">
                  <img src={e.img} alt={e.alt} loading="lazy" />
                </div>
                <span className="exp-arrow" aria-hidden="true"><ArrowRight /></span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
