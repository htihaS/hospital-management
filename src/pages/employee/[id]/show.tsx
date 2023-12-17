import React, { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { Employee, Patient } from '@prisma/client';
import DefaultLayout from '~/common/defaultLayout';
import { useToast } from '~/components/ui/use-toast';
import ComponentLoader from '~/common/loader';

function EmployeeDetails() {
    const router = useRouter()
    const { toast } = useToast()

    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const deleteEmployee = api.employee.delete.useMutation()
    const { data, isLoading, refetch } = api.employee.show.useQuery({
        id: Number(router.query.id)
    })

    const handleDelete = async () => {
        setShowDeleteModal(false)
        setLoading(true);
        try {
            const deletedEmployee = await deleteEmployee.mutateAsync({
                id: Number(router?.query?.id)
            })
            if (deletedEmployee) {
                toast({
                    title: "Patient deleted successfully"
                })
                router.push('/patient/list')
            } else {
                toast({
                    title: "Cannot delete Patient"
                })
            }
        } catch (error) {
            toast({
                title: "Cannot delete Patient"
            })
        } finally {
            setLoading(false)
            refetch()
        }
    };
    const [employee, setEmployee] = useState({} as any)


    useEffect(() => {
        if (data) {
            setEmployee(data)
        }
    }, [data])
    return (
        <>
            {(isLoading || loading) ? <ComponentLoader /> :
                <>
                    <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Employee Details
                    </h1>
                    <div className="p-10">
                        <div className="flex justify-end space-x-2 mt-4">
                            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white mb-2">
                                Delete
                            </Button>
                        </div>
                        <Card className='rounded rounded-xl'>
                            <CardHeader className="bg-gray-100">
                                <h2 className="text-xl font-semibold">Employee Details</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><strong>ID: </strong> {employee?.id}</div>
                                    <div><strong>Name: </strong> {employee?.name}</div>
                                    <div><strong>Gender: </strong> {employee?.gender}</div>
                                    <div><strong>Phone: </strong> {employee?.phone}</div>
                                    <div><strong>Address: </strong> {employee?.address}</div>
                                    <div><strong>SSN :</strong> {employee?.ssn}</div>
                                    <div><strong>Role: </strong>{employee?.role}</div>
                                </div>
                            </CardContent>
                        </Card>
                        {employee?.primaryPhysician &&
                            <>
                                <Card className='mt-5 rounded rounded-xl'>
                                    <CardHeader className="bg-gray-100">
                                        <h2 className="text-xl font-semibold">Doctor Details</h2>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><strong>ID: </strong> {employee?.primaryPhysician?.id}</div>
                                            <div><strong>Grade: </strong> {employee?.primaryPhysician?.grade}</div>
                                            <div><strong>Speciality: </strong> {employee?.primaryPhysician?.specialty}</div>
                                            <div><strong>Max appointments/day: </strong> {employee?.primaryPhysician?.maxAppointments}</div>
                                            <div><strong>Availability: </strong> {employee?.primaryPhysician?.availability ? 'Yes' : 'No'}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className='mt-5 rounded rounded-xl'>
                                    <CardHeader className="bg-gray-100">
                                        <h2 className="text-xl font-semibold">Appointments</h2>
                                    </CardHeader>
                                    <CardContent>
                                        {employee?.primaryPhysician?.appointments.map((appointment: any) => {
                                            return (
                                                <>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div><strong>Appointment Number: </strong> {appointment?.id}</div>
                                                        <div><strong>Date of Appointment: </strong> {new Date(appointment?.date).toLocaleDateString()}</div>
                                                        <div><strong>Patient name: </strong> {appointment?.patient?.name}</div>
                                                    </div>
                                                    <hr />
                                                </>
                                            )
                                        })}
                                    </CardContent>
                                </Card>
                            </>
                        }
                        {employee?.nurse && <Card className='mt-5 rounded rounded-xl'>
                            <CardHeader className="bg-gray-100">
                                <h2 className="text-xl font-semibold">Nurse Details</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div><strong>ID: </strong> {employee.nurse.id}</div>
                                    <div><strong>Grade: </strong> {employee.nurse.grade}</div>
                                    <div><strong>Experience: </strong> {employee.nurse.years}</div>
                                    <div><strong>Availability: </strong> {employee.nurse.availability ? 'Yes' : 'No'}</div>
                                </div>
                            </CardContent>
                        </Card>}
                    </div>
                </>
            }
        </>
    );
}

export default DefaultLayout(EmployeeDetails);