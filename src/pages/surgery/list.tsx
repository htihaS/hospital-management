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
import { Employee, Surgery } from '@prisma/client'
import { useRouter } from 'next/router'
import ComponentLoader from '~/common/loader'
import DefaultLayout from '~/common/defaultLayout'
function surgery() {
    const router = useRouter()
    const [surgeryDate, setSurgeryData] = useState([] as Surgery[])
    const { data, isLoading } = api.surgery.list.useQuery()
    useEffect(() => {
        if (data) {
            setSurgeryData(data)
        }
    }, [data])
    const handleCreateNewEmployees = () => {
        router.push('/surgery/create')
    }
    return (
        <div className='ml-25'>
            {isLoading ? <ComponentLoader /> :
                <>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {`Surgery - ${data && data.length}`}
                    </h1>
                    <Button className="mt-5 bg-blue-500 text-white rounded rounded-xl justify-end" variant="outline" onClick={handleCreateNewEmployees}>Add</Button>
                    <div className='rounded rounded-xl'>
                        <Table className="mt-2 mr-10 w-[80vw]">
                            <TableHeader>
                                <TableRow className='bg-blue-500 text-white' >
                                    <TableHead className="w-[100px]">Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Date of surgery</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {surgeryDate.map((surgery: Surgery) => (
                                    <TableRow className='cursor-pointer hover:bg-gray-300' key={surgery.id} onClick={() => { router.push(`/surgery/${surgery.id}/show`) }}>
                                        <TableCell>{surgery.name}</TableCell>
                                        <TableCell>{surgery.type}</TableCell>
                                        <TableCell>{surgery.location}</TableCell>
                                        <TableCell>{new Date(surgery.date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>}
        </div>
    )

}
export default DefaultLayout(surgery)