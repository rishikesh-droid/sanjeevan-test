import { site } from '../config/site';

/** EducationalOrganization / CollegeOrUniversity JSON-LD for the institute. */
export function organizationJsonLd() {
  const c = site.contact;
  return {
    '@context': 'https://schema.org',
    '@type': ['CollegeOrUniversity', 'EducationalOrganization'],
    name: site.legalName,
    alternateName: site.shortName,
    url: site.url,
    logo: site.url + site.logo,
    foundingDate: String(site.established),
    description: site.description,
    telephone: c.phones[0],
    email: c.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ashvini Prasad, Station Road',
      addressLocality: c.locality,
      addressRegion: c.region,
      postalCode: c.postalCode,
      addressCountry: c.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: c.geo.lat, longitude: c.geo.lng },
    areaServed: 'IN',
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: site.url + it.href,
    })),
  };
}
