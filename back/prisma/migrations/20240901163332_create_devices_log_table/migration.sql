/*
  Warnings:

  - You are about to drop the column `ammonia` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `nitrite` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `ph` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `Device` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "ammonia",
DROP COLUMN "nitrite",
DROP COLUMN "ph",
DROP COLUMN "temperature";

-- CreateTable
CREATE TABLE "Device_Log" (
    "id" TEXT NOT NULL,
    "ammonia" TEXT NOT NULL,
    "ph" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,
    "nitrite" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Device_Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Device_Log" ADD CONSTRAINT "Device_Log_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
