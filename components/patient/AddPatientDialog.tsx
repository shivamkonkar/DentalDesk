"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DobPicker } from "../DatePicker/dobPicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  savePatientDetails,
  savePatientDetailsOutput,
} from "@/lib/actions/patientActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  PatientOnboardingInput,
  PatientOnboardingInputSchema,
} from "@/lib/validators/patientSchema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AddNewPatient() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm<PatientOnboardingInput>({
    resolver: zodResolver(PatientOnboardingInputSchema),
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (successMessage !== null) {
      toast(successMessage);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage !== null) {
      toast(errorMessage);
    }
  }, [errorMessage]);

  const onSubmit: SubmitHandler<PatientOnboardingInput> = async (data) => {
    console.log(data);

    setSuccessMessage(null);
    setErrorMessage(null);

    const { message, error, success, patient }: savePatientDetailsOutput =
      await savePatientDetails(data);
    if (!success) {
      setErrorMessage(error);
      return;
    }
    setSuccessMessage(message);
    router.push(`/patients/${patient?.id}`);
  };

  const medicalCondition = [
    { name: "hasDiabetes", label: "Diabetes" },
    { name: "hasHypertension", label: "Hypertension" },
    { name: "isPregnant", label: "Pregnancy" },
    { name: "hasCancerHistory", label: "Cancer History" },
    { name: "hasHiv", label: "HIV" },
    { name: "hasKnownAllergies", label: "Known Allergies" },
    { name: "hasAsthma", label: "Asthma" },
    { name: "hasBleedingDisorders", label: "Bleeding Disorders" },
    { name: "hasHeartConditions", label: "Heart Conditions" },
  ] as const;

  const labelClass = "text-sm font-medium";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Patient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription>
              Please provide the patient&apos;s details below. Fields marked
              with <span className="text-red-500">*</span> are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-4">
            <fieldset className="space-y-4 p-4 border rounded-lg md:col-span-2">
              <legend className="text-lg font-semibold px-2">
                Personal Details
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="e.g., Aarav Sharma"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 ">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className={labelClass}>
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="e.g., 9876543210"
                    type="tel"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className=" text-red-600 ">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob" className={labelClass}>
                    Date of Birth{" "}
                  </Label>
                  <Controller
                    control={control}
                    name="dob"
                    render={({ field }) => (
                      <DobPicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.dob && (
                    <p className="text-red-600">{errors.dob.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className={labelClass}>
                    Gender{" "}
                  </Label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                          <SelectItem value="PREFER_NOT_TO_SAY">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <p className="text-red-600">{errors.gender.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={labelClass}>
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
            </fieldset>

            <fieldset className="space-y-4 p-4 border rounded-lg">
              <legend className="text-lg font-semibold px-2">
                Address & Profession
              </legend>
              <div className="space-y-2">
                <Label htmlFor="locality" className={labelClass}>
                  Locality / Area
                </Label>
                <Input
                  id="locality"
                  placeholder="e.g., Bandra West"
                  {...register("locality")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profession" className={labelClass}>
                  Profession
                </Label>
                <Input
                  id="profession"
                  placeholder="e.g., Software Engineer"
                  {...register("profession")}
                />
                {errors.locality && (
                  <p className="text-red-600">{errors.locality.message}</p>
                )}
                {errors.profession && (
                  <p className="text-red-600">{errors.profession.message}</p>
                )}
              </div>
            </fieldset>

            <fieldset className="space-y-4 p-4 border rounded-lg">
              <legend className="text-lg font-semibold px-2">Other Info</legend>
              <div className="space-y-2">
                <Label htmlFor="bloodGroupType" className={labelClass}>
                  Blood Group
                </Label>
                <div className="flex gap-2">
                  <Controller
                    name="bloodGroupType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        name="bloodGroupType"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="O">O</SelectItem>
                          <SelectItem value="AB">AB</SelectItem>
                          <SelectItem value="OTHERS">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <div
                    className=""
                    hidden={watch("bloodGroupType") === "OTHERS"}
                  >
                    <Controller
                      control={control}
                      name="bloodGroupRh"
                      render={({ field }) => (
                        <Select
                          disabled={watch("bloodGroupType") === "OTHERS"}
                          name="bloodGroupRh"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Rh" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="POSITIVE">+</SelectItem>
                            <SelectItem value="NEGATIVE">-</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {errors.bloodGroupRh && (
                    <p className="text-red-600">
                      {errors.bloodGroupRh.message}
                    </p>
                  )}
                  {errors.bloodGroupType && (
                    <p className="text-red-600">
                      {errors.bloodGroupType.message}
                    </p>
                  )}
                </div>
              </div>
              <div
                className="space-y-2"
                hidden={watch("bloodGroupType") !== "OTHERS"}
              >
                <Label htmlFor="bloodGroupOtherDetails" className={labelClass}>
                  Other Blood Group Details
                </Label>
                <Input
                  id="bloodGroupOtherDetails"
                  placeholder="If blood group is 'Others'"
                  {...register("bloodGroupOtherDetails")}
                />
                {errors.bloodGroupOtherDetails && (
                  <p className="text-red-600">
                    {errors.bloodGroupOtherDetails.message}
                  </p>
                )}
              </div>
            </fieldset>

            {/* --- Medical History --- */}
            <fieldset className="space-y-4 p-4 border rounded-lg md:col-span-2">
              <legend className="text-lg font-semibold px-2">
                Medical History
              </legend>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {medicalCondition.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <Controller
                      name={item.name}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id={item.name}
                        />
                      )}
                    />
                    <Label
                      htmlFor={item.name}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {item.label}
                    </Label>
                    {errors[item.name] && (
                      <p className="text-red-600">
                        {errors[item.name]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherMedicalCondition" className={labelClass}>
                  Other Conditions / Specific Details
                </Label>
                <Input
                  id="otherMedicalCondition"
                  placeholder="e.g., Allergic to Penicillin"
                  {...register("otherMedicalCondition")}
                />
                {errors.otherMedicalCondition && (
                  <p className="text-red-600">
                    {errors.otherMedicalCondition.message}
                  </p>
                )}
              </div>
            </fieldset>

            <fieldset className="space-y-4 p-4 border rounded-lg md:col-span-2">
              <legend className="text-lg font-semibold px-2">
                Emergency Contact
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName" className={labelClass}>
                    Contact Name
                  </Label>
                  <Input
                    id="emergencyContactName"
                    placeholder="e.g., Priya Sharma"
                    {...register("emergencyContactName")}
                  />
                  {errors.emergencyContactName && (
                    <p className="text-red-600">
                      {errors.emergencyContactName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone" className={labelClass}>
                    Contact Phone
                  </Label>
                  <Input
                    id="emergencyContactPhone"
                    placeholder="e.g., 9876500001"
                    {...register("emergencyContactPhone")}
                    type="tel"
                  />
                  {errors.emergencyContactPhone && (
                    <p className="text-red-600">
                      {errors.emergencyContactPhone.message}
                    </p>
                  )}
                </div>
              </div>
            </fieldset>
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit">
              Save Patient
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
