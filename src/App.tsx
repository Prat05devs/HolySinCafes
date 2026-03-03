import { useState, useEffect } from "react";
import { Splash } from "./components/Splash";
import { Portal } from "./components/Portal";
import { Main } from "./components/Main";
import { Cursor } from "./components/Cursor";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { AnimatePresence } from "motion/react";

export default function App() {

  const [phase, setPhase] = useState<"splash" | "portal" | "main">(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("hs_registered") === "true" ? "main" : "splash";
    }
    return "splash";
  });

  useEffect(() => {
    const metaTitle = "Holy Sin Cafes: Dehradun’s Exclusive Rooftop Community for Visionaries";
    const metaDescription = "Experience the best burgers and sunset views in Dehradun at Holy Sin Cafes. An invite-only community for influencers and entrepreneurs. Request access to the inner circle.";

    document.title = metaTitle;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", metaDescription);
    }
  }, []);

  // Listen for registration and persist it
  const handleAccessGranted = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("hs_registered", "true");
    }
    setPhase("main");
  };

  return (
    <div className="bg-pulse min-h-screen w-full selection:bg-[#4A0404] selection:text-white">
      {/* Show Cursor only on desktop */}
      <div className="hidden md:block">
        <Cursor />
      </div>
      <NoiseOverlay />

      <AnimatePresence mode="wait">
        {phase === "splash" && (
          <Splash key="splash" onEnter={() => setPhase("portal")} />
        )}
        {phase === "portal" && (
          <Portal key="portal" onAccessGranted={handleAccessGranted} />
        )}
        {phase === "main" && <Main key="main" />}
      </AnimatePresence>
    </div>
  );
}

