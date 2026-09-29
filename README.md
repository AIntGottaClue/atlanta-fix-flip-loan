# Atlanta Fix & Flip Loan

Astro SSR site deployed to Cloudflare Workers at https://atlanta.privatemoneyloans.click/ . The lender program descriptions for Georgia and Arizona are read at request time from [FNF Lender Terms - GA and AZ](https://docs.google.com/spreadsheets/d/1RJZWDxSq3ZSm_tffqtjYtSZNkWPJs5GtGcyoNRd4jXI/edit), tab `fees`. Column A is the key, B is the display value, and C is editorial guidance. Keep all keys, edit B as text, and allow roughly four minutes for cache expiry. If the sheet is unreachable, the site uses last-known terms or the baked-in initial values. Compare the site with the sheet after updates.

`npm ci && npm run build` builds the Cloudflare Worker. The GitHub Pages static preview is not compatible with SSR and has been removed. Cloudflare needs the `nodejs_compat` flag and Worker entrypoint in `wrangler.jsonc`. The sitemap is served at `/sitemap.xml`.

The site is a connector, not the lender. Program descriptions are lender-stated, not a guarantee or an offer. Actual terms and timing depend on the written loan documents. Test live form submissions and confirm receipt in the CRM before marking the form proven end to end. GA4 and Search Console should be connected only after the user's confirmation.
