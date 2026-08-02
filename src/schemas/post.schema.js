import * as z from "zod";
export const schemaCreatePost = z.object({
  body: z.string().trim().min(1, "Body is required"),
});
