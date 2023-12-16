import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";

export const patientRouter = createTRPCRouter({
    list: publicProcedure.query(async () => {
        try {
            const patients = await db.patient.findMany({});
            return patients;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    show: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
        try {
            const patient = await db.patient.findFirst({
                where: {
                    id: input.id
                }
            });
            return patient;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    create: publicProcedure.input(createPatientSchema()).mutation(async ({ input }) => {
        try {
            const createEmployee = await db.patient.create({
                data: input
            })
            return createEmployee;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    update: publicProcedure.input(z.object({ id: z.number(), body: updatePatientSchema(), })).mutation(async ({ input }) => {
        try {
            const updatedEmployee = await db.patient.update({
                where: {
                    id: input.id
                },
                data: input.body
            })
            return updatedEmployee;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    delete: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
        try {
            const result = await db.patient.delete({
                where: {
                    id: input.id
                }
            });
            return result;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),
});

function createPatientSchema() {
    return z.object({
        name: z.string(),
        gender: z.string(),
        dob: z.date(),
        address: z.string(),
        ssn: z.string(),
        bloodType: z.string().optional(),
    });
}
function updatePatientSchema() {
    return z.object({
        name: z.string().optional(),
        gender: z.string().optional(),
        dob: z.string().optional(),
        address: z.string().optional(),
        ssn: z.string().optional(),
        bloodType: z.string().optional(),
    });
}
