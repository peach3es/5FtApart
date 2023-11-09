"use client";
import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer";
import NavBar from "../../../components/Navbar/navbar";
import styles from "styles/page.module.css";
import "styles/searchbar.css";
import { useQueryClient } from "react-query";
import { Button } from "@nextui-org/react";

export default function ResultPage () {
return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className={`${styles.main} flex-grow mb-8`}>
        <h1 className="text-3xl font-bold ml-8 mt-5 mb-10">
          All Brokers
        </h1>
            <div>
                
            </div>
  

        
      </main>
      <Footer />
    </div>
  );


}