"use client";
import { useTranslations } from "next-intl";

export default function AboutSection({ isVisible, scrollToSection }) {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-32 px-6 relative" data-animate>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* TEXT BLOCK */}
        <div
          className={`space-y-8 transition-all duration-1000 ${
            isVisible.about
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
              {t("titleHighlight")}
            </span>
            <br />
            <span className="text-white">{t("title")}</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            {t("introText")}
          </p>

          <p className="text-gray-400 text-lg leading-relaxed">
            {t("backgroundText")}
          </p>

          <p className="text-gray-400 text-lg leading-relaxed">
            {t("experienceText")}
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:scale-105">
              <div className="text-5xl font-bold text-blue-400 mb-2">10+</div>
              <div className="text-gray-400">{t("experience")}</div>
            </div>

            <div className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-600/10 to-green-600/10 border border-emerald-600/20 hover:border-emerald-600/50 transition-all duration-500 hover:scale-105">
              <div className="text-5xl font-bold text-emerald-400 mb-2">100%</div>
              <div className="text-gray-400">{t("success")}</div>
            </div>
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-medium overflow-hidden shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-emerald-600/50 transition-all duration-500"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("cta")}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </div>

        {/* VISUAL BLOCK – TÜM EFEKTLER GERİ */}
        <div
          className={`relative transition-all duration-1000 ${
            isVisible.about
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10"
          }`}
        >
          <div className="relative w-full h-[550px] rounded-3xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">

            {/* GRID */}
            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute inset-0 animate-grid-flow"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(6,182,212,0.4) 2px, transparent 2px), linear-gradient(90deg, rgba(6,182,212,0.4) 2px, transparent 2px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* GLOW ORB */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-600 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
            </div>

            {/* FLOATING PARTICLES */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-emerald-500 animate-float-particle"
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 5 + 3}s`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}

            {/* CENTER ICON */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-pulse-slow">⚡</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
                  {t("visualTitle")}
                </div>
              </div>
            </div>

            {/* CORNER LIGHTS */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-transparent rounded-br-full animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-emerald-600/20 to-transparent rounded-tl-full animate-pulse-slow" />

          </div>
        </div>

      </div>
    </section>
  );
}
