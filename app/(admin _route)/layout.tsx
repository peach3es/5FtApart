import React, {ReactNode} from "react";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation"
import {authOptions} from "../api/auth/[...nextauth]/route"


interface Props {
    children: ReactNode;
}

export default async function BrokerLayout({children} : Props){
    const session = await getServerSession(authOptions);

    const user = session?.user as {role: string} || undefined
    const isAdmin = user?.role === "admin";

    if (!isAdmin) redirect("/")
    return <>{children}</>;

}