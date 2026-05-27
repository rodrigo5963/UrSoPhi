import "../styles/globals.css";

import { AuthProvider } from "../lib/AuthContext";

export const metadata = {
  title: "UrsoPhi – GenAI Portal",
  description: "Generación de texto e imagen con Gemini y Firebase AI Logic",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
