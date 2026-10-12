import { ArrowRight, BedDouble, Bath, Users } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal, { clipReveal, fadeUp } from "./ScrollReveal";

const VILLAS = [
  {
    name: <>The Forest <em>Residence</em></>,
    tag: "Signature · Sleeps 8",
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1600&auto=format&fit=crop",
    alt: "The Forest Residence nestled among tall trees",
    desc: "Our flagship retreat — a soaring timber-and-glass residence wrapped in ancient woodland, with a heated infinity edge that mirrors the forest canopy.",
    guests: "8 Guests", beds: "4 Bedrooms", baths: "5 Baths",
    amenities: ["Infinity pool", "Private chef", "Forest sauna", "Cinema room"],
    price: "From $890 / night",
    feature: true,
  },
  {
    name: <>The Azure <em>Villa</em></>,
    tag: "Lakeside · Sleeps 6",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1400&auto=format&fit=crop",
    alt: "The Azure Villa with pool at dusk",
    desc: "Light-washed pavilions open to the water — lazy mornings on the terrace, afternoons adrift in the lake-view pool.",
    guests: "6 Guests", beds: "3 Bedrooms", baths: "4 Baths",
    amenities: ["Lake-view pool", "Boat jetty", "Outdoor dining"],
    price: "From $640 / night",
  },
  {
    name: <>The Glasshouse <em>Retreat</em></>,
    tag: "Garden · Sleeps 4",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop",
    alt: "The Glasshouse Retreat glowing at evening",
    desc: "An intimate architectural jewel of glass and stone — made for two, perfect for four. Stargaze from your bed; wake to birdsong.",
    guests: "4 Guests", beds: "2 Bedrooms", baths: "3 Baths",
    amenities: ["Plunge pool", "Stargazing deck", "Fireplace"],
    price: "From $420 / night",
  },
];

function Spec({ icon: Icon, text }) {
  return <span><Icon />{text}</span>;
}

export default function VillaShowcase({ onNavigate, onOpenBooking }) {
  const [feature, ...rest] = VILLAS;
  return (
    <section className="villas section-pad" id="villas" aria-label="Explore our villas">
      <div className="container">
        <div className="villa-head">
          <div>
            <ScrollReveal><span className="label">Stay with us</span></ScrollReveal>
            <ScrollReveal delay={0.1}><h2 className="h-editorial">Explore our <em>villas.</em></h2></ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <button
                type="button"
                className="btn btn-gold"
                onClick={() => onNavigate && onNavigate("/villas")}
              >
                View Full Villa Collection <ArrowRight size={14} />
              </button>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => onOpenBooking && onOpenBooking()}
              >
                Check Availability
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Feature card */}
        <ScrollReveal variant={clipReveal} amount={0.15}>
          <article className="villa-feature">
            <div className="vf-img">
              <img src={feature.img} alt={feature.alt} loading="lazy" />
              <span className="villa-tag">{feature.tag}</span>
            </div>
            <div className="vf-body">
              <span className="label">Featured residence</span>
              <h3>{feature.name}</h3>
              <p>{feature.desc}</p>
              <div className="vf-specs">
                <Spec icon={Users} text={feature.guests} />
                <Spec icon={BedDouble} text={feature.beds} />
                <Spec icon={Bath} text={feature.baths} />
              </div>
              <div className="vf-amen">{feature.amenities.map((a) => <i key={a}>{a}</i>)}</div>
              <div className="vf-foot">
                <div className="vf-price"><small>Starting at</small><b>{feature.price}</b></div>
                <div className="vf-actions">
                  <button
                    type="button"
                    className="btn btn-gold"
                    onClick={() => onOpenBooking ? onOpenBooking("forest") : (onNavigate && onNavigate("/villas"))}
                  >
                    Check Availability
                  </button>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => onNavigate && onNavigate("/villas")}
                  >
                    View Villa Details <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        <div className="villa-duo">
          {rest.map((v, i) => (
            <ScrollReveal key={v.tag} variant={clipReveal} delay={i * 0.12} amount={0.15}>
              <motion.article className="villa-card" whileHover={undefined}>
                <div className="vc-img">
                  <img src={v.img} alt={v.alt} loading="lazy" />
                  <span className="villa-tag">{v.tag}</span>
                </div>
                <div className="vc-body">
                  <span className="label">Private villa</span>
                  <h3>{v.name}</h3>
                  <p>{v.desc}</p>
                  <div className="vf-specs">
                    <Spec icon={Users} text={v.guests} />
                    <Spec icon={BedDouble} text={v.beds} />
                    <Spec icon={Bath} text={v.baths} />
                  </div>
                  <div className="vf-amen">{v.amenities.map((a) => <i key={a}>{a}</i>)}</div>
                  <div className="vf-foot">
                    <div className="vf-price"><small>Starting at</small><b>{v.price}</b></div>
                    <div className="vf-actions">
                      <button
                        type="button"
                        className="text-link"
                        onClick={() => onNavigate && onNavigate("/villas")}
                      >
                        Explore Villa <ArrowRight />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-gold"
                    style={{ marginTop: 22, justifyContent: "center" }}
                    onClick={() => onOpenBooking ? onOpenBooking() : (onNavigate && onNavigate("/villas"))}
                  >
                    Check Availability
                  </button>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant={fadeUp} delay={0.1}>
          <p style={{ marginTop: 30, color: "var(--gray-warm)", fontSize: "0.9rem", fontWeight: 300 }}>
            Nine further residences — from two-bedroom garden hideaways to the eight-suite Willow Manor — are available on request through our reservations team.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
