import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { VolumeX, SlidersHorizontal } from "lucide-react";

export function Main({ key }: { key?: string }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  // Parallax for vertical text
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <motion.div
      className="relative min-h-screen bg-[#050505] text-white text-opacity-95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Ambient Audio */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* Invis-Nav */}
      <AnimatePresence>
        {isNavVisible && (
          <motion.nav
            className="glass-panel fixed top-0 left-0 right-0 z-50 flex flex-col md:flex-row items-center justify-between px-4 py-3 md:px-8 md:py-4"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="font-display text-lg md:text-xl tracking-widest text-white text-opacity-100 drop-shadow-lg mb-2 md:mb-0">HOLY SIN</div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-8 font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] text-[#e2e2e2] drop-shadow">
              <a href="#philosophy" className="hover-target hover:text-[#A83232] transition-colors">Philosophy</a>
              <a href="#circles" className="hover-target hover:text-[#A83232] transition-colors">Circles</a>
              <a href="#taste" className="hover-target hover:text-[#A83232] transition-colors">Taste</a>
              <a href="#pulse" className="hover-target hover:text-[#A83232] transition-colors">Pulse</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Sound Toggle */}
      <button
        onClick={toggleSound}
        className="hover-target fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#A83232]/30 bg-[#050505]/80 backdrop-blur-md transition-all hover:border-[#A83232] hover:bg-[#A83232]/20"
      >
        {isMuted ? <VolumeX size={16} className="text-[#e2e2e2]" /> : <SlidersHorizontal size={16} className="text-[#A83232]" />}
      </button>

      {/* Vertical Scrub Texts */}
      <motion.div style={{ y: y1, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} className="fixed left-4 top-1/4 z-0 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-[#e2e2e2]/30 md:block">
        ESTD. 2024
      </motion.div>
      <motion.div style={{ y: y2, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} className="fixed right-4 top-1/3 z-0 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-[#e2e2e2]/30 md:block">
        MEMBERS ONLY
      </motion.div>
      <motion.div style={{ y: y1, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} className="fixed left-4 bottom-1/4 z-0 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-[#e2e2e2]/30 md:block">
        ROOFTOP
      </motion.div>

      {/* Sections */}
      <HeroSection scrollYProgress={scrollYProgress} />
      <PhilosophySection />
      <CirclesSection />
      <TasteSection />
      <PulseSection />
      <FooterSection />

      {/* GPS Coordinates */}
      <div className="fixed bottom-4 left-4 z-50 font-mono text-[8px] tracking-widest text-[#e2e2e2]/70 animate-pulse">
        30.3165&deg; N, 78.0322&deg; E
      </div>
    </motion.div>
  );
}

function HeroSection({ scrollYProgress }: { scrollYProgress: any }) {
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const logoO = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const logoI = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Background Layer (Distant Hills) */}
      <motion.div
        className="absolute inset-0 z-0 bg-[url('/holys.jpeg')] bg-cover bg-center opacity-40"
        style={{ y: yBg }}
      />
      
      {/* Foreground Layer (Cafe Railing/Edge) */}
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-transparent"
        style={{ y: yFg }}
      />

      <div className="relative z-20 flex flex-col items-center">
        <h1 className="text-center font-display text-[11vw] leading-[0.85] tracking-tighter text-white text-opacity-100 drop-shadow-2xl md:text-[7vw]">
          HOLY SIN CAFÉS
          <br />
          <span className="relative inline-block text-[9vw] md:text-[5vw] tracking-wide pt-4">
            Dehradun’s Exclusive Rooftop Café
            <motion.span
              className="absolute -top-4 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full border border-[#A83232] opacity-0"
              style={{ opacity: logoO }}
            />
            <motion.span
              className="absolute -bottom-2 right-0 h-4 w-1 bg-[#A83232] opacity-0"
              style={{ opacity: logoI, transformOrigin: "top", rotate: "-45deg" }}
            />
          </span>
        </h1>
        <p className="mt-8 px-4 font-serif text-lg italic tracking-[0.3em] text-white md:text-lg">
          Panoramic mountain views, glowing night skylines, breathtaking sunsets & DJ nights
        </p>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section id="philosophy" className="relative flex min-h-screen w-full items-center justify-center px-8 py-24">
      <div className="max-w-5xl text-center">
        <h2 className="font-display text-5xl leading-[0.9] tracking-tighter text-white md:text-8xl lg:text-9xl">
          WE DON'T SERVE CUSTOMERS.<br />
          <span className="text-[#A83232]">WE CONNECT VISIONARIES.</span>
        </h2>
        <div className="mt-16 mx-auto max-w-2xl">
          <p className="font-serif text-lg leading-relaxed tracking-wide text-[#8A8A8A] md:text-2xl">
            This is not a cafe. It is a curated collision of minds. 
            A sanctuary above the Doon Valley where the air is thin, 
            the ideas are heavy, and the circle is strictly closed.
          </p>
        </div>
      </div>
    </section>
  );
}

function CirclesSection() {
  return (
    <section id="circles" className="relative w-full px-2 py-12 md:px-12 lg:px-24">
      <div className="mb-8 md:mb-16 flex flex-col md:flex-row items-end justify-between border-b border-[#8A8A8A]/20 pb-4 md:pb-8 gap-2">
        <h2 className="font-display text-2xl md:text-4xl tracking-tighter text-white md:text-6xl">
          THE DEHRADUN ENTREPRENEUR CIRCLE
        </h2>
        <span className="font-mono text-xs uppercase tracking-widest text-[#8A8A8A]">Select your domain</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        {/* Bento Box 1 */}
        <div className="hover-target glass-panel group relative col-span-1 row-span-2 flex min-h-[250px] md:min-h-[400px] flex-col justify-end overflow-hidden rounded-2xl p-4 md:p-8 transition-all hover:border-[#A83232]/50">
          <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050505] to-transparent" />
          <h3 className="font-display text-xl md:text-3xl tracking-tight text-white">ENTREPRENEURS</h3>
          <p className="mt-2 font-serif text-xs md:text-sm text-[#8A8A8A]">Entrepreneur community Dehradun, founders, and builders of the next decade.</p>
        </div>

        {/* Bento Box 2 */}
        <div className="hover-target glass-panel group relative col-span-1 row-span-1 flex min-h-[180px] md:min-h-[250px] flex-col justify-end overflow-hidden rounded-2xl p-4 md:p-8 transition-all hover:border-[#A83232]/50">
          <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050505] to-transparent" />
          <h3 className="font-display text-lg md:text-2xl tracking-tight text-white">INFLUENCERS</h3>
          <p className="mt-2 font-serif text-xs md:text-sm text-[#8A8A8A]">Influencer hangouts Dehradun with invite-only events and private member energy.</p>
        </div>

        {/* Bento Box 3 */}
        <div className="hover-target glass-panel group relative col-span-1 row-span-1 flex min-h-[180px] md:min-h-[250px] flex-col justify-end overflow-hidden rounded-2xl p-4 md:p-8 transition-all hover:border-[#A83232]/50">
          <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050505] to-transparent" />
          <h3 className="font-display text-lg md:text-2xl tracking-tight text-white">VISIONARIES</h3>
          <p className="mt-2 font-serif text-xs md:text-sm text-[#8A8A8A]">Visionaries of Dehradun shaping culture, nightlife, and future-forward collaborations.</p>
        </div>

        {/* Bento Box 4 */}
        <div className="hover-target glass-panel group relative col-span-1 md:col-span-2 row-span-1 flex min-h-[180px] md:min-h-[250px] flex-col justify-end overflow-hidden rounded-2xl p-4 md:p-8 transition-all hover:border-[#A83232]/50">
          <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050505] to-transparent" />
          <h3 className="font-display text-xl md:text-3xl tracking-tight text-white">THE INNER CIRCLE</h3>
          <p className="mt-2 font-serif text-xs md:text-sm text-[#8A8A8A]">Private member club Dehradun with curated social circles and rooftop access.</p>
        </div>
      </div>
    </section>
  );
}

function TasteSection() {
  return (
    <section id="taste" className="relative w-full py-24">
      <div className="px-4 md:px-12 lg:px-24">
        <h2 className="font-display text-4xl tracking-tighter text-white md:text-6xl">
          SIGNATURE SUNDOWNERS & DJ SETS
        </h2>
      </div>

      <div className="mt-16 flex flex-col space-y-24">
        {/* Burger */}
        <div className="group relative flex w-full flex-col items-center justify-center md:flex-row">
          <div className="relative h-[60vh] w-full overflow-hidden md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop" 
              alt="Best burgers in Dehradun served at Holy Sin Cafes on Rajpur Road rooftop." 
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            {/* Steam Animation */}
            <motion.div 
              className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-0 mix-blend-screen transition-opacity duration-1000 group-hover:opacity-30"
              animate={{ y: [-10, -30], opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="flex w-full flex-col justify-center p-12 md:w-1/2 md:p-24">
            <h3 className="font-display text-5xl tracking-tighter text-white">01. THE GLUTTONY</h3>
            <p className="mt-6 font-serif text-lg text-[#8A8A8A]">
              Dry-aged Wagyu. Truffle aioli. Black brioche. 
              A masterpiece of indulgence designed to ruin you for all other burgers.
            </p>
          </div>
        </div>

        {/* Waffle */}
        <div className="group relative flex w-full flex-col-reverse items-center justify-center md:flex-row">
          <div className="flex w-full flex-col justify-center p-12 md:w-1/2 md:p-24">
            <h3 className="font-display text-5xl tracking-tighter text-white">02. THE LUST</h3>
            <p className="mt-6 font-serif text-lg text-[#8A8A8A]">
              Dark Belgian chocolate. Gold leaf. Espresso-infused mascarpone. 
              A waffle that borders on the obscene.
            </p>
          </div>
          <div className="relative h-[60vh] w-full overflow-hidden md:w-1/2">
            <img 
              src="/waffel.webp" 
              alt="Best specialty waffles in Dehradun at Holy Sin Cafes with artisan toppings." 
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            {/* Steam Animation */}
            <motion.div 
              className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-0 mix-blend-screen transition-opacity duration-1000 group-hover:opacity-30"
              animate={{ y: [-10, -30], opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PulseSection() {
  return (
    <section id="pulse" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
      <div className="absolute inset-0 -z-10 bg-[#050505]/80" />
      
      <div className="z-10 flex flex-col items-center text-center">
        <h2 className="font-display text-6xl tracking-tighter text-white md:text-8xl">
          THE PULSE
        </h2>
        <p className="mt-4 font-mono text-sm uppercase tracking-[0.4em] text-[#A83232] drop-shadow-md">
          Underground Frequencies
        </p>
      </div>

      <div className="mt-24 grid w-full max-w-6xl grid-cols-1 gap-8 px-4 md:px-8 md:grid-cols-3">
        <div className="group relative aspect-[3/4] overflow-hidden rounded-sm">
          <img src="https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=1974&auto=format&fit=crop" alt="Live DJ events Dehradun at Holy Sin Cafes rooftop social club." className="h-full w-full object-cover transition-all duration-700 md:grayscale group-hover:scale-105 md:group-hover:grayscale-0" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6">
            <h4 className="font-display text-2xl text-white">FRIDAY SYNDICATE</h4>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#8A8A8A]">Deep House / Techno</p>
          </div>
        </div>
        <div className="group relative aspect-[3/4] overflow-hidden rounded-sm md:translate-y-12">
          <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2069&auto=format&fit=crop" alt="Invite-only events and private member club moments at Holy Sin Dehradun." className="h-full w-full object-cover transition-all duration-700 md:grayscale group-hover:scale-105 md:group-hover:grayscale-0" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6">
            <h4 className="font-display text-2xl text-white">THE GREEN ROOM</h4>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#8A8A8A]">High-Stakes Snooker</p>
          </div>
        </div>
        <div className="group relative aspect-[3/4] overflow-hidden rounded-sm">
          <img src="https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=1974&auto=format&fit=crop" alt="Live match screening and cinematic rooftop nights with Mussoorie view in Dehradun." className="h-full w-full object-cover transition-all duration-700 md:grayscale group-hover:scale-105 md:group-hover:grayscale-0" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6">
            <h4 className="font-display text-2xl text-white">CINEMA NOIR</h4>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#8A8A8A]">Projector Nights</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  const [vendingState, setVendingState] = useState<"idle" | "dispensing" | "revealed">("idle");
  const [secretItem, setSecretItem] = useState("");

  const secrets = [
    "A complimentary shot of aged espresso.",
    "Access code to the VIP balcony.",
    "A secret off-menu dessert.",
    "A custom Holy Sin matchbook.",
  ];

  const handleVendingClick = () => {
    if (vendingState !== "idle") return;
    setVendingState("dispensing");
    setTimeout(() => {
      setSecretItem(secrets[Math.floor(Math.random() * secrets.length)]);
      setVendingState("revealed");
    }, 2000);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "name": "Holy Sin Cafes",
        "description": "Best rooftop cafe in Dehradun for gourmet burgers, specialty waffles, sundowners, and invite-only social experiences.",
        "servesCuisine": ["Burgers", "Waffles", "Cafe"],
        "priceRange": "$$$",
        "areaServed": "Dehradun",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dehradun",
          "addressRegion": "Uttarakhand",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "SocialClub",
        "name": "Holy Sin Cafes Inner Circle",
        "description": "Exclusive social club in Dehradun for entrepreneurs, influencers, and visionaries.",
        "memberOf": "Invite-only",
        "areaServed": "Dehradun",
        "knowsAbout": ["Invite-only events", "Live DJ events Dehradun", "Entrepreneur community Dehradun"]
      }
    ]
  };

  return (
    <footer className="relative flex flex-col items-center justify-center bg-[#4A0404] px-8 py-32 text-center text-white">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
      
      <div className="z-10 flex w-full max-w-4xl flex-col items-center space-y-16">
        

        <div className="w-full space-y-5 rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-md md:p-8">
          <h3 className="font-display text-2xl tracking-tight text-white md:text-3xl">MUSSOORIE VIEW ROOFTOP · DEHRADUN</h3>
          <p className="font-serif text-sm text-white/70">Find the exclusive rooftop cafe in Dehradun's Rajpur Road area.</p>
          <iframe
            title="Holy Sin Cafes Dehradun Location"
            src="https://maps.google.com/maps?q=dehradun&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-64 w-full rounded-xl border border-white/10 [filter:grayscale(1)_invert(0.92)_contrast(1.1)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="w-full space-y-4 rounded-2xl border border-white/10 bg-black/20 p-6 text-left backdrop-blur-md md:p-8">
          <h3 className="font-display text-2xl tracking-tight text-white">FAQ</h3>
          <div>
            <h4 className="font-serif text-lg text-white">How to join Holy Sin Cafe Dehradun?</h4>
            <p className="mt-2 font-serif text-sm leading-relaxed text-white/70">
              Submit a Request Invite through the portal. Membership is reviewed for entrepreneurs, influencers, and visionaries in Dehradun seeking access to private member events.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
          <div className="text-left">
            <h2 className="font-display text-4xl tracking-widest text-white">HOLY SIN CAFÉ</h2>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/50">
              Rooftop, Dehradun, Uttarakhand
            </p>
          </div>
          
          <div className="flex flex-col items-end text-right">
            <a href="https://forms.gle/PMkGyfFHZxjjnyYa8" target="_blank" rel="noopener noreferrer" className="hover-target font-mono text-[10px] uppercase tracking-widest text-white/50 transition-colors hover:text-white">
              Circle Members Login
            </a>
            <a href="https://maps.app.goo.gl/eNNBfrysPxD4YmLq6" target="_blank" rel="noopener noreferrer" className="hover-target mt-2 font-mono text-[10px] uppercase tracking-widest text-white/50 transition-colors hover:text-white">
              View on Map
            </a>
          </div>
        </div>

        <p className="font-serif text-sm italic tracking-widest text-white/40">
          Curated for the 1%. Handcrafted in the heart of the Doon Valley.
        </p>

        <div className="hidden" aria-hidden="true">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        </div>
      </div>
    </footer>
  );
}
