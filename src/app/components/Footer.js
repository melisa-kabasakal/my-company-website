"use client";

export default function Footer({ scrollToSection }) {
  const services = [
    { title: "Yazılım Geliştirme" },
    { title: "Dijital Dönüşüm" },
    { title: "Bulut Çözümleri" },
    { title: "Teknoloji Danışmanlığı" }
  ];

  return (
    <footer className="relative border-t border-gray-800/50 py-16 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
              muntech
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Modern yazılım, dijital dönüşüm ve teknoloji çözümleri sunan profesyonel ekip. İşletmenizi geleceğe taşıyoruz.
            </p>
            <div className="flex gap-4">
              {[
                {
                  name: 'LinkedIn',
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                },
                {
                  name: 'Twitter',
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                },
                {
                  name: 'Instagram',
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                },
                {
                  name: 'Facebook',
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                }
              ].map((social, i) => (
                <div 
                  key={i}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-500 hover:to-emerald-600 transition-all duration-500 flex items-center justify-center cursor-pointer transform hover:scale-110 hover:rotate-12 text-gray-400 hover:text-white"
                  title={social.name}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {['home', 'services', 'about', 'contact'].map((section, i) => (
                <li key={i}>
                  <button 
                    onClick={() => scrollToSection(section)} 
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block"
                  >
                   {section === 'home' ? 'Ana Sayfa' : section === 'services' ? 'Hizmetler' : section === 'about' ? 'Hakkımızda' : 'İletişim'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Hizmetler</h4>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}>
                  <button 
                    onClick={() => scrollToSection('services')} 
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block text-left w-full"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 md:mb-0 flex items-center gap-2">
            © {new Date().getFullYear()} muntech
            <span className="inline-block w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></span>
            Tüm Hakları Saklıdır
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            {['Gizlilik Politikası', 'Kullanım Şartları', 'Çerez Politikası'].map((link, i) => (
              <button key={i} className="hover:text-white transition-colors duration-300 relative group">
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}