"use client";

import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import BackgroundEffects from "./components/BackgroundEffects";
import HeroSection from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/About";
import ContactSection from "./components/Contact";
import Footer from "./components/Footer";
import "./styles/animations.css";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [services, setServices] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch("/api/services", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      <BackgroundEffects mousePosition={mousePosition} />
      <Navigation scrollY={scrollY} scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />

      <ServicesSection
        isVisible={isVisible}
        services={services}
      />

      <AboutSection
        isVisible={isVisible}
        scrollToSection={scrollToSection}
      />

      <ContactSection isVisible={isVisible} />

      <Footer
        scrollToSection={scrollToSection}
        services={services}
      />
    </div>
  );
}
