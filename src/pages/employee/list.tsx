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
function employee() {
    const [employeeData, setEmployeeData] = useState([] as Employee[])
    const { data } = api.employee.list.useQuery()
    console.log("first employee", data)
    useEffect(() => {
        if (data) {
            setEmployeeData(data)
        }
    }, [data])

    const handleCreateNewEmployees = () => {
        alert("Create New Employee")
    }
    return (
        <div className='justify-center'>
            <Button className="ml-5" variant="outline" onClick={handleCreateNewEmployees}>Creat Employee</Button>
            <Table className="w-50">
                <TableCaption>A list of Employees</TableCaption>
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
                        <TableRow key={employee.id}>
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