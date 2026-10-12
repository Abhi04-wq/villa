import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  };

  const handleScroll = (e, hash) => {
    e.preventDefault();
    if (hash === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer" aria-label="Footer">
      <div className="container">
        <div className="foot-top">
          <div className="foot-brand">
            <a
              className="brand"
              href="#top"
              onClick={(e) => handleScroll(e, "#top")}
              style={{ color: "var(--ivory)" }}
            >
              <span className="brand-mark" style={{ color: "var(--ivory)" }}>W</span>
              <span className="brand-text">
                <span className="brand-name" style={{ color: "var(--ivory)" }}>THE WILLOW ESTATE</span>
                <span className="brand-sub" style={{ color: "rgba(247,245,239,0.6)" }}>PRIVATE VILLAS &amp; RETREATS</span>
              </span>
            </a>
            <p>A private estate of twelve villas set in thirty-eight acres of woodland and water — devoted to stillness, craft and quiet luxury.</p>
            <div className="foot-social">
              <a href="#top" aria-label="Instagram">IG</a>
              <a href="#top" aria-label="Facebook">FB</a>
              <a href="#top" aria-label="X">X</a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Explore</h5>
            <a href="#top" onClick={(e) => handleScroll(e, "#top")}>Home</a>
            <a href="#estate" onClick={(e) => handleScroll(e, "#estate")}>About Us</a>
            <a href="#villas" onClick={(e) => handleScroll(e, "#villas")}>Our Villas</a>
            <a href="#amenities" onClick={(e) => handleScroll(e, "#amenities")}>Amenities</a>
            <a href="#experiences" onClick={(e) => handleScroll(e, "#experiences")}>Experiences</a>
            <a href="#gallery" onClick={(e) => handleScroll(e, "#gallery")}>Gallery</a>
          </div>
          <div className="foot-col">
            <h5>Collection</h5>
            <a href="#villas" onClick={(e) => handleScroll(e, "#villas")}>The Forest Residence</a>
            <a href="#villas" onClick={(e) => handleScroll(e, "#villas")}>The Azure Villa</a>
            <a href="#villas" onClick={(e) => handleScroll(e, "#villas")}>The Glasshouse Retreat</a>
            <a href="#villas" onClick={(e) => handleScroll(e, "#villas")}>The Willow Manor</a>
            <h5 style={{ marginTop: 22 }}>Contact</h5>
            <span>reservations@willowestate.com</span>
            <span>+1 (555) 014-8890</span>
          </div>
          <div className="foot-col">
            <h5>Letters from the estate</h5>
            <span>Seasonal openings and private previews, four times a year.</span>
            {done ? (
              <p className="news-ok">Thank you — you are on the list.</p>
            ) : (
              <form className="news-form" onSubmit={subscribe}>
                <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" required />
                <button type="submit" aria-label="Subscribe"><ArrowRight size={16} /></button>
              </form>
            )}
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 The Willow Estate. All rights reserved.</span>
          <nav aria-label="Legal">
            <a href="#top">Privacy Policy</a>
            <a href="#top">Booking Terms</a>
            <a href="#top">Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
