import I18nProvider from "@/i18n/I18nProvider";
import "./globals.css";

export const metadata = {
  title: "MunTechs",
  icons: {
    icon: "/muntech-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
