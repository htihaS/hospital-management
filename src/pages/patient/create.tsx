import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "../../components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { api } from "~/utils/api"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select"
import { gender } from "~/utils/constants"
import { useToast } from "../../components/ui/use-toast"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Calendar } from "~/components/ui/calendar"
import { cn } from "~/lib/utils"
import { useState } from "react"
import ComponentLoader from "~/common/loader"
import { useRouter } from "next/router"
import DefaultLayout from "~/common/defaultLayout"

const formSchema = z.object({
    ssn: z.string(),
    name: z.string(),
    gender: z.enum(gender),
    dob: z.string(),
    address: z.string(),
    bloodType: z.string(),
    type: z.string(),
    date: z.string(),
    notes: z.string(),
    allergyName: z.string(),
    severity: z.string(),
    reactions: z.string(),
    frequency: z.string()
})

function PatientForm() {
    const { toast } = useToast()
    const router = useRouter()
    const createPatient = api.patient.create.useMutation()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ssn: "",
            name: "",
            gender: undefined,
            dob: "",
            address: "",
            bloodType: "",
            type: "",
            date: "",
            notes: "",
            allergyName: "",
            severity: "",
            reactions: "",
            frequency: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const newPatient = await createPatient.mutateAsync({
                ssn: values.ssn,
                name: values.name,
                gender: values.gender,
                dob: new Date(values.dob),
                address: values.address,
                bloodType: values.bloodType,
                medicalData: {
                    type: values.type,
                    notes: values.notes,
                    date: new Date(values.date),
                },
                allegries: {
                    allergyName: values.allergyName,
                    severity: values.severity,
                    reactions: values.reactions,
                    frequency: values.frequency
                }
            })
            if (newPatient) {
                toast({
                    title: "New Patient created successfully",
                    description: `Patient id is ${newPatient.id}`
                })
            }
        } catch (error) {
            toast({
                title: "Unable to create employee",
                description: "Please try again"
            })
        } finally {
            setIsLoading(false)
            router.push('/patient/list')
        }
    }
    return (

        <>
            {isLoading ? <ComponentLoader /> :
                <div className="rounded rounded-xl shadow-xl border border-gray-300 m-10 justify-center rounded-lg p-10 bg-white shadow-sm">
                    <h1 className="mb-5 text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Create new Patient
                    </h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-md">
                            <div className="grid w-full grid-cols-2 flex space-x-2">
                                <FormField
                                    control={form.control}
                                    name="ssn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SSN</FormLabel>
                                            <FormControl>
                                                <Input  {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input  {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid w-full grid-cols-2 flex space-x-2">
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem className="rounded rounded-xl">
                                            <FormLabel>Gender</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="rounded rounded-xl">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="z-1000 rounded rounded-xl bg-blue-100 cursor-pointer">
                                                    <SelectItem
                                                        className="cursor-pointer hover:bg-gray-100"
                                                        value="male"
                                                    >
                                                        Male
                                                    </SelectItem>
                                                    <SelectItem
                                                        className="cursor-pointer hover:bg-gray-100"
                                                        value="female"
                                                    >
                                                        Female
                                                    </SelectItem>
                                                    <SelectItem
                                                        className="cursor-pointer hover:bg-gray-100"
                                                        value="others"
                                                    >
                                                        Others
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dob"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date of birth</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid w-full grid-cols-2 flex space-x-2">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input  {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bloodType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blood Type</FormLabel>
                                            <FormControl>
                                                <Input  {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Allergy Details</h2>
                            <div className="grid w-full grid-cols-2 flex space-x-2">
                                <FormField
                                    control={form.control}
                                    name="allergyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Allergy name</FormLabel>
                                            <FormControl>
                                                <Input  {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="severity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Severity</FormLabel>
                                            <FormControl>
                                                <Input  {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid w-full grid-cols-2 flex space-x-2">
                                <FormField
                                    control={form.control}
                                    name="reactions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reactions</FormLabel>
                                            <FormControl>
                                                <Input  {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="frequency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Frequency in a month</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Medical Data</h2>
                            <div className="grid w-full grid-cols-2 flex space-x-2">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Medication Type</FormLabel>
                                            <FormControl>
                                                <Input  {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tell more about allergy</FormLabel>
                                            <FormControl>
                                                <Input type="text-area"  {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid w-full grid-cols-2 flex space-x-2">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Medication started from</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button className="rounded rounded-xl mt-5 w-20 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-roboto" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div >}
        </>
    )
}
export default DefaultLayout(PatientForm)