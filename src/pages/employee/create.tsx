// Import necessary dependencies and components
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Calendar } from '~/components/ui/calendar';
import { Button } from '~/components/ui/button';
import { useToast } from '~/components/ui/use-toast';
import { api } from '~/utils/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Input } from '~/components/ui/input';
import { employeeRole, gender } from '~/utils/constants';
import { cn } from '~/lib/utils';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import ComponentLoader from '~/common/loader';
import { useRouter } from 'next/router';
import DefaultLayout from '~/common/defaultLayout';

// Define the employee form schema
const employeeFormSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    address: z.string(),
    phone: z.string(),
    gender: z.enum(gender),
    role: z.enum(employeeRole),
    salary: z.string().refine((value) => /^\d+$/.test(value), {
        message: 'Please enter a valid number.',
    }),
});

function EmployeeForm() {
    // Initialize necessary state and hooks
    const { toast } = useToast();
    const createEmployee = api.employee.create.useMutation();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    // Initialize the form with default values and zod resolver
    const form = useForm<z.infer<typeof employeeFormSchema>>({
        resolver: zodResolver(employeeFormSchema),
        defaultValues: {
            name: '',
            ssn: '',
            address: '',
            phone: '',
            gender: undefined,
            salary: '',
        },
    });

    // Handle form submission
    async function onSubmit(values: z.infer<typeof employeeFormSchema>) {
        setIsLoading(true);
        try {
            const newEmployee = await createEmployee.mutateAsync({
                name: values.name,
                ssn: values.ssn,
                address: values.address,
                phone: values.phone,
                gender: values.gender,
                salary: parseInt(values.salary),
                role: values.role
            });
            if (newEmployee) {
                toast({
                    title: 'New Employee created successfully',
                    description: `Employee id is ${newEmployee.id}`,
                });
            }
        } catch (error) {
            toast({
                title: 'Unable to create employee',
                description: 'Please try again',
            });
        } finally {
            setIsLoading(false);
            router.push('/employee/list')
        }
    }

    return (
        <>
            {isLoading ? (
                <ComponentLoader />
            ) : (
                <div className="border border-gray-300 m-10 justify-center rounded-lg p-10 bg-white shadow-sm">
                    <h1 className="text-center text-gray-800 text-2xl mb-5 font-roboto">Add new Staff</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-md">
                            <div className="grid w-full grid-cols-2 flex space-x-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="ssn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SSN</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="rounded rounded-xl" />
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
                                                <Input {...field} className="rounded rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="number" className="rounded rounded-xl" />
                                            </FormControl>
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
                                                    <SelectItem className="cursor-pointer hover:bg-gray-100" value="male">
                                                        Male
                                                    </SelectItem>
                                                    <SelectItem className="cursor-pointer hover:bg-gray-100" value="female">
                                                        Female
                                                    </SelectItem>
                                                    <SelectItem className="cursor-pointer hover:bg-gray-100" value="others">
                                                        Others
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className="rounded rounded-xl">
                                            <FormLabel>Role</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="rounded rounded-xl">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="z-1000 rounded rounded-xl bg-blue-100 cursor-pointer">
                                                    <SelectItem className="cursor-pointer hover:bg-gray-100" value="SURGEON">
                                                        Surgeon
                                                    </SelectItem>
                                                    <SelectItem className="cursor-pointer hover hover-bg-red-300" value="NURSE">
                                                        Nurse
                                                    </SelectItem>
                                                    <SelectItem className="cursor-pointer hover:bg-gray-100" value="OTHER">
                                                        Other
                                                    </SelectItem>

                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="salary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Salary</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" className="rounded rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="mt-5 w-20 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-roboto" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            )}
        </>
    );
}

export default DefaultLayout(EmployeeForm);
