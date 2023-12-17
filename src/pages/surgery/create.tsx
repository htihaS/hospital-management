// Import necessary dependencies and components
import React, { useEffect, useState } from 'react';
import { useToast } from '~/components/ui/use-toast';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import DefaultLayout from '~/common/defaultLayout';
import ComponentLoader from '~/common/loader';
import { Nurse, Patient, Physician, Rooms } from '@prisma/client';

function EmployeeForm() {
    // Initialize necessary state and hooks
    const { toast } = useToast();
    const router = useRouter();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [specialNeeds, setSpecialNeeds] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [surgeonId, setSurgeonId] = useState(0);
    const [nurseId, setNurseId] = useState(0);
    const [patientId, setPatientId] = useState(0);
    const [roomId, setRoomId] = useState(0);

    const { data: nurseArray, isLoading: nurseLoading } = api.employee.nurseList.useQuery();
    const { data: doctorArray, isLoading: doctorLoading } = api.employee.doctorList.useQuery();
    const { data: roomsArray, isLoading: roomsLoading } = api.employee.roomList.useQuery();
    const { data: patientArray, isLoading: patientLoading } = api.patient.list.useQuery();

    const [patientList, setPatientList] = useState([] as Patient[]);
    const [nurseList, setNurseList] = useState([] as Nurse[]);
    const [doctorList, setDoctorList] = useState([] as Physician[]);
    const [roomsList, setRoomsList] = useState([] as Rooms[]);

    useEffect(() => {
        if (nurseArray) {
            setNurseList(nurseArray);
        }
    }, [nurseArray]);

    useEffect(() => {
        if (doctorArray) {
            setDoctorList(doctorArray);
        }
    }, [doctorArray]);

    useEffect(() => {
        if (patientArray) {
            setPatientList(patientArray);
        }
    }, [patientArray]);

    useEffect(() => {
        if (roomsArray) {
            setRoomsList(roomsArray);
        }
    }, [roomsArray]);

    const createSurgery = api.surgery.create.useMutation();
    const [isLoading, setIsLoading] = useState(false);

    // Handle form submission
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const surgery = await createSurgery.mutateAsync({
                name,
                type,
                location,
                specialNeeds,
                date: new Date(date),
                duration: Number(duration),
                surgeonId,
                patientId,
                nurseId,
                roomId,
            });
            if (surgery) {
                toast({
                    title: 'New Surgy created successfully',
                    description: `Surgery id is ${surgery.id} and commencement time is ${surgery.date}`,
                });
            }
        } catch (error) {
            toast({
                title: 'Unable to create Surgey',
                description: 'Please try again',
            });
        } finally {
            setIsLoading(false);
            router.push('/surgery/list');
        }
    }

    return (
        <>
            {(isLoading || nurseLoading || doctorLoading || roomsLoading || patientLoading) ? (
                <ComponentLoader />
            ) : (
                <div className="border border-gray-300 m-10 justify-center rounded-lg p-10 bg-white shadow-sm">
                    <h1 className="text-center text-gray-800 text-2xl mb-5 font-roboto">Add new Surgery</h1>
                    <form onSubmit={onSubmit} className="rounded rounded-xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 rounded rounded-xl border border-gray-300 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Type of Surgery</label>
                                <input
                                    type="text"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="mt-1 p-2 rounded rounded-xl border border-gray-300 w-full"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Location</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="mt-1 p-2 rounded rounded-xl border border-gray-300 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Special Needs</label>
                                <input
                                    type="text"
                                    value={specialNeeds}
                                    onChange={(e) => setSpecialNeeds(e.target.value)}
                                    className="mt-1 p-2 rounded rounded-xl border border-gray-300 w-full"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Surgery Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="mt-1 p-2 rounded rounded-xl border border-gray-300 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Duration in Hours</label>
                                <input
                                    type="text"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="mt-1 p-2 rounded rounded-xl border border-gray-300 w-full"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Select Patient */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Select a Patient</label>
                                <select
                                    value={patientId}
                                    onChange={(e) => setPatientId(Number(e.target.value))}
                                    className="mt-1 p-2 rounded rounded-xl border border-gray-300 w-full"
                                >
                                    <option value="" disabled>Select</option>
                                    {patientList.map((patient: any) => (
                                        <option key={patient?.id} value={patient?.id}>
                                            {patient?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Select Surgeon/Doctor */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Select a Doctor</label>
                                <select
                                    value={surgeonId}
                                    onChange={(e) => setSurgeonId(Number(e.target.value))}
                                    className="mt-1 p-2 rounded rounded-xl border border-gray-300 w-full"
                                >
                                    <option value="" disabled>Select</option>
                                    {doctorList.map((doctor: any) => (
                                        <option key={doctor?.id} value={doctor?.id}>
                                            {doctor?.employee?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Select Nurse */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Select a Nurse</label>
                                <select
                                    value={nurseId}
                                    onChange={(e) => setNurseId(Number(e.target.value))}
                                    className="mt-1 p-2 rounded rounded-xl border border-gray-300 w-full"
                                >
                                    <option value="" disabled>Select</option>
                                    {nurseList.map((nurse: any) => (
                                        <option key={nurse?.id} value={nurse?.id}>
                                            {nurse?.employee?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Select Room */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Select a Room</label>
                                <select
                                    value={roomId}
                                    onChange={(e) => setRoomId(Number(e.target.value))}
                                    className="mt-1 p-2 rounded rounded-xl border border-gray-300 w-full"
                                >
                                    <option value="" disabled>Select</option>
                                    {roomsList.map((room: any) => (
                                        <option key={room?.id} value={room?.id}>
                                            {room?.roomNumber}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-5 w-20 bg-blue-600 hover:bg-blue-700 text-white rounded rounded-xl py-2 font-roboto"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default DefaultLayout(EmployeeForm);
