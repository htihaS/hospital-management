import React, { useEffect, useState } from 'react'
import { Button } from "~/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { Patient } from '@prisma/client'
import { api } from '~/utils/api'
import { dateConversion } from '~/utils'
import { useRouter } from 'next/router'
import DefaultLayout from '~/common/defaultLayout'
import ComponentLoader from '~/common/loader'
function Patient() {
    const [patientData, setPatientData] = useState([] as Patient[])
    const router = useRouter()
    const { data, isLoading } = api.patient.list.useQuery()
    useEffect(() => {
        if (data) {
            setPatientData(data)
        }
    }, [data])
    const handleCreateNewEmployees = () => {
        router.push('/patient/create')
    }
    return (
        <div className='ml-25'>
            <Button className="mt-5 rounded rounded-xl" variant="outline" onClick={handleCreateNewEmployees}>Create Patient</Button>

            {isLoading ? <ComponentLoader /> : <Table className="mt-10 mr-10 rounded rounded-xl w-[80vw] border border-blue-black">
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
                        <TableRow className='cursor-pointer hover:bg-gray-300' key={patient.id} onClick={() => { router.push(`/patient/${patient.id}/show`) }}>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.ssn}</TableCell>
                            <TableCell>{dateConversion(patient.dob)}</TableCell>
                            <TableCell className="text-right">{patient.gender}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>}
        </div>)
}
export default DefaultLayout(Patient)
