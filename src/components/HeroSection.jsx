import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { EASE } from "./ScrollReveal";

// 1. Outside View: Resort Exterior & Infinity Pool
const OUTSIDE_IMG =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2400&auto=format&fit=crop";

// 2. Interior View: Grand Living Pavilion & Lounge
const INTERIOR_IMG =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2400&auto=format&fit=crop";

// 3. Room View: Ultra-Luxury Master Bedroom Suite
const ROOM_IMG =
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2400&auto=format&fit=crop";

export default function HeroSection() {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const [activeStage, setActiveStage] = useState(1);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Keep HUD stage updated dynamically
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      if (latest < 0.32) {
        setActiveStage(1);
      } else if (latest < 0.64) {
        setActiveStage(2);
      } else {
        setActiveStage(3);
      }
    });
    return () => unsub();
  }, [scrollYProgress]);

  // Initial Hero headline & actions fade out early
  const contentOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.12],
    ["0px", reduce ? "0px" : "-40px"]
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.12],
    [1, reduce ? 1 : 0.94]
  );
  const pointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.12 ? "none" : "auto"
  );

  // ---------------- STAGE 1: OUTSIDE VIEW ----------------
  const img1Scale = useTransform(
    scrollYProgress,
    [0, 0.08, 0.33],
    [1, reduce ? 1.04 : 1.15, reduce ? 1.15 : 3.8]
  );
  const img1Opacity = useTransform(scrollYProgress, [0, 0.24, 0.33], [1, 1, 0]);

  // Portal 1 caption (Outside -> Entering Resort)
  const portal1Opacity = useTransform(
    scrollYProgress,
    [0.1, 0.17, 0.23, 0.29],
    [0, 1, 1, 0]
  );
  const portal1Scale = useTransform(
    scrollYProgress,
    [0.1, 0.18, 0.29],
    [0.88, 1.0, reduce ? 1 : 1.3]
  );
  const portal1Y = useTransform(
    scrollYProgress,
    [0.1, 0.29],
    ["20px", reduce ? "0px" : "-25px"]
  );

  // ---------------- STAGE 2: INTERIOR VIEW ----------------
  const img2Scale = useTransform(
    scrollYProgress,
    [0.24, 0.35, 0.66],
    [1.0, reduce ? 1.05 : 1.12, reduce ? 1.15 : 3.8]
  );
  const img2Opacity = useTransform(
    scrollYProgress,
    [0.24, 0.32, 0.58, 0.66],
    [0, 1, 1, 0]
  );

  // Portal 2 caption (Interior Living Pavilion)
  const portal2Opacity = useTransform(
    scrollYProgress,
    [0.37, 0.45, 0.52, 0.6],
    [0, 1, 1, 0]
  );
  const portal2Scale = useTransform(
    scrollYProgress,
    [0.37, 0.46, 0.6],
    [0.88, 1.0, reduce ? 1 : 1.3]
  );
  const portal2Y = useTransform(
    scrollYProgress,
    [0.37, 0.6],
    ["20px", reduce ? "0px" : "-25px"]
  );

  // ---------------- STAGE 3: ROOM VIEW ----------------
  const img3Scale = useTransform(
    scrollYProgress,
    [0.58, 0.68, 0.96],
    [1.0, reduce ? 1.05 : 1.1, reduce ? 1.15 : 3.6]
  );
  const img3Opacity = useTransform(
    scrollYProgress,
    [0.58, 0.66, 0.9, 0.98],
    [0, 1, 1, 0]
  );

  // Portal 3 caption (Private Master Suite)
  const portal3Opacity = useTransform(
    scrollYProgress,
    [0.68, 0.76, 0.83, 0.9],
    [0, 1, 1, 0]
  );
  const portal3Scale = useTransform(
    scrollYProgress,
    [0.68, 0.77, 0.9],
    [0.88, 1.0, reduce ? 1 : 1.3]
  );
  const portal3Y = useTransform(
    scrollYProgress,
    [0.68, 0.9],
    ["20px", reduce ? "0px" : "-25px"]
  );

  // Ambient lighting & bloom
  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 0.98],
    [0.85, 0.28, 0.28, 0.05]
  );
  const lensOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.85],
    [0, reduce ? 0 : 0.55, 0.1]
  );

  // Bloom & final reveal handoff into DiscoverEstate
  const bloomOpacity = useTransform(
    scrollYProgress,
    [0.88, 0.96, 1.0],
    [0, 0.94, 1.0]
  );
  const handoffOpacity = useTransform(
    scrollYProgress,
    [0.9, 0.97, 1.0],
    [0, 1, 1]
  );
  const handoffY = useTransform(scrollYProgress, [0.9, 1.0], ["30px", "0px"]);

  const line = (delay) => ({
    initial: { y: reduce ? 0 : "110%" },
    animate: { y: "0%" },
    transition: { duration: reduce ? 0 : 1.2, ease: EASE, delay },
  });

  const scrollToEstate = () => {
    const el = document.getElementById("estate");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="hero-scroll-track"
      ref={trackRef}
      aria-label="Welcome to The Willow Estate"
    >
      <div className="hero-sticky-stage" ref={stageRef}>
        {/* Layered Background Tour Images */}
        <div className="hero-bg-container">
          {/* 1. OUTSIDE VIEW */}
          <motion.div
            className="hero-bg-layer"
            style={{
              opacity: img1Opacity,
              scale: img1Scale,
              transformOrigin: "50% 56%",
            }}
          >
            <img
              className="hero-zoom-img"
              src={OUTSIDE_IMG}
              alt="Outside view of The Willow Estate resort architecture and infinity pool"
              fetchpriority="high"
            />
          </motion.div>

          {/* 2. INTERIOR VIEW */}
          <motion.div
            className="hero-bg-layer"
            style={{
              opacity: img2Opacity,
              scale: img2Scale,
              transformOrigin: "50% 50%",
            }}
          >
            <img
              className="hero-zoom-img"
              src={INTERIOR_IMG}
              alt="Inside view of grand luxury living pavilion with ambient lighting"
              loading="eager"
            />
          </motion.div>

          {/* 3. ROOM VIEW */}
          <motion.div
            className="hero-bg-layer"
            style={{
              opacity: img3Opacity,
              scale: img3Scale,
              transformOrigin: "50% 52%",
            }}
          >
            <img
              className="hero-zoom-img"
              src={ROOM_IMG}
              alt="Private luxury villa master bedroom suite overlooking woodland"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Ambient Veils & Depth Lenses */}
        <motion.div
          className="hero-veil"
          style={{ opacity: veilOpacity }}
          aria-hidden="true"
        />
        <motion.div
          className="hero-depth-lens"
          style={{ opacity: lensOpacity }}
          aria-hidden="true"
        />

        {/* Floating 3-Stage Tour HUD */}
        <div className="hero-stage-hud" aria-hidden="true">
          <div className={`hud-step ${activeStage === 1 ? "active" : ""}`}>
            <span className="hud-dot" />
            <span>01 Outside</span>
          </div>
          <div className="hud-sep" />
          <div className={`hud-step ${activeStage === 2 ? "active" : ""}`}>
            <span className="hud-dot" />
            <span>02 Interior</span>
          </div>
          <div className="hud-sep" />
          <div className={`hud-step ${activeStage === 3 ? "active" : ""}`}>
            <span className="hud-dot" />
            <span>03 Suite</span>
          </div>
        </div>

        {/* PORTAL CAPTION 1: Outside -> Stepping In */}
        <motion.div
          className="hero-portal-layer"
          style={{
            opacity: portal1Opacity,
            scale: portal1Scale,
            y: portal1Y,
          }}
          aria-hidden="true"
        >
          <span className="portal-tag">01 · Resort Grounds</span>
          <h2 className="portal-heading">
            Stepping Across <em>The Grounds</em>
          </h2>
          <div className="portal-line" />
          <span className="portal-coords">38 ACRES OF PRISTINE WOODLAND & ARCHITECTURE</span>
        </motion.div>

        {/* PORTAL CAPTION 2: Interior Living */}
        <motion.div
          className="hero-portal-layer"
          style={{
            opacity: portal2Opacity,
            scale: portal2Scale,
            y: portal2Y,
          }}
          aria-hidden="true"
        >
          <span className="portal-tag">02 · Resort Interior</span>
          <h2 className="portal-heading">
            The Living <em>Pavilion</em>
          </h2>
          <div className="portal-line" />
          <span className="portal-coords">WARM TIMBER, STONE & CEILING-TO-FLOOR GLASS</span>
        </motion.div>

        {/* PORTAL CAPTION 3: Room View */}
        <motion.div
          className="hero-portal-layer"
          style={{
            opacity: portal3Opacity,
            scale: portal3Scale,
            y: portal3Y,
          }}
          aria-hidden="true"
        >
          <span className="portal-tag">03 · Private Suite</span>
          <h2 className="portal-heading">
            The Master <em>Sanctuary</em>
          </h2>
          <div className="portal-line" />
          <span className="portal-coords">WHERE QUIET MEETS UNHURRIED COMFORT</span>
        </motion.div>

        {/* Soft Ivory Bloom bridging into next section */}
        <motion.div
          className="hero-bloom-layer"
          style={{ opacity: bloomOpacity }}
          aria-hidden="true"
        />

        {/* Transition handoff reveal to DiscoverEstate */}
        <motion.div
          className="hero-handoff-reveal"
          style={{
            opacity: handoffOpacity,
            y: handoffY,
          }}
          aria-hidden="true"
        >
          <span className="handoff-badge">The Willow Sanctuary</span>
          <h2 className="handoff-title">
            A world away from the <em>everyday.</em>
          </h2>
          <p className="handoff-desc">
            Thirty-eight acres of ancient woodland, private villas & quiet grandeur.
          </p>
          <div className="handoff-indicator">
            Continue scrolling to explore <ChevronDown size={14} />
          </div>
        </motion.div>

        {/* Initial Hero Content (headline, actions, stats) */}
        <motion.div
          className="hero-content"
          style={{
            opacity: contentOpacity,
            y: contentY,
            scale: contentScale,
            pointerEvents,
          }}
        >
          <motion.span
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            An exclusive escape into nature
          </motion.span>
          <h1 className="hero-title">
            <span className="line-mask">
              <motion.span className="line-inner" {...line(0.45)}>
                Where <em>Luxury</em>
              </motion.span>
            </span>
            <span className="line-mask">
              <motion.span className="line-inner" {...line(0.6)}>
                Meets <em>Serenity.</em>
              </motion.span>
            </span>
          </h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05 }}
          >
            Discover private villas, extraordinary landscapes, and moments of
            stillness designed around you.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.25 }}
          >
            <a className="btn btn-gold" href="#villas">
              Explore Our Villas <ArrowRight />
            </a>
            <a className="btn btn-outline" href="#experiences">
              Discover the Experience
            </a>
          </motion.div>

          <motion.div
            className="hero-foot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
          >
            <div className="hero-meta">
              <div>
                <span>Collection</span>
                <b>12 Private Villas</b>
              </div>
              <div>
                <span>Setting</span>
                <b>38 Acres of Forest</b>
              </div>
              <div>
                <span>Rating</span>
                <b>5-Star Hospitality</b>
              </div>
            </div>
            <div
              className="scroll-cue"
              role="button"
              tabIndex={0}
              onClick={scrollToEstate}
              onKeyDown={(e) => e.key === "Enter" && scrollToEstate()}
              aria-label="Scroll to enter the estate"
            >
              Scroll to enter <span className="track" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
