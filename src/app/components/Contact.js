"use client";

import { useState } from "react";

export default function ContactSection({ isVisible }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    alert("Geçerli bir email girin");
    return;
  }

  if (!form.phone) {
    alert("Telefon zorunlu");
    return;
  }

  await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      message: form.message,
    }),
  });

  alert("Form gönderildi");
  setForm({ name: "", email: "", phone: "", company: "", message: "" });
};


  return (
    <section id="contact" className="py-32 px-6 relative" data-animate>
      <div className="max-w-5xl mx-auto">
        
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
              Projenizi
            </span>
            <br />
            <span className="text-white">Konuşalım</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Size özel çözümler üretmek için sabırsızlanıyoruz. Ücretsiz danışmanlık için formu doldurun.
          </p>
        </div>

        <div className={`relative p-10 rounded-3xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 backdrop-blur-sm overflow-hidden transition-all duration-1000 ${isVisible.contact ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Ad Soyad"
              className="p-5 rounded-xl bg-black/50 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-500"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="E-posta"
              className="p-5 rounded-xl bg-black/50 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-500"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Telefon"
              className="p-5 rounded-xl bg-black/50 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-500"
            />

            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              type="text"
              placeholder="Şirket"
              className="p-5 rounded-xl bg-black/50 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-500"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Projeniz hakkında detaylı bilgi verin..."
              className="p-5 rounded-xl bg-black/50 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none md:col-span-2 h-40 transition-all duration-300 backdrop-blur-sm resize-none text-white placeholder-gray-500"
            ></textarea>

            <button
              type="button"
              onClick={handleSubmit}
              className="md:col-span-2 group relative bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-white font-bold py-6 rounded-xl transition-all duration-500 shadow-2xl shadow-blue-500/50 hover:shadow-3xl hover:shadow-cyan-500/70 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Ücretsiz Teklif Alın
                
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
