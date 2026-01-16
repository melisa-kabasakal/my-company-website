"use client";

import { IntlProvider } from "next-intl";
import { createContext, useContext, useEffect, useState } from "react";
import tr from "./messages/tr.json";
import en from "./messages/en.json";

const messages = { tr, en };

// 👉 Locale context
const LocaleContext = createContext(null);

// 👉 Hook (Navbar buradan kullanacak)
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
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale === "tr" || savedLocale === "en") {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = (nextLocale) => {
    setLocale(nextLocale);
    localStorage.setItem("locale", nextLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}
