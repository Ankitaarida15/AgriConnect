/*
  Warnings:

  - You are about to drop the column `buyerName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `farmerId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Farmer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `buyerId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('FARMER', 'BUYER');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_farmerId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "buyerName",
ADD COLUMN     "buyerId" INTEGER NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "farmerId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "village" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL;

-- DropTable
DROP TABLE "Farmer";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
