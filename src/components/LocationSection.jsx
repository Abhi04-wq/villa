import { MapPin, Plane, Car, Train, ArrowUpRight } from "lucide-react";
import ScrollReveal, { fadeUp } from "./ScrollReveal";

const PLACES = [
  { icon: MapPin, name: "Willow Lake & Boathouse", dist: "On the estate" },
  { icon: MapPin, name: "Old Forest Trails & Waterfall", dist: "15 min walk" },
  { icon: MapPin, name: "Hillside Vineyards & Tasting Rooms", dist: "20 min drive" },
  { icon: MapPin, name: "Heritage Market Town", dist: "25 min drive" },
];

export default function LocationSection() {
  return (
    <section className="section-pad" id="location" aria-label="Location and surroundings">
      <div className="container loc-grid">
        <ScrollReveal variant={fadeUp} amount={0.2}>
          <div className="loc-img">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop"
              alt="Mountain and lake landscape surrounding The Willow Estate"
              loading="lazy"
            />
            <div className="loc-card">
              <MapPin />
              <div>
                <b>Willowmere Valley, Lakelands</b>
                <span>45 min from International Airport · chauffeured transfers</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <div>
          <ScrollReveal><span className="label">Location &amp; surroundings</span></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="h-editorial">Secluded, yet <em>within reach.</em></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <ul className="loc-list">
              {PLACES.map((p) => (
                <li key={p.name}><b><p.icon />{p.name}</b><span>{p.dist}</span></li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="lede" style={{ fontSize: "0.95rem" }}>
              <Plane size={15} style={{ verticalAlign: -2, marginRight: 8, color: "var(--gold-deep)" }} />
              International Airport — 45 min by private transfer.
              <br />
              <Car size={15} style={{ verticalAlign: -2, marginRight: 8, color: "var(--gold-deep)" }} />
              Valet parking and chauffeured cars on the estate.
              <br />
              <Train size={15} style={{ verticalAlign: -2, marginRight: 8, color: "var(--gold-deep)" }} />
              Valley station collection available on request.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.35}>
            <a
              className="btn btn-outline-dark"
              style={{ marginTop: 26 }}
              href="https://maps.google.com/?q=Lake+District+UK"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions <ArrowUpRight />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
