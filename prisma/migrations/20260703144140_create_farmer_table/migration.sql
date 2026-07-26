-- CreateTable
CREATE TABLE "Farmer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "village" TEXT NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);
