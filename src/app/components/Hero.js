"use client";

export default function HeroSection({ scrollToSection }) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Animated Tech Background */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#06b6d4' : '#10b981',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}

        {/* Glowing Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        {/* Connecting Lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
            style={{
              top: `${(i + 1) * 12}%`,
              left: 0,
              right: 0,
              animation: `lineMove ${15 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-6xl text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 animate-fade-in-up animation-delay-200">
          <span className="bg-gradient-to-r from-blue-400 to-emerald-500 bg-clip-text text-transparent inline-block">
            İşletmenizi
          </span>
          {' '}
          <span className="text-white inline-block">
            Geleceğe Taşıyoruz
          </span>
        </h1>

        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-400">
          Ölçeklenebilir, güvenli ve sürdürülebilir dijital sistemlerle işletmenizin potansiyelini maksimize edin.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 animate-fade-in-up animation-delay-600">
          <button 
            onClick={() => scrollToSection('services')}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-medium overflow-hidden shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-emerald-600/50 transition-all duration-500"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Hizmetleri Keşfet
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="group px-8 py-4 rounded-xl border-2 border-gray-700 text-white hover:border-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-emerald-600/10 backdrop-blur-sm transition-all duration-500 relative overflow-hidden"
          >
            <span className="relative z-10">Ücretsiz Danışmanlık</span>
            <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-gradient-to-b from-blue-400 to-emerald-500 rounded-full mt-2 animate-scroll-down"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.6;
          }
          50% { 
            transform: translate(-20px, -60px) scale(0.9);
            opacity: 0.4;
          }
          75% {
            transform: translate(-40px, -30px) scale(1.05);
            opacity: 0.5;
          }
        }

        @keyframes lineMove {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}