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
import { api } from '~/utils/api'
import Loader from '~/common/loader'
import { Employee } from '@prisma/client'
import { useRouter } from 'next/router'
function employee() {
    const router = useRouter()
    const [employeeData, setEmployeeData] = useState([] as Employee[])
    const { data } = api.employee.list.useQuery()
    useEffect(() => {
        if (data) {
            setEmployeeData(data)
        }
    }, [data])

    const handleCreateNewEmployees = () => {
        router.push('/employee/create')
    }
    return (
        <div className='justify-center'>
            <Button className="ml-5 rounded rounded-xl" variant="outline" onClick={handleCreateNewEmployees}>Create Employee</Button>
            <Table className="w-50">
                <TableCaption><blockquote className="mt-6 border-l-2 pl-6 italic">
                    "List of Employees"
                </blockquote></TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>SSN</TableHead>
                        <TableHead>Phone number</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Availability</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employeeData.map((employee: Employee) => (
                        <TableRow className='cursor-pointer hover:bg-gray-300' key={employee.id} onClick={() => { router.push(`/employee/${employee.id}/show`) }}>
                            <TableCell className="font-medium">{employee.name}</TableCell>
                            <TableCell>{employee.ssn}</TableCell>
                            <TableCell>{employee.phone}</TableCell>
                            <TableCell className="text-right">{employee.gender}</TableCell>
                            <TableCell className="text-right">{employee.availability ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>)

}
export default employee