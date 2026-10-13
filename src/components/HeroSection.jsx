import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Compass, Sparkles } from "lucide-react";
import { EASE } from "./ScrollReveal";

// 8 Cohesive Architectural Scenes for The Willow Estate
const SCENES = [
  {
    id: "aerial",
    step: "01",
    label: "Aerial Drone",
    title: "The Estate Grounds",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2600&auto=format&fit=crop",
    alt: "Spectacular aerial drone shot of The Willow Estate contemporary architecture, infinity pool, and surrounding forest",
  },
  {
    id: "arrival",
    step: "02",
    label: "The Arrival",
    title: "Private Sanctuary",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2600&auto=format&fit=crop",
    alt: "Estate stone driveway and entrance illuminated with warm lanterns approaching the villa",
  },
  {
    id: "foyer",
    step: "03",
    label: "Step Inside",
    title: "Entrance Foyer",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2600&auto=format&fit=crop",
    alt: "Modern villa entrance foyer with natural timber, stone, and warm ambient light",
  },
  {
    id: "living",
    step: "04",
    label: "Living Room",
    title: "The Pavilion",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2600&auto=format&fit=crop",
    alt: "Double-height living pavilion with designer sofas, stone fireplace, and panoramic glass",
  },
  {
    id: "bedroom",
    step: "05",
    label: "Master Suite",
    title: "Rest & Recharge",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2600&auto=format&fit=crop",
    alt: "Master bedroom suite with king-size bed overlooking ancient forest greenery",
  },
  {
    id: "wellness",
    step: "06",
    label: "Wellness Spa",
    title: "Private Sanctuary",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2600&auto=format&fit=crop",
    alt: "Freestanding stone bathtub and botanical spa bathroom overlooking woodland",
  },
  {
    id: "pool",
    step: "07",
    label: "Pool Reveal",
    title: "The Terrace",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2600&auto=format&fit=crop",
    alt: "Private infinity swimming pool and sun loungers reflecting sunset skies",
  },
  {
    id: "finale",
    step: "08",
    label: "Sunset Aerial",
    title: "Your Escape",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2600&auto=format&fit=crop",
    alt: "Wide panoramic sunset aerial view of the illuminated luxury villa estate",
  },
];

export default function HeroSection({ onOpenBooking }) {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Keep HUD stage updated dynamically across the 8 scenes
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      setScrollPct(Math.round(latest * 100));
      if (latest < 0.125) {
        setActiveStage(0);
      } else if (latest < 0.25) {
        setActiveStage(1);
      } else if (latest < 0.375) {
        setActiveStage(2);
      } else if (latest < 0.5) {
        setActiveStage(3);
      } else if (latest < 0.625) {
        setActiveStage(4);
      } else if (latest < 0.75) {
        setActiveStage(5);
      } else if (latest < 0.875) {
        setActiveStage(6);
      } else {
        setActiveStage(7);
      }
    });
    return () => unsub();
  }, [scrollYProgress]);

  // Jump smoothly to any scene index (0 to 7)
  const jumpToScene = (index) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const trackHeight = track.offsetHeight - window.innerHeight;
    const targetProgress = index / (SCENES.length - 1);
    const targetY = trackTop + trackHeight * targetProgress;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const scrollToVillas = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById("villas");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToArrival = () => {
    jumpToScene(1);
  };

  // ---------------- SCENE 1: CINEMATIC DRONE HERO ----------------
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.09], [1, 0]);
  const heroContentY = useTransform(
    scrollYProgress,
    [0, 0.09],
    ["0px", reduce ? "0px" : "-35px"]
  );
  const heroContentScale = useTransform(
    scrollYProgress,
    [0, 0.09],
    [1, reduce ? 1 : 0.95]
  );
  const heroPointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.09 ? "none" : "auto"
  );

  const img1Scale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.15],
    [1, reduce ? 1.05 : 1.15, reduce ? 1.15 : 3.6]
  );
  const img1Opacity = useTransform(scrollYProgress, [0, 0.11, 0.15], [1, 1, 0]);

  // ---------------- SCENE 2: THE ARRIVAL (ESTATE APPROACH) ----------------
  const img2Scale = useTransform(
    scrollYProgress,
    [0.12, 0.19, 0.28],
    [1.0, reduce ? 1.05 : 1.15, reduce ? 1.15 : 3.8]
  );
  const img2Opacity = useTransform(
    scrollYProgress,
    [0.12, 0.15, 0.25, 0.28],
    [0, 1, 1, 0]
  );

  // Portal 2 Caption: The Arrival
  const portal2Opacity = useTransform(
    scrollYProgress,
    [0.13, 0.17, 0.22, 0.26],
    [0, 1, 1, 0]
  );
  const portal2Scale = useTransform(
    scrollYProgress,
    [0.13, 0.18, 0.26],
    [0.9, 1.0, reduce ? 1 : 1.25]
  );
  const portal2Y = useTransform(
    scrollYProgress,
    [0.13, 0.26],
    ["20px", reduce ? "0px" : "-20px"]
  );

  // ---------------- SCENE 3: ENTER THE VILLA (FOYER) ----------------
  const img3Scale = useTransform(
    scrollYProgress,
    [0.25, 0.32, 0.42],
    [1.0, reduce ? 1.05 : 1.15, reduce ? 1.15 : 3.8]
  );
  const img3Opacity = useTransform(
    scrollYProgress,
    [0.25, 0.28, 0.38, 0.42],
    [0, 1, 1, 0]
  );

  // Pivot door opening on entry
  const pivotDoorRotate = useTransform(
    scrollYProgress,
    [0.27, 0.35],
    ["0deg", "-76deg"]
  );
  const pivotDoorOpacity = useTransform(
    scrollYProgress,
    [0.26, 0.29, 0.36, 0.4],
    [0, 0.9, 0.9, 0]
  );

  // Portal 3 Caption: Step Inside
  const portal3Opacity = useTransform(
    scrollYProgress,
    [0.27, 0.3, 0.36, 0.4],
    [0, 1, 1, 0]
  );
  const portal3Scale = useTransform(
    scrollYProgress,
    [0.27, 0.31, 0.4],
    [0.9, 1.0, reduce ? 1 : 1.25]
  );
  const portal3Y = useTransform(
    scrollYProgress,
    [0.27, 0.4],
    ["20px", reduce ? "0px" : "-20px"]
  );

  // ---------------- SCENE 4: EXPLORE THE LIVING ROOM ----------------
  const img4Scale = useTransform(
    scrollYProgress,
    [0.39, 0.46, 0.56],
    [1.0, reduce ? 1.04 : 1.12, reduce ? 1.12 : 3.6]
  );
  const img4PanX = useTransform(
    scrollYProgress,
    [0.39, 0.56],
    ["2%", reduce ? "0%" : "-6%"]
  );
  const img4Opacity = useTransform(
    scrollYProgress,
    [0.39, 0.42, 0.52, 0.56],
    [0, 1, 1, 0]
  );

  // Architectural feature pins in living room
  const livingPinsOpacity = useTransform(
    scrollYProgress,
    [0.42, 0.46, 0.5, 0.54],
    [0, 1, 1, 0]
  );

  // ---------------- SCENE 5: EXPLORE THE BEDROOM (MASTER SUITE) ----------------
  const img5Scale = useTransform(
    scrollYProgress,
    [0.53, 0.6, 0.7],
    [1.0, reduce ? 1.05 : 1.15, reduce ? 1.15 : 3.6]
  );
  const img5Opacity = useTransform(
    scrollYProgress,
    [0.53, 0.56, 0.66, 0.7],
    [0, 1, 1, 0]
  );

  // Portal 5 Caption: Rest & Recharge
  const portal5Opacity = useTransform(
    scrollYProgress,
    [0.55, 0.58, 0.64, 0.68],
    [0, 1, 1, 0]
  );
  const portal5Scale = useTransform(
    scrollYProgress,
    [0.55, 0.59, 0.68],
    [0.9, 1.0, reduce ? 1 : 1.25]
  );
  const portal5Y = useTransform(
    scrollYProgress,
    [0.55, 0.68],
    ["20px", reduce ? "0px" : "-20px"]
  );

  // ---------------- SCENE 6: BATHROOM & PRIVATE WELLNESS ----------------
  const img6Scale = useTransform(
    scrollYProgress,
    [0.67, 0.74, 0.83],
    [1.0, reduce ? 1.05 : 1.15, reduce ? 1.15 : 3.5]
  );
  const img6Opacity = useTransform(
    scrollYProgress,
    [0.67, 0.7, 0.79, 0.83],
    [0, 1, 1, 0]
  );

  // Portal 6 Caption: Private Sanctuary
  const portal6Opacity = useTransform(
    scrollYProgress,
    [0.69, 0.72, 0.77, 0.81],
    [0, 1, 1, 0]
  );
  const portal6Scale = useTransform(
    scrollYProgress,
    [0.69, 0.73, 0.81],
    [0.9, 1.0, reduce ? 1 : 1.25]
  );
  const portal6Y = useTransform(
    scrollYProgress,
    [0.69, 0.81],
    ["20px", reduce ? "0px" : "-20px"]
  );

  // ---------------- SCENE 7: THE SWIMMING POOL REVEAL ----------------
  const img7Scale = useTransform(
    scrollYProgress,
    [0.8, 0.86, 0.94],
    [1.0, reduce ? 1.05 : 1.18, reduce ? 1.15 : 3.5]
  );
  const img7Opacity = useTransform(
    scrollYProgress,
    [0.8, 0.83, 0.9, 0.94],
    [0, 1, 1, 0]
  );

  // Sliding glass terrace doors that open to reveal pool
  const doorSlideLeft = useTransform(
    scrollYProgress,
    [0.81, 0.87],
    ["0%", "-85%"]
  );
  const doorSlideRight = useTransform(
    scrollYProgress,
    [0.81, 0.87],
    ["0%", "85%"]
  );
  const doorsWrapOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.83, 0.88, 0.91],
    [0, 0.9, 0.9, 0]
  );

  // Portal 7 Caption: Outdoor Experience
  const portal7Opacity = useTransform(
    scrollYProgress,
    [0.81, 0.84, 0.88, 0.91],
    [0, 1, 1, 0]
  );
  const portal7Scale = useTransform(
    scrollYProgress,
    [0.81, 0.85, 0.91],
    [0.9, 1.0, reduce ? 1 : 1.25]
  );
  const portal7Y = useTransform(
    scrollYProgress,
    [0.81, 0.91],
    ["20px", reduce ? "0px" : "-20px"]
  );

  // ---------------- SCENE 8: FINAL AERIAL REVEAL & CTA ----------------
  const img8Scale = useTransform(
    scrollYProgress,
    [0.91, 0.96, 1.0],
    [reduce ? 1.05 : 1.2, 1.05, 1.0]
  );
  const img8Opacity = useTransform(
    scrollYProgress,
    [0.91, 0.94, 1.0],
    [0, 1, 1]
  );

  // Finale typography & action reveal
  const finaleOpacity = useTransform(
    scrollYProgress,
    [0.93, 0.97, 1.0],
    [0, 1, 1]
  );
  const finaleY = useTransform(
    scrollYProgress,
    [0.93, 0.97, 1.0],
    ["30px", "0px", "0px"]
  );
  const finaleScale = useTransform(
    scrollYProgress,
    [0.93, 0.97, 1.0],
    [0.92, 1.0, 1.0]
  );
  const finalePointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.93 ? "auto" : "none"
  );

  // Ambient lighting & bloom
  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.88, 0.98],
    [0.85, 0.32, 0.32, 0.15]
  );
  const lensOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.5, 0.88],
    [0, reduce ? 0 : 0.45, 0.1]
  );

  // Soft ivory bloom layer bridging seamlessly into DiscoverEstate / Villas
  const bloomOpacity = useTransform(
    scrollYProgress,
    [0.98, 1.0],
    [0, 0.96]
  );

  const line = (delay) => ({
    initial: { y: reduce ? 0 : "110%" },
    animate: { y: "0%" },
    transition: { duration: reduce ? 0 : 1.2, ease: EASE, delay },
  });

  return (
    <section
      className="hero-scroll-track cinematic-journey-track"
      ref={trackRef}
      aria-label="The Willow Estate — Cinematic Scroll-Controlled Villa Exploration"
    >
      <div className="hero-sticky-stage">
        {/* Layered Background Tour Images (8 Continuous Camera Scenes) */}
        <div className="hero-bg-container">
          {/* SCENE 1: AERIAL DRONE HERO */}
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
              src={SCENES[0].img}
              alt={SCENES[0].alt}
              fetchpriority="high"
            />
          </motion.div>

          {/* SCENE 2: THE ARRIVAL (ESTATE APPROACH) */}
          <motion.div
            className="hero-bg-layer"
            style={{
              opacity: img2Opacity,
              scale: img2Scale,
              transformOrigin: "50% 52%",
            }}
          >
            <img
              className="hero-zoom-img"
              src={SCENES[1].img}
              alt={SCENES[1].alt}
              loading="eager"
            />
          </motion.div>

          {/* SCENE 3: FOYER / STEP INSIDE */}
          <motion.div
            className="hero-bg-layer"
            style={{
              opacity: img3Opacity,
              scale: img3Scale,
              transformOrigin: "50% 50%",
            }}
          >
            <img
              className="hero-zoom-img"
              src={SCENES[2].img}
              alt={SCENES[2].alt}
              loading="eager"
            />
          </motion.div>

          {/* SCENE 4: LIVING ROOM PAVILION */}
          <motion.div
            className="hero-bg-layer"
            style={{
              opacity: img4Opacity,
              scale: img4Scale,
              x: img4PanX,
              transformOrigin: "50% 50%",
            }}
          >
            <img
              className="hero-zoom-img"
              src={SCENES[3].img}
              alt={SCENES[3].alt}
              loading="eager"
            />
          </motion.div>

          {/* SCENE 5: MASTER BEDROOM SANCTUARY */}
          <motion.div
            className="hero-bg-layer"
            style={{
              opacity: img5Opacity,
              scale: img5Scale,
              transformOrigin: "50% 52%",
            }}
          >
            <img
              className="hero-zoom-img"
              src={SCENES[4].img}
              alt={SCENES[4].alt}
              loading="eager"
            />
          </motion.div>

          {/* SCENE 6: BATHROOM & PRIVATE WELLNESS */}
          <motion.div
            className="hero-bg-layer"
            style={{
              opacity: img6Opacity,
              scale: img6Scale,
              transformOrigin: "50% 50%",
            }}
          >
            <img
              className="hero-zoom-img"
              src={SCENES[5].img}
              alt={SCENES[5].alt}
              loading="eager"
            />
          </motion.div>

          {/* SCENE 7: SWIMMING POOL REVEAL */}
          <motion.div
            className="hero-bg-layer"
            style={{
              opacity: img7Opacity,
              scale: img7Scale,
              transformOrigin: "50% 55%",
            }}
          >
            <img
              className="hero-zoom-img"
              src={SCENES[6].img}
              alt={SCENES[6].alt}
              loading="eager"
            />
          </motion.div>

          {/* SCENE 8: FINAL AERIAL REVEAL */}
          <motion.div
            className="hero-bg-layer"
            style={{
              opacity: img8Opacity,
              scale: img8Scale,
              transformOrigin: "50% 48%",
            }}
          >
            <img
              className="hero-zoom-img"
              src={SCENES[7].img}
              alt={SCENES[7].alt}
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Ambient Veils & Lighting */}
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

        {/* ---------------- 3D PHYSICAL SCENE INTERACTION LAYERS ---------------- */}

        {/* Scene 3: Architectural Front Pivot Door */}
        <motion.div
          className="interactive-pivot-door-layer"
          style={{ opacity: pivotDoorOpacity }}
          aria-hidden="true"
        >
          <div className="door-perspective-frame">
            <motion.div
              className="pivot-door-panel"
              style={{
                transformOrigin: "15% center",
                rotateY: pivotDoorRotate,
              }}
            >
              <div className="door-grain" />
              <div className="door-handle" />
            </motion.div>
          </div>
        </motion.div>

        {/* Scene 4: Architectural Markers in Living Room */}
        <motion.div
          className="interactive-living-pins"
          style={{ opacity: livingPinsOpacity }}
          aria-hidden="true"
        >
          <div className="living-pin pin-open-plan">
            <span className="pin-pulse" />
            <span className="pin-dot" />
            <span className="pin-label">OPEN-PLAN LIVING</span>
          </div>
          <div className="living-pin pin-comfort">
            <span className="pin-pulse" />
            <span className="pin-dot" />
            <span className="pin-label">DESIGNED FOR COMFORT</span>
          </div>
          <div className="living-pin pin-stone">
            <span className="pin-pulse" />
            <span className="pin-dot" />
            <span className="pin-label">NATURAL STONE &amp; OAK</span>
          </div>
        </motion.div>

        {/* Scene 7: Sliding Glass Terrace Doors to Pool */}
        <motion.div
          className="interactive-glass-doors-layer"
          style={{ opacity: doorsWrapOpacity }}
          aria-hidden="true"
        >
          <motion.div
            className="glass-door-panel glass-left"
            style={{ x: doorSlideLeft }}
          >
            <div className="glass-reflection" />
            <div className="glass-handle" />
          </motion.div>
          <motion.div
            className="glass-door-panel glass-right"
            style={{ x: doorSlideRight }}
          >
            <div className="glass-reflection" />
            <div className="glass-handle" />
          </motion.div>
        </motion.div>

        {/* ---------------- FLOATING CINEMATIC HUD ---------------- */}
        <aside className="cinematic-hud-pill" aria-label="Villa tour progress navigation">
          <div className="hud-header">
            <Compass size={13} className="hud-compass-icon" />
            <span className="hud-title">Cinematic Tour</span>
            <span className="hud-pct">{scrollPct}%</span>
          </div>
          <div className="hud-steps-carousel">
            {SCENES.map((scene, i) => (
              <button
                type="button"
                key={scene.id}
                className={`hud-chip ${activeStage === i ? "active" : ""}`}
                onClick={() => jumpToScene(i)}
                title={`Jump to Scene ${scene.step}: ${scene.label}`}
              >
                <span className="chip-num">{scene.step}</span>
                <span className="chip-label">{scene.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Bottom Tour Telemetry & Progress Strip */}
        <div className="cinematic-telemetry-strip" aria-hidden="true">
          <div className="telemetry-item">
            <span className="t-label">SCENE</span>
            <span className="t-val">{SCENES[activeStage]?.step} · {SCENES[activeStage]?.title}</span>
          </div>
          <div className="telemetry-bar-wrap">
            <div
              className="telemetry-bar-fill"
              style={{ width: `${scrollPct}%` }}
            />
          </div>
          <div className="telemetry-item right">
            <span className="t-label">CAMERA</span>
            <span className="t-val">Scroll to explore</span>
          </div>
        </div>

        {/* ---------------- EDITORIAL PORTAL CAPTIONS ---------------- */}

        {/* SCENE 2: The Arrival */}
        <motion.div
          className="hero-portal-layer"
          style={{
            opacity: portal2Opacity,
            scale: portal2Scale,
            y: portal2Y,
          }}
          aria-hidden="true"
        >
          <span className="portal-tag">THE ARRIVAL · SCENE 02</span>
          <h2 className="portal-heading">
            Your Private Sanctuary <em>Awaits.</em>
          </h2>
          <div className="portal-line" />
          <p className="portal-subtext">
            A thoughtful welcome. A world of quiet luxury beyond the trees.
          </p>
        </motion.div>

        {/* SCENE 3: Step Inside */}
        <motion.div
          className="hero-portal-layer"
          style={{
            opacity: portal3Opacity,
            scale: portal3Scale,
            y: portal3Y,
          }}
          aria-hidden="true"
        >
          <span className="portal-tag">STEP INSIDE · SCENE 03</span>
          <h2 className="portal-heading">
            Luxury in Every <em>Detail.</em>
          </h2>
          <div className="portal-line" />
          <p className="portal-subtext">
            Spaces designed around comfort, natural light, and effortless living.
          </p>
        </motion.div>

        {/* SCENE 5: Rest & Recharge */}
        <motion.div
          className="hero-portal-layer"
          style={{
            opacity: portal5Opacity,
            scale: portal5Scale,
            y: portal5Y,
          }}
          aria-hidden="true"
        >
          <span className="portal-tag">REST &amp; RECHARGE · SCENE 05</span>
          <h2 className="portal-heading">
            Your Own World of <em>Calm.</em>
          </h2>
          <div className="portal-line" />
          <p className="portal-subtext">
            Thoughtfully designed spaces for slower mornings and peaceful nights.
          </p>
        </motion.div>

        {/* SCENE 6: Private Sanctuary / Wellness */}
        <motion.div
          className="hero-portal-layer"
          style={{
            opacity: portal6Opacity,
            scale: portal6Scale,
            y: portal6Y,
          }}
          aria-hidden="true"
        >
          <span className="portal-tag">PRIVATE SANCTUARY · SCENE 06</span>
          <h2 className="portal-heading">
            Space to <em>Unwind.</em>
          </h2>
          <div className="portal-line" />
          <p className="portal-subtext">
            Sculpted stone, botanical views, and the luxury of quiet unhurried rituals.
          </p>
        </motion.div>

        {/* SCENE 7: The Outdoor Experience / Pool */}
        <motion.div
          className="hero-portal-layer"
          style={{
            opacity: portal7Opacity,
            scale: portal7Scale,
            y: portal7Y,
          }}
          aria-hidden="true"
        >
          <span className="portal-tag">THE OUTDOOR EXPERIENCE · SCENE 07</span>
          <h2 className="portal-heading">
            Moments Made to <em>Last.</em>
          </h2>
          <div className="portal-line" />
          <p className="portal-subtext">
            Slow down, breathe deeply, and experience the beauty of your own private retreat.
          </p>
        </motion.div>

        {/* ---------------- SCENE 8: FINAL AERIAL FINALE & CALL TO ACTION ---------------- */}
        <motion.div
          className="hero-finale-reveal"
          style={{
            opacity: finaleOpacity,
            y: finaleY,
            scale: finaleScale,
            pointerEvents: finalePointerEvents,
          }}
        >
          <span className="finale-eyebrow">
            <Sparkles size={13} /> The Willow Estate · Private Villas
          </span>
          <h2 className="finale-heading">
            Your Escape<br />Begins <em>Here.</em>
          </h2>
          <p className="finale-subtext">
            Discover a stay shaped around privacy, comfort, and unforgettable experiences.
          </p>
          <div className="finale-actions">
            <button
              type="button"
              className="btn btn-gold btn-shimmer"
              onClick={() => onOpenBooking && onOpenBooking()}
            >
              RESERVE YOUR STAY <ArrowRight size={15} />
            </button>
            <a
              className="btn btn-outline"
              href="#villas"
              onClick={scrollToVillas}
            >
              EXPLORE VILLA DETAILS
            </a>
          </div>
          <div className="finale-scroll-down">
            <span>Continue scrolling for villa collection</span>
            <ChevronDown size={14} className="bounce-anim" />
          </div>
        </motion.div>

        {/* Soft Ivory Bloom bridging seamlessly into DiscoverEstate / Villas */}
        <motion.div
          className="hero-bloom-layer"
          style={{ opacity: bloomOpacity }}
          aria-hidden="true"
        />

        {/* ---------------- INITIAL HERO CONTENT (SCENE 1) ---------------- */}
        <motion.div
          className="hero-content"
          style={{
            opacity: heroContentOpacity,
            y: heroContentY,
            scale: heroContentScale,
            pointerEvents: heroPointerEvents,
          }}
        >
          <motion.span
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            AN EXCLUSIVE ESCAPE INTO NATURE
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
            Discover a private sanctuary where architecture, nature, and
            exceptional hospitality come together.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.25 }}
          >
            <button
              type="button"
              className="btn btn-gold"
              onClick={scrollToArrival}
            >
              EXPLORE THE ESTATE <ArrowRight />
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onOpenBooking && onOpenBooking()}
            >
              RESERVE YOUR STAY
            </button>
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
              onClick={scrollToArrival}
              onKeyDown={(e) => e.key === "Enter" && scrollToArrival()}
              aria-label="Scroll to enter the estate"
            >
              Scroll to explore <span className="track" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
