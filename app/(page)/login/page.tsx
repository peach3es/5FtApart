import React from "react";
import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/footer";
import Forms from "../../../components/Login/form";
import styles from "styles/page.module.css";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function login(){
  const session = await getServerSession(authOptions);
  if (session) redirect("/")
  
  return (
    <div className="main-page flex flex-col h-screen">
      <Navbar />
      <main className={`${styles.main} flex-grow`}>
        <Forms />
      </main>
      <Footer />
    </div>
  );
};
