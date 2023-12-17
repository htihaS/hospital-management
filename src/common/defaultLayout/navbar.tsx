import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useRouter } from 'next/router';

export default function Navbar() {
    const [state, setState] = React.useState(false)
    const router = useRouter()
    const [selectedMenu, setSelectedMenu] = React.useState('home'); // default value
    React.useEffect(() => {
        setSelectedMenu(router.pathname);
    }, [router.pathname]);
    const menus = [
        { title: "Home", path: "/" },
        { title: "Employees", path: "/employee/list" },
        { title: "Patients", path: "/patient/list" },
        { title: "Surgeries", path: "/surgery/list" },
    ]

    return (
        <nav className="bg-blue-500 w-full border-b md:border-0 color-white-300">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link href="/">
                        <h1 className="text-3xl font-bold text-white">NEW YORK MEDICAL ASSOCIATES</h1>
                    </Link>
                    <div className="md:hidden">
                        <button
                            className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}
                        >
                            <Menu />
                        </button>
                    </div>
                </div>
                <div
                    className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"
                        }`}
                >
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {menus.map((item, idx) => (
                            <li
                                key={idx}
                                className={`text-white hover:text-indigo-600 ${selectedMenu === item.path ? 'underline' : ''}`}
                                onClick={() => setSelectedMenu(item.path)}
                            >
                                <Link href={item.path}>{item.title}</Link>
                            </li>

                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}