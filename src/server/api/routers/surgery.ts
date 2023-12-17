import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";

export const surgeryRouter = createTRPCRouter({
    list: publicProcedure.query(async () => {
        try {
            const surgery = await db.surgery.findMany({});
            return surgery;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    show: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
        try {
            const surgery = await db.surgery.findFirst({
                where: {
                    id: input.id
                },
                include: {
                    surgeon: {
                        include: {
                            employee: true
                        }
                    },
                    nurse: {
                        include: {
                            employee: true
                        }
                    },
                    patient: true,
                    Room: true
                },
            })
            return surgery;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    create: publicProcedure.input(createSurgerySchema()).mutation(async ({ input }) => {
        try {
            const createEmployee = await db.surgery.create({
                data: {
                    name: input.name,
                    type: input.type,
                    location: input.location,
                    specialNeeds: input.specialNeeds,
                    surgeonId: input.surgeonId,
                    nurseId: input.nurseId,
                    patientId: input.patientId,
                    date: input.date,
                    duration: input.duration,
                    Room: {
                        connect: {
                            id: input.roomId,
                        }
                    }
                }
            })
            return createEmployee;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    update: publicProcedure.input(z.object({ id: z.number(), body: updateSurgerySchema(), })).mutation(async ({ input }) => {
        try {
            const updatedSurgery = await db.surgery.update({
                where: {
                    id: input.id
                },
                data: input.body
            })
            return updatedSurgery;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    delete: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
        try {
            const result = await db.surgery.delete({
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

function createSurgerySchema() {
    return z.object({
        name: z.string(),
        type: z.string(),
        location: z.string(),
        specialNeeds: z.string(),
        date: z.date(),
        duration: z.number(),
        surgeonId: z.number(),
        nurseId: z.number(),
        patientId: z.number(),
        roomId: z.number(),
    });
}
function updateSurgerySchema() {
    return z.object({
        name: z.string().optional(),
        type: z.string().optional(),
        location: z.string().optional(),
        specialNeeds: z.string().optional(),
        date: z.date().optional(),
        duration: z.number().optional(),
    });
}
