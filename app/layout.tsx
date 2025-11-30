import "./globals.css";
import AppWrapper from "./AppWrapper";
import { AuthProvider } from "@/hooks/Auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthProvider>
          <AppWrapper>{children}</AppWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
