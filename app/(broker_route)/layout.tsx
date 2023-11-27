import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

interface Props {
  children: ReactNode;
}

export default async function BrokerLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  const user = (session?.user as { role: string }) || undefined;
  const isBroker = user?.role === "broker";

  if (!isBroker) redirect("/");
  return (
    <>
      <NextSSRPlugin //This is the line makes the loading right away for upload file button
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      {children}
    </>
  );
}
