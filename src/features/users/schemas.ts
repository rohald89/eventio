import { z } from "zod";
import { name } from "@/features/auth/schemas";

export const UpdateProfileInput = z.object({
  name,
  username: z.string().optional(),
  bio: z.string().optional(),
});

export type UpdateProfileFormType = z.infer<typeof UpdateProfileInput>;