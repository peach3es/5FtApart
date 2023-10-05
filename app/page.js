import Image from "next/image";
import styles from "./page.module.css";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";

const Home = () => {
  return (
    <div className="main-page">
      <Navbar />
      <main className={styles.main}></main>
      <Footer />
    </div>
  );
};

export default Home;
