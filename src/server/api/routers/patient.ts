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
                },
                include: {
                    appointments: {
                        include: {
                            physcian: {
                                include: {
                                    employee: true
                                }
                            }
                        }
                    },
                    medicalData: true,
                    allergies: true
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
                data: {
                    name: input.name,
                    gender: input.gender,
                    dob: input.dob,
                    address: input.address,
                    ssn: input.ssn,
                    bloodType: input.bloodType,
                    medicalData: {
                        create: {
                            type: input.medicalData.type,
                            date: input.medicalData.date,
                            notes: input.medicalData.notes
                        }
                    },
                    allergies: {
                        create: {
                            name: input.allegries.allergyName,
                            severity: input.allegries.severity,
                            reactions: input.allegries.reactions,
                            frequency: input.allegries.frequency
                        }
                    }
                }
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

    addMedicalData: publicProcedure
        .input(z.object({
            type: z.string(),
            date: z.date(),
            notes: z.string(),
            patientId: z.number(),
        }))
        .mutation(async ({ input }) => {
            try {
                const result = await db.medicalData.create({
                    data: {
                        ...input
                    }
                });
                return result;
            } catch (error: any) {
                throw new Error(error.message)
            }
        }),

    addAllergies: publicProcedure
        .input(z.object({ name: z.string(), severity: z.string(), reactions: z.string().optional(), frequency: z.string(), patientId: z.number() }))
        .mutation(async ({ input }) => {
            try {
                const result = await db.allergy.create({
                    data: {
                        ...input
                    }
                });
                return result;
            } catch (error: any) {
                throw new Error(error.message)
            }
        }),

    bookAppointment: publicProcedure.input(z.object({ patientId: z.number(), physcianId: z.number(), date: z.date() })).mutation(async ({ input }) => {
        try {
            const createAppointment = await db.appointment.create({
                data: {
                    ...input,
                },
                include: {
                    physcian: {
                        include: {
                            employee: true
                        }
                    }
                }
            })
            return createAppointment;
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
        medicalData: z.object({
            type: z.string(),
            date: z.date(),
            notes: z.string()
        }),
        allegries: z.object({
            allergyName: z.string(),
            severity: z.string(),
            reactions: z.string(),
            frequency: z.string()
        })
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
