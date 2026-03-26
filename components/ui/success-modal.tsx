"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Confetti } from "./confetti";

interface SuccessModalProps {
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function SuccessModal({
  title,
  message,
  duration = 1000,
  onClose,
}: SuccessModalProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <>
      <Confetti duration={duration} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="animate-in zoom-in duration-300 pointer-events-auto">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-green-500/30 bg-green-500/10 backdrop-blur-sm px-8 py-8 max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-green-400" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
              <p className="text-gray-300 text-sm leading-relaxed">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
