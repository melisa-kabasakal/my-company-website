"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "@/i18n/I18nProvider";
import ServiceCard from "./ServiceCard";

export default function ServicesSection({ services = [], isVisible }) {
  const t = useTranslations("services");
  const { locale } = useLocale(); 

  return (
    <section id="services" className="py-32 px-6 relative" data-animate>
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible.services
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
              {t("titleHighlight")}
            </span>
            <span className="text-white"> {t("title")}</span>
          </h2>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            let parsedFeatures = [];

            if (typeof service.features === "string") {
              try {
                const obj = JSON.parse(service.features);
                const raw = obj[locale] || obj.tr || "";
                parsedFeatures = raw
                  .split(",")
                  .map(f => f.trim())
                  .filter(Boolean);
              } catch {
                parsedFeatures = service.features
                  .split(",")
                  .map(f => f.trim())
                  .filter(Boolean);
              }
            }

            return (
              <ServiceCard
                key={service.id}
                service={{
                  ...service,
                  features: parsedFeatures, // ✅ JSON BİTTİ
                }}
                index={i}
                isVisible={isVisible.services}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
