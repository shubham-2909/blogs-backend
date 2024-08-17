import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'
import { isCuid } from 'cuid'

extendZodWithOpenApi(z)

const requiredString = z.string().trim().min(1, 'Required string')
export type Blog = z.infer<typeof BlogSchema>
export const BlogSchema = z.object({
  title: requiredString,
  content: z.string().max(1000, 'Must be at most 1000 charachters'),
})

// Input Validation for 'GET blogs/' endpoint
export const GetBlogSchema = z.object({
  query: z.object({
    cursor:
      z
        .string()
        .min(1, 'String is required')
        .refine((data) => isCuid(data), 'id must be a valid cuid') || null,
  }),
})

export const CreateBlogSchema = z.object({
  title: requiredString,
  content: requiredString.max(3000, 'Content too long'),
})

export type CreateBlogValues = z.infer<typeof CreateBlogSchema>
