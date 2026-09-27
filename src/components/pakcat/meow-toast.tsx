"use client";

import React, { useEffect, useState } from "react";

export function MeowToast() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("meow! [purr.exe executed]");

  useEffect(() => {
    const handleTrigger = (event: Event) => {
      const customEvent = event as CustomEvent<{ message?: string }>;
      if (customEvent.detail?.message) {
        setMessage(customEvent.detail.message);
      }
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 2600);
      return () => clearTimeout(timer);
    };

    window.addEventListener("trigger-meow", handleTrigger);
    return () => window.removeEventListener("trigger-meow", handleTrigger);
  }, []);

  return (
    <div
      className={`meow-toast ${show ? "show" : ""} flex items-center gap-2 select-none shadow-xl`}
      role="status"
      aria-live="polite"
    >
      <span className="text-[#E27D95] text-lg">😺</span>
      <span className="font-mono text-xs sm:text-sm text-[#F7ECEF]">
        {message}
      </span>
    </div>
  );
}

export function triggerMeow(message?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("trigger-meow", { detail: { message } }));
  }
}
