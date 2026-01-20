"use client";

import { createContext, useContext, useEffect, useState } from "react";
import tr from "./messages/tr.json";
import en from "./messages/en.json";

const messages = { tr, en };

const LocaleContext = createContext(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside I18nProvider");
  }
  return ctx;
}

/**
 * Basit çeviri hook’u
 * useT("hero").title gibi kullanılır
 */
export function useT(section) {
  const { locale } = useLocale();
  return messages[locale]?.[section] || {};
}

export default function I18nProvider({ children }) {
  const [locale, setLocale] = useState("tr");

  useEffect(() => {
    const saved = localStorage.getItem("locale");
    if (saved === "tr" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  const changeLocale = (nextLocale) => {
    setLocale(nextLocale);
    localStorage.setItem("locale", nextLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
