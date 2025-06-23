"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Crmlogo from "@/components/icons/CRMLogo";
import {
  DentistOnboardingInputSchema,
  DentistOnboardingInput,
} from "@/lib/validators/dentistSchema";
import { saveDentistProfile } from "@/lib/actions/dentistActions";

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md  text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isPending ? "Saving..." : "Save and Continue"}
    </button>
  );
}

export default function CompleteProfilePage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DentistOnboardingInput>({
    resolver: zodResolver(DentistOnboardingInputSchema),
  });

  const logoFile = watch("clinicLogo");
  const logoFileName =
    logoFile && logoFile.length > 0 ? logoFile[0].name : null;

  const onSubmit: SubmitHandler<DentistOnboardingInput> = async (data) => {
    setServerError(null);
    setServerSuccess(null);

    const result = await saveDentistProfile(data);

    if (!result.success) {
      setServerError(result.error || "An unexpected error occurred.");
      return;
    }

    setServerSuccess(result.message || "Success!");

    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const inputClass =
    "appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-6 bg-white p-8 rounded-lg ">
        <div className="flex justify-center">
          <Crmlogo className="h-10 w-auto text-gray-800" />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Complete Your Profile
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Please provide some additional details to get started.
          </p>
        </div>

        {serverSuccess && (
          <p className="text-center text-sm p-3 rounded-md bg-green-50 text-green-600 border border-green-200">
            {serverSuccess}
          </p>
        )}
        {serverError && (
          <p className="text-center text-sm p-3 rounded-md bg-red-50 text-red-600 border border-red-200">
            {serverError}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              className={inputClass}
              placeholder="Dr. Jane Doe"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
              placeholder="9876543210"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="clinicName" className={labelClass}>
              Clinic Name
            </label>
            <input
              id="clinicName"
              type="text"
              className={inputClass}
              placeholder="Acme Dental Clinic"
              {...register("clinicName")}
            />
            {errors.clinicName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.clinicName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="clinicSlogan" className={labelClass}>
              Clinic Slogan
            </label>
            <input
              id="clinicSlogan"
              type="text"
              className={inputClass}
              placeholder="Your smile, our passion"
              {...register("clinicSlogan")}
            />
            {errors.clinicSlogan && (
              <p className="mt-1 text-xs text-red-500">
                {errors.clinicSlogan.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="clinicAddress" className={labelClass}>
              Clinic Address
            </label>
            <textarea
              id="clinicAddress"
              rows={3}
              className={inputClass}
              placeholder="123 Dental St, Smileville, Goa, 403707"
              {...register("clinicAddress")}
            />
            {errors.clinicAddress && (
              <p className="mt-1 text-xs text-red-500">
                {errors.clinicAddress.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="clinicLogo" className={labelClass}>
              Clinic Logo (Max 2MB)
            </label>
            <input
              id="clinicLogo"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className={`${inputClass} p-0 file:mr-4 file:py-2.5 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
              {...register("clinicLogo")}
            />
            {logoFileName && (
              <p className="mt-1 text-xs text-gray-500">
                Selected: {logoFileName}
              </p>
            )}
            {errors.clinicLogo && (
              <p className="mt-1 text-xs text-red-500">
                {typeof errors.clinicLogo.message === "string"
                  ? errors.clinicLogo.message
                  : "Invalid file"}
              </p>
            )}
          </div>

          <div>
            <SubmitButton isPending={isSubmitting} />
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          You can update these details later in your profile settings.
        </p>
      </div>
    </div>
  );
}
