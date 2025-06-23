import { z } from "zod";

export const DentistOnboardingInputSchema = z.object({
  fullName: z
    .string()
    .min(1, "Name is required.")
    .max(44, { message: "Full name cannot be longer than 44 characters." }),

  phone: z
    .string()
    .length(10, { message: "Phone No must be exactly 10 digits." }),

  clinicName: z
    .string()
    .max(44, { message: "Clinic name cannot be longer than 44 characters." })
    .optional(),

  clinicSlogan: z
    .string()
    .max(100, {
      message: "Clinic slogan cannot be longer than 100 characters.",
    })
    .optional(),

  clinicAddress: z
    .string()
    .max(255, {
      message: "Clinic address cannot be longer than 255 characters.",
    })
    .optional(),

    clinicLogo: z
    .custom<FileList>()
    .refine((files) => !files || files.length === 0 || files[0].size <= 2 * 1024 * 1024, 'Max file size is 2MB.')
    .refine((files) => !files || files.length === 0 || ['image/jpeg', 'image/png', 'image/webp'].includes(files[0].type), 'Only .jpg, .png, and .webp formats are supported.')
    .optional(),
});

export type DentistOnboardingInput = z.infer<typeof DentistOnboardingInputSchema>;
