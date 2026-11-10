# Fenronik Global — Final Corporate Website Build

This is the production-ready source package for the Fenronik Global website.

## Brand implementation
- Uses the user's approved wolf and wordmark artwork extracted directly from `FENRONIK Global Wolf Brand Presentation.png`; no replacement logo artwork is used.
- The approved wolf eyes and original teal/bronze artwork are retained in `public/assets/fenronik-wolf.png` and `public/assets/fenronik-lockup.png`.
- Corporate website palette: Bronze `#7F6C53`, Rust `#62392E`, Teal `#325454`, Earth `#3C2F22`, Charcoal `#151412`.
- Flat, solid-colour corporate surfaces; no photographic, textile, landscape or decorative Viking backgrounds.
- Responsive home, About and Commerce Labs pages; subtle motion and reduced-motion accessibility support.

## Enquiry forms
The Formspree endpoint remains configured in `public/js/config.js` as `https://formspree.io/f/xljbreld`. Confirm the notification recipient and submit a live test enquiry after deployment.

## Deployment
The project is configured for Cloudflare Pages via `wrangler.jsonc`. Upload the contents of this ZIP to the connected GitHub repository or deploy the `public` directory as the Pages output directory, according to the existing Cloudflare Pages project settings.

## Pre-production checks still required
1. Confirm the deployed domain and HTTPS.
2. Submit test enquiries on the main site and Commerce Labs page and confirm email delivery.
3. Check desktop and mobile layouts in a real browser.
4. Confirm all navigation links, analytics configuration and any external integrations.

This package is not itself a live deployment; publishing requires access to the connected GitHub/Cloudflare account.
