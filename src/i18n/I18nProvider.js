"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
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
      <NextIntlClientProvider locale={locale} messages={messages[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
