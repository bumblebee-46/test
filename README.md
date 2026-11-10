# Fenronik Global website

Static website deployed to Cloudflare Workers with static assets. No build step is required. The website lives in `public/`.

## What changed in this revision

- Repositioned the main website around intelligent automation, custom software and system integration.
- Updated homepage title, search description and social metadata.
- Replaced the hero headline and copy with: **Automate the Work. Unlock the Possibilities.**
- Reordered services around workflow automation, AI-assisted solutions, custom software, integrations, digital platforms and infrastructure.
- Added a practical automation use-cases section.
- Updated the process, company-purpose messaging, FAQs and enquiry form to ask what the visitor wants to automate.
- Removed the Rune Hunt mini-game from the business homepage and navigation.
- Standardised motion: subtle section reveals, restrained emblem movement, short hover transitions and reduced-motion support.
- Unified the visual palette around dark navy, neutral text and one mint accent across the main site and Commerce Labs.
- Kept existing wolf logo assets and the existing Commerce Labs and MarginForge content.

## Files to edit

| Purpose | File |
|---|---|
| Main page text and metadata | `public/index.html` |
| Commerce Labs page | `public/commerce/index.html` |
| Shared colours, navigation, forms and motion | `public/css/base.css` |
| Main page layout and components | `public/css/home.css` |
| Commerce Labs styles | `public/css/commerce.css` |
| Main page solution tabs | `public/js/home.js` |
| Shared navigation and enquiry forms | `public/js/common.js` |
| Commerce tabs and calculator | `public/js/commerce.js` |
| Email, form service, analytics and WhatsApp | `public/js/config.js` |
| Logo and icons | `public/assets/` |

## Receiving enquiries

Until a form service is configured, the form opens the visitor's email app with the enquiry. To receive enquiries directly, create a Formspree form and paste its endpoint into `formEndpoint` in `public/js/config.js`.

## Deploy

1. Replace the repository files with the contents of this ZIP.
2. Commit and push to the GitHub repository connected to Cloudflare.
3. In Cloudflare, open Workers & Pages and deploy the updated project.
4. The project uses `public/` as its static assets directory and `npx wrangler deploy` as its deploy command (see `wrangler.jsonc`).
5. After deployment, hard-refresh the site with `Ctrl + Shift + R` and test the mobile menu, solution tabs, Commerce Labs link and enquiry form.

## Important before launch

- Configure `formEndpoint` if you want enquiries delivered directly to Formspree rather than relying on the visitor's email app.
- Confirm the public contact details and service scope.
- The use cases and solution previews are examples, not claims of completed client projects. Keep that distinction clear until you have published real case studies.
- No live deployment was performed as part of this source revision.
