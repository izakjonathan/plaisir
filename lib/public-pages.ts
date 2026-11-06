// Temporary public visibility switch. Keep forecasts and editor data intact.
export const FINANCIALS_VISIBLE = false;
export function isPublicLinkVisible(href: string): boolean {
  const path = href.split(/[?#]/)[0].replace(/\/$/, '');
  return FINANCIALS_VISIBLE || (path !== '/financials' && path !== '/financials-v2');
}
