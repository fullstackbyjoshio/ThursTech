import Seo from "../components/ui/Seo";
import Hero from "../components/home/Hero";
import TrustBar from "../components/home/TrustBar";
import NeedSection from "../components/home/NeedSection";
import ServicesOverview from "../components/home/ServicesOverview";
import FeaturedProducts from "../components/home/FeaturedProducts";
import FinalCta from "../components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Seo
        title="THURSTECH Nigeria Limited | AC Sales, Installation & Repair"
        description="THURSTECH Nigeria Limited supplies, installs, services and repairs air conditioners for homes, offices and businesses. Request AC sales, installation, repair or maintenance support."
        path="/"
      />
      <Hero />
      <TrustBar />
      <NeedSection />
      <ServicesOverview />
      <FeaturedProducts />
      <FinalCta />
    </>
  );
}
