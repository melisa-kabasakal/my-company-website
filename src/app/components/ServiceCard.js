"use client";

import { useLocale } from "@/i18n/I18nProvider";

export default function ServiceCard({ service, index, isVisible }) {
  const { locale } = useLocale();

  const parseField = (value) => {
    if (!value) return "";
    try {
      const obj = JSON.parse(value);
      return obj[locale] || obj.tr || "";
    } catch {
      return value;
    }
  };

  const title = parseField(service.title);
  const description = parseField(service.description);

  const features = (() => {
    if (!service.features) return [];
    try {
      const obj = JSON.parse(service.features);
      const raw = obj[locale] || obj.tr || "";
      return raw.split(",").map(f => f.trim());
    } catch {
      if (Array.isArray(service.features)) return service.features;
      if (typeof service.features === "string")
        return service.features.split(",").map(f => f.trim());
      return [];
    }
  })();

  return (
    <div
      className={`group relative p-8 rounded-3xl border border-gray-800/50
      bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm
      hover:border-gray-600 transition-all duration-700
      hover:scale-105 hover:-translate-y-2
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${service.color}
        opacity-0 group-hover:opacity-10 rounded-3xl blur-xl
        transition-opacity duration-700`}
      />

      <div className="relative">
        {service.image && (
          <div className="relative w-full h-40 rounded-xl overflow-hidden mb-6">
            <img
              src={service.image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}

        <h3
          className={`text-xl font-bold text-white mb-4
          group-hover:bg-gradient-to-l
          group-hover:${service.color}
          group-hover:bg-clip-text
          group-hover:text-transparent
          transition-all duration-500`}
        >
          {title}
        </h3>

        <p className="text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>

        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="text-sm text-gray-500 flex items-center
              group-hover:text-gray-300 transition-colors duration-300"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span
                className={`bg-gradient-to-r ${service.color}
                bg-clip-text text-transparent mr-2 font-bold`}
              >
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div
          className={`absolute top-0 right-0 w-full h-full
          bg-gradient-to-br ${service.color} blur-2xl`}
        />
      </div>
    </div>
  );
}
