'use client';

import React from "react";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import styles from "../../page.module.css";
import Card from "../../../components/Propertycard/card";

export default function Signup() {
  return (
    <div className="main-page">
      <Navbar />
      <main className={styles.main}>
       <Card/>
      </main>
      <Footer />
    </div>
  );
}
