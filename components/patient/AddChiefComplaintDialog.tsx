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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  ChiefComplaintInput,
  ChiefComplaintInputSchema,
} from "@/lib/validators/chiefCompaintSchema";
import {
  addChiefComplaint,
  genericOutputInterface,
} from "@/lib/actions/patientActions";
import { PlusCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface AddChiefComplaintProp {
  patientId: string;
}

export function AddChiefComplaint({ patientId }: AddChiefComplaintProp) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm<ChiefComplaintInput>({
    resolver: zodResolver(ChiefComplaintInputSchema),
    defaultValues: {
      patientId: patientId,
      status: "ACTIVE",
    },
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

  const onSubmit: SubmitHandler<ChiefComplaintInput> = async (data) => {
    console.log(data);
    setSuccessMessage(null);
    setErrorMessage(null);

    const result: genericOutputInterface = await addChiefComplaint(
      patientId,
      data
    );

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setErrorMessage(result.error);
    }
    window.location.reload()
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-700 hover:bg-blue-800 text-white">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Complaint
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            Add New Chief Complaint
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Record the patient&apos;s chief complaint and associated details for
            proper diagnosis and treatment planning.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="chief_complaint"
                className="text-sm font-medium text-slate-700"
              >
                Chief Complaint <span className="text-red-500">*</span>
              </Label>
              <Input
                id="chief_complaint"
                placeholder="e.g., Persistent toothache"
                className="border-slate-200 focus:border-blue-700 focus:ring-blue-700"
                {...register("chiefComplaint")}
              />
              {errors.chiefComplaint && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.chiefComplaint.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="location"
                className="text-sm font-medium text-slate-700"
              >
                Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                placeholder="e.g., Upper right, tooth #16"
                className="border-slate-200 focus:border-blue-700 focus:ring-blue-700"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="space-y-2">
            <Label
              htmlFor="chief_complaint_description"
              className="text-sm font-medium text-slate-700"
            >
              Description of Complaint
            </Label>
            <Textarea
              id="chief_complaint_description"
              placeholder="Provide detailed description of the patient's complaint..."
              className="border-slate-200 focus:border-blue-700 focus:ring-blue-700 min-h-[100px] resize-none"
              {...register("chiefComplaintDescription")}
            />
            {errors.chiefComplaintDescription && (
              <p className="text-sm text-red-600 mt-1">
                {errors.chiefComplaintDescription.message}
              </p>
            )}
            <div className="text-xs text-slate-500 mt-1">
              {watch("chiefComplaintDescription")?.length || 0}/255 characters
            </div>
          </div>

          {/* Status and Pain Type - Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-slate-700"
              >
                Status <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-700 focus:ring-blue-700">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="RESOLVED">Resolved</SelectItem>
                      <SelectItem value="UNDER_OBSERVATION">
                        Under Observation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="pain_type"
                className="text-sm font-medium text-slate-700"
              >
                Type of Pain
              </Label>
              <Controller
                name="painType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-700 focus:ring-blue-700">
                      <SelectValue placeholder="Select pain type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SHARP">Sharp</SelectItem>
                      <SelectItem value="DULL_ACHING">Dull/Aching</SelectItem>
                      <SelectItem value="THROBBING">Throbbing</SelectItem>
                      <SelectItem value="SENSITIVE">Sensitive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.painType && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.painType.message}
                </p>
              )}
            </div>
          </div>

          {/* Pain Timing and Severity - Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="pain_timing"
                className="text-sm font-medium text-slate-700"
              >
                Pain Timing
              </Label>
              <Controller
                name="painTiming"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-700 focus:ring-blue-700">
                      <SelectValue placeholder="Select pain timing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CONSTANT">Constant</SelectItem>
                      <SelectItem value="INTERMITTENT">Intermittent</SelectItem>
                      <SelectItem value="ON_STIMULUS">On Stimulus</SelectItem>
                      <SelectItem value="NIGHT_ONLY">Night Only</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.painTiming && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.painTiming.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="pain_severity"
                className="text-sm font-medium text-slate-700"
              >
                Pain Severity (1-10)
              </Label>
              <Controller
                name="painSeverity"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-700 focus:ring-blue-700 ">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Minimal</SelectItem>
                      <SelectItem value="2">2 - Mild</SelectItem>
                      <SelectItem value="3">3 - Mild</SelectItem>
                      <SelectItem value="4">4 - Moderate</SelectItem>
                      <SelectItem value="5">5 - Moderate</SelectItem>
                      <SelectItem value="6">6 - Moderate</SelectItem>
                      <SelectItem value="7">7 - Severe</SelectItem>
                      <SelectItem value="8">8 - Severe</SelectItem>
                      <SelectItem value="9">9 - Very Severe</SelectItem>
                      <SelectItem value="10">10 - Excruciating</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.painSeverity && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.painSeverity.message}
                </p>
              )}
            </div>
          </div>

          {/* Aggravating and Relieving Factors - Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="aggravating_factor"
                className="text-sm font-medium text-slate-700"
              >
                What makes it worse?
              </Label>
              <Input
                id="aggravating_factor"
                placeholder="e.g., Chewing, cold drinks"
                className="border-slate-200 focus:border-blue-700 focus:ring-blue-700"
                {...register("aggravatingFactors")}
              />
              {errors.aggravatingFactors && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.aggravatingFactors.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="relieving_factors"
                className="text-sm font-medium text-slate-700"
              >
                What makes it better?
              </Label>
              <Input
                id="relieving_factors"
                placeholder="e.g., Painkillers, avoiding pressure"
                className="border-slate-200 focus:border-blue-700 focus:ring-blue-700 "
                {...register("relievingFactors")}
              />
              {errors.relievingFactors && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.relievingFactors.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit">
              Add Complaint
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
