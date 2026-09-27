import { Link, NavLink } from "react-router-dom";

const routePrefetchers = {
  "/about": () => import("../../pages/About.jsx"),
  "/shop": () => import("../../pages/Shop.jsx"),
  "/products": () => import("../../pages/Shop.jsx"),
  "/services": () => import("../../pages/Services.jsx"),
  "/projects": () => import("../../pages/Projects.jsx"),
  "/faq": () => import("../../pages/FAQ.jsx"),
  "/contact": () => import("../../pages/Contact.jsx"),
  "/request-a-quote": () => import("../../pages/RequestQuote.jsx"),
  "/quote": () => import("../../pages/RequestQuote.jsx"),
  "/request-repair": () => import("../../pages/RequestRepair.jsx"),
  "/repair-request": () => import("../../pages/RequestRepair.jsx"),
};

function prefetchRoute(to) {
  const path = typeof to === "string" ? to : to.pathname;
  const exactPrefetcher = routePrefetchers[path];
  const prefetcher = exactPrefetcher
    || (path?.startsWith("/services/") ? () => import("../../pages/ServiceDetail.jsx") : null)
    || (path?.startsWith("/shop/") ? () => import("../../pages/ProductDetail.jsx") : null)
    || (path?.startsWith("/projects/") ? () => import("../../pages/ProjectDetail.jsx") : null);

  prefetcher?.().catch(() => {});
}

export default function PrefetchLink({ to, navLink = false, onMouseEnter, onFocus, ...props }) {
  const LinkComponent = navLink ? NavLink : Link;

  return (
    <LinkComponent
      to={to}
      {...props}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        prefetchRoute(to);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        prefetchRoute(to);
      }}
    />
  );
}
