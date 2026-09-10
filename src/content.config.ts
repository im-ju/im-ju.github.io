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
  }),
});

export const collections = { projects };
