import React from "react";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import Forms from "../../../components/loginForm/form";
import styles from "../../page.module.css";
import SignupForm from "@/components/signupForm/signupForm";

export default function Signup() {
  return (
    <div className="main-page">
      <Navbar />
      <main className={styles.main}>
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
}
