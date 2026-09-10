import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ---------------------------------------------------------------------------
 * Content Collections — the editable data model.
 * Prose lives in MDX (programmes, notices, pages); structured records live in
 * JSON (faculty, students, recognitions, gallery). Keystatic edits these files.
 * Photos are referenced by filename and resolved from src/assets via glob in
 * the rendering components (keeps schemas simple + CMS-friendly).
 * ------------------------------------------------------------------------- */

const faculty = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faculty' }),
  schema: z.object({
    name: z.string(),
    designation: z.string(),
    qualifications: z.string(),
    department: z.string().default('ENT'),
    specialty: z.string().optional(),
    group: z.enum(['ent', 'fellowship']),
    photo: z.string().optional(), // filename in src/assets/faculty
    focus: z.string().optional(), // CSS object-position for the photo (e.g. 'center', '50% 30%')
    registration: z.string().optional(),
    experience: z.string().optional(),
    employment: z.string().optional(),
    order: z.number().default(99),
  }),
});

const programmes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/programmes' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    summary: z.string(),
    degree: z.string(),
    duration: z.string(),
    seats: z.number().optional(),
    eligibility: z.array(z.string()).default([]),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

const notices = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notices' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Admission', 'Result', 'Circular', 'Affiliation', 'General']).default('General'),
    summary: z.string().optional(),
    pdf: z.string().optional(), // path under /documents
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const recognitions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/recognitions' }),
  schema: z.object({
    name: z.string(),
    abbr: z.string().optional(),
    role: z.string(),
    year: z.string().optional(),
    pdf: z.string().optional(),
    order: z.number().default(99),
  }),
});

const students = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/students' }),
  schema: z.object({
    batch: z.string(),
    programme: z.string(),
    group: z.enum(['ent', 'fellowship']).default('ent'),
    members: z.array(
      z.object({
        name: z.string(),
        note: z.string().optional(),
        photo: z.string().optional(), // filename in src/assets/students
      }),
    ),
    order: z.number().default(99),
  }),
});

const galleries = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/galleries' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    subtitle: z.string().optional(),
    dir: z.string(), // sub-folder under src/assets/gallery
    order: z.number().default(99),
    images: z.array(z.object({ file: z.string(), caption: z.string() })),
  }),
});

const documents = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/documents' }),
  schema: z.object({
    title: z.string(),
    group: z.string().default('MUHS Mandate'),
    year: z.string().optional(),
    pdf: z.string(),
    order: z.number().default(99),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { faculty, programmes, notices, recognitions, students, galleries, documents, pages };
