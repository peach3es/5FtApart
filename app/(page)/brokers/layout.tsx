import { Inter } from "next/font/google";
import NavBar from "../../../components/Navbar/navbar";
import Footer from "../../../components/footer";
import "styles/navbar-footer.css";
import { ReactQueryProvider } from "../../ReactQueryProvider";
import { ReduxProvider } from "../../provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <ReduxProvider>
            <div className="main-page flex flex-col h-screen">
              <NavBar />
              {children}
              <Footer />
            </div>
          </ReduxProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
