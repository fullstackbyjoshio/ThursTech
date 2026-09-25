import { Wind } from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="bg-navy-900 text-white relative overflow-hidden">
      <div className="container-page py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <p className="text-ice-300 font-semibold text-sm mb-4 tracking-wide">
            Sales &bull; Installation &bull; Repair &bull; Servicing
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
            Reliable Cooling.
            <br />
            Professional AC Solutions.
          </h1>
          <p className="text-silver-200 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
            THURSTECH Nigeria Limited supplies, installs, services and repairs air-conditioning
            systems for homes, offices and businesses.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button to="/shop" variant="primary" className="!px-7 !py-3.5">
              Shop AC
            </Button>
            <Button to="/request-a-quote" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-navy-900 !px-7 !py-3.5">
              Book a Service
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex justify-center">
          <div className="blueprint-frame bg-navy-800 w-full aspect-[4/3] flex items-center justify-center border border-navy-700">
            <Wind size={96} className="text-ice-400" strokeWidth={1} />
          </div>
        </div>
      </div>

      {/* Subtle blueprint grid texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" aria-hidden="true">
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
