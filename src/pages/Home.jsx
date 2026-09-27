import { lazy, Suspense } from "react";
import SEO, { localBusinessJsonLd } from "../components/SEO";

// ── Above-the-fold: eager imports (critical render path) ─────────────────────
import Hero from "../components/home/Hero";
import TrustBar from "../components/home/TrustBar";

// ── Below-the-fold: lazy imports (deferred until after initial paint) ─────────
const NeedSection = lazy(() => import("../components/home/NeedSection"));
const ServicesOverview = lazy(() => import("../components/home/ServicesOverview"));
const FeaturedProducts = lazy(() => import("../components/home/FeaturedProducts"));
const FinalCta = lazy(() => import("../components/home/FinalCta"));

/** Shared skeleton placeholder shown while a lazy section is loading */
const SectionSkeleton = () => (
  <div className="h-40 bg-slate-900/50 animate-pulse" aria-hidden="true" />
);

export default function Home() {
  return (
    <>
      <SEO
        title="THURSTECH Nigeria Limited | AC Sales, Installation &amp; Repair"
        description="THURSTECH Nigeria Limited supplies, installs, services and repairs air conditioners for homes, offices and businesses. Request AC sales, installation, repair or maintenance support."
        canonical="/"
        jsonLd={localBusinessJsonLd}
      />

      {/* Critical above-the-fold content — loaded immediately */}
      <Hero />
      <TrustBar />

      {/* Below-the-fold sections — deferred after first paint */}
      <Suspense fallback={<SectionSkeleton />}>
        <NeedSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ServicesOverview />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FinalCta />
      </Suspense>
    </>
  );
}
