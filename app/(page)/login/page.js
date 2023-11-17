import React from "react";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import Forms from "../../../components/loginForm/form";
import styles from "../../page.module.css";
import LogInForm from "../../../components/loginForm/form";

export default function Login() {
  return (
    <div className="main-page">
      <Navbar />
      <main className={styles.main}>
        <LogInForm />
      </main>
      <Footer />
    </div>
  );
}
