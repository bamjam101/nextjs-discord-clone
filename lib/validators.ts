import { ChannelType } from "@prisma/client";
import * as z from "zod";

export const createServerModalFormSchema = z.object({
  name: z.string().min(1, { message: "Server name is required." }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

export const createChannelModalFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Channel name is required." })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general",
    }),
  type: z.nativeEnum(ChannelType),
});

export const chatInputSchema = z.object({
  content: z.string().min(1),
});

export const fileUploadModalFormSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required.",
  }),
});

export type CreateServerModalFormData = z.infer<
  typeof createServerModalFormSchema
>;

export type CreateChannelModalFormData = z.infer<
  typeof createChannelModalFormSchema
>;

export type ChatInputDataType = z.infer<typeof chatInputSchema>;

export type FileUploadModalFormData = z.infer<typeof fileUploadModalFormSchema>;
