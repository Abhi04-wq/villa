import { Waves, BedDouble, Wifi, UtensilsCrossed, Sparkles, Car, ConciergeBell, Leaf } from "lucide-react";
import ScrollReveal, { fadeUp } from "./ScrollReveal";

const AMENITIES = [
  { icon: Waves, title: "Private Pool", desc: "Heated infinity or plunge pool with daily poolside service." },
  { icon: BedDouble, title: "Luxury Bedrooms", desc: "Egyptian cotton, blackout drapes, and garden or lake aspects." },
  { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Fibre throughout the estate — work from the terrace if you must." },
  { icon: UtensilsCrossed, title: "Fine Dining", desc: "Private chef, seasonal menus, and cellar selections on request." },
  { icon: Sparkles, title: "Spa & Wellness", desc: "In-villa treatments, yoga pavilion, sauna and cold plunge." },
  { icon: Car, title: "Airport Transfers", desc: "Chauffeured collection from the international airport, 45 minutes away." },
  { icon: ConciergeBell, title: "Concierge Service", desc: "A dedicated host for every stay, from dawn until late." },
  { icon: Leaf, title: "Private Gardens", desc: "Walled gardens, orchards and woodland trails exclusive to guests." },
];

export default function Amenities() {
  return (
    <section className="amen section-pad" id="amenities" aria-label="Experience and amenities">
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <ScrollReveal><span className="label">The experience</span></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="h-editorial">Everything considered, <em>nothing imposed.</em></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="lede" style={{ marginTop: 20 }}>
              The quiet infrastructure of a five-star stay — present when you
              need it, invisible when you don't.
            </p>
          </ScrollReveal>
        </div>
        <div className="amen-grid">
          {AMENITIES.map((a, i) => (
            <ScrollReveal key={a.title} variant={fadeUp} delay={(i % 4) * 0.08} amount={0.2} className="amen-cell">
              <a.icon aria-hidden="true" />
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
