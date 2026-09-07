import { config, fields, collection, singleton } from '@keystatic/core';

/**
 * Keystatic (Git-based CMS) configuration.
 *
 * Storage is `local` by default — editors run `ENABLE_KEYSTATIC=true npm run dev`
 * and edit at http://localhost:4321/keystatic, saving straight to the content
 * files in src/content/. To let non-technical staff edit via GitHub instead,
 * switch `storage` to { kind: 'github', repo: 'owner/repo' } (see README).
 */
export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Sanjeevan PGI' },
  },
  collections: {
    faculty: collection({
      label: 'Teaching Staff',
      slugField: 'name',
      path: 'src/content/faculty/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        designation: fields.text({ label: 'Designation' }),
        qualifications: fields.text({ label: 'Qualifications' }),
        department: fields.text({ label: 'Department', defaultValue: 'ENT' }),
        specialty: fields.text({ label: 'Specialty' }),
        group: fields.select({
          label: 'Group',
          options: [
            { label: 'ENT (MS)', value: 'ent' },
            { label: 'Fellowship', value: 'fellowship' },
          ],
          defaultValue: 'ent',
        }),
        photo: fields.text({ label: 'Photo filename (in src/assets/faculty)' }),
        registration: fields.text({ label: 'Medical registration no.' }),
        experience: fields.text({ label: 'Teaching experience' }),
        employment: fields.text({ label: 'Nature of employment' }),
        order: fields.integer({ label: 'Sort order', defaultValue: 99 }),
      },
    }),

    programmes: collection({
      label: 'Programmes',
      slugField: 'title',
      path: 'src/content/programmes/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        shortTitle: fields.text({ label: 'Short title' }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        degree: fields.text({ label: 'Degree' }),
        duration: fields.text({ label: 'Duration' }),
        seats: fields.integer({ label: 'Seats' }),
        eligibility: fields.array(fields.text({ label: 'Criterion' }), {
          label: 'Eligibility', itemLabel: (p) => p.value,
        }),
        order: fields.integer({ label: 'Sort order', defaultValue: 99 }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.mdx({ label: 'Body' }),
      },
    }),

    notices: collection({
      label: 'Notices & Circulars',
      slugField: 'title',
      path: 'src/content/notices/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Admission', value: 'Admission' },
            { label: 'Result', value: 'Result' },
            { label: 'Circular', value: 'Circular' },
            { label: 'Affiliation', value: 'Affiliation' },
            { label: 'General', value: 'General' },
          ],
          defaultValue: 'General',
        }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        pdf: fields.text({ label: 'PDF path (under /documents)' }),
        pinned: fields.checkbox({ label: 'Pin to top', defaultValue: false }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.mdx({ label: 'Body' }),
      },
    }),

    recognitions: collection({
      label: 'Recognitions & Affiliations',
      slugField: 'name',
      path: 'src/content/recognitions/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Authority name' } }),
        abbr: fields.text({ label: 'Abbreviation' }),
        role: fields.text({ label: 'Role / description', multiline: true }),
        year: fields.text({ label: 'Year' }),
        pdf: fields.text({ label: 'PDF path (under /documents)' }),
        order: fields.integer({ label: 'Sort order', defaultValue: 99 }),
      },
    }),

    students: collection({
      label: 'Students',
      slugField: 'batch',
      path: 'src/content/students/*',
      format: { data: 'json' },
      schema: {
        batch: fields.slug({ name: { label: 'Batch (e.g. 2025–26)' } }),
        programme: fields.text({ label: 'Programme' }),
        group: fields.select({
          label: 'Group',
          options: [
            { label: 'ENT (MS)', value: 'ent' },
            { label: 'Fellowship', value: 'fellowship' },
          ],
          defaultValue: 'ent',
        }),
        members: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            note: fields.text({ label: 'Note' }),
          }),
          { label: 'Members', itemLabel: (p) => p.fields.name.value },
        ),
        order: fields.integer({ label: 'Sort order', defaultValue: 99 }),
      },
    }),

    galleries: collection({
      label: 'Galleries',
      slugField: 'title',
      path: 'src/content/galleries/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        slug: fields.text({ label: 'URL slug' }),
        subtitle: fields.text({ label: 'Subtitle', multiline: true }),
        dir: fields.text({ label: 'Image folder (src/assets/gallery/<dir>)' }),
        order: fields.integer({ label: 'Sort order', defaultValue: 99 }),
        images: fields.array(
          fields.object({
            file: fields.text({ label: 'Filename' }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Images', itemLabel: (p) => p.fields.caption.value },
        ),
      },
    }),
    documents: collection({
      label: 'Documents (MUHS Mandate etc.)',
      slugField: 'title',
      path: 'src/content/documents/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        group: fields.text({ label: 'Group', defaultValue: 'MUHS Mandate' }),
        year: fields.text({ label: 'Academic year' }),
        pdf: fields.text({ label: 'PDF path (under /documents)' }),
        order: fields.integer({ label: 'Sort order', defaultValue: 99 }),
      },
    }),
  },

  singletons: {
    about: singleton({
      label: 'About page',
      path: 'src/content/pages/about',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Meta description', multiline: true }),
        content: fields.mdx({ label: 'Body' }),
      },
    }),
    homeIntro: singleton({
      label: 'Home intro',
      path: 'src/content/pages/home-intro',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Meta description', multiline: true }),
        content: fields.mdx({ label: 'Body' }),
      },
    }),
  },
});
