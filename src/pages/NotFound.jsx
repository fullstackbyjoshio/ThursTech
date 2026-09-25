import { Link } from "react-router-dom";
import Seo from "../components/ui/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | THURSTECH" description="The page you are looking for could not be found." path="/404" />
      <section className="container-page py-24 text-center">
        <p className="text-6xl font-display font-extrabold text-navy-900 mb-4">404</p>
        <p className="text-navy-700/70 mb-8">Sorry, we could not find that page.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700">
          Back to Home
        </Link>
      </section>
    </>
  );
}
