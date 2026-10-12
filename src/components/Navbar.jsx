import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#estate" },
  { label: "Our Villas", href: "#villas" },
  { label: "Amenities", href: "#amenities" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section elements by id
      const sectionIds = ["estate", "villas", "amenities", "experiences", "gallery"];
      const sections = [];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          let top = 0;
          let curr = el;
          while (curr) {
            top += curr.offsetTop;
            curr = curr.offsetParent;
          }
          sections.push({ id, top });
        }
      }

      sections.sort((a, b) => a.top - b.top);

      // Viewport probe line: 35% down the screen
      const probePos = window.scrollY + window.innerHeight * 0.35;

      // Only highlight Home when above About Us / Estate
      if (sections.length > 0 && probePos < sections[0].top) {
        setActiveSection("top");
        return;
      }

      let current = "top";
      for (let i = 0; i < sections.length; i++) {
        if (probePos >= sections[i].top) {
          current = sections[i].id;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToHash = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Brand Logo & Name */}
          <a
            className="brand"
            href="#top"
            onClick={(e) => scrollToHash(e, "#top")}
            aria-label="The Willow Estate — home"
          >
            <span className="brand-mark" aria-hidden="true">W</span>
            <span className="brand-text">
              <span className="brand-name">THE WILLOW ESTATE</span>
              <span className="brand-sub">PRIVATE VILLAS &amp; RETREATS</span>
            </span>
          </a>

          {/* Center Navigation Links */}
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={(e) => scrollToHash(e, link.href)}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="nav-cta">
            <button
              type="button"
              className="nav-book btn-shimmer"
              onClick={() => onOpenBooking ? onOpenBooking() : scrollToHash({ preventDefault: () => {} }, "#booking")}
            >
              Reserve Your Stay
            </button>
            <button
              className="burger"
              onClick={() => setOpen(true)}
              aria-label="Open mobile navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Slide-In Mobile Navigation */}
      <div
        className={`mobile-menu ${open ? "open" : ""}`}
        role={open ? "dialog" : undefined}
        aria-hidden={!open}
      >
        <button
          className="mobile-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        <div className="mobile-brand">
          <span className="brand-mark">W</span>
          <span className="brand-name">THE WILLOW ESTATE</span>
        </div>

        <nav className="mobile-nav-links">
          {LINKS.map((link) => (
            <a
              key={link.label}
              className="mlink"
              href={link.href}
              onClick={(e) => scrollToHash(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="btn btn-gold mobile-reserve-btn"
          onClick={() => {
            setOpen(false);
            if (onOpenBooking) onOpenBooking();
          }}
        >
          Reserve Your Stay <ArrowRight size={14} />
        </button>
      </div>
    </>
  );
}
