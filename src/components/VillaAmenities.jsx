import { motion, useReducedMotion } from "framer-motion";
import { Waves, BedDouble, Trees, UtensilsCrossed, Sparkles, Compass, Flame, Wifi } from "lucide-react";
import { EASE } from "./ScrollReveal";

const AMENITY_ITEMS = [
  {
    icon: Waves,
    title: "Private Heated Pools",
    desc: "Every villa features a private heated infinity edge or plunge pool mirroring the surrounding forest.",
  },
  {
    icon: BedDouble,
    title: "Expansive Master Suites",
    desc: "Custom king beds dressed in Italian linen, walk-in stone dressing rooms, and deep soaking marble tubs.",
  },
  {
    icon: Trees,
    title: "Private Secluded Gardens",
    desc: "Acres of private grounds, wildflower lawns, private sun decks, and direct trails into ancient oak forests.",
  },
  {
    icon: UtensilsCrossed,
    title: "Thoughtful In-Villa Dining",
    desc: "Estate farm-to-table breakfast served on your terrace, with private on-demand chef dining on request.",
  },
  {
    icon: Sparkles,
    title: "Holistic Wellness & Spa",
    desc: "Finnish outdoor saunas, cold plunge cedar tubs, and bespoke herbal massage therapies in your residence.",
  },
  {
    icon: Compass,
    title: "Dedicated Concierge",
    desc: "A personal host dedicated to curating wine tastings, private lake charters, and secluded picnics.",
  },
  {
    icon: Flame,
    title: "Scenic Outdoor Fireplaces",
    desc: "Hand-chiseled stone fire pits and terrace hearths for stargazing with sommelier-paired estate wines.",
  },
  {
    icon: Wifi,
    title: "High-Speed Connectivity",
    desc: "Discreet fiber Wi-Fi throughout indoor and outdoor living areas, alongside curated acoustic sound systems.",
  },
];

export default function VillaAmenities() {
  const reduce = useReducedMotion();

  const itemAnim = (idx) => ({
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE, delay: idx * 0.08 },
    },
  });

  return (
    <section className="villa-amenities-section" id="amenities" aria-label="Villa features and amenities">
      <div className="container">
        <div className="v-amen-head">
          <span className="label">Inclusive Comforts</span>
          <h2 className="v-amen-title">
            Considered in <em>Every Detail</em>
          </h2>
          <p className="v-amen-subtitle">
            Every stay includes dedicated service, private amenities, and thoughtful touches crafted to make your retreat effortless.
          </p>
        </div>

        <motion.div
          className="v-amen-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          {AMENITY_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} className="v-amen-item" variants={itemAnim(idx)}>
                <div className="v-amen-icon-wrap">
                  <Icon size={22} className="v-amen-icon" />
                </div>
                <div className="v-amen-text">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
