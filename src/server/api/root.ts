import { createTRPCRouter } from "~/server/api/trpc";
import { employeeRouter } from "./routers/employee";
import { patientRouter } from "./routers/patient";
import { surgeryRouter } from "./routers/surgery";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    employee: employeeRouter,
    patient: patientRouter,
    surgery: surgeryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
