/**
 * SINGLE SOURCE OF TRUTH for institute identity, contacts, navigation and SEO.
 *
 * Everything user-facing (header, footer, contact page, JSON-LD, meta tags)
 * reads from here. Change details in ONE place. Brand COLOURS live in
 * src/styles/global.css (design tokens) — do not hardcode colours anywhere else.
 */

export const site = {
  name: 'Sanjeevan Medical Foundation Post Graduate Institute',
  shortName: 'Sanjeevan PGI',
  legalName: 'Sanjeevan Medical Foundation ENT Post Graduate Training Institute',
  tagline: 'Postgraduate ENT Institute · Since 1984',
  established: 1984,
  description:
    'Sanjeevan PGI, Miraj — a postgraduate medical institute specialising in ENT (Otorhinolaryngology). MS (ENT) and Fellowship programmes recognised by NMC, NBE and MUHS, Nashik.',

  url: 'https://sanjeevanpgi.com',
  logo: '/brand/logo.png',
  favicon: '/brand/favicon.jpg',

  // Primary institute (ENT PG)
  contact: {
    addressLines: ['Sanjeevan Medical Foundation, Ashvini Prasad', 'Station Road, Miraj 416 410', 'Maharashtra, India'],
    locality: 'Miraj',
    region: 'Maharashtra',
    postalCode: '416410',
    country: 'IN',
    phones: ['(0233) 222 3299', '(0233) 222 2188'],
    email: 'sanjeevanpgi@gmail.com',
    // Approx. geo for Miraj, Station Road (for JSON-LD / map). Verify before launch.
    geo: { lat: 16.8286, lng: 74.6416 },
    mapEmbed:
      'https://www.google.com/maps?q=Sanjeevan+Medical+Foundation+Station+Road+Miraj+416410&output=embed',
    coordinators: [
      { name: 'Mr. Sharad Patil', role: 'Co-ordinator', cell: '+91 84850 25629' },
      { name: 'Mr. Atul Rajopadhye', role: 'Co-ordinator', cell: '+91 75079 04848' },
    ],
  },

  // Fellowship campus (Cancer Hospital)
  fellowshipContact: {
    name: 'Dr. D. K. Gosavi Memorial Shri Siddhivinayak Ganapati Cancer Hospital',
    addressLines: ['Sangli Road, Miraj 416 410', 'Maharashtra, India'],
    phones: ['(0233) 221 1601'],
    fax: '(0233) 221 1603',
    email: 'cancermiraj@gmail.com',
    coordinators: [
      { name: 'Mr. Deepak Phaltankar', role: 'Co-ordinator', cell: '+91 70380 93095' },
    ],
  },

  socials: [
    // Add official handles when available. Empty by default.
    // { label: 'Facebook', href: 'https://facebook.com/...', icon: 'facebook' },
  ] as { label: string; href: string; icon: string }[],
} as const;

/** Primary navigation. `children` render as a mega-menu / drawer sub-list. */
export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our History', href: '/about#history' },
      { label: 'Recognitions & Affiliations', href: '/about#recognitions' },
      { label: 'Leadership', href: '/about#leadership' },
    ],
  },
  {
    label: 'Admissions',
    href: '/admissions',
    children: [
      { label: 'MS (ENT) Programme', href: '/admissions/ms-ent' },
      { label: 'Fellowship Programmes', href: '/admissions/fellowship' },
      { label: 'Seat Matrix', href: '/admissions#seat-matrix' },
      { label: 'Fees', href: '/admissions#fees' },
      { label: 'How to Apply', href: '/admissions#how-to-apply' },
    ],
  },
  { label: 'Teaching Staff', href: '/teaching-staff' },
  { label: 'Students', href: '/students' },
  {
    label: 'Gallery',
    href: '/gallery',
    children: [
      { label: 'Campus A — General', href: '/gallery/campus-a' },
      { label: 'Campus B — ENT', href: '/gallery/campus-b' },
    ],
  },
  { label: 'Notices', href: '/notices' },
  { label: 'Contact', href: '/contact' },
];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};
