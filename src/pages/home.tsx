import { useRouter } from "next/router"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"

export default function Home() {
    const router = useRouter()
    return (
        <div>
            <div className="flex flex-row justify-center mt-20 h-[100]">
                <Card onClick={() => { router.push('./employee') }} className="cursor-pointer mr-5">
                    <CardHeader>
                        <CardTitle>Employees</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Click to see all the employee details!
                    </CardContent>
                </Card>
                <Card onClick={() => { router.push('./patient') }} className="cursor-pointer">
                    <CardHeader>
                        <CardTitle>Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Click to see all the patients details!
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
