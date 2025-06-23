/*
  Warnings:

  - You are about to drop the column `status` on the `ChiefComplaint` table. All the data in the column will be lost.
  - You are about to alter the column `onset_and_duration` on the `ChiefComplaint` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(44)`.
  - You are about to alter the column `pain_type_other` on the `ChiefComplaint` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(44)`.
  - You are about to alter the column `pain_timing_other` on the `ChiefComplaint` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(44)`.
  - You are about to alter the column `aggravating_factors` on the `ChiefComplaint` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(44)`.
  - You are about to alter the column `relieving_factors` on the `ChiefComplaint` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(44)`.

*/
-- AlterTable
ALTER TABLE "ChiefComplaint" DROP COLUMN "status",
ALTER COLUMN "onset_and_duration" SET DATA TYPE VARCHAR(44),
ALTER COLUMN "pain_type_other" SET DATA TYPE VARCHAR(44),
ALTER COLUMN "pain_timing_other" SET DATA TYPE VARCHAR(44),
ALTER COLUMN "aggravating_factors" SET DATA TYPE VARCHAR(44),
ALTER COLUMN "relieving_factors" SET DATA TYPE VARCHAR(44);
