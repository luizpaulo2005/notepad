import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider, QueryProvider, ThemeProvider } from "@/app/providers";
import { Navbar } from "@/components/navbar/navbar";
import { client } from "@/lib/postgres-client";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const checkPostgresConnection = async () => {
    try {
      await client.connect();
      console.log("Conexão bem-sucedida ao PostgreSQL!");
    } catch (error) {
      console.log(`Erro ao conectar ao PostgreSQL: ${error}`);
    } finally {
      await client.end();
    }
  };

  checkPostgresConnection();

  return (
      <html lang="en" suppressHydrationWarning>
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <body className="antialiased !p-4 min-h-screen min-w-screen">
                <Navbar />
                {children}
                <Toaster richColors />
              </body>
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </html>
  );
}
