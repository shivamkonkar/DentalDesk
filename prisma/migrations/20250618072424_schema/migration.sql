-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other', 'Prefer not to say');

-- CreateEnum
CREATE TYPE "BloodGroupType" AS ENUM ('A', 'B', 'O', 'AB', 'Others');

-- CreateEnum
CREATE TYPE "BloodGroupRh" AS ENUM ('+', '-');

-- CreateTable
CREATE TABLE "Dentist" (
    "id" UUID NOT NULL,
    "onboarding_status" BOOLEAN NOT NULL DEFAULT false,
    "full_name" VARCHAR(44),
    "phone" VARCHAR(10),
    "email" TEXT,
    "clinic_name" VARCHAR(44) NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Dentist_email_key" ON "Dentist"("email");

-- CreateIndex
CREATE INDEX "Patient_dentist_id_idx" ON "Patient"("dentist_id");

-- CreateIndex
CREATE INDEX "Patient_dentist_id_full_name_idx" ON "Patient"("dentist_id", "full_name");

-- CreateIndex
CREATE INDEX "Patient_dentist_id_phone_idx" ON "Patient"("dentist_id", "phone");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "Dentist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
