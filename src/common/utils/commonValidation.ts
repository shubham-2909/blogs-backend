import { isCuid } from "cuid";
import { z } from "zod";
export const commonValidations = {
  id: z.string().refine((data) => isCuid(data), "ID must be a valid CUID"),
  // ... other common validations
};
