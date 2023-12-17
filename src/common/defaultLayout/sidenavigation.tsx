import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import React from "react";
// import { Menu, Transition } from "headlessui/react";
// import ArrowTopRightOnSquareIcon

function SidebarNavigation(props: any) {
    const router = useRouter();


    const navigation = [
        {
            name: "Leads",
            path: "lead",
            href: "/lead/list",
            icon: "/icons/leads.svg",
        },
        {
            name: "Applications",
            path: "application",
            href: "/application/list",
            icon: "/icons/application.svg",
        },
        {
            name: "Policies",
            href: "/policy/list",
            path: "policy",
            icon: "/icons/policy.svg",
        },
        {
            name: "Claims",
            path: "claim",
            href: "/claim/list",
            icon: "/icons/claim.svg",
        },
        {
            name: "Complaints",
            path: "complaint",
            href: "/complaint/list",
            icon: "/icons/complaint.svg",
        },
    ];


    return (
        <div className="fixed inset-0 z-10 flex h-screen w-[85px] flex-col bg-primary-blue">
            <div className="flex h-[60px] shrink-0 items-center justify-center ">
                <Link href={"/"}>
                    <Image
                        src="/favicon.ico"
                        width={73}
                        height={20}
                        alt="hospital logo"
                    />
                </Link>
            </div>
            <nav className="flex h-full flex-1 flex-col items-center">
                <div className="flex w-full flex-1  flex-col ">
                    {navigation.map((item: any) => {
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex  flex-col items-center justify-center p-2  ${item.current == true ||
                                        router.pathname.includes(item.path.toLowerCase())
                                        ? "bg-secondary-blue"
                                        : "hover:bg-[#0076BD]"
                                    }`}
                            >
                                <Image
                                    src={item.icon}
                                    width={20}
                                    height={20}
                                    alt={item.name}
                                />
                                <span className="text-[11px] font-medium tracking-[0.25px] text-white group-hover:text-grey-1">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    }
                    )}
                </div>
            </nav>
        </div>
    );
}

export default SidebarNavigation;
