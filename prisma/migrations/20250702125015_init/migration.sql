-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other', 'Prefer not to say');

-- CreateEnum
CREATE TYPE "BloodGroupType" AS ENUM ('A', 'B', 'O', 'AB', 'Others');

-- CreateEnum
CREATE TYPE "BloodGroupRh" AS ENUM ('+', '-');

-- CreateEnum
CREATE TYPE "PainType" AS ENUM ('SHARP', 'DULL_ACHING', 'THROBBING', 'SENSITIVE');

-- CreateEnum
CREATE TYPE "PainTiming" AS ENUM ('CONSTANT', 'INTERMITTENT', 'ON_STIMULUS', 'NIGHT_ONLY');

-- CreateEnum
CREATE TYPE "ChiefComplaintStatus" AS ENUM ('ACTIVE', 'RESOLVED', 'UNDER_OBSERVATION');

-- CreateTable
CREATE TABLE "Dentist" (
    "id" UUID NOT NULL,
    "onboarding_status" BOOLEAN NOT NULL DEFAULT false,
    "full_name" VARCHAR(44),
    "phone" VARCHAR(10),
    "email" TEXT,
    "clinic_name" VARCHAR(44),
    "clinic_slogan" VARCHAR(100),
    "clinic_address" VARCHAR(255),
    "clinic_logo" VARCHAR(500),

    CONSTRAINT "Dentist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" UUID NOT NULL,
    "dentist_id" UUID NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(10) NOT NULL,
    "dob" TIMESTAMP(3),
    "gender" "Gender" DEFAULT 'Prefer not to say',
    "email" TEXT,
    "locality" VARCHAR(20),
    "profession" VARCHAR(20),
    "blood_group_type" "BloodGroupType",
    "blood_group_rh" "BloodGroupRh",
    "blood_group_other_details" VARCHAR(50),
    "has_diabetes" BOOLEAN NOT NULL DEFAULT false,
    "has_hypertension" BOOLEAN NOT NULL DEFAULT false,
    "is_pregnant" BOOLEAN NOT NULL DEFAULT false,
    "has_cancer_history" BOOLEAN NOT NULL DEFAULT false,
    "has_hiv" BOOLEAN NOT NULL DEFAULT false,
    "has_known_allergies" BOOLEAN NOT NULL DEFAULT false,
    "has_asthma" BOOLEAN NOT NULL DEFAULT false,
    "has_bleeding_disorders" BOOLEAN NOT NULL DEFAULT false,
    "has_heart_conditions" BOOLEAN NOT NULL DEFAULT false,
    "other_medical_condition" VARCHAR(100),
    "emergency_contact_name" TEXT,
    "emergency_contact_phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChiefComplaint" (
    "id" UUID NOT NULL,
    "patient_id" UUID NOT NULL,
    "dentist_id" UUID NOT NULL,
    "chief_complaint" VARCHAR(100) NOT NULL,
    "chief_complaint_description" VARCHAR(255),
    "location" VARCHAR(100),
    "status" "ChiefComplaintStatus" NOT NULL,
    "onset_and_duration" VARCHAR(44),
    "painType" "PainType",
    "painTiming" "PainTiming",
    "pain_severity" INTEGER,
    "aggravating_factors" VARCHAR(44),
    "relieving_factors" VARCHAR(44),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChiefComplaint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dentist_email_key" ON "Dentist"("email");

-- CreateIndex
CREATE INDEX "Patient_dentist_id_idx" ON "Patient"("dentist_id");

-- CreateIndex
CREATE INDEX "Patient_dentist_id_full_name_idx" ON "Patient"("dentist_id", "full_name");

-- CreateIndex
CREATE INDEX "Patient_dentist_id_phone_idx" ON "Patient"("dentist_id", "phone");

-- CreateIndex
CREATE INDEX "ChiefComplaint_patient_id_idx" ON "ChiefComplaint"("patient_id");

-- CreateIndex
CREATE INDEX "ChiefComplaint_dentist_id_idx" ON "ChiefComplaint"("dentist_id");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "Dentist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiefComplaint" ADD CONSTRAINT "ChiefComplaint_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiefComplaint" ADD CONSTRAINT "ChiefComplaint_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "Dentist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
