"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "@/i18n/I18nProvider";

export default function Footer({ scrollToSection, services = [] }) {
  const t = useTranslations("footer");
  const { locale } = useLocale();

  return (
    <footer className="relative border-t border-gray-800/50 py-16 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
              muntech
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              {t("description")}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-500 hover:to-emerald-600 transition-all duration-500 flex items-center justify-center text-gray-400 hover:text-white transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 23.5h4V7.5h-4v16zM8.5 7.5h3.8v2.2h.05c.53-1 1.82-2.2 3.75-2.2 4 0 4.75 2.6 4.75 6v7.5h-4v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5v6.7h-4v-16z"/>
                </svg>
              </a>

              <a
                href="#"
                aria-label="X"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-500 hover:to-emerald-600 transition-all duration-500 flex items-center justify-center text-gray-400 hover:text-white transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3 14.7 12.4 23 21h-5.3L11 14.7 4.3 21H1l8.7-8.9L1 3h5.3L11 9.3 17.7 3H23z"/>
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-500 hover:to-emerald-600 transition-all duration-500 flex items-center justify-center text-gray-400 hover:text-white transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3.5A5.5 5.5 0 1017.5 12 5.5 5.5 0 0012 7.5z"/>
                </svg>
              </a>


              <a
                href="#"
                aria-label="Facebook"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-500 hover:to-emerald-600 transition-all duration-500 flex items-center justify-center text-gray-400 hover:text-white transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4H15c-1.3 0-1.7.8-1.7 1.6V11H16.7l-.4 3h-2.9v7A10 10 0 0022 12z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-3">
              {["home", "services", "about", "contact"].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {t(`nav.${section}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              {t("servicesTitle")}
            </h4>

            <ul className="space-y-3">
              {services.map((service) => {
                let title = "";
                try {
                  const parsed = JSON.parse(service.title);
                  title = parsed[locale] || parsed.tr || "";
                } catch {
                  title = service.title;
                }

                return (
                  <li key={service.id}>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
                    >
                      {title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800/50 text-gray-600 text-sm">
          © {new Date().getFullYear()} muntech · {t("rights")}
        </div>
      </div>
    </footer>
  );
}
