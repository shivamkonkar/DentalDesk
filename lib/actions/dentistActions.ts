"use server";

import { prisma } from "../prisma/prisma";
import { createClient } from "../supabase/server";
import {
  DentistOnboardingInput,
  DentistOnboardingInputSchema,
} from "../validators/dentistSchema";
import { refreshSession } from "./authActions";
import { revalidatePath } from "next/cache";

export interface saveDentistProfileOutput {
  message: string | null;
  error: string | null;
  success: boolean;
}

export async function saveDentistProfile(
  data: DentistOnboardingInput
): Promise<saveDentistProfileOutput> {
  let clinicLogoUrl: string | undefined = undefined;
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return { success: false, error: "User not authenticated.", message: null };
  }

  const validation = DentistOnboardingInputSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: "Validation failed. Please check the fields.",
      message: null,
    };
  }

  try {
    if (validation.data.clinicLogo != undefined && validation.data.clinicLogo[0] != undefined) {
      const clinicLogo = validation.data.clinicLogo[0];
      const fileExt = clinicLogo.name.split(".").pop();

      const fileName = `${authUser.id}-${Date.now()}.${fileExt}`;
      const filePath = `${authUser.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("cliniclogo")
        .upload(filePath, clinicLogo);

      if (uploadError) {
        console.error("Supabase Storage Upload Error:", uploadError);
        return {
          success: false,
          error: `Failed to upload clinic logo. Please try again`,
          message: null,
        };
      }

      const { data: urlData } = supabase.storage
        .from("cliniclogo")
        .getPublicUrl(filePath);

      clinicLogoUrl = urlData.publicUrl;
    }
  } catch (e) {
    console.error("File Upload Processing Error:", e);
    return {
      success: false,
      error: `Error processing file upload. Please try again`,
      message: null,
    };
  }

  try {
    await prisma.dentist.update({
      where: { id: authUser.id },
      data: {
        fullName: validation.data.fullName,
        phone: validation.data.phone,
        clinicName: validation.data.clinicName,
        clinicSlogan: validation.data.clinicSlogan,
        clinicAddress: validation.data.clinicAddress,
        clinicLogo: clinicLogoUrl,
        onboardingStatus: true,
      },
    });

    await refreshSession();
    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Profile updated successfully!",
      error: null,
    };
  } catch (dbError) {
    console.error("Failed to save onboarding details to DB:", dbError);
    return {
      success: false,
      error: `Failed to update profile in database. Please try again`,
      message: null,
    };
  }
}
