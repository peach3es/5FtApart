import Image from "next/image";
import styles from "./page.module.css";
import "./navbar-footer.css";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div className="main-page">
      <Navbar />
      <main className={styles.main}></main>
      <Footer />
    </div>
  );
}
