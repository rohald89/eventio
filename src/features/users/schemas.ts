import { z } from "zod";
import { name } from "@/features/auth/schemas";

export const UpdateProfileInput = z.object({
  name,
  username: z.string().optional(),
  bio: z.string().optional(),
  avatarImageKey: z.string().optional(),
  coverImageKey: z.string().optional(),
});

export type UpdateProfileFormType = z.infer<typeof UpdateProfileInput>;
