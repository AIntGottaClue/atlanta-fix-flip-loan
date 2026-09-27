# Atlanta Fix & Flip Loan

Astro site with a metro home, 33 Georgia city pages, Privacy Policy, Terms of Service, and sitemap. Source and built `dist/` are included in the delivered archive.

## Before publishing

1. Replace `your-domain.com` in `astro.config.mjs`, `src/data/cities.ts`, and `public/robots.txt` with the final domain, then rebuild. The sitemap, canonical tags and JSON-LD use that domain.
2. Replace `G-XXXXXXXXXX` in `src/layouts/Base.astro` with the site's actual GA4 measurement ID.
3. Confirm `tk_61d238e145314251999b74fdd5c953cf` is the AirChatty tracking ID you want for this new funnel. Confirm its CRM mapping accepts `wdc_site=ATLFF`, `wdc_location`, and the intentionally spelled `wdc_detials`.
4. Review the connector wording and privacy/terms with counsel before publishing. Illustrative placeholder rates, leverage, ranges, terms and timing appear on every content page. They are NOT actual offers. Replace them with verified figures in `src/data/loanTerms.ts` or remove the section before launch. The current placeholders are 9% to 13% annual interest, up to 75% of after-repair value, $75,000 to $1,000,000, 6 to 18 months, and about 2 to 3 weeks after a complete file. A lender may still evaluate credit, experience or other borrower factors even though the positioning is asset-based.
5. Deploy and test a real submission on the live domain. The form follows the existing AirChatty tracking pattern and uses a local confirmation state; localhost cannot prove CRM delivery. Verify the lead arrives in the right pipeline before sending traffic.

`npm install && npm run build` builds the site. `npm run dev` previews locally. The generated sitemap is also copied to `/sitemap.xml` by the build script.
