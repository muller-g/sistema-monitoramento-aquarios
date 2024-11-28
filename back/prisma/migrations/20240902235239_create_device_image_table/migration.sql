/*
  Warnings:

  - You are about to drop the column `img` on the `Device` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "img";

-- CreateTable
CREATE TABLE "Device_Image" (
    "id" TEXT NOT NULL,
    "originalname" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Device_Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_Image_device_id_key" ON "Device_Image"("device_id");

-- AddForeignKey
ALTER TABLE "Device_Image" ADD CONSTRAINT "Device_Image_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
