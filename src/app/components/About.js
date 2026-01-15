// src/app/components/About.js
"use client";

export default function AboutSection({ isVisible, scrollToSection }) {
  return (
    <section id="about" className="py-32 px-6 relative" data-animate>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div
          className={`space-y-8 transition-all duration-1000 ${
            isVisible.about
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
              İnovasyon
            </span>
            <br />
            <span className="text-white">ve Mükemmellik</span>
          </h2>

          {/* INTRODUCTION */}
          <p className="text-gray-400 text-lg leading-relaxed">
            MunTech, yenilikçi ve ileri görüşlü stratejilerle müşterilerine yüksek
            katma değerli sonuçlar sunmayı hedefleyen bir danışmanlık ve çözüm
            ortağıdır. Şirket, her biri sektörde 15 yılı aşkın deneyime sahip
            profesyonellerden oluşan güçlü bir ekip tarafından
            desteklenmektedir.
          </p>

          {/* BACKGROUND */}
          <p className="text-gray-400 text-lg leading-relaxed">
            Nisan 2025’te kurulan MunTech, hem yurt içi hem de yurt dışı
            projelerde aktif olarak görev alan deneyimli bir ekip tarafından
            desteklenen dinamik bir girişimdir. Çözüm odaklı hizmet anlayışını
            benimseyen MunTech, dijital dönüşüm süreçlerinde kurumlar için
            küresel ölçekte güvenilir bir iş ortağı olmayı hedeflemektedir.
          </p>

          <p className="text-gray-400 text-lg leading-relaxed">
            Bu doğrultuda MunTech; Danışmanlık, BT Sistem Entegrasyonu, Yapay
            Zekâ ve Makine Öğrenmesi (AI/ML), Bilgisayarlı Görü ve Teknik Proje
            Yönetimi alanlarında kapsamlı hizmetler sunmaktadır. Ekip, Büyük
            Veri, Bulut Bilişim, Makine Öğrenmesi, Yapay Zekâ, İş Zekâsı ve CRM
            gibi farklı alanlarda uçtan uca proje yaşam döngülerini
            yönetmektedir.
          </p>

          {/* SUMMARY OF EXPERIENCE */}
          <p className="text-gray-400 text-lg leading-relaxed">
            MunTech ekibi, telekomünikasyon sektöründe köklü bir geçmişe sahip
            profesyonellerden oluşmaktadır. Ekip üyeleri daha önce Vodafone
            Türkiye, Türk Telekom, Turkcell, Siemens, Allianz, İSKİ, Digiturk
            ve Millenicom gibi büyük kurumlarla birlikte çalışmıştır.
          </p>

          <p className="text-gray-400 text-lg leading-relaxed">
            Proje deneyimleri; dijital dönüşüm, veri taşıma, veri ambarı, veri
            bilimi, gelir güvence sistemleri, dolandırıcılık tespiti, öneri
            sistemleri, müşteri kaybı (churn) analizi, risk yönetimi, alacak
            takibi, CRM, sipariş yönetimi ile faturalama ve ücretlendirme
            sistemleri gibi geniş bir alanı kapsamaktadır.
          </p>

          <button
            onClick={() => scrollToSection("contact")}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-medium overflow-hidden shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-emerald-600/50 transition-all duration-500"
          >
            <span className="relative z-10">Bize Ulaşın</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>

      </div>
    </section>
  );
}
