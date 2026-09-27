import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SPRING_PRESS } from "./hold-action-button-utils/ease";

const HOLD_DURATION = 900;

export default function HoldActionButton({
  onConfirm,
  loading = false,
  disabled = false,
  className = "",
  children,
  label = "Hold to delete",
  ...props
}) {
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const startedAtRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const unavailable = disabled || loading;

  function clearHold() {
    window.clearTimeout(timeoutRef.current);
    window.clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
    startedAtRef.current = 0;
    setProgress(0);
  }

  useEffect(() => clearHold, []);

  function startHold(event) {
    if (unavailable || startedAtRef.current) return;
    event.preventDefault();
    startedAtRef.current = Date.now();
    intervalRef.current = window.setInterval(() => {
      setProgress(Math.min((Date.now() - startedAtRef.current) / HOLD_DURATION, 1));
    }, 24);
    timeoutRef.current = window.setTimeout(() => {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      timeoutRef.current = null;
      startedAtRef.current = 0;
      setProgress(0);
      onConfirm();
    }, HOLD_DURATION);
  }

  function cancelHold() {
    if (startedAtRef.current) clearHold();
  }

  return (
    <motion.button
      type="button"
      className={`relative isolate inline-flex touch-none select-none items-center justify-center gap-1.5 overflow-hidden border border-red-300 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      disabled={unavailable}
      aria-label={label}
      aria-busy={loading}
      title={label}
      whileTap={reducedMotion || unavailable ? undefined : { scale: 0.96, transition: SPRING_PRESS }}
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      onPointerCancel={cancelHold}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") startHold(event);
      }}
      onKeyUp={(event) => {
        if (event.key === " " || event.key === "Enter") cancelHold();
      }}
      onBlur={cancelHold}
      onClick={(event) => event.preventDefault()}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {loading ? "Deleting..." : children}
        {!loading && <span>{label}</span>}
      </span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-0 h-1 bg-red-300"
        initial={false}
        animate={{ width: `${progress * 100}%` }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.04, ease: "linear" }}
        style={{ right: "auto" }}
      />
    </motion.button>
  );
}