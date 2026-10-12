import { useEffect, useState } from "react";

function matches(query) {
  if (typeof window === "undefined") return false;
  if (typeof window.matchMedia !== "function") return false;
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
}

export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => matches("(prefers-reduced-motion: reduce)"));
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    if (mq.matches) document.documentElement.classList.add("no-motion");
    else document.documentElement.classList.remove("no-motion");
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  useEffect(() => {
    if (reduced) document.documentElement.classList.add("no-motion");
    else document.documentElement.classList.remove("no-motion");
  }, [reduced]);
  return reduced;
}
