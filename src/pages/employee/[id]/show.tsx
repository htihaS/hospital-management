import React, { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { Employee, Patient } from '@prisma/client';

function EmployeeDetails() {
    const router = useRouter()
    // Dummy function for handling button clicks
    const handleEdit = () => {
        console.log('Edit employee');
        // Add your edit logic here
    };

    const handleDelete = () => {
        console.log('Delete employee');
        // Add your delete logic here
    };

    const handleBookAppointment = () => {
        console.log('Book appointment');
        // Add your booking logic here
    };
    const [employee, setEmployee] = useState({} as Employee)
    const { data } = api.employee.show.useQuery({
        id: Number(router.query.id)
    })

    useEffect(() => {
        if (data) {
            setEmployee(data)
        }
    }, [data])

    return (
        <div className="p-10">
            <Card>
                <CardHeader className="bg-gray-100">
                    <h2 className="text-xl font-semibold">Patient Details</h2>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div><strong>ID: </strong> {employee.id}</div>
                        <div><strong>Name: </strong> {employee.name}</div>
                        <div><strong>Gender: </strong> {employee.gender}</div>
                        <div><strong>Phone: </strong> {employee.phone}</div>
                        <div><strong>Address: </strong> {employee.address}</div>
                        <div><strong>SSN :</strong> {employee.ssn}</div>
                        <div><strong>Available: </strong> {employee.availability}</div>
                        <div><strong>Role: </strong>{employee.role}</div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white">
                    Edit
                </Button>
                <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white">
                    Delete
                </Button>
                <Button onClick={handleBookAppointment} className="bg-green-500 hover:bg-green-700 text-white">
                    Book Appointment
                </Button>
            </div>
        </div>
    );
}

export default EmployeeDetails;