import { motion } from "motion/react";

interface SplashProps {
  onEnter: () => void;
  key?: string;
}

export function Splash({ onEnter }: SplashProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Cinematic entry video background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <video
          className="w-full h-full object-cover opacity-40"
          src="/entryBg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="z-10 flex flex-col items-center space-y-12 text-center">
        <motion.h1
          className="font-serif text-2xl font-light tracking-[0.2em] text-white md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          The view is 360&deg;.
          <br />
          <span className="text-[#8A8A8A]">The circle is closed.</span>
        </motion.h1>

        <motion.button
          onClick={onEnter}
          className="hover-target group relative overflow-hidden rounded-full border border-[#4A0404]/50 bg-transparent px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] text-white transition-all hover:border-[#4A0404] hover:bg-[#4A0404]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span className="relative z-10">Enter the Sin</span>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-[#4A0404]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </motion.button>
      </div>
    </motion.div>
  );
}
