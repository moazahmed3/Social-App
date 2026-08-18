import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .min(2, "at least 2 character")
    .max(500, "Comment cannot exceed 500 characters"),
});
