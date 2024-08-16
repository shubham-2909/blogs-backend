import { z } from "zod";
import {isCuid} from "cuid"
export const commonValidations = {
  id: z
  .string()
  .refine((data) => isCuid(data), "ID must be a valid CUID"),
  // ... other common validations
};
