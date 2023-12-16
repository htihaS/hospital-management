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
import { toast } from "../../components/ui/use-toast"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Calendar } from "~/components/ui/calendar"
import { cn } from "~/lib/utils"

const formSchema = z.object({
    ssn: z.string(),
    name: z.string(),
    gender: z.enum(gender),
    dob: z.date(),
    address: z.string(),
    bloodType: z.string(),
})

function PatientForm() {
    const createPatient = api.patient.create.useMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ssn: "",
            name: "",
            gender: undefined,
            dob: new Date(),
            address: "",
            bloodType: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try {
            const newPatient = await createPatient.mutateAsync({
                ssn: values.ssn,
                name: values.name,
                gender: values.gender,
                dob: values.dob,
                address: values.address,
                bloodType: values.bloodType
            })
            if (newPatient) {
                toast({
                    title: "You submitted the following values:",
                })
            }
        } catch (error) {
            toast({
                title: "Unable to create employee",
                description: "Please try again"
            })
        }
    }
    return (
        <div className="border border-blue-300 m-10 justify-center rounded rounded-xl p-10">
            <h1 className="text-center text-blue-300 text-2xl mb-5">Create new Patient</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="rounded rounded-md">
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
                                <FormItem className="flex flex-col rounded rounded-xl mt-2">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl className="rounded rounded-xl">
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground rounded rounded-xl"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-100 z-4000" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 opacity-100 rounded rounded-xl bg-blue-300" align="start">
                                            <Calendar
                                                className="opacity-100 rounded rounded-xl bg-blue-300"
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
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
                    <Button className="border border-blue rounded rounded-xl bg-blue-300 mt-5" type="submit">Submit</Button>
                </form>
            </Form>
        </div >
    )
}
export default PatientForm