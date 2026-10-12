import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, PhoneCall, ConciergeBell, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import ScrollReveal, { fadeUp } from "./ScrollReveal";

const VILLA_OPTIONS = ["Any villa (recommend for me)", "The Forest Residence", "The Azure Villa", "The Glasshouse Retreat", "Willow Manor"];

function todayPlus(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function BookingForm() {
  const [form, setForm] = useState({ checkIn: "", checkOut: "", guests: "2", villa: VILLA_OPTIONS[0] });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.checkIn) errs.checkIn = "Please choose a check-in date.";
    if (!form.checkOut) errs.checkOut = "Please choose a check-out date.";
    if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn)
      errs.checkOut = "Check-out must be after check-in.";
    if (!form.guests || Number(form.guests) < 1 || Number(form.guests) > 16)
      errs.guests = "Guests must be between 1 and 16.";
    // Unavailable-date demo: estate closed over a maintenance window (example)
    if (form.checkIn >= "2027-01-12" && form.checkIn <= "2027-01-26")
      errs.checkIn = "Those dates fall within our annual maintenance closure (12–26 Jan). Please choose other dates.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus({ type: "error", msg: "Please review the highlighted fields before continuing." });
      return;
    }
    setStatus({ type: "loading", msg: "Checking availability with our reservations team…" });
    // Simulated backend check — wire to the real booking API before launch.
    setTimeout(() => {
      setStatus({
        type: "success",
        msg: `Thank you — your enquiry for ${form.villa} (${form.checkIn} → ${form.checkOut}, ${form.guests} guests) has been received. Our hosts will confirm availability by email shortly. Nothing is reserved until we confirm.`,
      });
    }, 1400);
  };

  return (
    <section className="booking section-pad" id="booking" aria-label="Booking and availability">
      <div className="container book-grid">
        <div>
          <ScrollReveal><span className="label on-dark">Reservations</span></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="h-editorial on-dark">Begin your <em style={{ color: "var(--gold-light)" }}>stay.</em></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="lede" style={{ color: "rgba(247,245,239,0.72)", marginTop: 20 }}>
              Share your dates and our reservations team will confirm
              availability within one working day — with a personal
              recommendation if your preferred villa is occupied.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <ul className="book-side-list">
              <li><ConciergeBell /> A dedicated host for every reservation</li>
              <li><PhoneCall /> Prefer to talk? +1 (555) 014-8890, daily 8am–10pm</li>
              <li><ShieldCheck /> No payment taken until your stay is confirmed</li>
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal variant={fadeUp} delay={0.15} amount={0.15}>
          <form className="book-form" onSubmit={submit} noValidate aria-label="Check availability form">
            <h3>Check availability</h3>
            <p>Response within one working day, often much sooner.</p>

            {status.type === "success" && <div className="book-status ok" role="status"><CheckCircle2 />{status.msg}</div>}
            {status.type === "error" && <div className="book-status bad" role="alert"><AlertCircle />{status.msg}</div>}
            {status.type === "loading" && <div className="book-status ok" role="status"><Loader2 className="spin" />{status.msg}</div>}

            <div className="f-row">
              <div className="f-group">
                <label htmlFor="bk-in">Check-in</label>
                <input id="bk-in" type="date" value={form.checkIn} min={todayPlus(1)} onChange={set("checkIn")} className={errors.checkIn ? "err" : ""} />
                {errors.checkIn && <span className="f-err">{errors.checkIn}</span>}
              </div>
              <div className="f-group">
                <label htmlFor="bk-out">Check-out</label>
                <input id="bk-out" type="date" value={form.checkOut} min={form.checkIn || todayPlus(2)} onChange={set("checkOut")} className={errors.checkOut ? "err" : ""} />
                {errors.checkOut && <span className="f-err">{errors.checkOut}</span>}
              </div>
            </div>
            <div className="f-row">
              <div className="f-group">
                <label htmlFor="bk-guests">Guests</label>
                <input id="bk-guests" type="number" min="1" max="16" value={form.guests} onChange={set("guests")} className={errors.guests ? "err" : ""} />
                {errors.guests && <span className="f-err">{errors.guests}</span>}
              </div>
              <div className="f-group">
                <label htmlFor="bk-villa">Villa</label>
                <select id="bk-villa" value={form.villa} onChange={set("villa")}>
                  {VILLA_OPTIONS.map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <motion.button
              className="btn btn-gold book-submit"
              type="submit"
              disabled={status.type === "loading"}
              whileTap={{ scale: 0.98 }}
            >
              {status.type === "loading" ? "Checking…" : "Check Availability"} <ArrowRight />
            </motion.button>
            <div className="book-note">
              <ShieldCheck />
              <span>Every enquiry is answered personally by our hospitality team — including help with transfers, dining and celebrations. Your details are never shared.</span>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
