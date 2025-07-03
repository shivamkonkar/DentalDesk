"use server";

import { createClient } from "../supabase/server";
import {
  PatientOnboardingInput,
  PatientOnboardingInputSchema,
} from "../validators/patientSchema";
import { prisma } from "../prisma/prisma";
import { ChiefComplaint, Patient } from "@prisma/client";
import {
  ChiefComplaintInput,
  ChiefComplaintInputSchema,
} from "../validators/chiefCompaintSchema";

export interface genericOutputInterface {
  message: string | null;
  error: string | null;
  success: boolean;
}

export interface savePatientDetailsOutput extends genericOutputInterface {
  patient: Patient | null;
}

export interface getPatientOutput extends genericOutputInterface {
  patient: Patient | null;
}

export interface getChiefComplaintsOutput extends genericOutputInterface {
  complaints: ChiefComplaint[] | null;
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

export async function getPatient(id: string): Promise<getPatientOutput> {
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

  try {
    const patient = await prisma.patient.findFirst({
      where: {
        id: id,
        dentistId: dentist.id,
      },
    });
    return {
      success: true,
      message: "Patient record found successfully",
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

export async function addChiefComplaint(
  patientId: string,
  chiefComplaintData: ChiefComplaintInput
): Promise<genericOutputInterface> {
  const supabase = await createClient();
  const {
    data: { user: dentist },
  } = await supabase.auth.getUser();

  if (!dentist) {
    return {
      success: false,
      message: null,
      error: "Dentist not found. Please sign in.",
    };
  }

  const validation = ChiefComplaintInputSchema.safeParse(chiefComplaintData);
  if (!validation.success) {
    console.error("Validation failed:", validation.error.flatten().fieldErrors);
    return {
      success: false,
      message: null,
      error: "Validation failed. Please check the fields.",
    };
  }

  try {
    const patient = await prisma.patient.findFirst({
      where: {
        id: patientId,
        dentistId: dentist.id,
      },
    });

    if (!patient) {
      return {
        success: false,
        message: null,
        error:
          "Patient not found or you do not have permission to access this record.",
      };
    }

    await prisma.chiefComplaint.create({
      data: {
        dentistId: dentist.id,
        patientId: patientId,
        chiefComplaint: validation.data.chiefComplaint,
        chiefComplaintDescription: validation.data.chiefComplaintDescription,
        status: validation.data.status,
        aggravatingFactors: validation.data.aggravatingFactors,
        location: validation.data.location,
        onsetAndDuration: validation.data.onsetAndDuration,
        painSeverity: validation.data.painSeverity,
        painTiming: validation.data.painTiming,
        painType: validation.data.painType,
        relievingFactors: validation.data.relievingFactors,
      },
    });

    return {
      success: true,
      message: "Chief complaint created successfully",
      error: null,
    };
  } catch (error) {
    console.error("Error creating chief complaint:", error);
    return {
      success: false,
      message: null,
      error:
        "Something went wrong while saving the complaint. Please try again.",
    };
  }
}

export async function getChiefComplaints(
  patientId: string
): Promise<getChiefComplaintsOutput> {
  const supabase = await createClient();
  const {
    data: { user: dentist },
  } = await supabase.auth.getUser();

  if (!dentist) {
    return {
      success: false,
      message: null,
      error: "Dentist not found. Please sign in.",
      complaints: null,
    };
  }
  try {
    const complaints = await prisma.chiefComplaint.findMany({
      where: {
        patientId: patientId,
        dentistId: dentist.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      success: true,
      message: "complaints fetched successfully",
      error: null,
      complaints: complaints,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: null,
      error:
        "Something went wrong while finding chief complaints please try again",
      complaints: null,
    };
  }
}
