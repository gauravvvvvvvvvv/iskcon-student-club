"use client";

import { Analytics } from "@vercel/analytics/next";
import { useState, useEffect } from "react";
import { DynamicAnnouncements, HeroCarousel } from "../components/DynamicContent";


// SVG Icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const Icon = ({ name, size = 24 }: { name: string; size?: number }) => (
    <span className="material-symbols-rounded" style={{ fontSize: size }}>{name}</span>
  );

  return (
    <>
      {/* DYNAMIC ANNOUNCEMENTS FROM CMS */}
      <DynamicAnnouncements />

      {/* NAVIGATION */}
      <nav style={{
        position: "fixed",
        top: 34,

        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "12px 0" : "20px 0",
        background: scrolled ? "rgba(255,255,255,0.98)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src="/image.png" alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <h1 style={{ fontSize: 16, fontWeight: 700, color: scrolled ? "#1a1a2e" : "#fff", fontFamily: "'Playfair Display', serif", margin: 0 }}>
                ISKCON Student Center
              </h1>
              <p style={{ fontSize: 10, color: scrolled ? "#9ca3af" : "rgba(255,255,255,0.6)", letterSpacing: 1.5, textTransform: "uppercase", margin: 0 }}>
                Delhi University
              </p>
            </div>
          </div>

          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {["About", "Programs", "Schedule", "Visit"].map(item => (
              <button key={item} onClick={() => goto(item.toLowerCase())} className="nav-link" style={{ color: scrolled ? "#475569" : "#fff" }}>
                {item}
              </button>
            ))}
            <a href="https://docs.google.com/forms/d/1FVlLR7QJUP-8BedM3oRQYFact6stIYMFFo0OKGzmWvg/viewform?" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "12px 28px" }}>
              Join Us
            </a>
          </div>

          <button className="show-mobile" onClick={() => setMobileMenu(!mobileMenu)} style={{ background: "none", border: "none", color: scrolled ? "#1a1a2e" : "#fff", cursor: "pointer", padding: 8 }}>
            <Icon name={mobileMenu ? "close" : "menu"} size={26} />
          </button>
        </div>

        {mobileMenu && (
          <div style={{ background: "#fff", padding: 20, margin: "12px 20px", borderRadius: 16, boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}>
            {["About", "Programs", "Schedule", "Visit"].map(item => (
              <button key={item} onClick={() => goto(item.toLowerCase())} style={{ display: "block", width: "100%", padding: "14px 8px", textAlign: "left", background: "none", border: "none", fontSize: 15, fontWeight: 500, cursor: "pointer", borderBottom: "1px solid #f3f4f6" }}>
                {item}
              </button>
            ))}
            <a href="https://docs.google.com/forms/d/1FVlLR7QJUP-8BedM3oRQYFact6stIYMFFo0OKGzmWvg/viewform?" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 12 }}>
              Join Us
            </a>
          </div>
        )}
      </nav>

      {/* HERO WITH DYNAMIC IMAGE CAROUSEL */}
      <HeroCarousel>
        <div className="container" style={{ paddingTop: "clamp(140px, 25vw, 180px)", paddingBottom: "clamp(40px, 8vw, 80px)", height: "100%", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 640, width: "100%" }}>

            {/* Founder Acharya Section */}
            <div style={{ marginBottom: "clamp(20px, 4vw, 32px)", display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 16px)" }}>
              <img src="/prabhupada.jpg" alt="Srila Prabhupada" style={{ width: "clamp(48px, 10vw, 64px)", height: "clamp(48px, 10vw, 64px)", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(212,165,116,0.4)" }} />
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(11px, 2vw, 13px)", lineHeight: 1.5 }}>
                <div style={{ fontWeight: 600, color: "#d4a574", marginBottom: 2 }}>Founder Acharya</div>
                HDG A.C. Bhaktivedanta Swami Prabhupada
              </div>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 8vw, 68px)", fontWeight: 500, color: "#fff", lineHeight: 1.1, marginBottom: "clamp(16px, 3vw, 24px)" }}>
              Awaken Your <span style={{ color: "#d4a574" }}>Inner Self</span>
            </h1>


            <p style={{ fontSize: "clamp(14px, 2.5vw, 18px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "clamp(24px, 5vw, 36px)", maxWidth: 480 }}>
              Embark on a transformative journey of self-discovery through ancient Vedic wisdom.
              Join Delhi University&apos;s premier spiritual community.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="https://docs.google.com/forms/d/1FVlLR7QJUP-8BedM3oRQYFact6stIYMFFo0OKGzmWvg/viewform?" target="_blank" rel="noopener noreferrer" className="btn-gold">
                Begin Your Journey <Icon name="arrow_forward" size={18} />
              </a>
              <button onClick={() => goto("programs")} className="btn-outline">
                Explore Programs
              </button>
            </div>

            {/* Stats Row */}
            <div className="hero-stats" style={{ display: "flex", gap: "clamp(20px, 5vw, 40px)", marginTop: "clamp(32px, 6vw, 48px)", flexWrap: "wrap" }}>
              {[{ num: "500+", label: "Students" }, { num: "10+", label: "Years" }, { num: "200+", label: "Programs" }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 600, color: "#fff", fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
                  <div style={{ fontSize: "clamp(10px, 2vw, 12px)", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </HeroCarousel>


      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 0", background: "#faf8f5" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
            <div>
              <span className="section-label">About Us</span>
              <h2 className="section-title">A Sanctuary for Seekers</h2>
              <p className="section-subtitle">
                For over a decade, we&apos;ve been guiding students on a profound journey of spiritual awakening,
                blending ancient wisdom with contemporary life.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "self_improvement", title: "Meditation", desc: "Daily practice", bg: "#fef7f0" },
                { icon: "menu_book", title: "Gītā Study", desc: "Scriptural learning", bg: "#f0f7fe" },
                { icon: "music_note", title: "Kirtan", desc: "Devotional music", bg: "#fef0f5" },
                { icon: "psychology", title: "Mentorship", desc: "Spiritual guidance", bg: "#f0fef4" },
              ].map((item, i) => (
                <div key={i} style={{ padding: 24, background: item.bg, borderRadius: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <Icon name={item.icon} size={22} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: "#1a1a2e" }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "#7a7d8c" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" style={{ padding: "100px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Our Programs</span>
            <h2 className="section-title">Transformative Experiences</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Comprehensive programs for spiritual, intellectual, and personal growth.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              { icon: "menu_book", title: "Bhagavad Gītā", desc: "Study the timeless teachings through structured sessions.", bg: "#e8f4f8" },
              { icon: "self_improvement", title: "Meditation", desc: "Find inner peace through mantra meditation.", bg: "#fce8e8" },
              { icon: "music_note", title: "Kirtan", desc: "Soul-stirring devotional music sessions.", bg: "#e8f0fc" },
              { icon: "restaurant", title: "Prasadam", desc: "Delicious sanctified vegetarian meals.", bg: "#e8fcf0" },
              { icon: "diversity_3", title: "Community", desc: "Build friendships with fellow seekers.", bg: "#fcf4e8" },
              { icon: "forum", title: "Counseling", desc: "Personal spiritual guidance.", bg: "#f4e8fc" },
            ].map((p, i) => (
              <div key={i} className="program-card">
                <div className="icon-wrapper" style={{ background: p.bg }}>
                  <Icon name={p.icon} size={28} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#1a1a2e" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" style={{ padding: "100px 0", background: "#1a1a2e" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 60, alignItems: "start" }}>
            <div>
              <span className="section-label" style={{ background: "rgba(212,165,116,0.15)" }}>Schedule</span>
              <h2 className="section-title" style={{ color: "#fff" }}>Daily & Weekly</h2>
              <p className="section-subtitle" style={{ color: "rgba(255,255,255,0.55)" }}>
                Structured programs designed for busy students.
              </p>
            </div>
            <div>
              {[
                { time: "5:30 AM", event: "Morning Meditation", icon: "self_improvement" },
                { time: "6:30 AM", event: "Mangala Aarti", icon: "local_fire_department" },
                { time: "7:00 AM", event: "Spiritual Discourse", icon: "record_voice_over" },
                { time: "6:00 PM", event: "Weekend Program", icon: "celebration" },
              ].map((s, i) => (
                <div key={i} className="schedule-item">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(212,165,116,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 16, color: "#d4a574" }}>
                    <Icon name={s.icon} size={20} />
                  </div>
                  <div style={{ minWidth: 80, fontSize: 13, fontWeight: 600, color: "#d4a574" }}>{s.time}</div>
                  <div style={{ color: "#fff", fontWeight: 500, fontSize: 15 }}>{s.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" style={{ padding: "100px 0", background: "#faf8f5" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Visit Us</span>
            <h2 className="section-title">Find Your Way</h2>
          </div>

          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.5466743621614!2d77.20813749999999!3d28.678913099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf53b2058b5%3A0x90ba420109930cec!2sISKCON%20student%20centre%20(%20DU%20BACE)!5e1!3m2!1sen!2sin!4v1754807751377!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginTop: 32 }}>
            <div className="info-card" style={{ padding: "16px 24px" }}>
              <Icon name="location_on" size={24} />
              <span style={{ fontWeight: 500, color: "#1a1a2e", fontSize: 14 }}>26 Prem Niwas, Opp. Hansraj College</span>
            </div>
            <div className="info-card" style={{ padding: "16px 24px" }}>
              <Icon name="call" size={24} />
              <a href="tel:+918318342494" style={{ fontWeight: 500, color: "#1a1a2e", textDecoration: "none", fontSize: 14 }}>+91 83183 42494</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Compact */}
      <section style={{ padding: "60px 0", background: "#1a1a2e" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 500, color: "#fff", margin: 0 }}>
              Ready to Transform Your Life?
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginTop: 8, marginBottom: 0 }}>
              Join our community today — it&apos;s free!
            </p>
          </div>
          <a href="https://docs.google.com/forms/d/1FVlLR7QJUP-8BedM3oRQYFact6stIYMFFo0OKGzmWvg/viewform?" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 40px", background: "#d4a574", color: "#fff", fontSize: 15, fontWeight: 600, borderRadius: 50, textDecoration: "none" }}>
            Join Now <Icon name="arrow_forward" size={18} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "48px 0 32px", background: "#0f0f1a" }}>
        <div className="container">
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "clamp(24px, 5vw, 40px)", marginBottom: 40 }}>

            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <img src="/image.png" alt="" style={{ width: 36, height: 36, borderRadius: "50%" }} />
                <span style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>ISKCON Student Center</span>
              </div>
              <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6 }}>
                Transforming lives through Vedic wisdom at Delhi University.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Quick Links</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["About", "Programs", "Schedule", "Visit"].map(item => (
                  <button key={item} onClick={() => goto(item.toLowerCase())} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", textAlign: "left", padding: 0 }}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Contact</h4>
              <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.8 }}>
                26 Prem Niwas, Opp. Hansraj College<br />
                Malka Ganj, New Delhi - 110007<br />
                <a href="tel:+918318342494" style={{ color: "#d4a574", textDecoration: "none" }}>+91 83183 42494</a>
              </p>
            </div>

            {/* Social */}
            <div>
              <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Follow Us</h4>
              <div style={{ display: "flex", gap: 12 }}>
                <a href="https://instagram.com/iskcondelhiuniversity" target="_blank" rel="noopener noreferrer" className="social-btn" style={{ width: 40, height: 40, color: "#fff" }}>
                  <InstagramIcon />
                </a>
                <a href="https://youtube.com/@iskcondelhiuniversity" target="_blank" rel="noopener noreferrer" className="social-btn" style={{ width: 40, height: 40, color: "#fff" }}>
                  <YouTubeIcon />
                </a>
                <a href="https://wa.me/918318342494" target="_blank" rel="noopener noreferrer" className="social-btn" style={{ width: 40, height: 40, color: "#fff" }}>
                  <WhatsAppIcon />
                </a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #1f2937", paddingTop: 24, textAlign: "center" }}>
            <p style={{ color: "#4b5563", fontSize: 12 }}>
              © {new Date().getFullYear()} ISKCON Student Center Delhi University. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <Analytics />
    </>
  );
}
