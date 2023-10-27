import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ReactQueryProvider } from "./ReactQueryProvider";
config.autoAddCss = false;

import "styles/globals.css";
import { Inter } from "next/font/google";
import { ReduxProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "5FtApart",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}