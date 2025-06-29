"use server";

import { createClient } from "../supabase/server";
import {
  PatientOnboardingInput,
  PatientOnboardingInputSchema,
} from "../validators/patientSchema";
import { prisma } from "../prisma/prisma";
import { Patient } from "@prisma/client";

export interface savePatientDetailsOutput {
  patient: Patient | null;
  message: string | null;
  error: string | null;
  success: boolean;
}

export async function savePatientDetails(
  patientData: PatientOnboardingInput
): Promise<savePatientDetailsOutput> {
  const supabase = await createClient();
  const {
    data: { user: dentist },
  } = await supabase.auth.getUser();
  if (!dentist) {
    return {
      success: false,
      message: null,
      error: "Dentist not found",
      patient: null,
    };
  }
  const validation = PatientOnboardingInputSchema.safeParse(patientData);
  if (!validation.success) {
    console.error(validation.error);
    return {
      success: false,
      message: null,
      error: "Validation failed. Please check the fields.",
      patient: null,
    };
  }
  const validatedData = validation.data as PatientOnboardingInput;
  try {
    const patient = await prisma.patient.create({
      data: {
        dentistId: dentist.id,
        fullName: validatedData.fullName,
        phone: validatedData.phone,
        dob: validatedData.dob,
        gender: validatedData.gender,
        email: validatedData.email,
        locality: validatedData.locality,
        profession: validatedData.profession,
        bloodGroupType: validatedData.bloodGroupType,
        bloodGroupRh: validatedData.bloodGroupRh,
        bloodGroupOtherDetails: validatedData.bloodGroupOtherDetails,
        hasDiabetes: validatedData.hasDiabetes,
        hasHypertension: validatedData.hasHypertension,
        isPregnant: validatedData.isPregnant,
        hasCancerHistory: validatedData.hasCancerHistory,
        hasHiv: validatedData.hasHiv,
        hasKnownAllergies: validatedData.hasKnownAllergies,
        hasAsthma: validatedData.hasAsthma,
        hasBleedingDisorders: validatedData.hasBleedingDisorders,
        hasHeartConditions: validatedData.hasHeartConditions,
        otherMedicalCondition: validatedData.otherMedicalCondition,
        emergencyContactName: validatedData.emergencyContactName,
        emergencyContactPhone: validatedData.emergencyContactPhone,
      },
    });

    return {
      success: true,
      message: "Saved Patient Successfully",
      error: null,
      patient: patient,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: null,
      error: "Something went wrong Try again ",
      patient: null,
    };
  }
}
