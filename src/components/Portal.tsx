import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PortalProps {
  onAccessGranted: () => void;
  key?: string;
}

export function Portal({ onAccessGranted }: PortalProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", domain: "", instagram: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { key: "name", label: "Identify Yourself.", placeholder: "Your Name", type: "text" },
    { key: "domain", label: "Your Domain.", options: ["Entrepreneur", "Business Owner", "Creator", "Visionary", "Influencer", "Other"], type: "select" },
    { key: "instagram", label: "The Proof.", placeholder: "@username", type: "text" },
  ];

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      setStep(step + 1);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setIsProcessing(true);
      try {
        const res = await fetch("https://formspree.io/f/mjgenbpw", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            domain: formData.domain,
            instagram: formData.instagram
          })
        });
        if (res.ok) {
          setSubmitStatus("success");
          setTimeout(() => {
            setIsProcessing(false);
            onAccessGranted();
          }, 2000);
        } else {
          setSubmitStatus("error");
          setIsProcessing(false);
        }
      } catch {
        setSubmitStatus("error");
        setIsProcessing(false);
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#050505]"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute top-8 right-8 flex flex-col items-end text-right font-mono text-[10px] text-[#8A8A8A] uppercase tracking-widest">
        <span>Current Members: 142</span>
        <span className="text-[#4A0404]">Pending: 890</span>
      </div>

      <div className="w-full max-w-md px-6">
        <AnimatePresence mode="wait">
          {!isProcessing ? (
            <motion.form
              key="form"
              onSubmit={handleNext}
              className="flex flex-col space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <motion.label
                  className="font-serif text-xl tracking-widest text-white md:text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={step}
                >
                  {steps[step].label}
                </motion.label>
              </div>

              <div className="relative">
                {steps[step].type === "select" ? (
                  <select
                    ref={inputRef as any}
                    className="w-full border-b border-[#8A8A8A]/30 bg-transparent py-4 font-mono text-sm text-white focus:border-[#4A0404] focus:outline-none transition-colors"
                    value={formData[steps[step].key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [steps[step].key]: e.target.value })
                    }
                    required
                  >
                    <option value="" disabled>Select your domain</option>
                    {steps[step].options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    ref={inputRef}
                    type={steps[step].type}
                    placeholder={steps[step].placeholder}
                    className="w-full border-b border-[#8A8A8A]/30 bg-transparent py-4 font-mono text-sm text-white placeholder-[#8A8A8A]/50 focus:border-[#4A0404] focus:outline-none transition-colors"
                    value={formData[steps[step].key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [steps[step].key]: e.target.value })
                    }
                    autoFocus
                    required
                  />
                )}
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-[#4A0404]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="hover-target font-mono text-xs uppercase tracking-[0.2em] text-[#8A8A8A] transition-colors hover:text-white"
                >
                  {step === steps.length - 1 ? "Submit Request" : "Next \u2192"}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="processing"
              className="flex flex-col items-center justify-center space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative h-16 w-16">
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#4A0404]/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-t border-[#4A0404]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
              {submitStatus === "idle" && (
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8A8A8A]">
                  Processing Access...
                </p>
              )}
              {submitStatus === "success" && (
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-green-500">
                  Request Sent! Check your email soon.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-red-500">
                  Submission failed. Please try again.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
