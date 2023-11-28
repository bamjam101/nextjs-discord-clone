import * as z from "zod";

export const createServerModalFormSchema = z.object({
  name: z.string().min(1, { message: "Server name is required." }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

export type CreateServerModalFormData = z.infer<
  typeof createServerModalFormSchema
>;
