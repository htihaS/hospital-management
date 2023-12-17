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
    const deleteSuergy = api.surgery.delete.useMutation()
    const { data, isLoading, refetch } = api.surgery.show.useQuery({
        id: Number(router.query.id)
    })

    const handleDelete = async () => {
        setShowDeleteModal(false)
        setLoading(true);
        try {
            const deletedEmployee = await deleteSuergy.mutateAsync({
                id: Number(router?.query?.id)
            })
            if (deletedEmployee) {
                toast({
                    title: "Surgery deleted successfully"
                })
                router.push('/surgery/list')
            } else {
                toast({
                    title: "Cannot delete surgery"
                })
            }
        } catch (error) {
            toast({
                title: "Cannot delete Surgery"
            })
        } finally {
            setLoading(false)
            refetch()
        }
    };
    const [surgery, setEmployee] = useState({} as any)


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
                        Surgery Details
                    </h1>
                    <div className="p-10">
                        <div className="flex justify-end space-x-2 mt-4">
                            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white mb-2">
                                Delete
                            </Button>
                        </div>
                        <Card className='rounded rounded-xl'>
                            <CardHeader className="bg-gray-100">
                                <h2 className="text-xl font-semibold">Surgery Details</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><strong>ID: </strong> {surgery?.id}</div>
                                    <div><strong>patient name: </strong>{surgery?.patient?.name}</div>
                                    <div><strong>Room number: </strong> {surgery?.Room?.roomNumber}</div>
                                    <div><strong>Surgery Name: </strong> {surgery?.name}</div>
                                    <div><strong>Type: </strong> {surgery?.type}</div>
                                    <div><strong>Location: </strong> {surgery?.location}</div>
                                    <div><strong>Duration: </strong> {surgery?.duration}</div>
                                    <div><strong>Date of Surgery :</strong> {new Date(surgery?.date).toLocaleDateString()}</div>
                                    <div><strong>Doctor name: </strong>{surgery?.surgeon?.employee?.name}</div>
                                    <div><strong>Nurse name: </strong>{surgery?.nurse?.employee?.name}</div>

                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </>
            }
        </>
    );
}

export default DefaultLayout(EmployeeDetails);