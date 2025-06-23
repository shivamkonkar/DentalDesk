-- CreateEnum
CREATE TYPE "PainType" AS ENUM ('SHARP', 'DULL_ACHING', 'THROBBING', 'SENSITIVE', 'OTHER');

-- CreateEnum
CREATE TYPE "PainTiming" AS ENUM ('CONSTANT', 'INTERMITTENT', 'ON_STIMULUS', 'NIGHT_ONLY', 'OTHER');

-- CreateTable
CREATE TABLE "ChiefComplaint" (
    "id" UUID NOT NULL,
    "patient_id" UUID NOT NULL,
    "dentist_id" UUID NOT NULL,
    "chief_complaint" VARCHAR(100) NOT NULL,
    "chief_complaint_description" VARCHAR(255) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "location" VARCHAR(100),
    "onset_and_duration" TEXT,
    "painType" "PainType"[],
    "pain_type_other" VARCHAR(100),
    "painTiming" "PainTiming"[],
    "pain_timing_other" VARCHAR(100),
    "pain_severity" INTEGER,
    "aggravating_factors" TEXT,
    "relieving_factors" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChiefComplaint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChiefComplaint_patient_id_idx" ON "ChiefComplaint"("patient_id");

-- CreateIndex
CREATE INDEX "ChiefComplaint_dentist_id_idx" ON "ChiefComplaint"("dentist_id");

-- AddForeignKey
ALTER TABLE "ChiefComplaint" ADD CONSTRAINT "ChiefComplaint_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiefComplaint" ADD CONSTRAINT "ChiefComplaint_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "Dentist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
