import { Inter } from "next/font/google";
import NavBar from "../../../components/Navbar/navbar";
import Footer from "../../../components/footer";
import "styles/navbar-footer.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  className={`${inter.className}`}>
        <div className="main-page flex flex-col h-screen">
          <NavBar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}