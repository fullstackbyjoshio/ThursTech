# THURSTECH Performance Context

Read-only audit snapshot generated from the current workspace on 2026-09-28T09:40:14.120Z. No application, configuration, deployment, Supabase, EmailJS, or environment files were changed. No `.env*` files or their contents were read or included. Build output was written to a temporary directory outside the repository.

## Scope and observed workspace

- Project root: `C:\Users\Hp\Desktop\thurstech-website`.
- Vite + React 18 single-page application; React Router v6; Tailwind CSS 3; Vite sitemap plugin.
- There is no `vercel.json`, no `src/App.css`, and no additional global CSS file in the current file inventory.
- The only static image asset found is `public/favicon.svg`; no local font files or image directory exist. Homepage product images are database URLs at runtime.
- `src/components/ui/Seo.jsx` exists but Home imports `src/components/SEO.jsx`; the former is not part of the initial route graph.
- This report excludes dependency trees, generated builds, git metadata, and all `.env*` files.

## INITIAL LOAD DEPENDENCY GRAPH

For a cold navigation to `/`, HTML has an empty `#root`; the browser loads the module entry and CSS, then React renders the route. Solid-line imports below are the actual static source-module graph. Other pages and admin modules declared through `lazy(() => import(...))` are dynamic and do not join this graph until navigated to. `PrefetchLink` contains additional dynamic imports and invokes them on hover/focus; that is not an initial mobile request unless that interaction occurs.

`index.html` → `src/main.jsx` → `src/App.jsx` → `src/components/layout/Layout.jsx` → `src/pages/Home.jsx` → shared layout + Home modules → `Hero` and remaining sections.

Static source modules reachable from `main.jsx` (all are synchronously reachable before first React render):

| File | Static imports | Load type | Supabase | EmailJS | Framer Motion | lucide-react | External image | External font | Initialization / work |
|---|---|---|---|---|---|---|---|---|---|
| [src/App.jsx](src/App.jsx) | `react`, `react-router-dom`, `./components/layout/Layout`, `./pages/Home.jsx` | Static | No | No | No | No | No | No | No notable initialization |
| [src/components/home/FeaturedProducts.jsx](src/components/home/FeaturedProducts.jsx) | `react`, `react-router-dom`, `../../lib/supabaseClient`, `../ui/SectionHeading`, `../ui/EmptyState`, `../ui/Button`, `../ui/OptimizedImage` | Static | Yes | No | No | No | Yes, runtime Supabase image URL | No | Post-commit product query in useEffect |
| [src/components/home/FinalCta.jsx](src/components/home/FinalCta.jsx) | `lucide-react`, `../ui/Button`, `../ui/WhatsAppLink`, `../../data/business`, `../../lib/whatsapp` | Static | No | No | No | Yes | No | No | No notable initialization |
| [src/components/home/Hero.jsx](src/components/home/Hero.jsx) | `lucide-react`, `../ui/Button` | Static | No | No | No | Yes | No | No | No notable initialization |
| [src/components/home/NeedSection.jsx](src/components/home/NeedSection.jsx) | `lucide-react`, `react-router-dom`, `../ui/SectionHeading` | Static | No | No | No | Yes | No | No | No notable initialization |
| [src/components/home/ServicesOverview.jsx](src/components/home/ServicesOverview.jsx) | `react-router-dom`, `lucide-react`, `../../data/services`, `../ui/SectionHeading` | Static | No | No | No | Yes | No | No | No notable initialization |
| [src/components/home/TrustBar.jsx](src/components/home/TrustBar.jsx) | None | Static | No | No | No | No | No | No | No notable initialization |
| [src/components/layout/Footer.jsx](src/components/layout/Footer.jsx) | `react-router-dom`, `lucide-react`, `../../data/navigation`, `../../data/business` | Static | No | No | No | Yes | No | No | No notable initialization |
| [src/components/layout/Header.jsx](src/components/layout/Header.jsx) | `react`, `lucide-react`, `../../data/navigation`, `../../data/business`, `../ui/PrefetchLink` | Static | No | No | No | Yes | No | No | No notable initialization |
| [src/components/layout/Layout.jsx](src/components/layout/Layout.jsx) | `react-router-dom`, `./Header`, `./Footer`, `./MobileActionBar`, `../ui/Toast` | Static | No | No | No | No | No | No | No notable initialization |
| [src/components/layout/MobileActionBar.jsx](src/components/layout/MobileActionBar.jsx) | `lucide-react`, `../../data/business`, `../../lib/whatsapp`, `react-router-dom` | Static | No | No | No | Yes | No | No | No notable initialization |
| [src/components/SEO.jsx](src/components/SEO.jsx) | `react-helmet-async`, `../data/business` | Static | No | No | No | No | No | No | No notable initialization |
| [src/components/ui/Button.jsx](src/components/ui/Button.jsx) | `react-router-dom` | Static | No | No | No | No | No | No | No notable initialization |
| [src/components/ui/EmptyState.jsx](src/components/ui/EmptyState.jsx) | None | Static | No | No | No | No | No | No | No notable initialization |
| [src/components/ui/OptimizedImage.jsx](src/components/ui/OptimizedImage.jsx) | `react` | Static | No | No | No | No | Yes | No | No notable initialization |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx) | `react-router-dom` | Static | No | No | No | No | No | No | No notable initialization |
| [src/components/ui/SectionHeading.jsx](src/components/ui/SectionHeading.jsx) | None | Static | No | No | No | No | No | No | No notable initialization |
| [src/components/ui/Toast.jsx](src/components/ui/Toast.jsx) | `react`, `lucide-react` | Static | No | No | No | Yes | No | No | No notable initialization |
| [src/components/ui/WhatsAppLink.jsx](src/components/ui/WhatsAppLink.jsx) | `lucide-react`, `../../lib/whatsapp` | Static | No | No | No | Yes | No | No | No notable initialization |
| [src/data/business.js](src/data/business.js) | None | Static | No | No | No | No | No | No | No notable initialization |
| [src/data/navigation.js](src/data/navigation.js) | None | Static | No | No | No | No | No | No | No notable initialization |
| [src/data/services.js](src/data/services.js) | None | Static | No | No | No | No | No | No | No notable initialization |
| [src/index.css](src/index.css) | None | Static | No | No | No | No | No | No | No notable initialization |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js) | `@supabase/supabase-js` | Static | Yes | No | No | No | No | No | Supabase client created at module evaluation |
| [src/lib/whatsapp.js](src/lib/whatsapp.js) | None | Static | No | No | No | No | No | No | No notable initialization |
| [src/main.jsx](src/main.jsx) | `react`, `react-dom/client`, `react-router-dom`, `react-helmet-async`, `./App.jsx`, `@vercel/analytics/react`, `./index.css`, `@vercel/speed-insights/react` | Static | No | No | No | No | No | No | Analytics component initialization |
| [src/pages/Home.jsx](src/pages/Home.jsx) | `../components/SEO`, `../components/home/Hero`, `../components/home/TrustBar`, `../components/home/NeedSection`, `../components/home/ServicesOverview`, `../components/home/FeaturedProducts`, `../components/home/FinalCta` | Static | No | No | No | No | No | No | No notable initialization |

External package entry points on that static graph are `react`, `react-dom/client`, `react-router-dom`, `react-helmet-async`, `@vercel/analytics/react`, `@vercel/speed-insights/react`, `lucide-react`, and `@supabase/supabase-js`. Build output proves which resulting chunks are requested initially. The generic `vendor` chunk also contains EmailJS SDK code despite the EmailJS helper being otherwise route-specific.

**Initial loaded source-to-chunk chain:** built HTML references the entry chunk and modulepreloads `icons-ENEkUL-y.js`, `index-DoEpinq7.js`, `index-SeaqC31z.css`, `supabase-BFv06M0W.js`, `vendor-WKeAwtsC.js`. All these requests are on the module dependency graph before React can render the Hero.

## RENDER BLOCKING ANALYSIS

- **HTML parsing:** the document is small and has no synchronous JavaScript. The external Google Fonts stylesheet uses `media="print"` with an onload media switch; this avoids blocking normal CSS rendering. The `<noscript>` stylesheet is a blocking fallback only when JavaScript is disabled.
- **CSS application / first paint:** the generated application stylesheet is a normal stylesheet and therefore render-blocking until fetched and parsed. It is 25.37 kB raw / 5.59 kB gzip. It contains Tailwind output plus custom rules; no second global stylesheet was found. The document also preloads the favicon (336 bytes), which does not contribute Hero content.
- **React startup / first contentful paint:** the root HTML starts empty, and the type=module application cannot show content until its static JS graph is fetched, parsed, and executed. The generated HTML modulepreloads entry, vendor, icons, and Supabase. Initial JS total is 562,774 bytes raw (549.6 KiB), 166,837 bytes gzip (162.9 KiB). The Supabase package is statically pulled in by the below-the-fold FeaturedProducts module.
- **Largest initial chunks:** vendor is 293.95 kB raw / 95.64 kB gzip; Supabase is 220.56 kB / 57.38 kB gzip; entry is 35.72 kB / 10.91 kB gzip; icons is 12.53 kB / 2.91 kB gzip. The broad Vite vendor rule places EmailJS SDK code (verified by its `https://api.emailjs.com` code in the vendor output) in an initial chunk.
- **Supabase:** `createClient(...)` runs synchronously while evaluating `src/lib/supabaseClient.js`. The FeaturedProducts query starts in a React `useEffect` after commit, so the network response is not a render prerequisite, but downloading/evaluating its initial chunk is.
- **EmailJS:** the utility is not imported by Home or initial source modules. A small `emailjs-*.js` route chunk is not modulepreloaded, but the actual SDK implementation is in initial `vendor-*.js` due the current catch-all third-party chunking rule. This is unnecessary transfer for a homepage visitor; no EmailJS request is initiated just by rendering Home.
- **Framer Motion:** not in the initial modulepreload list. It belongs to the dynamically reached admin HoldActionButton route and is emitted as a separate chunk.
- **Icons:** lucide-react is directly used by Header, Hero, other Home sections and shared layout, so its 12.53 kB icons chunk is initial.
- **Analytics:** Vercel Analytics and Speed Insights are statically imported by `main.jsx`; their client modules are represented in the shared initial vendor chunk.
- **Fonts:** Google Fonts requests Archivo (500/600/700/800) and Inter (400/500/600/700) with `display=swap`. The normal stylesheet is switched from print to all on load, so the external CSS does not block first paint. Source does not contain local font files or a local `@font-face` block; the downloaded Google Fonts CSS/font files were not fetched or size-measured by this source audit.
- **Images and preloads:** there is no Hero image. Supabase product images are loaded lazily lower in the document and have no preload/high priority. Unsplash is preconnected but not referenced from the Home modules. The preload targets only the favicon.
- **Other resource hints:** Supabase Storage gets preconnect and dns-prefetch, and Unsplash gets preconnect. These are connection hints, not render-blocking CSS/JS.
- **Build findings:** no JS chunk exceeds 300 kB raw; the largest individual initial JS chunk is vendor at 293.95 kB raw. The combined initial graph is substantial relative to a mobile cold start, particularly because Supabase and EmailJS are not needed to paint the Hero.

## BUILD ANALYSIS

- Command: `npm.cmd run build -- --outDir C:\Users\Hp\AppData\Local\Temp\thurstech-audit-build-confirm` (uses the project-installed dependencies; no install performed).
- Result: **succeeded**, Vite 5.4.21 reported `built in 16.46s`; generated output exists outside the repository.
- Warning: Vite says the external `outDir` is outside the project root and will not be emptied, and suggests `--emptyOutDir` to override. This is expected for this isolated audit build; it is not an app/build warning. No application compilation errors were reported.
- Chunk sizes below are raw and gzip bytes measured from that output. Initial means referenced by the generated HTML script, modulepreload, or stylesheet tags.

| Generated JS/CSS chunk | Raw size | Gzip size | Initial HTML request? |
|---|---:|---:|:---:|
| About-D2cFDMpz.js | 1.6 KiB (1,661 B) | 0.8 KiB (800 B) | No |
| AdminDashboard-DkOf4iwo.js | 2.4 KiB (2,499 B) | 1.0 KiB (1,020 B) | No |
| AdminLayout-CpQ13U9R.js | 1.7 KiB (1,762 B) | 0.8 KiB (809 B) | No |
| AdminLogin-Dwl5NjEP.js | 1.6 KiB (1,605 B) | 0.7 KiB (759 B) | No |
| button-1-BD73Z7Jq.js | 0.5 KiB (481 B) | 0.3 KiB (340 B) | No |
| Contact-aXtTv1ej.js | 4.0 KiB (4,088 B) | 1.6 KiB (1,633 B) | No |
| Customers-BBRdER_V.js | 3.3 KiB (3,376 B) | 1.2 KiB (1,246 B) | No |
| emailjs-C99zjzFS.js | 0.6 KiB (643 B) | 0.4 KiB (392 B) | No |
| FAQ-YR2gknan.js | 1.6 KiB (1,639 B) | 0.9 KiB (906 B) | No |
| FAQs-_7CuGcGo.js | 4.6 KiB (4,664 B) | 1.7 KiB (1,704 B) | No |
| framer-motion-ClgcA5gi.js | 28.5 KiB (29,167 B) | 9.7 KiB (9,927 B) | No |
| HoldActionButton-B76imgz8.js | 1.7 KiB (1,772 B) | 0.9 KiB (949 B) | No |
| icons-ENEkUL-y.js | 12.2 KiB (12,529 B) | 2.8 KiB (2,908 B) | Yes |
| index-DoEpinq7.js | 34.9 KiB (35,733 B) | 10.7 KiB (10,908 B) | Yes |
| index-SeaqC31z.css | 24.8 KiB (25,371 B) | 5.5 KiB (5,591 B) | Yes |
| LeadsTable-CHFkGTjS.js | 4.8 KiB (4,914 B) | 1.7 KiB (1,699 B) | No |
| NotFound-PaHi3Lww.js | 0.7 KiB (675 B) | 0.4 KiB (424 B) | No |
| ProductDetail-9-3jBMn_.js | 3.1 KiB (3,211 B) | 1.5 KiB (1,507 B) | No |
| Products-DCipWOby.js | 11.4 KiB (11,631 B) | 3.6 KiB (3,732 B) | No |
| ProjectDetail-C9hOCUc4.js | 1.8 KiB (1,837 B) | 0.9 KiB (904 B) | No |
| Projects-v1-MMRtI.js | 2.1 KiB (2,114 B) | 1.0 KiB (1,053 B) | No |
| ProjectsAdmin-BEwr8zKq.js | 7.2 KiB (7,393 B) | 2.3 KiB (2,381 B) | No |
| ProtectedRoute-BKr7WQhq.js | 1.3 KiB (1,366 B) | 0.7 KiB (729 B) | No |
| QuoteRequests-DYJOTenR.js | 0.8 KiB (845 B) | 0.5 KiB (490 B) | No |
| RepairRequests-CHa11ss8.js | 0.8 KiB (800 B) | 0.5 KiB (474 B) | No |
| RequestQuote-Cong9ArS.js | 5.4 KiB (5,579 B) | 2.0 KiB (2,085 B) | No |
| RequestRepair-0W_0avj6.js | 4.9 KiB (5,059 B) | 1.9 KiB (1,943 B) | No |
| Seo-5WgrtINh.js | 1.0 KiB (1,029 B) | 0.5 KiB (489 B) | No |
| ServiceDetail-CEYiEKy6.js | 3.1 KiB (3,148 B) | 1.2 KiB (1,202 B) | No |
| ServiceRequests-CxBilYQs.js | 0.7 KiB (764 B) | 0.4 KiB (454 B) | No |
| Services-VSeSoxoW.js | 1.3 KiB (1,303 B) | 0.7 KiB (703 B) | No |
| Settings-BkjbbZoU.js | 2.0 KiB (2,007 B) | 0.8 KiB (861 B) | No |
| Shop-B7XuU_DB.js | 2.6 KiB (2,696 B) | 1.3 KiB (1,344 B) | No |
| Skeleton-DVHvBnkT.js | 0.9 KiB (915 B) | 0.4 KiB (407 B) | No |
| StatusBadge-CYhIGCxW.js | 0.6 KiB (578 B) | 0.4 KiB (363 B) | No |
| supabase-BFv06M0W.js | 215.4 KiB (220,567 B) | 56.0 KiB (57,379 B) | Yes |
| Testimonials-FDg1h8gs.js | 5.9 KiB (6,001 B) | 2.0 KiB (2,018 B) | No |
| vendor-WKeAwtsC.js | 287.1 KiB (293,945 B) | 93.4 KiB (95,642 B) | Yes |

Initial totals: **549.6 KiB JS raw / 162.9 KiB gzip**, and **24.8 KiB CSS raw / 5.5 KiB gzip**. Initial HTML modulepreloads `index-DoEpinq7.js`, `vendor-WKeAwtsC.js`, `icons-ENEkUL-y.js`, `supabase-BFv06M0W.js`; the external EmailJS helper chunk and Framer Motion chunk are not in that list. EmailJS SDK code is nevertheless in initial vendor. Supabase is in initial because FeaturedProducts statically imports the client.

## IMAGE AND FONT AUDIT

- **Hero:** no bitmap or remote image. The visible artwork is inline SVG markup in `src/components/home/Hero.jsx`; it is hidden below the desktop breakpoint, while the mobile Hero is text/buttons.
- **Other statically referenced homepage images:** none.
- **Data-driven product images:** `src/components/home/FeaturedProducts.jsx` passes each Supabase row's `image_url` to `OptimizedImage`; that section follows the Hero, TrustBar, NeedSection, and ServicesOverview in DOM order. No runtime database rows were queried for this inspection, so concrete URLs, file types, dimensions, sizes, and count cannot be verified.
- **Loading defaults:** `OptimizedImage` defaults to `loading="lazy"`, `decoding="async"`, and `fetchPriority="auto"`; FeaturedProducts does not override them. There is no product-image preload. It requests an 800x800 Supabase render transform, WebP, quality 80 when the URL is a Supabase public-storage URL.
- **Preloaded image:** `/favicon.svg`, SVG viewBox 32x32, 336 bytes. This is a favicon, not the Hero/LCP artwork.
- **External image references in Home:** no Unsplash URL is used; the Unsplash preconnect in `index.html` has no matching homepage image reference.

**Fonts found:** Google Fonts external stylesheet in `index.html`; Archivo weights 500, 600, 700, 800 and Inter weights 400, 500, 600, 700. CSS loading method is asynchronous media swap plus a noscript regular stylesheet. The URL has `display=swap`; the Google-served CSS itself was not downloaded, so its individual `font-display` declarations are not independently verified here.

## LIGHTHOUSE REGRESSION CHECK

Observed mobile values supplied for this review: Performance 56, Speed Index 4.5 s, TBT 0 ms, CLS 0, Accessibility 100, Best Practices 100, SEO 100; about six blank frames precede visible Hero content.

**Most likely current-code cause:** the site is client-rendered into an initially empty root, and the Hero is not present in the HTML. A cold mobile load must fetch/execute the initial module graph before any meaningful Hero paint. That graph includes a 293.95 kB raw generic vendor chunk (with analytics and EmailJS SDK), a 220.56 kB raw Supabase chunk that is only needed by below-fold featured products, an icons chunk, the app entry, and blocking app CSS. The initial HTML explicitly modulepreloads all of these. This directly matches a blank-before-Hero filmstrip better than an image decode problem: the Hero has no bitmap image and no remote Hero image request.

**Secondary current-code contributors:** (1) the Vite `manualChunks` catch-all combines unrelated third-party libraries into vendor, pulling EmailJS into the homepage even though no initial module calls it; (2) Supabase is initialized and its package downloaded up front solely due FeaturedProducts' static import, while its query is asynchronous after commit; (3) initial icons/analytics add some additional JavaScript and module execution; (4) the Tailwind app CSS must load before normal rendering; (5) Google font CSS is asynchronous and uses swap, and is less likely to explain a fully blank page; (6) unused Unsplash preconnect and favicon preload are lower-impact resource hints.

TBT 0 ms and CLS 0 do not exclude slow resource loading or cumulative startup latency; they mean the reported trace did not record blocking tasks over Lighthouse's TBT threshold or visible layout shift. The current code identifies a plausible direct mechanism, but **the exact 88-to-56 regression cannot be established from the current tree and the supplied score alone**. The previous 88-point build, a current Lighthouse trace/network waterfall, test URL/build identity, device/network throttling, and cache state are not available here. The source-level conclusion should therefore be treated as a high-confidence candidate, not a measured causal attribution.

## SEARCH RESULTS

Search covers current safe text/source files, excluding all `.env*`, dependencies, generated outputs, and git metadata. Each occurrence has a workspace-relative path, 1-based line number, and excerpt. Zero-match terms are explicitly called out.

### React.lazy

No occurrences found.

### Suspense

| File | Line | Excerpt |
|---|---:|---|
| [src/App.jsx](src/App.jsx#L1) | 1 | `import { lazy, Suspense } from "react";` |
| [src/App.jsx](src/App.jsx#L36) | 36 | `<Suspense fallback={<div className="min-h-screen bg-slate-900" />}>` |
| [src/App.jsx](src/App.jsx#L80) | 80 | `</Suspense>` |

### import(

| File | Line | Excerpt |
|---|---:|---|
| [src/App.jsx](src/App.jsx#L7) | 7 | `const About = lazy(() => import("./pages/About.jsx"));` |
| [src/App.jsx](src/App.jsx#L8) | 8 | `const Shop = lazy(() => import("./pages/Shop.jsx"));` |
| [src/App.jsx](src/App.jsx#L9) | 9 | `const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));` |
| [src/App.jsx](src/App.jsx#L10) | 10 | `const Services = lazy(() => import("./pages/Services.jsx"));` |
| [src/App.jsx](src/App.jsx#L11) | 11 | `const ServiceDetail = lazy(() => import("./pages/ServiceDetail.jsx"));` |
| [src/App.jsx](src/App.jsx#L12) | 12 | `const Projects = lazy(() => import("./pages/Projects.jsx"));` |
| [src/App.jsx](src/App.jsx#L13) | 13 | `const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));` |
| [src/App.jsx](src/App.jsx#L14) | 14 | `const FAQ = lazy(() => import("./pages/FAQ.jsx"));` |
| [src/App.jsx](src/App.jsx#L15) | 15 | `const Contact = lazy(() => import("./pages/Contact.jsx"));` |
| [src/App.jsx](src/App.jsx#L16) | 16 | `const RequestQuote = lazy(() => import("./pages/RequestQuote.jsx"));` |
| [src/App.jsx](src/App.jsx#L17) | 17 | `const RequestRepair = lazy(() => import("./pages/RequestRepair.jsx"));` |
| [src/App.jsx](src/App.jsx#L18) | 18 | `const NotFound = lazy(() => import("./pages/NotFound.jsx"));` |
| [src/App.jsx](src/App.jsx#L20) | 20 | `const AdminLogin = lazy(() => import("./admin/AdminLogin.jsx"));` |
| [src/App.jsx](src/App.jsx#L21) | 21 | `const AdminLayout = lazy(() => import("./admin/AdminLayout.jsx"));` |
| [src/App.jsx](src/App.jsx#L22) | 22 | `const ProtectedRoute = lazy(() => import("./admin/ProtectedRoute"));` |
| [src/App.jsx](src/App.jsx#L23) | 23 | `const AdminDashboard = lazy(() => import("./admin/AdminDashboard.jsx"));` |
| [src/App.jsx](src/App.jsx#L24) | 24 | `const QuoteRequests = lazy(() => import("./admin/QuoteRequests.jsx"));` |
| [src/App.jsx](src/App.jsx#L25) | 25 | `const RepairRequests = lazy(() => import("./admin/RepairRequests.jsx"));` |
| [src/App.jsx](src/App.jsx#L26) | 26 | `const ServiceRequests = lazy(() => import("./admin/ServiceRequests.jsx"));` |
| [src/App.jsx](src/App.jsx#L27) | 27 | `const Customers = lazy(() => import("./admin/Customers.jsx"));` |
| [src/App.jsx](src/App.jsx#L28) | 28 | `const Products = lazy(() => import("./admin/Products.jsx"));` |
| [src/App.jsx](src/App.jsx#L29) | 29 | `const ProjectsAdmin = lazy(() => import("./admin/ProjectsAdmin.jsx"));` |
| [src/App.jsx](src/App.jsx#L30) | 30 | `const Testimonials = lazy(() => import("./admin/Testimonials.jsx"));` |
| [src/App.jsx](src/App.jsx#L31) | 31 | `const FAQsAdmin = lazy(() => import("./admin/FAQs.jsx"));` |
| [src/App.jsx](src/App.jsx#L32) | 32 | `const Settings = lazy(() => import("./admin/Settings.jsx"));` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L4) | 4 | `"/about": () => import("../../pages/About.jsx"),` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L5) | 5 | `"/shop": () => import("../../pages/Shop.jsx"),` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L6) | 6 | `"/products": () => import("../../pages/Shop.jsx"),` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L7) | 7 | `"/services": () => import("../../pages/Services.jsx"),` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L8) | 8 | `"/projects": () => import("../../pages/Projects.jsx"),` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L9) | 9 | `"/faq": () => import("../../pages/FAQ.jsx"),` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L10) | 10 | `"/contact": () => import("../../pages/Contact.jsx"),` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L11) | 11 | `"/request-a-quote": () => import("../../pages/RequestQuote.jsx"),` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L12) | 12 | `"/quote": () => import("../../pages/RequestQuote.jsx"),` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L13) | 13 | `"/request-repair": () => import("../../pages/RequestRepair.jsx"),` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L14) | 14 | `"/repair-request": () => import("../../pages/RequestRepair.jsx"),` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L21) | 21 | `\|\| (path?.startsWith("/services/") ? () => import("../../pages/ServiceDetail.jsx") : null)` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L22) | 22 | `\|\| (path?.startsWith("/shop/") ? () => import("../../pages/ProductDetail.jsx") : null)` |
| [src/components/ui/PrefetchLink.jsx](src/components/ui/PrefetchLink.jsx#L23) | 23 | `\|\| (path?.startsWith("/projects/") ? () => import("../../pages/ProjectDetail.jsx") : null);` |
| [tailwind.config.js](tailwind.config.js#L1) | 1 | `/** @type {import("tailwindcss").Config} */` |

### framer-motion

| File | Line | Excerpt |
|---|---:|---|
| [package.json](package.json#L17) | 17 | `"framer-motion": "^13.4.4",` |
| [src/components/ui/HoldActionButton.jsx](src/components/ui/HoldActionButton.jsx#L2) | 2 | `import { motion, useReducedMotion } from "framer-motion";` |
| [vite.config.js](vite.config.js#L47) | 47 | `if (id.includes("framer-motion") \|\| id.includes("/motion/")) {` |
| [vite.config.js](vite.config.js#L48) | 48 | `return "framer-motion";` |

### motion.

| File | Line | Excerpt |
|---|---:|---|
| [src/components/ui/HoldActionButton.jsx](src/components/ui/HoldActionButton.jsx#L56) | 56 | `<motion.button` |
| [src/components/ui/HoldActionButton.jsx](src/components/ui/HoldActionButton.jsx#L82) | 82 | `<motion.span` |
| [src/components/ui/HoldActionButton.jsx](src/components/ui/HoldActionButton.jsx#L90) | 90 | `</motion.button>` |

### lucide-react

| File | Line | Excerpt |
|---|---:|---|
| [package.json](package.json#L18) | 18 | `"lucide-react": "^0.383.0",` |
| [src/admin/AdminLayout.jsx](src/admin/AdminLayout.jsx#L2) | 2 | `import { LayoutDashboard, FileText, Wrench, Settings2, Users, Package, FolderKanban, Star, HelpCircle, SlidersHorizontal, LogOut } from "lucide-react";` |
| [src/admin/FAQs.jsx](src/admin/FAQs.jsx#L6) | 6 | `import { Plus, Trash2, X } from "lucide-react";` |
| [src/admin/Products.jsx](src/admin/Products.jsx#L7) | 7 | `import { Plus, Pencil, Trash2, X } from "lucide-react";` |
| [src/admin/ProjectsAdmin.jsx](src/admin/ProjectsAdmin.jsx#L7) | 7 | `import { Plus, Pencil, Trash2, X } from "lucide-react";` |
| [src/admin/Testimonials.jsx](src/admin/Testimonials.jsx#L7) | 7 | `import { Plus, Trash2, X } from "lucide-react";` |
| [src/components/home/FinalCta.jsx](src/components/home/FinalCta.jsx#L1) | 1 | `import { Phone } from "lucide-react";` |
| [src/components/home/Hero.jsx](src/components/home/Hero.jsx#L1) | 1 | `import { Wind } from "lucide-react";` |
| [src/components/home/NeedSection.jsx](src/components/home/NeedSection.jsx#L1) | 1 | `import { ShoppingCart, Wrench, Settings2, Hammer } from "lucide-react";` |
| [src/components/home/ServicesOverview.jsx](src/components/home/ServicesOverview.jsx#L2) | 2 | `import { ArrowRight } from "lucide-react";` |
| [src/components/layout/Footer.jsx](src/components/layout/Footer.jsx#L2) | 2 | `import { Mail, Phone } from "lucide-react";` |
| [src/components/layout/Header.jsx](src/components/layout/Header.jsx#L2) | 2 | `import { ChevronDown, Menu, X, Phone } from "lucide-react";` |
| [src/components/layout/MobileActionBar.jsx](src/components/layout/MobileActionBar.jsx#L1) | 1 | `import { Phone, MessageCircle, FileText } from "lucide-react";` |
| [src/components/ui/button-1.jsx](src/components/ui/button-1.jsx#L1) | 1 | `import { LoaderCircle } from "lucide-react";` |
| [src/components/ui/Toast.jsx](src/components/ui/Toast.jsx#L2) | 2 | `import { CheckCircle2, CircleAlert, X } from "lucide-react";` |
| [src/components/ui/WhatsAppLink.jsx](src/components/ui/WhatsAppLink.jsx#L1) | 1 | `import { MessageCircle } from "lucide-react";` |
| [src/pages/Contact.jsx](src/pages/Contact.jsx#L2) | 2 | `import { CheckCircle2, AlertTriangle, Phone, Mail } from "lucide-react";` |
| [src/pages/FAQ.jsx](src/pages/FAQ.jsx#L2) | 2 | `import { ChevronDown } from "lucide-react";` |
| [src/pages/RequestQuote.jsx](src/pages/RequestQuote.jsx#L2) | 2 | `import { CheckCircle2, AlertTriangle } from "lucide-react";` |
| [src/pages/RequestRepair.jsx](src/pages/RequestRepair.jsx#L2) | 2 | `import { CheckCircle2, AlertTriangle } from "lucide-react";` |
| [src/pages/ServiceDetail.jsx](src/pages/ServiceDetail.jsx#L3) | 3 | `import { ChevronDown, Check } from "lucide-react";` |
| [src/pages/Services.jsx](src/pages/Services.jsx#L2) | 2 | `import { ArrowRight } from "lucide-react";` |
| [vite.config.js](vite.config.js#L50) | 50 | `if (id.includes("lucide-react")) {` |

### supabase

| File | Line | Excerpt |
|---|---:|---|
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md#L21) | 21 | `- \`VITE_SUPABASE_URL\`` |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md#L22) | 22 | `- \`VITE_SUPABASE_ANON_KEY\`` |
| [docs/SETUP_EMAILJS.md](docs/SETUP_EMAILJS.md#L5) | 5 | `always saved to Supabase first, so a customer's enquiry is never lost even if` |
| [docs/SETUP_EMAILJS.md](docs/SETUP_EMAILJS.md#L50) | 50 | `Supabase and show a success message — the code simply skips sending the` |
| [docs/SETUP_SUPABASE.md](docs/SETUP_SUPABASE.md#L1) | 1 | `# Supabase Setup` |
| [docs/SETUP_SUPABASE.md](docs/SETUP_SUPABASE.md#L3) | 3 | `This project uses Supabase for the database, authentication and file storage` |
| [docs/SETUP_SUPABASE.md](docs/SETUP_SUPABASE.md#L8) | 8 | `1. Go to https://supabase.com and create a new project.` |
| [docs/SETUP_SUPABASE.md](docs/SETUP_SUPABASE.md#L18) | 18 | `VITE_SUPABASE_URL=https://your-project-ref.supabase.co` |
| [docs/SETUP_SUPABASE.md](docs/SETUP_SUPABASE.md#L19) | 19 | `VITE_SUPABASE_ANON_KEY=your-anon-public-key` |
| [docs/SETUP_SUPABASE.md](docs/SETUP_SUPABASE.md#L26) | 26 | `Open **SQL Editor** in the Supabase dashboard and run, in this exact order:` |
| [docs/SETUP_SUPABASE.md](docs/SETUP_SUPABASE.md#L28) | 28 | `1. \`supabase/schema.sql\` — creates all tables (products, projects,` |
| [docs/SETUP_SUPABASE.md](docs/SETUP_SUPABASE.md#L31) | 31 | `2. \`supabase/rls_policies.sql\` — enables Row Level Security and adds the` |
| [docs/SETUP_SUPABASE.md](docs/SETUP_SUPABASE.md#L34) | 34 | `3. \`supabase/storage_policies.sql\` — creates the public \`uploads\` storage` |
| [docs/SETUP_SUPABASE.md](docs/SETUP_SUPABASE.md#L40) | 40 | `1. In the Supabase dashboard go to **Authentication → Users → Add user**` |
| [docs/SETUP_SUPABASE.md](docs/SETUP_SUPABASE.md#L54) | 54 | `Supabase dashboard) — the application itself intentionally has no way to` |
| [index.html](index.html#L14) | 14 | `<!-- Supabase Storage CDN Preconnect -->` |
| [index.html](index.html#L15) | 15 | `<link rel="preconnect" href="https://hubvcisfvbgbkkacwkqy.supabase.co" crossorigin />` |
| [index.html](index.html#L16) | 16 | `<link rel="dns-prefetch" href="https://hubvcisfvbgbkkacwkqy.supabase.co" />` |
| [package.json](package.json#L13) | 13 | `"@supabase/supabase-js": "^2.117.2",` |
| [README.md](README.md#L12) | 12 | `- **Database / Auth / Storage:** Supabase (Postgres + Row Level Security)` |
| [README.md](README.md#L21) | 21 | `cp .env.example .env   # then fill in your Supabase + EmailJS keys` |
| [README.md](README.md#L32) | 32 | `1. [\`docs/SETUP_SUPABASE.md\`](docs/SETUP_SUPABASE.md)` |
| [README.md](README.md#L48) | 48 | `lib/             Supabase client, EmailJS helper, WhatsApp link builder` |
| [README.md](README.md#L50) | 50 | `supabase/` |
| [README.md](README.md#L71) | 71 | `sections pull live from Supabase and show an empty state until real rows` |
| [README.md](README.md#L77) | 77 | `\`/admin/login\` → \`/admin\`. Protected by Supabase Auth in the UI and by` |
| [README.md](README.md#L80) | 80 | `\`docs/SETUP_SUPABASE.md\` for creating your first admin account.` |
| [README.md](README.md#L95) | 95 | `- Run the Supabase SQL files and create the first admin account.` |
| [src/admin/AdminDashboard.jsx](src/admin/AdminDashboard.jsx#L2) | 2 | `import { supabase } from "../lib/supabaseClient";` |
| [src/admin/AdminDashboard.jsx](src/admin/AdminDashboard.jsx#L28) | 28 | `const { count, error } = await supabase.from(t.key).select("*", { count: "exact", head: true });` |
| [src/admin/AdminDashboard.jsx](src/admin/AdminDashboard.jsx#L37) | 37 | `const { count: p, error: pendingError } = await supabase` |
| [src/admin/AdminDashboard.jsx](src/admin/AdminDashboard.jsx#L41) | 41 | `const { count: c, error: completedError } = await supabase.from(t).select("*", { count: "exact", head: true }).eq("status", "Completed");` |
| [src/admin/AdminLayout.jsx](src/admin/AdminLayout.jsx#L4) | 4 | `import { supabase } from "../lib/supabaseClient";` |
| [src/admin/AdminLayout.jsx](src/admin/AdminLayout.jsx#L23) | 23 | `await supabase.auth.signOut();` |
| [src/admin/AdminLogin.jsx](src/admin/AdminLogin.jsx#L3) | 3 | `import { supabase } from "../lib/supabaseClient";` |
| [src/admin/AdminLogin.jsx](src/admin/AdminLogin.jsx#L16) | 16 | `const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });` |
| [src/admin/components/LeadsTable.jsx](src/admin/components/LeadsTable.jsx#L2) | 2 | `import { supabase } from "../../lib/supabaseClient";` |
| [src/admin/components/LeadsTable.jsx](src/admin/components/LeadsTable.jsx#L15) | 15 | `* Pass the Supabase table name and which columns to render as a summary.` |
| [src/admin/components/LeadsTable.jsx](src/admin/components/LeadsTable.jsx#L31) | 31 | `const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });` |
| [src/admin/components/LeadsTable.jsx](src/admin/components/LeadsTable.jsx#L50) | 50 | `const { data, error } = await supabase.from(table).update({ status, updated_at: new Date().toISOString() }).eq("id", id).select("id").maybeSingle();` |
| [src/admin/components/LeadsTable.jsx](src/admin/components/LeadsTable.jsx#L66) | 66 | `const { data, error } = await supabase.from(table).update({ admin_notes: noteDraft, updated_at: new Date().toISOString() }).eq("id", id).select("id").maybeSingle();` |
| [src/admin/components/LeadsTable.jsx](src/admin/components/LeadsTable.jsx#L83) | 83 | `const { data, error } = await supabase.from(table).delete().eq("id", id).select("id").maybeSingle();` |
| [src/admin/Customers.jsx](src/admin/Customers.jsx#L2) | 2 | `import { supabase } from "../lib/supabaseClient";` |
| [src/admin/Customers.jsx](src/admin/Customers.jsx#L20) | 20 | `supabase.from("quote_requests").select("*"),` |
| [src/admin/Customers.jsx](src/admin/Customers.jsx#L21) | 21 | `supabase.from("repair_requests").select("*"),` |
| [src/admin/Customers.jsx](src/admin/Customers.jsx#L22) | 22 | `supabase.from("service_requests").select("*"),` |
| [src/admin/FAQs.jsx](src/admin/FAQs.jsx#L2) | 2 | `import { supabase } from "../lib/supabaseClient";` |
| [src/admin/FAQs.jsx](src/admin/FAQs.jsx#L18) | 18 | `const { data, error } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });` |
| [src/admin/FAQs.jsx](src/admin/FAQs.jsx#L34) | 34 | `const { data, error } = await supabase.from("faqs").update({ published: !item.published }).eq("id", item.id).select("id").maybeSingle();` |
| [src/admin/FAQs.jsx](src/admin/FAQs.jsx#L50) | 50 | `const { data, error } = await supabase.from("faqs").delete().eq("id", id).select("id").maybeSingle();` |
| [src/admin/FAQs.jsx](src/admin/FAQs.jsx#L111) | 111 | `const { data, error } = await supabase.from("faqs").insert([form]).select("id").single();` |
| [src/admin/Products.jsx](src/admin/Products.jsx#L2) | 2 | `import { supabase } from "../lib/supabaseClient";` |
| [src/admin/Products.jsx](src/admin/Products.jsx#L25) | 25 | `const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });` |
| [src/admin/Products.jsx](src/admin/Products.jsx#L41) | 41 | `const { data, error } = await supabase.from("products").delete().eq("id", id).select("id").maybeSingle();` |
| [src/admin/Products.jsx](src/admin/Products.jsx#L57) | 57 | `const { data, error } = await supabase.from("products").update({ [field]: !product[field] }).eq("id", product.id).select("id").maybeSingle();` |
| [src/admin/Products.jsx](src/admin/Products.jsx#L186) | 186 | `const { error: uploadError } = await supabase.storage` |
| [src/admin/Products.jsx](src/admin/Products.jsx#L192) | 192 | `const { data } = supabase.storage.from('products').getPublicUrl(filePath);` |
| [src/admin/Products.jsx](src/admin/Products.jsx#L241) | 241 | `result = await supabase` |
| [src/admin/Products.jsx](src/admin/Products.jsx#L249) | 249 | `result = await supabase.from("products").insert([payload]).select("id").single();` |
| [src/admin/ProjectsAdmin.jsx](src/admin/ProjectsAdmin.jsx#L2) | 2 | `import { supabase } from "../lib/supabaseClient";` |
| [src/admin/ProjectsAdmin.jsx](src/admin/ProjectsAdmin.jsx#L24) | 24 | `const { data, error } = await supabase.from("projects").select("*").order("project_date", { ascending: false });` |
| [src/admin/ProjectsAdmin.jsx](src/admin/ProjectsAdmin.jsx#L40) | 40 | `const { data, error } = await supabase.from("projects").delete().eq("id", id).select("id").maybeSingle();` |
| [src/admin/ProjectsAdmin.jsx](src/admin/ProjectsAdmin.jsx#L56) | 56 | `const { data, error } = await supabase.from("projects").update({ featured: !p.featured }).eq("id", p.id).select("id").maybeSingle();` |
| [src/admin/ProjectsAdmin.jsx](src/admin/ProjectsAdmin.jsx#L159) | 159 | `result = await supabase.from("projects").update(payload).eq("id", form.id).select("id").maybeSingle();` |
| [src/admin/ProjectsAdmin.jsx](src/admin/ProjectsAdmin.jsx#L162) | 162 | `result = await supabase.from("projects").insert([payload]).select("id").single();` |
| [src/admin/ProtectedRoute.jsx](src/admin/ProtectedRoute.jsx#L6) | 6 | `* real security boundary is Supabase Row Level Security on every table, so` |
| [src/admin/Settings.jsx](src/admin/Settings.jsx#L25) | 25 | `Supabase and EmailJS connection details live in the project's <code className="text-xs bg-silver-100 px-1.5 py-0.5">.env</code> file,` |
| [src/admin/Settings.jsx](src/admin/Settings.jsx#L27) | 27 | `<code className="mx-1 text-xs bg-silver-100 px-1.5 py-0.5">docs/SETUP_SUPABASE.md</code> and` |
| [src/admin/Testimonials.jsx](src/admin/Testimonials.jsx#L2) | 2 | `import { supabase } from "../lib/supabaseClient";` |
| [src/admin/Testimonials.jsx](src/admin/Testimonials.jsx#L19) | 19 | `const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });` |
| [src/admin/Testimonials.jsx](src/admin/Testimonials.jsx#L35) | 35 | `const { data, error } = await supabase.from("testimonials").update({ [field]: !item[field] }).eq("id", item.id).select("id").maybeSingle();` |
| [src/admin/Testimonials.jsx](src/admin/Testimonials.jsx#L51) | 51 | `const { data, error } = await supabase.from("testimonials").delete().eq("id", id).select("id").maybeSingle();` |
| [src/admin/Testimonials.jsx](src/admin/Testimonials.jsx#L131) | 131 | `const { data, error } = await supabase.from("testimonials").insert([form]).select("id").single();` |
| [src/components/home/FeaturedProducts.jsx](src/components/home/FeaturedProducts.jsx#L3) | 3 | `import { supabase } from "../../lib/supabaseClient";` |
| [src/components/home/FeaturedProducts.jsx](src/components/home/FeaturedProducts.jsx#L10) | 10 | `* Pulls real featured products from Supabase. Shows an honest empty state` |
| [src/components/home/FeaturedProducts.jsx](src/components/home/FeaturedProducts.jsx#L21) | 21 | `const { data, error } = await supabase` |
| [src/hooks/useAuth.js](src/hooks/useAuth.js#L2) | 2 | `import { supabase } from "../lib/supabaseClient";` |
| [src/hooks/useAuth.js](src/hooks/useAuth.js#L5) | 5 | `* Tracks the current Supabase auth session and whether that user is an` |
| [src/hooks/useAuth.js](src/hooks/useAuth.js#L23) | 23 | `const { data, error } = await supabase` |
| [src/hooks/useAuth.js](src/hooks/useAuth.js#L33) | 33 | `const { data } = await supabase.auth.getSession();` |
| [src/hooks/useAuth.js](src/hooks/useAuth.js#L42) | 42 | `const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {` |
| [src/lib/emailjs.js](src/lib/emailjs.js#L9) | 9 | `* Email delivery is best-effort; Supabase remains the source of truth.` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L1) | 1 | `import { createClient } from "@supabase/supabase-js";` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L3) | 3 | `const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L4) | 4 | `const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L5) | 5 | `export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L7) | 7 | `if (!isSupabaseConfigured) {` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L9) | 9 | `"Supabase env vars are missing. Copy .env.example to .env and fill in " +` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L10) | 10 | `"VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. See docs/SETUP_SUPABASE.md."` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L16) | 16 | `// Security policies (see supabase/rls_policies.sql). The service-role/secret` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L21) | 21 | `code: "SUPABASE_NOT_CONFIGURED",` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L22) | 22 | `message: "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.",` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L27) | 27 | `export const supabase = createClient(` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L28) | 28 | `supabaseUrl \|\| "https://supabase-not-configured.invalid",` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L29) | 29 | `supabaseAnonKey \|\| "supabase-not-configured",` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L30) | 30 | `isSupabaseConfigured ? undefined : { global: { fetch: fallbackFetch } }` |
| [src/pages/Contact.jsx](src/pages/Contact.jsx#L3) | 3 | `import { supabase } from "../lib/supabaseClient";` |
| [src/pages/Contact.jsx](src/pages/Contact.jsx#L36) | 36 | `const { error: insertError } = await supabase.from("quote_requests").insert([` |
| [src/pages/FAQ.jsx](src/pages/FAQ.jsx#L3) | 3 | `import { supabase } from "../lib/supabaseClient";` |
| [src/pages/FAQ.jsx](src/pages/FAQ.jsx#L28) | 28 | `const { data, error } = await supabase` |
| [src/pages/ProductDetail.jsx](src/pages/ProductDetail.jsx#L3) | 3 | `import { supabase } from "../lib/supabaseClient";` |
| [src/pages/ProductDetail.jsx](src/pages/ProductDetail.jsx#L19) | 19 | `const { data } = await supabase.from("products").select("*").eq("id", id).eq("active", true).maybeSingle();` |
| [src/pages/ProjectDetail.jsx](src/pages/ProjectDetail.jsx#L3) | 3 | `import { supabase } from "../lib/supabaseClient";` |
| [src/pages/ProjectDetail.jsx](src/pages/ProjectDetail.jsx#L15) | 15 | `const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();` |
| [src/pages/Projects.jsx](src/pages/Projects.jsx#L3) | 3 | `import { supabase } from "../lib/supabaseClient";` |
| [src/pages/Projects.jsx](src/pages/Projects.jsx#L17) | 17 | `const { data, error } = await supabase.from("projects").select("*").order("project_date", { ascending: false });` |
| [src/pages/RequestQuote.jsx](src/pages/RequestQuote.jsx#L3) | 3 | `import { supabase } from "../lib/supabaseClient";` |
| [src/pages/RequestQuote.jsx](src/pages/RequestQuote.jsx#L46) | 46 | `const { error: uploadError } = await supabase.storage.from("uploads").upload(path, photo);` |
| [src/pages/RequestQuote.jsx](src/pages/RequestQuote.jsx#L48) | 48 | `const { data } = supabase.storage.from("uploads").getPublicUrl(path);` |
| [src/pages/RequestQuote.jsx](src/pages/RequestQuote.jsx#L53) | 53 | `// Save to Supabase first - this is the source of truth. A failed` |
| [src/pages/RequestQuote.jsx](src/pages/RequestQuote.jsx#L55) | 55 | `const { error: insertError } = await supabase.from("quote_requests").insert([` |
| [src/pages/RequestRepair.jsx](src/pages/RequestRepair.jsx#L3) | 3 | `import { supabase } from "../lib/supabaseClient";` |
| [src/pages/RequestRepair.jsx](src/pages/RequestRepair.jsx#L42) | 42 | `const { error: uploadError } = await supabase.storage.from("uploads").upload(path, photo);` |
| [src/pages/RequestRepair.jsx](src/pages/RequestRepair.jsx#L44) | 44 | `const { data } = supabase.storage.from("uploads").getPublicUrl(path);` |
| [src/pages/RequestRepair.jsx](src/pages/RequestRepair.jsx#L49) | 49 | `const { error: insertError } = await supabase.from("repair_requests").insert([` |
| [src/pages/Shop.jsx](src/pages/Shop.jsx#L3) | 3 | `import { supabase } from "../lib/supabaseClient";` |
| [src/pages/Shop.jsx](src/pages/Shop.jsx#L19) | 19 | `let query = supabase.from("products").select("*").eq("active", true).order("created_at", { ascending: false });` |
| [supabase/rls_policies.sql](supabase/rls_policies.sql#L6) | 6 | `-- powerful as these policies allow, per docs/SETUP_SUPABASE.md.` |
| [supabase/rls_policies.sql](supabase/rls_policies.sql#L57) | 57 | `-- authenticated users — add new admins directly in the Supabase dashboard` |
| [supabase/schema.sql](supabase/schema.sql#L2) | 2 | `-- THURSTECH NIGERIA LIMITED — Supabase schema` |
| [supabase/schema.sql](supabase/schema.sql#L4) | 4 | `-- Run this in the Supabase SQL editor (or via the CLI) on a fresh project,` |
| [supabase/schema.sql](supabase/schema.sql#L5) | 5 | `-- BEFORE rls_policies.sql. See docs/SETUP_SUPABASE.md for the full walkthrough.` |
| [vite.config.js](vite.config.js#L44) | 44 | `if (id.includes("@supabase")) {` |
| [vite.config.js](vite.config.js#L45) | 45 | `return "supabase";` |

### createClient

| File | Line | Excerpt |
|---|---:|---|
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L1) | 1 | `import { createClient } from "@supabase/supabase-js";` |
| [src/lib/supabaseClient.js](src/lib/supabaseClient.js#L27) | 27 | `export const supabase = createClient(` |

### emailjs

| File | Line | Excerpt |
|---|---:|---|
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md#L23) | 23 | `- \`VITE_EMAILJS_SERVICE_ID\`` |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md#L24) | 24 | `- \`VITE_EMAILJS_TEMPLATE_ID\`` |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md#L25) | 25 | `- \`VITE_EMAILJS_PUBLIC_KEY\`` |
| [docs/SETUP_EMAILJS.md](docs/SETUP_EMAILJS.md#L1) | 1 | `# EmailJS Setup` |
| [docs/SETUP_EMAILJS.md](docs/SETUP_EMAILJS.md#L3) | 3 | `EmailJS sends a notification email whenever a quote, repair, or contact form` |
| [docs/SETUP_EMAILJS.md](docs/SETUP_EMAILJS.md#L6) | 6 | `EmailJS is unreachable or misconfigured.` |
| [docs/SETUP_EMAILJS.md](docs/SETUP_EMAILJS.md#L10) | 10 | `1. Go to https://www.emailjs.com and create an account.` |
| [docs/SETUP_EMAILJS.md](docs/SETUP_EMAILJS.md#L44) | 44 | `VITE_EMAILJS_SERVICE_ID=your_service_id` |
| [docs/SETUP_EMAILJS.md](docs/SETUP_EMAILJS.md#L45) | 45 | `VITE_EMAILJS_TEMPLATE_ID=your_template_id` |
| [docs/SETUP_EMAILJS.md](docs/SETUP_EMAILJS.md#L46) | 46 | `VITE_EMAILJS_PUBLIC_KEY=your_public_key` |
| [package.json](package.json#L12) | 12 | `"@emailjs/browser": "^4.3.3",` |
| [README.md](README.md#L13) | 13 | `- **Email notifications:** EmailJS` |
| [README.md](README.md#L21) | 21 | `cp .env.example .env   # then fill in your Supabase + EmailJS keys` |
| [README.md](README.md#L33) | 33 | `2. [\`docs/SETUP_EMAILJS.md\`](docs/SETUP_EMAILJS.md)` |
| [README.md](README.md#L48) | 48 | `lib/             Supabase client, EmailJS helper, WhatsApp link builder` |
| [src/admin/Settings.jsx](src/admin/Settings.jsx#L25) | 25 | `Supabase and EmailJS connection details live in the project's <code className="text-xs bg-silver-100 px-1.5 py-0.5">.env</code> file,` |
| [src/admin/Settings.jsx](src/admin/Settings.jsx#L28) | 28 | `<code className="mx-1 text-xs bg-silver-100 px-1.5 py-0.5">docs/SETUP_EMAILJS.md</code>.` |
| [src/lib/emailjs.js](src/lib/emailjs.js#L1) | 1 | `import emailjs from "@emailjs/browser";` |
| [src/lib/emailjs.js](src/lib/emailjs.js#L3) | 3 | `const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;` |
| [src/lib/emailjs.js](src/lib/emailjs.js#L4) | 4 | `const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;` |
| [src/lib/emailjs.js](src/lib/emailjs.js#L5) | 5 | `const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;` |
| [src/lib/emailjs.js](src/lib/emailjs.js#L8) | 8 | `* Sends one form submission through the universal EmailJS template.` |
| [src/lib/emailjs.js](src/lib/emailjs.js#L13) | 13 | `console.warn("EmailJS env vars missing - skipping email notification.");` |
| [src/lib/emailjs.js](src/lib/emailjs.js#L33) | 33 | `return emailjs` |
| [src/lib/emailjs.js](src/lib/emailjs.js#L39) | 39 | `console.error("EmailJS notification failed:", error);` |
| [src/pages/Contact.jsx](src/pages/Contact.jsx#L4) | 4 | `import { sendFormEmail } from "../lib/emailjs";` |
| [src/pages/RequestQuote.jsx](src/pages/RequestQuote.jsx#L4) | 4 | `import { sendFormEmail } from "../lib/emailjs";` |
| [src/pages/RequestRepair.jsx](src/pages/RequestRepair.jsx#L4) | 4 | `import { sendFormEmail } from "../lib/emailjs";` |

### @vercel/analytics

| File | Line | Excerpt |
|---|---:|---|
| [package.json](package.json#L14) | 14 | `"@vercel/analytics": "^2.0.1",` |
| [src/main.jsx](src/main.jsx#L6) | 6 | `import { Analytics } from "@vercel/analytics/react";` |

### @vercel/speed-insights

| File | Line | Excerpt |
|---|---:|---|
| [package.json](package.json#L15) | 15 | `"@vercel/speed-insights": "^2.0.0",` |
| [src/main.jsx](src/main.jsx#L8) | 8 | `import { SpeedInsights } from "@vercel/speed-insights/react";` |

### fonts.googleapis.com

| File | Line | Excerpt |
|---|---:|---|
| [index.html](index.html#L7) | 7 | `<link rel="preconnect" href="https://fonts.googleapis.com" />` |
| [index.html](index.html#L22) | 22 | `href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"` |
| [index.html](index.html#L29) | 29 | `href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"` |

### fonts.gstatic.com

| File | Line | Excerpt |
|---|---:|---|
| [index.html](index.html#L8) | 8 | `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />` |

### <link rel="preload"

| File | Line | Excerpt |
|---|---:|---|
| [index.html](index.html#L11) | 11 | `<link rel="preload" as="image" href="/favicon.svg" />` |

### fetchPriority

| File | Line | Excerpt |
|---|---:|---|
| [src/components/ui/OptimizedImage.jsx](src/components/ui/OptimizedImage.jsx#L29) | 29 | `fetchPriority,` |
| [src/components/ui/OptimizedImage.jsx](src/components/ui/OptimizedImage.jsx#L69) | 69 | `fetchPriority={fetchPriority \|\| (loading === "eager" ? "high" : "auto")}` |
| [src/pages/ProductDetail.jsx](src/pages/ProductDetail.jsx#L91) | 91 | `<OptimizedImage src={product.image_url} alt={productName} width={1000} height={1000} loading="eager" fetchPriority="high" decoding="async" frameClassName="w-full h-full" />` |
| [src/pages/ProjectDetail.jsx](src/pages/ProjectDetail.jsx#L49) | 49 | `<OptimizedImage src={project.cover_image} alt={project.title} width={1200} height={675} loading="eager" fetchPriority="high" decoding="async" frameClassName="w-full mb-8" />` |

### loading="eager"

| File | Line | Excerpt |
|---|---:|---|
| [src/pages/ProductDetail.jsx](src/pages/ProductDetail.jsx#L91) | 91 | `<OptimizedImage src={product.image_url} alt={productName} width={1000} height={1000} loading="eager" fetchPriority="high" decoding="async" frameClassName="w-full h-full" />` |
| [src/pages/ProjectDetail.jsx](src/pages/ProjectDetail.jsx#L49) | 49 | `<OptimizedImage src={project.cover_image} alt={project.title} width={1200} height={675} loading="eager" fetchPriority="high" decoding="async" frameClassName="w-full mb-8" />` |

### loading="lazy"

No occurrences found.

### IntersectionObserver

No occurrences found.

### requestIdleCallback

No occurrences found.

## Deployment and SEO files

- `vite.config.js` generates sitemap output with `vite-plugin-sitemap`; the public static files are `public/robots.txt` and `public/sitemap.xml`.
- No `vercel.json` exists in the current workspace. Vercel-specific runtime components are imported in `src/main.jsx`.
- Home imports `src/components/SEO.jsx`; it derives canonical/social metadata and JSON-LD from the Home props and business data. `src/components/ui/Seo.jsx` is a separate existing implementation, not part of the Home graph.

## ANTIGRAVITY CURRENT-STATE SUMMARY

1. **Actual architecture:** Vite 5 + React 18 client-rendered SPA, React Router v6, Tailwind CSS, React Helmet, Vercel Analytics/Speed Insights, Supabase data/auth/storage, EmailJS form notifications, and generated sitemap.
2. **Homepage entry path:** `index.html` → `src/main.jsx` → `src/App.jsx` → `Layout`/`Home` → Home components; Home is statically imported, other public/admin pages use React lazy imports.
3. **Initial dependency chain:** HTML empty root → module entry and CSS → React/router/Helmet/Vercel vendor code + lucide icons + Supabase chunk → layout/Home graph → Hero render.
4. **Largest initial JavaScript dependencies:** generic vendor 293.95 kB raw / 95.64 kB gzip; Supabase 220.56 / 57.38; entry 35.72 / 10.91; icons 12.53 / 2.91. Total initial JS 562,774 bytes raw / 166,837 bytes gzip.
5. **Render-blocking CSS/font resources:** app CSS 25.37 kB raw / 5.59 kB gzip blocks normal rendering. Google font stylesheet is asynchronous via print/onload and uses display=swap, not an ordinary render-blocking stylesheet.
6. **Hero image:** none; inline SVG texture and text are used. The only preload is the 336-byte favicon. Featured product images are runtime Supabase URLs and lazy by default below the Hero.
7. **Supabase:** client library is statically imported, synchronously client-created, and loaded in initial chunk because FeaturedProducts is static. Its query runs in useEffect after commit.
8. **EmailJS:** no Home source import and no submission call on Home, but SDK implementation is pulled into initial generic vendor; emailjs helper chunk is not modulepreloaded.
9. **Framer Motion:** excluded from initial HTML imports; separate chunk used by HoldActionButton in lazy admin routes.
10. **Icon library:** lucide-react is in initial chunk due Home and shared Header/Footer/MobileActionBar usage.
11. **Lazy-loading:** non-home route components use React `lazy/Suspense`; PrefetchLink uses on-hover/on-focus dynamic import; product images default to native lazy loading. No IntersectionObserver or requestIdleCallback implementation was found.
12. **Most likely cause of score 56:** blank client root waits on the initial JS graph, especially unnecessary initial vendor (including EmailJS) and Supabase downloads/evaluation, plus app stylesheet; no Hero image loading delay is evident.
13. **Secondary causes:** Vercel analytics/speed insights, icon chunk, external fonts (non-blocking), possible early Supabase product query/network activity, and unused preconnect hints. Exact attribution remains unverified without Lighthouse trace and baseline build.
14. **Exact files to investigate/change in a future approved performance patch:** `src/components/home/FeaturedProducts.jsx` and its Supabase import boundary; `vite.config.js` manual chunk grouping; `src/lib/emailjs.js` import boundaries as reached by form pages; `src/main.jsx` analytics imports; optionally `index.html` resource hints and `src/index.css` initial CSS. This is audit guidance only; no such files were changed.
15. **Files not to change based on this evidence alone:** Supabase schema/policies, environment variables, EmailJS configuration, deployment settings, and Hero/image code; no evidence identifies them as direct defects. The Hero has no bitmap asset to optimize.
16. **Could not verify:** historical 88-point source/build, live Lighthouse waterfall/trace, actual runtime FeaturedProducts rows/image metadata, current remote Google Fonts response and byte sizes, production deployment identity/cache, or exact causal delta.

## Source snapshots

The following are current workspace file contents, copied verbatim (line endings normalized only):

## `package.json`

```json
{
  "name": "thurstech-website",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emailjs/browser": "^4.3.3",
    "@supabase/supabase-js": "^2.117.2",
    "@vercel/analytics": "^2.0.1",
    "@vercel/speed-insights": "^2.0.0",
    "clsx": "^2.1.1",
    "framer-motion": "^13.4.4",
    "lucide-react": "^0.383.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "vite": "^5.4.8",
    "vite-plugin-sitemap": "^0.8.2"
  }
}
```

## `vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/services",
  "/products",
  "/repair-request",
  "/quote",
  "/shop",
  "/projects",
  "/faq",
  "/request-repair",
  "/request-a-quote",
  "/services/ac-installation",
  "/services/ac-repair",
  "/services/ac-servicing",
  "/services/ac-maintenance",
  "/services/ac-relocation",
  "/services/commercial-hvac",
];

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: "https://www.thurstech.com.ng",
      // The plugin discovers `/` from dist/index.html, so avoid emitting it twice.
      dynamicRoutes: publicRoutes.filter((route) => route !== "/"),
      externalSitemaps: ["https://thurstech.vercel.app/sitemap.xml"],
      generateRobotsTxt: false, // Prevents dist/robots.txt ENOENT error on Vercel
      readable: true,
    }),
  ],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@supabase")) {
              return "supabase";
            }
            if (id.includes("framer-motion") || id.includes("/motion/")) {
              return "framer-motion";
            }
            if (id.includes("lucide-react")) {
              return "icons";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
```

## `tailwind.config.js`

```js
/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#071527", 900: "#0A1F33", 800: "#0F2C48", 700: "#163C5E" },
        blue: { 700: "#154A85", 600: "#1B5FA6", 500: "#2472C4" },
        ice: { 500: "#2FA4C4", 400: "#4FC3D9", 300: "#8FDCEA" },
        silver: { 400: "#9AA7B4", 300: "#C7CFD6", 200: "#E3E8EC", 100: "#F1F4F6" },
      },
      fontFamily: {
        display: ["Archivo", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      maxWidth: { content: "1200px" },
    },
  },
  plugins: [],
};
```

## `postcss.config.js`

```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

## `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Preconnect to External Font Origins -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Primary Brand Assets & Resource Preloading -->
    <link rel="preload" as="image" href="/favicon.svg" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Supabase Storage CDN Preconnect -->
    <link rel="preconnect" href="https://hubvcisfvbgbkkacwkqy.supabase.co" crossorigin />
    <link rel="dns-prefetch" href="https://hubvcisfvbgbkkacwkqy.supabase.co" />
    <link rel="preconnect" href="https://images.unsplash.com" />

    <!-- Asynchronous Google Fonts Loading -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
      />
    </noscript>

    <title>THURSTECH Nigeria Limited | AC Sales, Installation & Repair</title>
    <meta
      name="description"
      content="THURSTECH Nigeria Limited supplies, installs, services and repairs air conditioners for homes, offices and businesses. Request AC sales, installation, repair or maintenance support."
    />
  </head>
  <body class="bg-white text-navy-900 font-body antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## `src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
```

## `src/App.jsx`

```jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home.jsx";

const About = lazy(() => import("./pages/About.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const RequestQuote = lazy(() => import("./pages/RequestQuote.jsx"));
const RequestRepair = lazy(() => import("./pages/RequestRepair.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const AdminLogin = lazy(() => import("./admin/AdminLogin.jsx"));
const AdminLayout = lazy(() => import("./admin/AdminLayout.jsx"));
const ProtectedRoute = lazy(() => import("./admin/ProtectedRoute"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard.jsx"));
const QuoteRequests = lazy(() => import("./admin/QuoteRequests.jsx"));
const RepairRequests = lazy(() => import("./admin/RepairRequests.jsx"));
const ServiceRequests = lazy(() => import("./admin/ServiceRequests.jsx"));
const Customers = lazy(() => import("./admin/Customers.jsx"));
const Products = lazy(() => import("./admin/Products.jsx"));
const ProjectsAdmin = lazy(() => import("./admin/ProjectsAdmin.jsx"));
const Testimonials = lazy(() => import("./admin/Testimonials.jsx"));
const FAQsAdmin = lazy(() => import("./admin/FAQs.jsx"));
const Settings = lazy(() => import("./admin/Settings.jsx"));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
      <Routes>
        {/* Public site */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-a-quote" element={<RequestQuote />} />
          <Route path="/quote" element={<RequestQuote />} />
          <Route path="/request-repair" element={<RequestRepair />} />
          <Route path="/repair-request" element={<RequestRepair />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="quote-requests" element={<QuoteRequests />} />
          <Route path="repair-requests" element={<RepairRequests />} />
          <Route path="service-requests" element={<ServiceRequests />} />
          <Route path="customers" element={<Customers />} />
          <Route path="products" element={<Products />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="faqs" element={<FAQsAdmin />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
```

## `src/pages/Home.jsx`

```jsx
import SEO, { localBusinessJsonLd } from "../components/SEO";
import Hero from "../components/home/Hero";
import TrustBar from "../components/home/TrustBar";
import NeedSection from "../components/home/NeedSection";
import ServicesOverview from "../components/home/ServicesOverview";
import FeaturedProducts from "../components/home/FeaturedProducts";
import FinalCta from "../components/home/FinalCta";

export default function Home() {
  return (
    <>
      <SEO
        title="THURSTECH Nigeria Limited | AC Sales, Installation &amp; Repair"
        description="THURSTECH Nigeria Limited supplies, installs, services and repairs air conditioners for homes, offices and businesses. Request AC sales, installation, repair or maintenance support."
        canonical="/"
        jsonLd={localBusinessJsonLd}
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
```

## `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes fade-spin {
  0% { opacity: 1; }
  100% { opacity: 0.15; }
}

.animate-fade-spin {
  animation: fade-spin 1.2s linear infinite;
}

@layer base {
  h1, h2, h3, h4 {
    @apply font-display text-navy-900;
  }
  html {
    scroll-behavior: smooth;
  }
  :focus-visible {
    outline: 2px solid theme(colors.ice.500);
    outline-offset: 2px;
  }
}

@layer components {
  /* Blueprint-style corner brackets, framing hero/feature imagery - ties the
     visual language back to a technical/engineering drawing. */
  .blueprint-frame {
    position: relative;
  }
  .blueprint-frame::before,
  .blueprint-frame::after {
    content: "";
    position: absolute;
    width: 22px;
    height: 22px;
    border: 2px solid theme(colors.ice.400);
    pointer-events: none;
  }
  .blueprint-frame::before {
    top: -8px;
    left: -8px;
    border-right: none;
    border-bottom: none;
  }
  .blueprint-frame::after {
    bottom: -8px;
    right: -8px;
    border-left: none;
    border-top: none;
  }

  .container-page {
    @apply mx-auto max-w-content px-5 sm:px-8;
  }

  .input {
    @apply w-full border border-silver-300 px-3.5 py-2.5 text-sm bg-white focus:border-blue-600 focus:outline-none transition-colors placeholder:text-slate-600;
  }
}
```

## `src/components/SEO.jsx`

```jsx
import { Helmet } from "react-helmet-async";
import { business } from "../data/business";

const SITE_URL = "https://www.thurstech.com.ng";
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.svg`;
const DEFAULT_TITLE = "THURSTECH Nigeria Limited";

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.legalName,
  url: SITE_URL,
  telephone: business.phonesIntl,
  email: business.email,
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
};

function resolveCanonical(canonical) {
  if (!canonical) return undefined;
  return new URL(canonical, SITE_URL).toString();
}

export default function SEO({
  title = DEFAULT_TITLE,
  description,
  canonical,
  type = "website",
  jsonLd,
  image = DEFAULT_OG_IMAGE,
}) {
  const pageTitle = title.includes(business.legalName) ? title : `${title} | ${business.legalName}`;
  const canonicalUrl = resolveCanonical(canonical);
  const structuredData = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={image.startsWith("http") ? image : new URL(image, SITE_URL).toString()} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={business.legalName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image.startsWith("http") ? image : new URL(image, SITE_URL).toString()} />
      {structuredData.map((schema, index) => (
        <script key={`${schema["@type"] || "schema"}-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
```

## `src/components/ui/Seo.jsx`

```jsx
import { Helmet } from "react-helmet-async";

const SITE_NAME = "THURSTECH Nigeria Limited";
const DEFAULT_OG_IMAGE = "/og-image.jpg"; // replace with the real 1200x630 branded image

/**
 * Per-page SEO tags: unique title/description, canonical URL, Open Graph and
 * Twitter card. Pass `path` (e.g. "/services/ac-repair") so canonical and
 * og:url are correct for that page, never the homepage.
 */
export default function Seo({ title, description, path = "/", image, type = "website", schema }) {
  const url = `https://www.thurstech.com.ng${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const schemaJson = schema ? JSON.stringify(schema).replace(/</g, "\\u003c") : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image || DEFAULT_OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || DEFAULT_OG_IMAGE} />
      {schemaJson && <script type="application/ld+json">{schemaJson}</script>}
    </Helmet>
  );
}
```

## `src/components/home/Hero.jsx`

```jsx
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
```

## `src/components/home/TrustBar.jsx`

```jsx
const items = ["Quality Equipment", "Professional Installation", "After-Sales Support", "Repair & Maintenance"];

export default function TrustBar() {
  return (
    <div className="bg-silver-100 border-y border-silver-200">
      <div className="container-page py-4 flex flex-wrap gap-x-8 gap-y-2 justify-center text-sm font-semibold text-navy-800">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
```

## `src/components/home/NeedSection.jsx`

```jsx
import { ShoppingCart, Wrench, Settings2, Hammer } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";

const cards = [
  {
    icon: ShoppingCart,
    title: "Buy an AC",
    body: "Find an air conditioner for your home, office or business.",
    to: "/shop",
    cta: "Shop AC",
  },
  {
    icon: Hammer,
    title: "Install an AC",
    body: "Professional AC installation for your space.",
    to: "/services/ac-installation",
    cta: "Request Installation",
  },
  {
    icon: Wrench,
    title: "Repair My AC",
    body: "Having cooling problems? Tell us what is wrong.",
    to: "/services/ac-repair",
    cta: "Book Repair",
  },
  {
    icon: Settings2,
    title: "Service My AC",
    body: "Keep your AC clean and properly maintained.",
    to: "/services/ac-servicing",
    cta: "Book Servicing",
  },
];

export default function NeedSection() {
  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeading title="How Can We Help You Today?" align="center" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(({ icon: Icon, title, body, to, cta }) => (
          <Link
            key={title}
            to={to}
            className="group border border-silver-200 p-6 hover:border-blue-600 transition-colors"
          >
            <Icon size={28} className="text-blue-600 mb-4" strokeWidth={1.75} />
            <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-navy-700/80 mb-4 leading-relaxed">{body}</p>
            <span className="text-sm font-semibold text-blue-600 group-hover:underline">{cta}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

## `src/components/home/ServicesOverview.jsx`

```jsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "../../data/services";
import SectionHeading from "../ui/SectionHeading";

export default function ServicesOverview() {
  return (
    <section className="bg-silver-100 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Services"
          description="From first installation to ongoing care, THURSTECH covers the full lifecycle of your air conditioning."
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group bg-white p-6 border border-silver-200 hover:border-blue-600 transition-colors flex flex-col"
            >
              <h3 className="font-display font-bold text-lg mb-2">{service.navLabel}</h3>
              <p className="text-sm text-navy-700/80 mb-4 leading-relaxed flex-1">{service.intro}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## `src/components/home/FeaturedProducts.jsx`

```jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import SectionHeading from "../ui/SectionHeading";
import EmptyState from "../ui/EmptyState";
import Button from "../ui/Button";
import OptimizedImage from "../ui/OptimizedImage";

/**
 * Pulls real featured products from Supabase. Shows an honest empty state
 * instead of fake placeholder products until real inventory is added
 * through the admin dashboard.
 */
export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .eq("featured", true)
        .limit(4);
      if (active) {
        if (!error && data) setProducts(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <SectionHeading eyebrow="Shop AC" title="Featured Air Conditioners" />
        <Button to="/shop" variant="outline">
          View All AC Units
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-navy-700/80">Loading products...</p>
      ) : products.length === 0 ? (
        <EmptyState
          title="Products coming soon"
          description="The AC catalogue will appear here as soon as inventory is added through the admin dashboard."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <Link key={p.id} to={`/shop/${p.id}`} className="border border-silver-200 hover:border-blue-600 transition-colors">
              <div className="aspect-square bg-silver-100 flex items-center justify-center overflow-hidden">
                {p.image_url ? (
                  <OptimizedImage src={p.image_url} alt={p.name} width={800} height={800} className="w-full h-full object-cover" frameClassName="w-full h-full" />
                ) : (
                  <span className="text-xs text-navy-700/80">No image</span>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm">{p.brand} {p.name}</p>
                <p className="text-xs text-navy-700/80 mt-1">{p.capacity} &bull; {p.category}</p>
                <p className="text-sm font-bold text-blue-600 mt-2">
                  {p.price ? `\u20a6${Number(p.price).toLocaleString()}` : "Request Current Price"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
```

## `src/components/home/FinalCta.jsx`

```jsx
import { Phone } from "lucide-react";
import Button from "../ui/Button";
import WhatsAppLink from "../ui/WhatsAppLink";
import { business } from "../../data/business";
import { whatsappTemplates } from "../../lib/whatsapp";

export default function FinalCta() {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container-page py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Ready to get started?</h2>
          <p className="text-silver-300">Call, message us on WhatsApp, or request a quote.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={`tel:${business.phonesIntl[0]}`} variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-navy-900">
            <Phone size={16} /> {business.phones[0]}
          </Button>
          <WhatsAppLink message={whatsappTemplates.general()} className="!bg-[#15803d] !text-white px-5 py-3 hover:!no-underline hover:opacity-90" />
          <Button to="/request-a-quote" variant="primary">
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
```

## `src/components/layout/Layout.jsx`

```jsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileActionBar from "./MobileActionBar";
import { ToastViewport } from "../ui/Toast";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastViewport />
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
```

## `src/components/layout/Header.jsx`

```jsx
import { useState } from "react";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { primaryNav, quoteNav } from "../../data/navigation";
import { business } from "../../data/business";
import PrefetchLink from "../ui/PrefetchLink";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-navy-900 text-white">
      <div className="container-page flex items-center justify-between h-16">
        <PrefetchLink to="/" className="font-display font-extrabold text-xl tracking-tight">
          THURSTECH
        </PrefetchLink>

        <nav className="hidden lg:flex items-center gap-7">
          {primaryNav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium hover:text-ice-300 transition-colors">
                  {item.label}
                  <ChevronDown size={14} />
                </button>
                {servicesOpen && (
                  <div className="absolute left-0 top-full pt-3 w-56">
                    <div className="bg-white text-navy-900 shadow-lg border border-silver-200 rounded-sm py-2">
                      {item.children.map((child) => (
                        <PrefetchLink
                          key={child.to}
                          to={child.to}
                          navLink
                          className="block px-4 py-2.5 text-sm hover:bg-silver-100"
                        >
                          {child.label}
                        </PrefetchLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <PrefetchLink
                key={item.to}
                to={item.to}
                navLink
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-ice-300 ${
                    isActive ? "text-ice-300" : ""
                  }`
                }
              >
                {item.label}
              </PrefetchLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${business.phonesIntl[0]}`}
            className="flex items-center gap-2 text-sm font-medium hover:text-ice-300"
          >
            <Phone size={16} />
            {business.phones[0]}
          </a>
          <PrefetchLink to={quoteNav.to} className="inline-flex items-center justify-center gap-2 bg-blue-600 px-5 py-3 text-sm font-semibold tracking-wide transition-colors hover:bg-blue-700">
            {quoteNav.label}
          </PrefetchLink>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-navy-900 border-t border-navy-700 pb-4">
          <nav className="container-page flex flex-col gap-1 pt-2">
            {primaryNav.map((item) =>
              item.children ? (
                <details key={item.label} className="group">
                  <summary className="flex items-center justify-between py-2.5 text-sm font-medium cursor-pointer list-none">
                    {item.label}
                    <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pl-3 flex flex-col">
                    {item.children.map((child) => (
                      <PrefetchLink
                        key={child.to}
                        to={child.to}
                        className="py-2 text-sm text-silver-300"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </PrefetchLink>
                    ))}
                  </div>
                </details>
              ) : (
                <PrefetchLink
                  key={item.to}
                  to={item.to}
                  className="py-2.5 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </PrefetchLink>
              )
            )}
            <PrefetchLink
              to={quoteNav.to}
              className="mt-2 bg-blue-600 text-white text-center py-3 text-sm font-semibold hover:bg-blue-700"
              onClick={() => setMobileOpen(false)}
            >
              {quoteNav.label}
            </PrefetchLink>
          </nav>
        </div>
      )}
    </header>
  );
}
```

## `src/components/layout/Footer.jsx`

```jsx
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { primaryNav } from "../../data/navigation";
import { business } from "../../data/business";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-silver-200">
      <div className="container-page py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <p className="font-display font-extrabold text-xl text-white mb-3">THURSTECH</p>
          <p className="text-sm text-silver-300 leading-relaxed">
            Buy it. Install it. Maintain it. Repair it. THURSTECH Nigeria Limited supplies,
            installs, services and repairs air-conditioning systems for homes, offices and
            businesses.
          </p>
          <p className="text-xs text-silver-300 mt-4">RC: {business.rcNumber}</p>
        </div>

        <div>
          <p className="text-white font-semibold text-sm mb-3">Navigate</p>
          <ul className="space-y-2 text-sm">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="hover:text-ice-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold text-sm mb-3">Contact</p>
          <ul className="space-y-3 text-sm">
            {business.phones.map((phone, i) => (
              <li key={phone} className="flex items-center gap-2">
                <Phone size={15} className="text-ice-300 shrink-0" />
                <a href={`tel:${business.phonesIntl[i]}`} className="hover:text-ice-300">
                  {phone}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-ice-300 shrink-0" />
              <a href={`mailto:${business.email}`} className="hover:text-ice-300 break-all">
                {business.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container-page py-5 text-xs text-silver-300 flex flex-col sm:flex-row justify-between gap-2">
          <p>&copy; {year} THURSTECH Nigeria Limited. All rights reserved.</p>
          <Link to="/admin/login" className="hover:text-ice-300">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

## `src/components/layout/MobileActionBar.jsx`

```jsx
import { Phone, MessageCircle, FileText } from "lucide-react";
import { business } from "../../data/business";
import { buildWhatsAppLink, whatsappTemplates } from "../../lib/whatsapp";
import { Link } from "react-router-dom";

/**
 * Mobile-only sticky action bar so Call / WhatsApp / Request Quote are
 * always one tap away for Nigerian mobile visitors, per the blueprint.
 */
export default function MobileActionBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-900 border-t border-navy-700 grid grid-cols-3 text-white text-xs font-semibold">
      <a
        href={`tel:${business.phonesIntl[0]}`}
        className="flex flex-col items-center justify-center gap-1 py-2.5 border-r border-navy-700"
      >
        <Phone size={18} />
        Call
      </a>
      <a
        href={buildWhatsAppLink(whatsappTemplates.general())}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 py-2.5 border-r border-navy-700 text-[#4FE38A]"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
      <Link to="/request-a-quote" className="flex flex-col items-center justify-center gap-1 py-2.5 text-ice-300">
        <FileText size={18} />
        Quote
      </Link>
    </div>
  );
}
```

## `src/components/ui/Button.jsx`

```jsx
import { Link } from "react-router-dom";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
  ghost: "text-navy-900 hover:bg-silver-100",
  whatsapp: "bg-[#15803d] text-white hover:bg-[#166534]",
};

export default function Button({ as, to, href, variant = "primary", className = "", children, ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold tracking-wide transition-colors ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
```

## `src/components/ui/EmptyState.jsx`

```jsx
export default function EmptyState({ title, description }) {
  return (
    <div className="border border-dashed border-silver-300 rounded-sm py-16 px-6 text-center">
      <p className="font-display font-semibold text-navy-900 mb-1">{title}</p>
      {description && <p className="text-sm text-navy-700/80 max-w-md mx-auto">{description}</p>}
    </div>
  );
}
```

## `src/components/ui/OptimizedImage.jsx`

```jsx
import { useState } from "react";

function getOptimizedSource(src, width, quality, format) {
  if (!src) return src;

  try {
    const url = new URL(src);
    if (!url.pathname.includes("/storage/v1/object/public/")) return src;

    url.pathname = url.pathname.replace(
      "/storage/v1/object/public/",
      "/storage/v1/render/image/public/"
    );
    url.searchParams.set("width", String(width));
    url.searchParams.set("format", format);
    url.searchParams.set("quality", String(quality));
    return url.toString();
  } catch {
    return src;
  }
}

export default function OptimizedImage({
  src,
  alt = "",
  width = 800,
  height = 600,
  loading = "lazy",
  fetchPriority,
  decoding = "async",
  quality = 80,
  format = "webp",
  className = "",
  frameClassName = "w-full",
  onLoad,
  onError,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const imageSrc = getOptimizedSource(src, width, quality, format);

  function handleLoad(event) {
    setLoaded(true);
    onLoad?.(event);
  }

  function handleError(event) {
    setLoaded(true);
    onError?.(event);
  }

  return (
    <span
      className={`relative isolate block overflow-hidden bg-silver-100 ${frameClassName}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 bg-silver-200 transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}
      />
      <img
        {...props}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority || (loading === "eager" ? "high" : "auto")}
        onLoad={handleLoad}
        onError={handleError}
        className={`relative block h-full w-full object-cover transition-[filter,opacity] duration-500 ${loaded ? "blur-0 opacity-100" : "blur-md opacity-70"} ${className}`}
      />
    </span>
  );
}
```

## `src/components/ui/PrefetchLink.jsx`

```jsx
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
```

## `src/components/ui/SectionHeading.jsx`

```jsx
export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="text-blue-600 font-semibold text-sm mb-2">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h2>
      {description && <p className="text-navy-700/80 text-base leading-relaxed">{description}</p>}
    </div>
  );
}
```

## `src/components/ui/Toast.jsx`

```jsx
import { useEffect, useState } from "react";
import { CheckCircle2, CircleAlert, X } from "lucide-react";

let nextToastId = 0;

function notify(type, message) {
  window.dispatchEvent(new CustomEvent("app-toast", {
    detail: { id: ++nextToastId, type, message },
  }));
}

export const toast = {
  success: (message) => notify("success", message),
  error: (message) => notify("error", message),
};

export function ToastViewport() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    function addToast(event) {
      const item = event.detail;
      setItems((current) => [...current, item]);
      window.setTimeout(() => {
        setItems((current) => current.filter(({ id }) => id !== item.id));
      }, 5000);
    }

    window.addEventListener("app-toast", addToast);
    return () => window.removeEventListener("app-toast", addToast);
  }, []);

  return (
    <div className="fixed right-4 top-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2" aria-live="polite">
      {items.map(({ id, type, message }) => {
        const Icon = type === "success" ? CheckCircle2 : CircleAlert;
        return (
          <div
            key={id}
            role={type === "error" ? "alert" : "status"}
            className={`flex items-start gap-3 border bg-white p-3 text-sm shadow-lg ${type === "success" ? "border-green-300 text-green-800" : "border-red-300 text-red-800"}`}
          >
            <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p className="min-w-0 flex-1 break-words">{message}</p>
            <button
              type="button"
              className="shrink-0 opacity-70 hover:opacity-100"
              onClick={() => setItems((current) => current.filter((item) => item.id !== id))}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
```

## `src/components/ui/WhatsAppLink.jsx`

```jsx
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../../lib/whatsapp";

export default function WhatsAppLink({ message, children, className = "" }) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-semibold text-green-700 hover:underline ${className}`}
    >
      <MessageCircle size={18} />
      {children || "Chat on WhatsApp"}
    </a>
  );
}
```

## `src/components/ui/HoldActionButton.jsx`

```jsx
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
      className={`relative isolate inline-flex touch-none select-none items-center justify-center gap-1.5 overflow-hidden border border-red-300 bg-red-50 px-2 py-1 text-xs font-semibold text-red-800 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
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
```

## `src/components/ui/hold-action-button-utils/ease.js`

```js
export const EASE_OUT = [0.16, 1, 0.3, 1];
export const SPRING_PRESS = { type: "spring", stiffness: 400, damping: 25 };
```

## `src/data/business.js`

```js
// Confirmed business facts only - taken directly from the THURSTECH
// blueprint. Do not add an address, hours or socials until THURSTECH
// supplies them; the site works fine with these left blank/empty.
export const business = {
  legalName: "THURSTECH Nigeria Limited",
  rcNumber: "1577031",
  phones: ["08034060091", "08175578322"],
  phonesIntl: ["+2348034060091", "+2348175578322"],
  email: "thurstechnigltd@gmail.com",
  // Not yet confirmed - leave blank until supplied.
  address: "",
  openingHours: "",
  socials: { facebook: "", instagram: "", linkedin: "" },
};
```

## `src/data/navigation.js`

```js
export const primaryNav = [
  { label: "Home", to: "/" },
  { label: "Shop AC", to: "/shop" },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "AC Installation", to: "/services/ac-installation" },
      { label: "AC Repair", to: "/services/ac-repair" },
      { label: "AC Servicing", to: "/services/ac-servicing" },
      { label: "AC Maintenance", to: "/services/ac-maintenance" },
      { label: "AC Relocation", to: "/services/ac-relocation" },
      { label: "Commercial HVAC", to: "/services/commercial-hvac" },
    ],
  },
  { label: "Projects", to: "/projects" },
  { label: "About Us", to: "/about" },
  { label: "FAQs", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const quoteNav = { label: "Request a Quote", to: "/request-a-quote" };
```

## `src/data/services.js`

```js
// Service page content, built directly from the THURSTECH blueprint. Only
// services the blueprint confirms THURSTECH offers get a page + nav entry
// (Installation, Repair, Servicing, Maintenance, Relocation, Commercial
// HVAC). Additional services flagged "only if confirmed" in the blueprint
// (VRF/VRV, Chillers, Ducting, Ventilation, standalone Emergency Repairs)
// are intentionally left out until THURSTECH confirms them.

export const services = [
  {
    slug: "ac-installation",
    navLabel: "AC Installation",
    requestPath: "/request-a-quote",
    heroHeadline: "Professional Air Conditioner Installation",
    intro:
      "From assessment to commissioning, THURSTECH installs your air conditioner correctly the first time, for homes, offices and businesses.",
    seo: {
      title: "AC Installation Services in Nigeria | THURSTECH",
      description:
        "Professional air conditioner installation for homes, offices and businesses. Contact THURSTECH for AC installation and cooling solutions.",
    },
    whatsIncluded: [
      "Site assessment", "Unit positioning", "Copper piping", "Drainage",
      "Electrical requirements", "Outdoor condenser installation",
      "Installation", "Testing", "Commissioning",
    ],
    problemHeading: "Getting installation wrong is expensive to fix later",
    problemBody:
      "Poor positioning, bad piping or rushed electrical work can mean a unit that never cools properly, or one that fails early. Our installation process is built to avoid those problems from day one.",
    ctaLabel: "Request an Installation Quote",
    whatsappMessage: (details) =>
      `Hello THURSTECH, I need professional AC installation. I have a ${details || "[AC TYPE]"} at [LOCATION].`,
    faqs: [
      { q: "How long does a typical installation take?", a: "This depends on the unit type, site conditions and any electrical work required. We confirm timing after a site assessment." },
      { q: "Do you install both split and floor-standing units?", a: "Yes - installation covers split, floor-standing and cassette units. Tell us what you have when you request a quote." },
    ],
  },
  {
    slug: "ac-repair",
    navLabel: "AC Repair",
    requestPath: "/request-repair",
    heroHeadline: "AC Not Cooling? Let Us Take a Look.",
    intro:
      "Cooling problems, leaks, strange noises or an AC that will not power on - THURSTECH diagnoses and repairs air conditioning faults for homes and businesses.",
    seo: {
      title: "AC Repair Services in Nigeria | THURSTECH",
      description:
        "Need AC repair? THURSTECH provides air conditioner troubleshooting, repair and maintenance services for residential and commercial customers.",
    },
    whatsIncluded: [
      "AC not cooling", "Water leakage", "Strange sounds", "Poor airflow",
      "Power problems", "Refrigerant issues", "Electrical faults",
      "Compressor problems", "Fan problems", "Drainage problems",
    ],
    problemHeading: "Common AC problems we are asked to fix",
    problemBody:
      "Tell us what is happening with your unit, from a full breakdown to a smaller performance issue, and we will assess and repair it.",
    ctaLabel: "Book AC Repair",
    whatsappMessage: (details) =>
      `Hello THURSTECH, I need AC repair. My AC is ${details || "[PROBLEM]"}. My location is [LOCATION].`,
    faqs: [
      { q: "Can I send a photo or video of the problem?", a: "Yes - the repair request form supports a photo/video upload, which helps us understand the issue before we arrive." },
      { q: "Do you repair all AC brands?", a: "Tell us your AC brand and model when you book, and we will confirm whether we can service it." },
    ],
  },
  {
    slug: "ac-servicing",
    navLabel: "AC Servicing",
    requestPath: "/request-a-quote",
    heroHeadline: "Air Conditioner Servicing & Maintenance",
    intro:
      "Regular servicing keeps your AC clean, efficient and reliable. THURSTECH offers filter, coil, condenser and drain cleaning plus full performance checks.",
    seo: {
      title: "AC Servicing & Maintenance in Nigeria | THURSTECH",
      description:
        "Professional air conditioner servicing and maintenance for homes, offices and businesses. Contact THURSTECH for AC service support.",
    },
    whatsIncluded: [
      "Filter cleaning", "Coil cleaning", "Condenser cleaning", "Drain cleaning",
      "Visual inspection", "Performance testing", "Electrical checks",
      "Refrigerant pressure checks where appropriate",
    ],
    problemHeading: "Why regular servicing matters",
    problemBody:
      "A dirty or neglected AC has to work harder. Routine servicing is the simplest way to keep a unit running the way it was designed to.",
    ctaLabel: "Book a Service",
    whatsappMessage: () => `Hello THURSTECH, I would like to request a quote for AC Servicing.`,
    faqs: [
      { q: "How often should an AC be serviced?", a: "This depends on usage and environment. Get in touch and we will recommend a schedule for your setup." },
    ],
  },
  {
    slug: "ac-maintenance",
    navLabel: "AC Maintenance",
    requestPath: "/request-a-quote",
    heroHeadline: "Preventive AC Maintenance",
    intro:
      "Scheduled maintenance helps catch small issues before they become expensive repairs, for single units or multi-unit commercial sites.",
    seo: {
      title: "AC Maintenance Services in Nigeria | THURSTECH",
      description: "Preventive air conditioner maintenance from THURSTECH Nigeria Limited, for homes, offices and commercial sites.",
    },
    whatsIncluded: ["Scheduled inspections", "Preventive maintenance", "Performance testing", "Electrical checks"],
    problemHeading: "Stay ahead of breakdowns",
    problemBody: "Maintenance is about catching problems early rather than waiting for a full breakdown.",
    ctaLabel: "Request a Quote",
    whatsappMessage: () => `Hello THURSTECH, I would like to request a quote for AC Maintenance.`,
    faqs: [],
  },
  {
    slug: "ac-relocation",
    navLabel: "AC Relocation",
    requestPath: "/request-a-quote",
    heroHeadline: "AC Relocation & Dismantling",
    intro: "Moving house or reorganising your space? THURSTECH safely dismantles, relocates and reinstalls air conditioning units.",
    seo: {
      title: "AC Relocation Services in Nigeria | THURSTECH",
      description: "Air conditioner relocation and dismantling services from THURSTECH Nigeria Limited.",
    },
    whatsIncluded: ["Dismantling", "Safe transport handling", "Reinstallation", "Testing"],
    problemHeading: "Moving an AC unit safely",
    problemBody: "Relocating a unit incorrectly can damage it or void a warranty. Our team handles dismantling and reinstallation properly.",
    ctaLabel: "Request a Quote",
    whatsappMessage: () => `Hello THURSTECH, I would like to request a quote for AC Relocation.`,
    faqs: [],
  },
  {
    slug: "commercial-hvac",
    navLabel: "Commercial HVAC",
    requestPath: "/request-a-quote",
    heroHeadline: "Commercial HVAC Solutions",
    intro: "THURSTECH supports offices, shops and other commercial sites with cooling solutions sized for the space and how it is used.",
    seo: {
      title: "Commercial HVAC Services in Nigeria | THURSTECH",
      description: "Commercial air conditioning and HVAC solutions from THURSTECH Nigeria Limited for offices and business premises.",
    },
    whatsIncluded: ["Site assessment", "Equipment recommendation", "Installation", "Servicing and maintenance"],
    problemHeading: "Cooling for business environments",
    problemBody: "Commercial spaces have different cooling demands from a single room at home. Tell us about your site and we will advise on the right approach.",
    ctaLabel: "Request a Commercial Quote",
    whatsappMessage: () => `Hello THURSTECH, I would like to request a quote for a Commercial HVAC project.`,
    faqs: [],
    // Potential sectors (offices, shops, restaurants, hotels, schools,
    // churches, hospitals, estates, warehouses, event centres) are listed in
    // the blueprint as sectors to evaluate. Only publish sectors THURSTECH
    // actually serves - none are hard-coded yet.
    sectors: [],
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
```

## `src/lib/whatsapp.js`

```js
// Contextual WhatsApp link helper. Never falls back to a generic "Hi" message.
const PRIMARY_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER_1 || "2348034060091";

export function buildWhatsAppLink(message, number = PRIMARY_WHATSAPP) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export const whatsappTemplates = {
  product: (productName) =>
    `Hello THURSTECH, I am interested in the ${productName}. Please send me the current price and availability.`,
  repair: (problem, location) =>
    `Hello THURSTECH, I need AC repair. My AC is ${problem || "[PROBLEM]"}. My location is ${location || "[LOCATION]"}.`,
  installation: (acType, location) =>
    `Hello THURSTECH, I need professional AC installation. I have a ${acType || "[AC TYPE]"} at ${location || "[LOCATION]"}.`,
  quote: (service) => `Hello THURSTECH, I would like to request a quote for ${service || "[SERVICE]"}.`,
  general: () => `Hello THURSTECH, I would like to find out more about your AC services.`,
};
```

## `src/lib/supabaseClient.js`

```js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase env vars are missing. Copy .env.example to .env and fill in " +
      "VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. See docs/SETUP_SUPABASE.md."
  );
}

// Only the public anon key belongs here. It is safe to expose in the
// frontend because every table it can touch is protected by Row Level
// Security policies (see supabase/rls_policies.sql). The service-role/secret
// key must never be used in frontend code.
const fallbackFetch = async () =>
  new Response(
    JSON.stringify({
      code: "SUPABASE_NOT_CONFIGURED",
      message: "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.",
    }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );

export const supabase = createClient(
  supabaseUrl || "https://supabase-not-configured.invalid",
  supabaseAnonKey || "supabase-not-configured",
  isSupabaseConfigured ? undefined : { global: { fetch: fallbackFetch } }
);
```

## `src/lib/emailjs.js`

```js
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends one form submission through the universal EmailJS template.
 * Email delivery is best-effort; Supabase remains the source of truth.
 */
export async function sendFormEmail(form_type, formData = {}) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS env vars missing - skipping email notification.");
    return { skipped: true };
  }

  const templateParams = {
    form_type,
    customer_name: formData.customer_name ?? "",
    email: formData.email ?? "",
    phone: formData.phone ?? "",
    whatsapp: formData.whatsapp ?? "",
    service_type: formData.service_type ?? "",
    brand: formData.brand ?? "",
    model: formData.model ?? "",
    location: formData.location ?? "",
    preferred_contact: formData.preferred_contact ?? "",
    preferred_date: formData.preferred_date ?? "",
    description: formData.description ?? "",
    photo_url: formData.photo_url ?? "",
  };

  return emailjs
    .send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    })
    .then((result) => ({ success: true, result }))
    .catch((error) => {
      console.error("EmailJS notification failed:", error);
      return { success: false, error };
    });
}
```

## `src/hooks/useAuth.js`

```js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * Tracks the current Supabase auth session and whether that user is an
 * authorized admin (present in the admin_users table). The database RLS
 * policies are the real enforcement - this hook only drives the UI (e.g.
 * redirecting away from /admin), so never rely on it alone for security.
 */
export function useAuth() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAdmin(currentSession) {
      if (!currentSession) {
        setIsAdmin(false);
        return;
      }
      const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("user_id", currentSession.user.id)
        .maybeSingle();
      if (!isMounted) return;
      setIsAdmin(Boolean(data) && !error);
    }

    async function init() {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      setSession(data.session ?? null);
      await checkAdmin(data.session);
      setLoading(false);
    }

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      await checkAdmin(newSession);
    });

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return { session, isAdmin, loading, user: session?.user ?? null };
}
```

## `src/admin/ProtectedRoute.jsx`

```jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Gates the /admin routes in the UI. This is a UX convenience only — the
 * real security boundary is Supabase Row Level Security on every table, so
 * the database stays protected even if this check is somehow bypassed.
 */
export default function ProtectedRoute({ children }) {
  const { session, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-navy-700/80">Checking access...</div>;
  }
  if (!session) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <p className="font-display font-bold text-xl mb-2">Not authorized</p>
          <p className="text-sm text-navy-700/80">This account does not have admin access to THURSTECH's dashboard.</p>
        </div>
      </div>
    );
  }
  return children;
}
```

## `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#0A1F33"/>
  <path d="M8 20c0-4.5 3.5-9 8-9s8 4.5 8 9" stroke="#4FC3D9" stroke-width="2" fill="none" stroke-linecap="round"/>
  <line x1="6" y1="24" x2="26" y2="24" stroke="#C7CFD6" stroke-width="2" stroke-linecap="round"/>
</svg>
```

## `public/robots.txt`

```text
User-agent: *
Allow: /
Disallow: /admin/

User-agent: Googlebot
Allow: /

Sitemap: https://thurstech.vercel.app/sitemap.xml
```

## `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.thurstech.com.ng/</loc><priority>1.0</priority></url>
  <url><loc>https://www.thurstech.com.ng/about/</loc><priority>0.7</priority></url>
  <url><loc>https://www.thurstech.com.ng/shop/</loc><priority>0.9</priority></url>
  <url><loc>https://www.thurstech.com.ng/services/</loc><priority>0.9</priority></url>
  <url><loc>https://www.thurstech.com.ng/services/ac-installation/</loc><priority>0.8</priority></url>
  <url><loc>https://www.thurstech.com.ng/services/ac-repair/</loc><priority>0.8</priority></url>
  <url><loc>https://www.thurstech.com.ng/services/ac-servicing/</loc><priority>0.8</priority></url>
  <url><loc>https://www.thurstech.com.ng/services/ac-maintenance/</loc><priority>0.8</priority></url>
  <url><loc>https://www.thurstech.com.ng/services/ac-relocation/</loc><priority>0.6</priority></url>
  <url><loc>https://www.thurstech.com.ng/services/commercial-hvac/</loc><priority>0.7</priority></url>
  <url><loc>https://www.thurstech.com.ng/projects/</loc><priority>0.6</priority></url>
  <url><loc>https://www.thurstech.com.ng/faq/</loc><priority>0.5</priority></url>
  <url><loc>https://www.thurstech.com.ng/contact/</loc><priority>0.7</priority></url>
  <url><loc>https://www.thurstech.com.ng/request-a-quote/</loc><priority>0.9</priority></url>
</urlset>
```

## `docs/DEPLOYMENT.md`

```markdown
# Deployment

This is a static Vite + React app — it builds to a folder of static files
that can be hosted anywhere (Vercel, Netlify, Cloudflare Pages, etc.).

## Build

```bash
npm install
npm run build
```

This produces a `dist/` folder ready to deploy.

## Environment variables

Whichever host you use, set the same variables from `.env` in its
dashboard/settings (Vercel: Project Settings → Environment Variables;
Netlify: Site Settings → Environment Variables):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_WHATSAPP_NUMBER_1`
- `VITE_WHATSAPP_NUMBER_2`

## Domain / SEO follow-up after deploying

- Update the hardcoded domain (`https://www.thurstech.com.ng`) in
  `src/components/ui/Seo.jsx`, `public/sitemap.xml` and `public/robots.txt`
  once the real production domain is confirmed.
- Replace `public/og-image.jpg` with a real 1200×630px branded social
  sharing image (referenced by `Seo.jsx`).
- Replace `public/favicon.svg` with the official THURSTECH logo mark once
  supplied, without redrawing or altering it.
- Set up Google Search Console and submit `sitemap.xml`.
```
