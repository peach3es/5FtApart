import React from "react";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import Forms from "../../../components/form/form";
import styles from "../../page.module.css";

export default function Login() {
  return (
    <div className="main-page">
      <Navbar />
      <main className={styles.main}>
        <Forms />
      </main>
      <Footer />
    </div>
  );
}
