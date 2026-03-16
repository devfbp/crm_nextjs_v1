import { Poppins } from "next/font/google";
import "../../public/assets/css/bootstrap.min.css";
import "overlayscrollbars/overlayscrollbars.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../public/assets/css/all.min.css";
import "../../public/assets/css/style.css";
import { DigiProvider } from "@/context/DigiContext";
import LayoutServer from "@/component/layout/LayoutServer";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "./globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DigiProvider>
      <html lang="en">
        <body className={`${poppins.variable} ${process.env.NEXT_PUBLIC_DEFAULT_THEME}-theme`}>
          <LayoutServer>{children}</LayoutServer>
          <ToastContainer />
        </body>
      </html>
    </DigiProvider>
  );
}
