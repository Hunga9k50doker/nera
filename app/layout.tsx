import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Toast from "@/components/Toast";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import MainProvider from "@/context/MainContext";
import { ModalProvider } from "@/context/ModalContext";
const inter = Inter({ subsets: ["latin"] });
import "@/assets/styles/global.css";
import "@/assets/styles/responsive.css";
import "@/assets/styles/main.css";

export const metadata: Metadata = {
  title: "Nera",
  description: "Nera",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <StyledComponentsRegistry>
          <MainProvider>
            <ModalProvider>
              {children}
              <Toast />
            </ModalProvider>
          </MainProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
