"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "@/i18n/I18nProvider";

export default function Navigation({ scrollY, scrollToSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, changeLocale } = useLocale();
  const t = useTranslations("nav");

  const sections = ["home", "services", "about", "contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50
          ? "bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="/logo.png"
            alt="MunTech"
            className="h-14 w-auto object-contain mix-blend-lighten contrast-125 brightness-110"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
            muntech
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`${
                section === "contact"
                  ? "relative px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-600 overflow-hidden group"
                  : "text-gray-300 hover:text-white transition-all duration-300 relative group"
              }`}
            >
              <span className="relative z-10">
                {t(section)}
              </span>

              {section !== "contact" && (
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              )}
            </button>
          ))}

          {/* 🌍 LANGUAGE SWITCH */}
          <div className="flex items-center rounded-full bg-zinc-800/80 border border-zinc-700 p-1">
            {["tr", "en"].map((lng) => (
              <button
                key={lng}
                onClick={() => changeLocale(lng)}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                  locale === lng
                    ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800/50 transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => {
                scrollToSection(section);
                setIsMenuOpen(false);
              }}
              className="block text-gray-300 hover:text-white"
            >
              {t(section)}
            </button>
          ))}

          {/* MOBILE LANGUAGE */}
          <div className="flex gap-2 pt-4">
            {["tr", "en"].map((lng) => (
              <button
                key={lng}
                onClick={() => changeLocale(lng)}
                className={`flex-1 py-2 rounded-lg ${
                  locale === lng
                    ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
                    : "bg-zinc-800 text-gray-400"
                }`}
              >
                {lng === "tr" ? "Türkçe" : "English"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
