import React, { useEffect, useState } from 'react'
import { Button } from "~/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { Patient } from '@prisma/client'
import { api } from '~/utils/api'
import { dateConversion } from '~/utils'
export default function Patient() {
    const [patientData, setPatientData] = useState([] as Patient[])
    const { data } = api.patient.list.useQuery()
    useEffect(() => {
        if (data) {
            setPatientData(data)
        }
    }, [data])
    const handleCreateNewEmployees = () => {
        alert("Create New Patient")
    }
    return (
        <>
            <Button className="ml-5" variant="outline" onClick={handleCreateNewEmployees}>Creat Patient</Button>

            <Table className="w-50">
                <TableCaption>A list of Patients.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>SSN</TableHead>
                        <TableHead>DOB</TableHead>
                        <TableHead className="text-right">Gender</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patientData.map((patient: Patient) => (
                        <TableRow key={patient.id}>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.ssn}</TableCell>
                            <TableCell>{dateConversion(patient.dob)}</TableCell>
                            <TableCell className="text-right">{patient.gender}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
               
            </Table>
        </>)
}
