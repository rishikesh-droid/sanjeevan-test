import type { ImageMetadata } from 'astro';

/**
 * Asset resolvers. Content collections store photos by *filename*; components
 * resolve them to optimisable ImageMetadata here via import.meta.glob so Astro
 * emits responsive WebP/AVIF. Unknown filenames return undefined (render a
 * placeholder / initials instead).
 */

const faculty = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/faculty/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const students = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/students/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const gallery = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/gallery/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function facultyPhoto(file?: string): ImageMetadata | undefined {
  if (!file) return undefined;
  return faculty[`/src/assets/faculty/${file}`]?.default;
}

export function studentPhoto(file?: string): ImageMetadata | undefined {
  if (!file) return undefined;
  return students[`/src/assets/students/${file}`]?.default;
}

export function galleryImage(dir: string, file: string): ImageMetadata | undefined {
  return gallery[`/src/assets/gallery/${dir}/${file}`]?.default;
}

/** Two-letter initials for a name, used for photo fallbacks. */
export function initials(name: string): string {
  const parts = name.replace(/^Dr\.?\s+/i, '').trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}
