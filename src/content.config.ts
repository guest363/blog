import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { removeExtension } from "./utils/remove-extension";

const commonSchema = {
  title: z.string().min(1),
  description: z.optional(z.string().min(1)),
  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  updatedDate: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()),
};

const post = defineCollection({
  loader: glob({
    base: "./src/content/post",
    pattern: "**/*.{md,mdx}",
    generateId: (option) => {
      return `/post/${removeExtension(option.entry)}`;
    },
  }),
  schema: z.object({
    ...commonSchema,
    layout: z.literal("post").optional(),
    heroImage: z.string().url().optional(),
  }),
});

const bookReview = defineCollection({
  loader: glob({
    base: "./src/content/book-review",
    pattern: "**/*.{md,mdx}",
    generateId: (option) => {
      return `/book-review/${removeExtension(option.entry)}`;
    },
  }),
  schema: z.object({
    ...commonSchema,
    layout: z.literal("book-review").optional(),
    cover: z.string().optional(),
    author: z.string().min(1),
    themes: z.string().min(1),
    size: z.string().min(1),
    mark: z.string().min(1),
    link: z.string().url(),
  }),
});

export const collections = { post, bookReview };
