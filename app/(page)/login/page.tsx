import React from "react";
import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/footer";
import Forms from "../../../components/Login/form";
import styles from "styles/page.module.css";

// Define the props type for the component, if any props are passed.
// If there are no props, you can use an empty object or omit it.
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="main-page">
      <Navbar />
      <main className={styles.main}>
        <Forms />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
