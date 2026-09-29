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
- Verify `public/og-image.png` is the final branded social sharing image
  referenced by the Open Graph and Twitter metadata.
- The favicon package is installed. Add the official THURSTECH logo mark under
  `public/webmark/` once supplied, without redrawing or altering it.
- Set up Google Search Console and submit `sitemap.xml`.
