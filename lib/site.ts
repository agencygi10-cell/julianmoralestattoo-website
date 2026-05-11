/**
 * Single source of truth for site constants.
 *
 * IMPORTANT: After the first Vercel deployment, update SITE_URL with the
 * actual production URL (e.g. https://julianmoralestattoo.com or the
 * assigned *.vercel.app domain). The Privacy Policy and Terms reference
 * this URL.
 */
export const SITE_URL = "https://julianmoralestattoo-website.vercel.app";

export const ARTIST = {
  name: "Julián Morales",
  legalName: "Julián Morales",
  tagline: "Black & Gray Realism Tattoo Artist",
  email: "julianmtattoo23@gmail.com",
  phone: "+1 (408) 794-5667",
  phoneRaw: "+14087945667",
  // Public-facing location string (used on Home / About / Footer / Contact)
  location: "San José, California",
  // Detailed address — used ONLY on legal pages (Privacy / Terms) where A2P
  // 10DLC review requires the full physical address.
  studio: {
    street: "1621 Alum Rock Ave",
    city: "San Jose",
    state: "CA",
    zip: "95116",
  },
  social: {
    instagram: "https://www.instagram.com/julianmoralest_/",
    instagramHandle: "@julianmoralest_",
    tiktok: "https://www.tiktok.com/@julianmoralestattoo",
    tiktokHandle: "@julianmoralestattoo",
  },
  stats: {
    yearsExperience: "3+",
    healedPieces: "50+",
  },
} as const;

export const FULL_ADDRESS = `${ARTIST.studio.street}, ${ARTIST.studio.city}, ${ARTIST.studio.state} ${ARTIST.studio.zip}`;

export const MAILTO_LINK = `mailto:${ARTIST.email}`;
