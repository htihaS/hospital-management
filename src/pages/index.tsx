import { useRouter } from "next/router"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import DefaultLayout from "~/common/defaultLayout"


function Home() {
  const router = useRouter()
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-blue-500 mt-20 w-[30]">
        Empowering Healthcare.
      </h1>
      <blockquote className="align-center mt-6 border-l-2 pl-6 italic right-0">
        "Your Wellness, Our Priority - Transforming Lives, One Patient at a Time."
      </blockquote>
      <div className="text-center flex flex-row mt-20 h-[100]">
        <Card onClick={() => { router.push('./employee/list') }} className="rounded rounded-xl cursor-pointer mr-5 hover:bg-gray-300">
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent>
            Click to see all the employee details!
          </CardContent>
        </Card>
        <Card onClick={() => { router.push('./patient/list') }} className="rounded rounded-xl cursor-pointer mr-5 hover:bg-gray-300">
          <CardHeader>
            <CardTitle>Patients</CardTitle>
          </CardHeader>
          <CardContent>
            Click to see all the patients details!
          </CardContent>
        </Card>
        <Card onClick={() => { router.push('./surgery/list') }} className="rounded rounded-xl cursor-pointer mr-5 hover:bg-gray-300">
          <CardHeader>
            <CardTitle>Surgery</CardTitle>
          </CardHeader>
          <CardContent>
            Click to see all the surgery details!
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DefaultLayout(Home)
