/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - Added the required column `course` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_class` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMINISTRADOR', 'USUARIO');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
ADD COLUMN     "course" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USUARIO',
ADD COLUMN     "user_class" TEXT NOT NULL;
