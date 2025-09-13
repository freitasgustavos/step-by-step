import { Inter } from "next/font/google";
import type { Metadata } from 'next';
import "../styles/globals.css";
import Providers from '@/providers/Providers';
import { AppLayout } from "@/components/layout/AppLayout";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema de Cadastro',
  description: "Bem-vindo ao Sistema de Cadastro"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AppLayout>
            {children}
          </AppLayout>
        </Providers>
      </body>
    </html>
  );
}
