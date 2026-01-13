"use client";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

export default function ServicesSection({ isVisible }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <section id="services" className="py-32 px-6 relative" data-animate>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
              Kapsamlı
            </span>
            <span className="text-white"> Çözümler</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            İşletmenizin ihtiyaçlarına özel, güvenilir ve ölçeklenebilir teknoloji hizmetleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={{
                ...service,
                features: service.features
                  ? service.features.split(",").map(f => f.trim())
                  : []
              }}
              index={i}
              isVisible={isVisible.services}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


