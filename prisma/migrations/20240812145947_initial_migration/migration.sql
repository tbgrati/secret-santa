-- CreateTable
CREATE TABLE "Group" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupPerson" (
    "id" UUID NOT NULL,
    "personId" UUID NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "GroupPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecretSanta" (
    "id" UUID NOT NULL,
    "gifterId" UUID NOT NULL,
    "gifteeId" UUID NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "SecretSanta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupPerson_personId_groupId_key" ON "GroupPerson"("personId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "SecretSanta_gifterId_gifteeId_year_key" ON "SecretSanta"("gifterId", "gifteeId", "year");

-- AddForeignKey
ALTER TABLE "GroupPerson" ADD CONSTRAINT "GroupPerson_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPerson" ADD CONSTRAINT "GroupPerson_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecretSanta" ADD CONSTRAINT "SecretSanta_gifterId_fkey" FOREIGN KEY ("gifterId") REFERENCES "GroupPerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecretSanta" ADD CONSTRAINT "SecretSanta_gifteeId_fkey" FOREIGN KEY ("gifteeId") REFERENCES "GroupPerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
