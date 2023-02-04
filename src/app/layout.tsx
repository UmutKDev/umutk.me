import "src/styles/globals.css";
import Sidebar from "src/components/layouts/Sidebar";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={poppins.className}>
        <Sidebar />
        <main className="w-[calc(100vw-15rem)]">{children}</main>
      </body>
    </html>
  );
}
