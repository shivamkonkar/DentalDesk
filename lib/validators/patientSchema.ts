import { z } from "zod";

const GENDER_OPTIONS = ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"] as const;
const BLOOD_GROUP_TYPE_OPTIONS = ["A", "B", "O", "AB", "OTHERS"] as const;
const BLOOD_GROUP_RH_OPTIONS = ["POSITIVE", "NEGATIVE"] as const;

export const PatientOnboardingInputSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required." })
    .min(1, "Full name is required.")
    .max(44, { message: "Full name cannot be longer than 44 characters." }),

  phone: z
    .string({ required_error: "Phone number is required." })
    .length(10, { message: "Phone number must be exactly 10 digits." }),

  dob: z
    .date({ invalid_type_error: "Please enter a valid date." }) 
    .refine((date) => {
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 0 && age < 120;
    }, { message: "Please enter a valid date of birth." })
    .optional(),

  gender: z.enum(GENDER_OPTIONS).optional(),

  email: z
    .string()
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),
  locality: z.string().max(20).optional().or(z.literal("")),
  profession: z.string().max(20).optional().or(z.literal("")),
  bloodGroupType: z.enum(BLOOD_GROUP_TYPE_OPTIONS).optional(),
  bloodGroupRh: z.enum(BLOOD_GROUP_RH_OPTIONS).optional(),
  bloodGroupOtherDetails: z.string().max(50).optional().or(z.literal("")),
  hasDiabetes: z.boolean(),
  hasHypertension: z.boolean(),
  isPregnant: z.boolean(),
  hasCancerHistory: z.boolean(),
  hasHiv: z.boolean(),
  hasKnownAllergies: z.boolean(),
  hasAsthma: z.boolean(),
  hasBleedingDisorders: z.boolean(),
  hasHeartConditions: z.boolean(),
  otherMedicalCondition: z.string().max(100).optional().or(z.literal("")),
  emergencyContactName: z.string().max(100).optional().or(z.literal("")),
  emergencyContactPhone: z.string().max(10).optional().or(z.literal("")),
});

export type PatientOnboardingInput = z.infer<typeof PatientOnboardingInputSchema>;
