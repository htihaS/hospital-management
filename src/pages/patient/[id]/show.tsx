import React, { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { Physician } from '@prisma/client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "../../../components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../../components/ui/alert-dialog"

import { useToast } from '~/components/ui/use-toast';
import ComponentLoader from '~/common/loader';
import DefaultLayout from '~/common/defaultLayout';

function PatientDetails() {
    const router = useRouter()
    const { toast } = useToast()
    const { data, isLoading, refetch } = api.patient.show.useQuery({
        id: Number(router.query.id)
    })
    const { data: availableDoctors } = api.employee.getAvailablePhysicians.useQuery()
    const createAppointment = api.patient.bookAppointment.useMutation()
    const deletePatient = api.patient.delete.useMutation()
    const [loading, setLoading] = useState(false)
    const [patient, setPatient] = useState({} as any)
    const [doctors, setDoctors] = useState([] as any[])
    const [appointmentDetails, setAppointmentDetails] = useState({
        doctorId: '',
        date: ''
    });
    const [bookAppointment, setBookAppointment] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    useEffect(() => {
        if (availableDoctors) {
            setDoctors(availableDoctors)
        }
    }, [availableDoctors])

    useEffect(() => {
        if (data) {
            setPatient(data)
        }
    }, [data])



    const handleDelete = async () => {
        setShowDeleteModal(false)
        setLoading(true);
        try {
            const deletedPatient = await deletePatient.mutateAsync({
                id: Number(router?.query?.id)
            })
            if (deletedPatient) {
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

    const handleConfirmAppointmnet = async () => {
        setBookAppointment(false)
        setLoading(true)
        // Add your booking logic here
        try {
            const appointment = await createAppointment.mutateAsync({
                patientId: Number(router.query.id),
                physcianId: Number(appointmentDetails.doctorId),
                date: new Date(appointmentDetails.date)
            })
            if (appointment) {
                toast({
                    title: `Appointment booked successfully with ${appointment.physcian.employee?.name} on ${appointment.date}`,
                    description: `Appointment number is ${appointment.id}`
                })
            }
        } catch (error) {
            toast({
                title: `Cannot book appointment`,
            })
        } finally {
            setLoading(false)
            refetch()
        }
    };

    return (
        <>
            {(isLoading || loading) ? <ComponentLoader /> :
                <>
                    <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Patient Details
                    </h1>
                    <div className="p-10">
                        <div className="flex justify-end space-x-2 mt-4">
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button onClick={() => { setShowDeleteModal(true) }} className="bg-red-500 hover:bg-red-700 text-white rounded rounded-xl">
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                {showDeleteModal &&
                                    <AlertDialogContent className='border border-black-600'>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>{`Do you want to Delete ${patient.name}`}</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the patient.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>}
                            </AlertDialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button onClick={() => { setBookAppointment(true) }} className="bg-green-500 hover:bg-green-700 text-white rounded rounded-xl">
                                        Book Appointment
                                    </Button>
                                </DialogTrigger>
                                {bookAppointment && <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Book an Appointment</DialogTitle>
                                        <select value={appointmentDetails.doctorId} onChange={e => setAppointmentDetails({ ...appointmentDetails, doctorId: e.target.value })}>
                                            <>
                                                <option key={0} value={""}>{'Select'}</option>
                                                {doctors.map(doctor => (
                                                    <option key={doctor.id} value={doctor.id}>{doctor?.employee?.name}</option>
                                                ))}
                                            </>
                                        </select>
                                        <input className='mt-5' type="date" value={appointmentDetails.date} onChange={e => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })} />

                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button className="bg-green-500 hover:bg-green-700 text-white rounded rounded-xl" onClick={handleConfirmAppointmnet}>Confirm</Button>
                                    </DialogFooter>
                                </DialogContent>}
                            </Dialog>
                        </div>
                        <Card className='rounded rounded-xl mt-5'>
                            <CardHeader className="bg-gray-100">
                                <h2 className="text-xl font-semibold">Patient Details</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><strong>ID:</strong> {patient.id}</div>
                                    <div><strong>Name:</strong> {patient.name}</div>
                                    <div><strong>Gender:</strong> {patient.gender}</div>
                                    <div><strong>Date of Birth:</strong> {new Date(patient.dob).toLocaleDateString()}</div>
                                    <div><strong>Address:</strong> {patient.address}</div>
                                    <div><strong>SSN:</strong> {patient.ssn}</div>
                                    <div><strong>Blood Type:</strong> {patient.bloodType}</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className='rounded rounded-xl mt-5'>
                            <CardHeader className="bg-gray-100">
                                <h2 className="text-xl font-semibold">Appointment Data</h2>
                            </CardHeader>
                            <CardContent>
                                {patient?.appointments?.map((appointment: any) => {
                                    return (
                                        <div className="mt-2 mb-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div><strong>Appointment number: </strong> {appointment.id}</div>
                                                <div><strong>Date: </strong> {new Date(appointment.date).toLocaleDateString()}</div>
                                                <div><strong>Doctor Name: </strong> {appointment?.physcian?.employee?.name}</div>
                                            </div>
                                            <hr className='mt-2' />
                                        </div>
                                    )
                                })}
                            </CardContent>
                        </Card>

                        <Card className='rounded rounded-xl mt-5'>
                            <CardHeader className="bg-gray-100">
                                <h2 className="text-xl font-semibold">Medical Data</h2>
                            </CardHeader>
                            {patient.medicalData ?
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><strong>ID:</strong> {patient?.medicalData?.id}</div>
                                        <div><strong>Type:</strong> {patient?.medicalData?.type}</div>
                                        <div><strong>Notes:</strong> {patient?.medicalData?.notes}</div>
                                        <div><strong>Date:</strong> {new Date(patient?.medicalData?.date ?? "").toLocaleDateString()}</div>
                                    </div>

                                </CardContent>
                                : <CardContent>
                                    <div className='text-center'>No Medical data</div>
                                </CardContent>
                            }
                        </Card>

                        <Card className='rounded rounded-xl mt-5'>
                            <CardHeader className="bg-gray-100">
                                <h2 className="text-xl font-semibold">Allerigies Data</h2>
                            </CardHeader>
                            {patient.allergies ? <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><strong>ID:</strong> {patient?.allergies?.id}</div>
                                    <div><strong>Name:</strong> {patient?.allergies?.name}</div>
                                    <div><strong>Severity:</strong> {patient?.allergies?.severity}</div>
                                    <div><strong>Reactions:</strong> {patient?.allergies?.reactions}</div>
                                </div>
                            </CardContent> :
                                <CardContent>
                                    <div className='text-center'>No Allergies data</div>
                                </CardContent>}
                        </Card>
                    </div>
                </>
            }
        </>
    );
}

export default DefaultLayout(PatientDetails);