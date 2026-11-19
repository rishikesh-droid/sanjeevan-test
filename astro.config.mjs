// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ---------------------------------------------------------------------------
// Keystatic (Git-based CMS) is OPT-IN.
//
// The public production site is 100% static (prerendered) so it deploys to
// KnownHost static hosting with no Node runtime. Keystatic's admin UI needs
// server routes, so it is only loaded when an editor runs it locally with:
//
//     ENABLE_KEYSTATIC=true npm run dev      → admin at /keystatic
//
// Editors save changes to the MDX/JSON content files, commit to Git, and the
// static site rebuilds. Nothing Keystatic-related ships to production.
// See README.md → "Editing content".
// ---------------------------------------------------------------------------
const KEYSTATIC = process.env.ENABLE_KEYSTATIC === 'true';

const integrations = [mdx(), sitemap()];
/** @type {import('astro').AstroUserConfig['output']} */
let output = 'static';
/** @type {import('astro').AstroUserConfig['adapter']} */
let adapter;

if (KEYSTATIC) {
  const { default: react } = await import('@astrojs/react');
  const { default: keystatic } = await import('@keystatic/astro');
  const { default: node } = await import('@astrojs/node');
  integrations.push(react(), keystatic());
  output = 'server';
  adapter = node({ mode: 'standalone' });
}

export default defineConfig({
  site: 'https://sanjeevanpgi.com',
  output,
  adapter,
  integrations,
  vite: { plugins: [tailwindcss()], preview: { allowedHosts: true } },
  image: { domains: ['sanjeevanpgi.com'] },
  build: { inlineStylesheets: 'auto' },
});
