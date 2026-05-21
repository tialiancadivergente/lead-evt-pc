import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "O Resgate dos Otimistas - Diagnostico de Dependencia Emocional",
  description:
    "Faca seu diagnostico de dependencia emocional gratuito e descubra como aumentar seu nivel de permissao.",
};

export default function QuizLayout({ children }: { children: ReactNode }) {
  return (
    <div className={inter.className}>
      <main>{children}</main>
      <Analytics />
    </div>
  );
}
