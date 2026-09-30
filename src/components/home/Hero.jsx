import { Wind, ShieldCheck, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import ShutterText from "../ui/ShutterText";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-24">
      <div className="container-page relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="flex flex-col items-start lg:col-span-7">
          <div className="mb-4">
            <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.3em] text-ice-400">
              Welcome To
            </p>
            <h1 className="flex flex-col">
              <ShutterText
                words={["THURSTECH", "NIGERIA LIMITED", "RC: 1577031"]}
                intervalMs={3500}
                accentColor="text-ice-400"
                className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
              />
              <span className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-4xl">
                Reliable Cooling &amp; AC Solutions
              </span>
            </h1>
          </div>

          <p className="mb-8 max-w-xl text-base font-normal leading-relaxed text-silver-200 sm:text-xl">
            <strong className="font-semibold text-white">THURSTECH Nigeria Limited</strong> supplies, installs, services, and repairs premium air-conditioning systems for homes, offices, and commercial spaces nationwide.
          </p>

          <div className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
            <Button className="!px-8 !py-4 !text-base !font-bold shadow-lg shadow-ice-400/10 transition-transform hover:scale-[1.02]" to="/shop" variant="primary">
              Shop AC Units
            </Button>
            <Button className="!border-white/80 !px-8 !py-4 !text-base !font-bold !text-white transition-all hover:!bg-white hover:!text-navy-900" to="/request-a-quote" variant="outline">
              Book a Service
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 border-t border-navy-800/80 pt-6 text-xs text-silver-200 sm:text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-ice-400" size={18} aria-hidden="true" />
              <span>Certified Engineers</span>
            </div>
            <div className="h-1.5 w-1.5 rounded-full bg-navy-700" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-ice-400" size={18} aria-hidden="true" />
              <span>100% Quality Assurance</span>
            </div>
          </div>
        </div>

        <div className="hidden justify-center lg:col-span-5 lg:flex">
          <div className="blueprint-frame group relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-navy-700/80 bg-navy-800/90 shadow-2xl backdrop-blur-sm">
            <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-ice-400/50" />
            <div className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-ice-400/50" />
            <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-ice-400/50" />
            <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-ice-400/50" />

            <Wind className="text-ice-400 transition-transform duration-500 group-hover:scale-110" size={100} strokeWidth={1} aria-hidden="true" />
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ice-300/70">
              [ THURSTECH HVAC UNIT ]
            </p>
          </div>
        </div>
      </div>

      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </section>
  );
}
