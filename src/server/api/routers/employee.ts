import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import { employeeRole } from "~/utils/constants";


export const employeeRouter = createTRPCRouter({
    list: publicProcedure.query(async () => {
        try {
            const employees = await db.employee.findMany();
            return employees;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    show: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
        try {
            const employee = await db.employee.findFirst({
                where: {
                    id: input.id
                },
                include: {
                    primaryPhysician: {
                        include: {
                            appointments: {
                                include: {
                                    patient: true
                                }
                            }
                        }
                    },
                    nurse: true
                }
            });
            return employee;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    create: publicProcedure.input(createEmployeeSchema()).mutation(async ({ input }) => {
        try {
            const createEmployee = await db.employee.create({
                data: input
            })
            return createEmployee;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    update: publicProcedure.input(z.object({ id: z.number(), body: updateEmployeeSchema(), })).mutation(async ({ input }) => {
        try {
            const updatedEmployee = await db.employee.update({
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
            const result = await db.employee.delete({
                where: {
                    id: input.id
                }
            });
            return result;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

    getAvailablePhysicians: publicProcedure.query(async () => {
        try {
            const physiciansWithAppointmentCounts = await db.physician.findMany({
                select: {
                    id: true,
                    specialty: true,
                    grade: true,
                    availability: true,
                    maxAppointments: true,
                    appointments: true,
                    employee: true
                },
            });
            return physiciansWithAppointmentCounts;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }),

});

function createEmployeeSchema() {
    return z.object({
        ssn: z.string(),
        name: z.string(),
        address: z.string(),
        phone: z.string(),
        gender: z.string(),
        salary: z.number(),
        role: z.enum(employeeRole),
    });
}
function updateEmployeeSchema() {
    return z.object({
        ssn: z.string().optional(),
        name: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        gender: z.string().optional(),
        salary: z.number().optional(),
        role: z.enum(employeeRole).optional(),
    });
}
