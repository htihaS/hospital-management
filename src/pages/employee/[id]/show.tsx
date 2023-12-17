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
    const [employee, setEmployee] = useState({} as Employee)


    useEffect(() => {
        if (data) {
            setEmployee(data)
        }
    }, [data])

    return (
        <>
            {(isLoading || loading) ? <ComponentLoader /> :
                <div className="p-10">
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white mb-2">
                            Delete
                        </Button>
                    </div>
                    <Card>
                        <CardHeader className="bg-gray-100">
                            <h2 className="text-xl font-semibold">Staff Details</h2>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div><strong>ID: </strong> {employee.id}</div>
                                <div><strong>Name: </strong> {employee.name}</div>
                                <div><strong>Gender: </strong> {employee.gender}</div>
                                <div><strong>Phone: </strong> {employee.phone}</div>
                                <div><strong>Address: </strong> {employee.address}</div>
                                <div><strong>SSN :</strong> {employee.ssn}</div>
                                <div><strong>Role: </strong>{employee.role}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>}
        </>
    );
}

export default DefaultLayout(EmployeeDetails);