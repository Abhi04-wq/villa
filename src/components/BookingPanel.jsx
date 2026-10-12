import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Home, CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles } from "lucide-react";

export const ALL_VILLAS = [
  { id: "forest", name: "The Forest Residence", price: 890, guests: 8, tag: "Signature · Sleeps 8" },
  { id: "azure", name: "The Azure Villa", price: 640, guests: 6, tag: "Lakeside · Sleeps 6" },
  { id: "glasshouse", name: "The Glasshouse Retreat", price: 420, guests: 4, tag: "Garden · Sleeps 4" },
  { id: "cedar", name: "The Cedar Sanctuary", price: 580, guests: 6, tag: "Woodland · Sleeps 6" },
  { id: "manor", name: "The Willow Manor", price: 1850, guests: 16, tag: "Estate Flagship · Sleeps 16" },
  { id: "lakeside", name: "The Lakeside Pavilion", price: 380, guests: 2, tag: "Lakeside · Sleeps 2" },
];

export default function BookingPanel({ isOpen, onClose, initialVillaId }) {
  const [selectedVilla, setSelectedVilla] = useState(initialVillaId || ALL_VILLAS[0].id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  useEffect(() => {
    if (initialVillaId) {
      setSelectedVilla(initialVillaId);
    }
  }, [initialVillaId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setStatus({ type: "idle", msg: "" });
      setErrors({});
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const villa = ALL_VILLAS.find((v) => v.id === selectedVilla) || ALL_VILLAS[0];

  // Calculate estimated nights and total
  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.round(diff) : 0;
  };
  const nights = getNights();
  const estimatedTotal = nights > 0 ? nights * villa.price : null;

  const validate = () => {
    const errs = {};
    if (!checkIn) errs.checkIn = "Please select a check-in date.";
    if (!checkOut) errs.checkOut = "Please select a check-out date.";
    if (checkIn && checkOut && checkOut <= checkIn) {
      errs.checkOut = "Check-out must be after check-in.";
    }
    if (Number(guests) > villa.guests) {
      errs.guests = `Maximum capacity for ${villa.name} is ${villa.guests} guests.`;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ type: "loading", msg: "Checking calendar & reservation availability..." });
    setTimeout(() => {
      setStatus({
        type: "success",
        msg: `Availability confirmed for ${villa.name}! A preliminary hold has been requested for ${checkIn} to ${checkOut} (${nights} night${nights > 1 ? "s" : ""}, ${guests} guests). Our reservations concierge will email your tailored itinerary shortly.`,
      });
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="booking-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <motion.div
            className="booking-modal-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="modal-header">
              <div>
                <span className="label on-dark">The Willow Estate</span>
                <h3 id="modal-title" className="modal-title">Check Villa <em>Availability</em></h3>
              </div>
              <button className="modal-close-btn" onClick={onClose} aria-label="Close booking modal">
                <X size={20} />
              </button>
            </div>

            {status.type === "success" ? (
              <div className="modal-success-state">
                <CheckCircle2 size={48} className="success-icon" />
                <h4>Inquiry Received</h4>
                <p>{status.msg}</p>
                <div className="success-summary">
                  <div><span>Residence</span><b>{villa.name}</b></div>
                  <div><span>Rate</span><b>${villa.price} / night</b></div>
                  {estimatedTotal && <div><span>Estimated Stay</span><b>${estimatedTotal.toLocaleString()} ({nights} nights)</b></div>}
                </div>
                <button className="btn btn-gold" onClick={onClose} style={{ marginTop: 20 }}>
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="villa-select"><Home size={15} /> Select Residence</label>
                  <select
                    id="villa-select"
                    value={selectedVilla}
                    onChange={(e) => setSelectedVilla(e.target.value)}
                    className="modal-select"
                  >
                    {ALL_VILLAS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} — From ${v.price}/night ({v.guests} Guests max)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="check-in-date"><Calendar size={15} /> Check-In Date</label>
                    <input
                      id="check-in-date"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className={errors.checkIn ? "modal-input input-error" : "modal-input"}
                    />
                    {errors.checkIn && <span className="field-err"><AlertCircle size={12} /> {errors.checkIn}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="check-out-date"><Calendar size={15} /> Check-Out Date</label>
                    <input
                      id="check-out-date"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className={errors.checkOut ? "modal-input input-error" : "modal-input"}
                    />
                    {errors.checkOut && <span className="field-err"><AlertCircle size={12} /> {errors.checkOut}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="guests-count"><Users size={15} /> Number of Guests</label>
                  <select
                    id="guests-count"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={errors.guests ? "modal-select input-error" : "modal-select"}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((num) => (
                      <option key={num} value={num}>
                        {num} Guest{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  {errors.guests && <span className="field-err"><AlertCircle size={12} /> {errors.guests}</span>}
                </div>

                {nights > 0 && estimatedTotal && (
                  <div className="modal-price-breakdown">
                    <div className="breakdown-row">
                      <span>{nights} night{nights > 1 ? "s" : ""} @ ${villa.price}/night</span>
                      <b>${estimatedTotal.toLocaleString()}</b>
                    </div>
                    <div className="breakdown-sub">
                      <Sparkles size={13} /> Includes daily breakfast, concierge service & access to estate amenities.
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-gold modal-submit-btn"
                  disabled={status.type === "loading"}
                >
                  {status.type === "loading" ? (
                    <>
                      <Loader2 className="spin" size={16} /> Verifying Availability...
                    </>
                  ) : (
                    <>
                      Check Availability &amp; Request Stay <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
