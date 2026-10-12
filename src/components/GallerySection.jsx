import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal, { clipReveal, fadeUp } from "./ScrollReveal";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1600&auto=format&fit=crop", cap: "Infinity pool at golden hour", cat: "Pool & Landscape", cls: "g-a", alt: "Resort infinity pool at golden hour" },
  { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop", cap: "Master suite, Forest Residence", cat: "Bedrooms", cls: "g-b", alt: "Luxury master bedroom suite" },
  { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop", cap: "Sitting room in natural oak", cat: "Interiors", cls: "g-c", alt: "Elegant sitting room interior" },
  { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop", cap: "Marble bathroom with soaking tub", cat: "Bathrooms", cls: "g-d", alt: "Marble bathroom with soaking tub" },
  { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1000&auto=format&fit=crop", cap: "Garden dining pavilion", cat: "Dining", cls: "g-e", alt: "Outdoor dining pavilion" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop", cap: "Estate architecture at dusk", cat: "Architecture", cls: "g-f", alt: "Modern villa architecture at dusk" },
  { src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop", cap: "Azure Villa bedroom wing", cat: "Bedrooms", cls: "g-g", alt: "Serene bedroom with garden view" },
];

const FILTERS = ["All", "Architecture", "Bedrooms", "Bathrooms", "Dining", "Interiors", "Pool & Landscape"];

export default function GallerySection() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const visible = PHOTOS.filter((p) => filter === "All" || p.cat === filter);

  const step = useCallback((dir) => {
    setLightbox((cur) => {
      if (cur === null) return cur;
      return (cur + dir + visible.length) % visible.length;
    });
  }, [visible.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, step]);

  // Touch swipe
  const [touchX, setTouchX] = useState(null);

  return (
    <section className="section-pad" id="gallery" aria-label="Architecture and gallery">
      <div className="container">
        <ScrollReveal><span className="label">Architecture &amp; gallery</span></ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="h-editorial">Composed in <em>light &amp; landscape.</em></h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="gal-filters" role="tablist" aria-label="Filter gallery">
            {FILTERS.map((f) => (
              <button key={f} className={filter === f ? "on" : ""} onClick={() => { setFilter(f); setLightbox(null); }} role="tab" aria-selected={filter === f}>{f}</button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div className="gal-grid" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ScrollReveal key={p.src} variant={clipReveal} delay={(i % 3) * 0.08} amount={0.15} className={`g-item ${p.cls}`}>
                <figure
                  style={{ margin: 0, height: "100%" }}
                  onClick={() => setLightbox(i)}
                  onKeyDown={(e) => { if (e.key === "Enter") setLightbox(i); }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${p.cap}`}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" style={{ height: "100%" }} />
                  <figcaption>{p.cap} <Expand /></figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </AnimatePresence>
        </motion.div>
        <ScrollReveal variant={fadeUp}>
          <p style={{ marginTop: 26, color: "var(--gray-warm)", fontSize: "0.9rem", fontWeight: 300 }}>
            Photography shown is of the estate and representative residences. Select any image to view it in full.
          </p>
        </ScrollReveal>
      </div>

      <AnimatePresence>
        {lightbox !== null && visible[lightbox] && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX === null) return;
              const dx = e.changedTouches[0].clientX - touchX;
              if (dx < -40) step(1);
              if (dx > 40) step(-1);
              setTouchX(null);
            }}
            role="dialog" aria-modal="true" aria-label="Image viewer"
          >
            <button className="lb-btn lb-close" onClick={() => setLightbox(null)} aria-label="Close viewer"><X /></button>
            <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image"><ChevronLeft /></button>
            <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image"><ChevronRight /></button>
            <div onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={visible[lightbox].src}
                src={visible[lightbox].src}
                alt={visible[lightbox].alt}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
              />
              <div className="lb-cap">{visible[lightbox].cap} · {lightbox + 1} / {visible.length}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
