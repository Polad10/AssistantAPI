-- CreateTable
CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMPTZ(6) NOT NULL,
    "actions" TEXT,
    "treatment_id" INTEGER NOT NULL,

    CONSTRAINT "appointment_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient" (
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "city" VARCHAR,
    "phone" VARCHAR,
    "extra_info" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "patient_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "treatment_id" INTEGER NOT NULL,

    CONSTRAINT "payment_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatment" (
    "id" SERIAL NOT NULL,
    "start_date" DATE NOT NULL,
    "title" VARCHAR NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "end_date" DATE,

    CONSTRAINT "treatment_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_fk" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_fk" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_fk" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
