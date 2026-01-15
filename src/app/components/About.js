// src/app/components/About.js
"use client";

export default function AboutSection({ isVisible, scrollToSection }) {
  return (
    <section id="about" className="py-32 px-6 relative" data-animate>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className={`space-y-8 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
              İnovasyon
            </span>
            <br />
            <span className="text-white">ve Mükemmellik</span>
          </h2>
          
          {/* DEĞİŞTİRİLEN METİN 1 */}
          <p className="text-gray-400 text-lg leading-relaxed">
            MunTech, yenilikçi ve ileri görüşlü stratejilerle müşterilerine yüksek
            katma değerli sonuçlar sunmayı hedefleyen bir danışmanlık ve çözüm
            ortağıdır. Şirket, her biri sektörde 15 yılı aşkın deneyime sahip
            profesyonellerden oluşan güçlü bir ekip tarafından
            desteklenmektedir.
          </p>
          
          {/* DEĞİŞTİRİLEN METİN 2 */}
          <p className="text-gray-400 text-lg leading-relaxed">
            Nisan 2025’te kurulan MunTech, hem yurt içi hem de yurt dışı
            projelerde aktif rol alan deneyimli bir ekip tarafından
            desteklenen dinamik bir girişimdir. Çözüm odaklı hizmet anlayışıyla
            MunTech; Danışmanlık, BT Sistem Entegrasyonu, Yapay Zekâ ve Makine
            Öğrenmesi (AI/ML), Bilgisayarlı Görü ve Teknik Proje Yönetimi
            alanlarında uçtan uca hizmetler sunmaktadır.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="text-5xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-500">10+</div>
              <div className="text-gray-400">Yıl Tecrübe</div>
            </div>
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-600/10 to-green-600/10 border border-emerald-600/20 hover:border-emerald-600/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="text-5xl font-bold text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-500">100%</div>
              <div className="text-gray-400">Başarı Oranı</div>
            </div>
          </div>

          <button 
            onClick={() => scrollToSection('contact')}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-medium overflow-hidden shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-emerald-600/50 transition-all duration-500"
          >
            <span className="relative z-10 flex items-center gap-2">
              Bize Ulaşın
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>
        <div className={`relative transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        </div>

      </div>
    </section>
  );
}
