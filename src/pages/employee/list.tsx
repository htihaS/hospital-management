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
import ComponentLoader from '~/common/loader'
import DefaultLayout from '~/common/defaultLayout'
function employee() {
    const router = useRouter()
    const [employeeData, setEmployeeData] = useState([] as Employee[])
    const { data, isLoading } = api.employee.list.useQuery()
    useEffect(() => {
        if (data) {
            setEmployeeData(data)
        }
    }, [data])
    const handleCreateNewEmployees = () => {
        router.push('/employee/create')
    }
    return (
        <div className='ml-25'>
            {isLoading ? <ComponentLoader /> :
                <>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {`Staff - ${data && data.length}`}
                    </h1>
                    <Button className="mt-5 bg-blue-500 text-white rounded rounded-xl justify-end" variant="outline" onClick={handleCreateNewEmployees}>Add</Button>
                    <div className='rounded rounded-xl'>
                    <Table className="mt-2 mr-10 w-[80vw]">
                        <TableHeader>
                            <TableRow className='bg-blue-500 text-white' >
                                <TableHead className="w-[100px]">Name</TableHead>
                                <TableHead>SSN</TableHead>
                                <TableHead>Phone number</TableHead>
                                <TableHead>Gender</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employeeData.map((employee: Employee) => (
                                <TableRow className='cursor-pointer hover:bg-gray-300' key={employee.id} onClick={() => { router.push(`/employee/${employee.id}/show`) }}>
                                    <TableCell className="font-medium">{employee.name}</TableCell>
                                    <TableCell>{employee.ssn}</TableCell>
                                    <TableCell>{employee.phone}</TableCell>
                                    <TableCell className="text-right">{employee.gender}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                </>}
        </div>
    )

}
export default DefaultLayout(employee)