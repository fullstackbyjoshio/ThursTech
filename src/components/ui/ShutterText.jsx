import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DEFAULT_WORDS = ["THURSTECH", "NIGERIA LIMITED", "RC: 7892341"];

export default function ShutterText({
  words = DEFAULT_WORDS,
  intervalMs = 3500,
  className = "text-4xl sm:text-6xl lg:text-7xl font-black",
  accentColor = "text-ice-400",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setIndex((previous) => (previous + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [words, intervalMs]);

  const currentWord = words[index % words.length] || "";
  const characters = currentWord.split("");

  return (
    <div
      role="img"
      aria-label={currentWord}
      className="relative inline-flex min-h-[1.2em] items-center overflow-hidden py-1"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="flex flex-wrap items-center"
        >
          {characters.map((char, i) => (
            <div
              key={`${index}-${i}`}
              className="group relative overflow-hidden px-[0.03em] select-none"
            >
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: i * 0.04 + 0.2, duration: 0.6 }}
                className={`inline-block leading-none tracking-tight text-white ${className}`}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 1, 0] }}
                transition={{ duration: 0.65, delay: i * 0.04, ease: "easeInOut" }}
                className={`pointer-events-none absolute inset-0 z-20 inline-block leading-none ${className} ${accentColor}`}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              <motion.span
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "-100%", opacity: [0, 1, 0] }}
                transition={{ duration: 0.65, delay: i * 0.04 + 0.08, ease: "easeInOut" }}
                className={`pointer-events-none absolute inset-0 z-20 inline-block leading-none ${className} text-white`}
                style={{ clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 1, 0] }}
                transition={{ duration: 0.65, delay: i * 0.04 + 0.16, ease: "easeInOut" }}
                className={`pointer-events-none absolute inset-0 z-20 inline-block leading-none ${className} ${accentColor}`}
                style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}