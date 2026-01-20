"use client";

import I18nProvider from "@/i18n/I18nProvider";

export default function I18nClientWrapper({ children }) {
  return <I18nProvider>{children}</I18nProvider>;
}

