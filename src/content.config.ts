import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const post = defineCollection({
  loader: glob({
    base: "./src/content/post",
    pattern: "**/*.{md,mdx}",
    generateId: (option) => {
      return `/post/${option.entry}`;
    },
  }),
  schema: z.object({
    layout: z.literal("post"),
    title: z.string().min(1),
    description: z.optional(z.string().min(1)),
    date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    updatedDate: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string().url().optional(),
  }),
});

const bookReview = defineCollection({
  loader: glob({
    base: "./src/content/book-review",
    pattern: "**/*.{md,mdx}",
    generateId: (option) => {
      return `/book-review/${option.entry}`;
    },
  }),
  schema: z.object({
    layout: z.literal("book-review"),
    title: z.string().min(1),
    date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    category: z.array(z.string()),
    tag: z.string().min(1),
    cover: z.string(),
    author: z.string().min(1),
    themes: z.string().min(1),
    size: z.string().min(1),
    mark: z.string().min(1),
    link: z.string().url(),
  }),
});

export const collections = { post, bookReview };
