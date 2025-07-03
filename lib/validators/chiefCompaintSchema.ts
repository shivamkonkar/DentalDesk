import { z } from "zod";

// Define const arrays for enums to ensure type safety with Zod
const PAIN_TYPE_OPTIONS = ["SHARP", "DULL_ACHING", "THROBBING", "SENSITIVE"] as const;
const PAIN_TIMING_OPTIONS = ["CONSTANT", "INTERMITTENT", "ON_STIMULUS", "NIGHT_ONLY"] as const;
const CHIEF_COMPLAINT_STATUS_OPTIONS = ["ACTIVE", "RESOLVED", "UNDER_OBSERVATION"] as const;

export const ChiefComplaintInputSchema = z.object({

  chiefComplaint: z
    .string({ required_error: "A brief complaint title is required." })
    .min(1, "Complaint title is required.")
    .max(100, { message: "Complaint title cannot be longer than 100 characters." }),

  chiefComplaintDescription: z
    .string()
    .max(255, { message: "Description cannot be longer than 255 characters." })
    .optional()
    .or(z.literal("")),

  status: z.enum(CHIEF_COMPLAINT_STATUS_OPTIONS).default("ACTIVE").optional(),

  location: z
    .string()
    .max(100, { message: "Location cannot be longer than 100 characters." })
    .optional()
    .or(z.literal("")),

  onsetAndDuration: z
    .string()
    .max(44, { message: "Onset & Duration cannot be longer than 44 characters." })
    .optional()
    .or(z.literal("")),

  painType: z.enum(PAIN_TYPE_OPTIONS).optional(),

  painTiming: z.enum(PAIN_TIMING_OPTIONS).optional(),

  painSeverity: z
    .coerce
    .number()
    .min(1, "Severity must be at least 1.")
    .max(10, "Severity must be no more than 10.")
    .optional()
    .nullable(),

  aggravatingFactors: z
    .string()
    .max(44, { message: "Aggravating factors cannot be longer than 44 characters." })
    .optional()
    .or(z.literal("")),

  relievingFactors: z
    .string()
    .max(44, { message: "Relieving factors cannot be longer than 44 characters." })
    .optional()
    .or(z.literal("")),
    
  patientId: z.string().uuid("A valid patient ID is required."),

});

export type ChiefComplaintInput = z.infer<typeof ChiefComplaintInputSchema>;