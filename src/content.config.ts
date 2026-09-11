import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    order: z.number(),
    module: z.string(),
    period: z.string(),
    periodEn: z.string(),
    status: z.enum(['live', 'poc', 'approved', 'pending', 'done']),
    stack: z.array(z.string()),
    replaced: z.string(),
    replacedEn: z.string(),
    summary: z.string(),
    summaryEn: z.string(),
    added: z.string().optional(), // YYYY-MM-DD the module was published on the site; drives the 14-day NEW tag
  }),
});

// English bodies. Same filename as the Korean entry, body only (no frontmatter): metadata
// always comes from `projects`. Lives outside src/content/projects so import-projects.mjs
// never overwrites a translation. A missing file just means the EN page falls back to Korean.
const projectsEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects-en' }),
  schema: z.object({}),
});

export const collections = { projects, projectsEn };
