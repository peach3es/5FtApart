import Image from "next/image";
import styles from "./page.module.css";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import Carousel from "../components/gallery/carousel";

export default function Home() {
  return (
    <div className="main-page">
      <Navbar />
      <Carousel />
      <main className={styles.main}></main>
      <Footer />
    </div>
  );
}
