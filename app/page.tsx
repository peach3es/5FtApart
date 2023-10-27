import styles from "../styles/page.module.css";
import Footer from "../components/footer";
import NavBar from "../components/Navbar/navbar";
import HomepagePic from "@/components/Home/HomepagePic";

export default function Home() {
  return (
    <div className="main-page flex flex-col h-screen">
      <NavBar />
      <main className={`${styles.main} flex-start flex-grow overflow-auto`}>
        <HomepagePic />
      </main>
      <Footer />
    </div>
  );
}
