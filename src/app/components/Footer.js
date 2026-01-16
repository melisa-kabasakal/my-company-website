"use client";
import { useTranslations } from "next-intl";

export default function Footer({ scrollToSection, services = [] }) {
  const t = useTranslations("footer");

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

            {/* SOCIAL */}
            <div className="flex gap-4">
              {[
                { name: "LinkedIn", href: "#" },
                { name: "Twitter", href: "#" },
                { name: "Instagram", href: "#" },
                { name: "Facebook", href: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-500 hover:to-emerald-600 transition-all duration-500 flex items-center justify-center text-gray-400 hover:text-white transform hover:scale-110"
                >
                  {social.name[0]}
                </a>
              ))}
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
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block text-left w-full"
                  >
                    {service.title}
                  </button>
                </li>
              ))}

              {services.length === 0 && (
                <li className="text-gray-600 text-sm">
                  {t("noServices")}
                </li>
              )}
            </ul>
          </div>

        </div>
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm flex items-center gap-2">
            © {new Date().getFullYear()} muntech
            <span className="inline-block w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></span>
            {t("rights")}
          </div>
        </div>

      </div>
    </footer>
  );
}
