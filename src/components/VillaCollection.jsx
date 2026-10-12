import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VillaCard from "./VillaCard";

export const COLLECTION_VILLAS = [
  {
    id: "azure",
    category: "lakeside",
    name: <>The Azure <em>Villa</em></>,
    collection: "Lakeside Collection",
    tag: "Lakeside · Sleeps 6",
    badge: "Waterfront",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
    desc: "Light-washed pavilions open directly to the lake waters — lazy mornings on the travertine terrace, afternoons adrift in the lake-view infinity pool.",
    guests: "6 Guests",
    beds: "3 Bedrooms",
    baths: "4 Baths",
    pool: "Lake-view pool",
    amenities: ["Lake-view pool", "Private boat jetty", "Outdoor terrace dining", "Open fireplace"],
    price: "$640 / night",
    isWide: true,
  },
  {
    id: "glasshouse",
    category: "garden",
    name: <>The Glasshouse <em>Retreat</em></>,
    collection: "Garden & Glass",
    tag: "Garden · Sleeps 4",
    badge: "Architectural Jewel",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    desc: "An intimate architectural jewel of glass and stone — made for two, perfect for four. Stargaze from your bed; wake to birdsong over the wildflower lawn.",
    guests: "4 Guests",
    beds: "2 Bedrooms",
    baths: "3 Baths",
    pool: "Plunge pool",
    amenities: ["Private plunge pool", "Stargazing deck", "Indoor stone fireplace", "Garden courtyard"],
    price: "$420 / night",
  },
  {
    id: "cedar",
    category: "woodland",
    name: <>The Cedar <em>Sanctuary</em></>,
    collection: "Woodland Collection",
    tag: "Woodland · Sleeps 6",
    badge: "Secluded Hideaway",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    desc: "Secluded in a private clearing of fragrant cedar pines, featuring hand-carved stone hearths, outdoor Japanese cedar tubs, and unbroken forest canopy vistas.",
    guests: "6 Guests",
    beds: "3 Bedrooms",
    baths: "3 Baths",
    pool: "Hot tub",
    amenities: ["Forest sauna", "Cedar soaking tub", "Fire pit lounge", "Private forest trails"],
    price: "$580 / night",
  },
  {
    id: "manor",
    category: "woodland",
    name: <>The Willow <em>Manor</em></>,
    collection: "Estate Flagship",
    tag: "Flagship Estate · Sleeps 16",
    badge: "Full Estate Wing",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    desc: "The crowning jewel of the estate — eight grand private suites, twin infinity pools, grand formal dining, private chef service, and expansive private lawns.",
    guests: "16 Guests",
    beds: "8 Bedrooms",
    baths: "10 Baths",
    pool: "Twin infinity pools",
    amenities: ["Twin infinity pools", "Private chef & butler", "Championship tennis lawn", "Sommelier wine cellar"],
    price: "$1,850 / night",
    isWide: true,
  },
  {
    id: "lakeside",
    category: "lakeside",
    name: <>The Lakeside <em>Pavilion</em></>,
    collection: "Lakeside Collection",
    tag: "Lakeside Hideaway · Sleeps 2",
    badge: "Romantic Escape",
    img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop",
    desc: "A secluded romantic retreat suspended above the water, featuring a private cantilevered deck, sunken marble tub, and private wooden kayak launch.",
    guests: "2 Guests",
    beds: "1 Master Suite",
    baths: "2 Baths",
    pool: "Overwater deck",
    amenities: ["Overwater sun deck", "Deep soaking tub", "Kayak & paddle launch", "Sunset panorama"],
    price: "$380 / night",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Residences" },
  { id: "lakeside", label: "Lakeside" },
  { id: "woodland", label: "Woodland" },
  { id: "garden", label: "Garden & Glass" },
];

export default function VillaCollection({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? COLLECTION_VILLAS
    : COLLECTION_VILLAS.filter((v) => v.category === activeCategory);

  return (
    <section className="villa-collection-section" id="collection" aria-label="Villa collection">
      <div className="container">
        {/* Section Header */}
        <div className="collection-head">
          <div className="collection-head-left">
            <span className="label">Accommodation Portfolio</span>
            <h2 className="collection-title">
              Find Your <em>Private Escape</em>
            </h2>
            <p className="collection-subtitle">
              Every residence offers its own expression of comfort, character, and connection with nature.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="collection-filters" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <motion.div
          className="collection-grid-editorial"
          layout
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.05 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((villa, idx) => (
              <VillaCard
                key={villa.id}
                villa={villa}
                index={idx}
                isFeatured={villa.isWide}
                onOpenBooking={onOpenBooking}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Tailored Inquiries Note */}
        <div className="collection-tailored-note">
          <div className="gold-rule" />
          <p>
            Looking for multi-villa estate buyouts or bespoke stay arrangements?
            Our private reservations concierge is at your service.
          </p>
          <button
            type="button"
            className="text-link"
            onClick={() => onOpenBooking && onOpenBooking("manor")}
          >
            Inquire for Private Estate Buyout →
          </button>
        </div>
      </div>
    </section>
  );
}
