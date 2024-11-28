-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specie" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "ammonia" TEXT NOT NULL,
    "ph" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,
    "nitrite" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);
