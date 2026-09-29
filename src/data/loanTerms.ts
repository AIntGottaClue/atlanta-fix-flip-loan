/** Lender-stated GA/AZ program terms. Server-side Google Sheet is the editable source. */
export interface LoanTerms {
  fundingMax: string; drawTiming: string; closingSpeed: string; feeDisclosure: string;
  structure1ClosingPoints: string; structure1MonthlyInterest: string; structure1BalloonMonths: string; structure1ExtensionPoints: string;
  structure2ClosingPoints: string; structure2MonthlyInterest: string; structure2BalloonMonths: string; structure2ExtensionPoints: string;
  extensionMonths: string;
}
// Last-known approved figures are baked in if Sheets is unavailable at cold start.
export const fallbackLoanTerms: LoanTerms = {
  fundingMax: '100%', drawTiming: 'same-day construction draws', closingSpeed: 'fast closings', feeDisclosure: 'straightforward terms with no hidden fees',
  structure1ClosingPoints: '0.5 point', structure1MonthlyInterest: '1.5% monthly interest-only', structure1BalloonMonths: '6-month balloon', structure1ExtensionPoints: '1 point',
  structure2ClosingPoints: '3 points', structure2MonthlyInterest: '1% monthly interest-only', structure2BalloonMonths: '6-month balloon', structure2ExtensionPoints: '3 points',
  extensionMonths: '6-month extension'
};
const GVIZ_URL = 'https://docs.google.com/spreadsheets/d/1RJZWDxSq3ZSm_tffqtjYtSZNkWPJs5GtGcyoNRd4jXI/gviz/tq?tqx=out:json&sheet=fees';
const TTL = 180_000;
const store = globalThis as { __fnfTerms?: { at: number; terms: LoanTerms } };
export async function getLoanTerms(): Promise<LoanTerms> {
  const now = Date.now();
  const cached = store.__fnfTerms;
  if (cached && now - cached.at < TTL) return cached.terms;
  try {
    const response = await fetch(GVIZ_URL, { cf: { cacheTtl: 180, cacheEverything: true } } as RequestInit);
    if (!response.ok) throw new Error(`Sheet status ${response.status}`);
    const text = await response.text();
    const json = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
    const entries: Record<string, string> = {};
    for (const row of json?.table?.rows ?? []) {
      const key = row?.c?.[0]?.v;
      const cell = row?.c?.[1];
      const value = cell?.f ?? cell?.v;
      if (typeof key === 'string' && value != null && String(value).trim()) entries[key.trim()] = String(value).trim();
    }
    // Avoid silently mixing terms from two versions of the sheet.
    const keys = Object.keys(fallbackLoanTerms) as (keyof LoanTerms)[];
    if (!keys.every(key => entries[key])) throw new Error('Incomplete sheet terms');
    const terms = Object.fromEntries(keys.map(key => [key, entries[key]])) as unknown as LoanTerms;
    store.__fnfTerms = { at: now, terms };
    return terms;
  } catch {
    return cached?.terms ?? fallbackLoanTerms;
  }
}
export const rateStructures = (t: LoanTerms) => [
  { name: 'Structure 1', closing: t.structure1ClosingPoints, monthly: t.structure1MonthlyInterest, balloon: t.structure1BalloonMonths, extension: t.structure1ExtensionPoints },
  { name: 'Structure 2', closing: t.structure2ClosingPoints, monthly: t.structure2MonthlyInterest, balloon: t.structure2BalloonMonths, extension: t.structure2ExtensionPoints }
];
