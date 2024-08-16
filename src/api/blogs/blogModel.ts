

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

const requiredString = z.string().trim().min(1, "Required string");
export type Blog = z.infer<typeof BlogSchema>;
export const BlogSchema = z.object({
  title: requiredString,
  content: z.string().max(1000, "Must be at most 1000 charachters"),
});

// Input Validation for 'GET users/:id' endpoint
export const GetBlogSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
