"use client";

import React, { useState, useRef, useEffect } from "react";
import { triggerMeow } from "./meow-toast";

interface CommandHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export function TerminalCard() {
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleCatClick = () => {
    triggerMeow("meow! [purr.exe executed]");
  };

  const executeCommand = (cmd: string) => {
    const clean = cmd.trim().toLowerCase();
    if (!clean) return;

    let output: React.ReactNode = "";

    switch (clean) {
      case "help":
        output = (
          <div className="text-xs space-y-0.5 text-pakcat-text-secondary">
            <p>Available commands:</p>
            <p><span className="text-pakcat-accent">about</span> - First-principles architecture philosophy</p>
            <p><span className="text-pakcat-accent">systems</span> - Active cognitive systems (Ashi, Leo, Vani)</p>
            <p><span className="text-pakcat-accent">status</span> - Core runtime invariants & telemetry</p>
            <p><span className="text-pakcat-accent">meow</span> - Calibrate cat sensors</p>
            <p><span className="text-pakcat-accent">contact</span> - Reach out to Ashish</p>
            <p><span className="text-pakcat-accent">clear</span> - Clear terminal session</p>
          </div>
        );
        break;
      case "about":
        output = (
          <p className="text-xs text-pakcat-text-secondary">
            Ashish Dhankecha builds AI systems from first principles: neural foundations, 
            stateful cognitive operating systems, and acyclic architectures.
          </p>
        );
        break;
      case "systems":
      case "projects":
      case "ls":
        output = (
          <div className="text-xs space-y-1 text-pakcat-text-secondary">
            <p><span className="text-pakcat-accent-code">[01] Ashi:</span> 28-package cognitive OS monorepo</p>
            <p><span className="text-pakcat-accent-code">[02] LEO:</span> Companion OS kernel & forensic audit</p>
            <p><span className="text-pakcat-accent-code">[03] VANI:</span> 50-year sovereign AI OS with AST guardian</p>
          </div>
        );
        break;
      case "status":
      case "sys":
        output = (
          <div className="text-xs space-y-0.5 text-pakcat-text-secondary">
            <p><span className="text-pakcat-accent-code">● CPU/Runtime:</span> Active (Linux / uv environment)</p>
            <p><span className="text-pakcat-accent-code">● Inference:</span> llama.cpp quantized sub-2B SLM</p>
            <p><span className="text-pakcat-accent-code">● Invariants:</span> 100% acyclic graph checks passed</p>
            <p><span className="text-pakcat-accent-code">● Vacuous Success:</span> Eliminated</p>
          </div>
        );
        break;
      case "meow":
      case "cat":
        triggerMeow("meow! [cat sensor online]");
        output = (
          <p className="text-xs text-pakcat-accent">
            😺 Purr subsystem active. Sensor telemetry nominal.
          </p>
        );
        break;
      case "contact":
        output = (
          <p className="text-xs text-pakcat-text-secondary">
            Email: <a href="mailto:ashishdhankecha.business@gmail.com" className="text-pakcat-accent-code underline">ashishdhankecha.business@gmail.com</a>
          </p>
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        output = (
          <span className="text-xs text-[#ff5555]">
            command not found: {clean}. Type <span className="text-pakcat-accent">help</span> for commands.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <div className="brutal-card p-5 sm:p-6 font-mono text-sm rounded-sm shadow-2xl relative">
      {/* Top Window Bar */}
      <div className="border-b border-[#3B121E] pb-3 mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#80142B] shadow-[0_0_8px_rgba(128,20,43,0.7)]" />
          <div className="w-3 h-3 rounded-full bg-[#B02242]" />
          <div className="w-3 h-3 rounded-full bg-[#E27D95]" />
        </div>
        <span className="text-pakcat-text-secondary text-xs tracking-wider">
          system.terminal
        </span>
      </div>

      <div className="text-pakcat-text-primary leading-relaxed space-y-1">
        {/* Clickable Cat ASCII */}
        <div className="flex items-start justify-between">
          <pre
            onClick={handleCatClick}
            title="Click me!"
            className="font-mono text-pakcat-accent text-xs leading-tight hover:text-pakcat-accent-code transition-colors cursor-pointer select-none py-1"
          >
{`  /\\_/\\
 ( o.o )
  > ^ <`}
          </pre>
          <span className="text-[10px] text-pakcat-text-secondary/60 font-mono mt-1">
            [click cat]
          </span>
        </div>

        {/* Live Telemetry Lines */}
        <div className="pt-2 space-y-1 text-xs">
          <p>
            <span className="text-pakcat-accent-code">$</span> system.online{" "}
            <span className="text-pakcat-accent-code">true</span>
          </p>
          <p>
            <span className="text-pakcat-accent-code">$</span> build.status{" "}
            <span className="text-pakcat-accent-code">stable</span>
          </p>
          <p>
            <span className="text-pakcat-accent-code">$</span> uptime{" "}
            <span className="text-pakcat-accent-code">2026.09+</span>
          </p>
          <p>
            <span className="text-pakcat-accent-code">$</span> architecture{" "}
            <span className="text-pakcat-accent-code">acyclic_monorepo</span>
          </p>
          <p>
            <span className="text-pakcat-accent-code">$</span> mode{" "}
            <span className="text-pakcat-accent-code">production_lab</span>
          </p>
        </div>

        {/* Command Output History */}
        {history.length > 0 && (
          <div className="pt-3 border-t border-pakcat-border mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <p className="text-xs text-pakcat-text-secondary">
                  <span className="text-pakcat-accent-code">$</span> {item.command}
                </p>
                <div className="pl-3">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>
        )}

        {/* Interactive Input Prompt */}
        <div className="pt-3 border-t border-pakcat-border mt-3 flex items-center gap-2">
          <span className="text-pakcat-accent-code text-xs shrink-0">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help', 'systems', 'meow'..."
            className="w-full bg-transparent text-xs text-pakcat-text-primary placeholder:text-pakcat-text-secondary/50 focus:outline-none font-mono"
          />
          <span className="cursor-blink text-pakcat-accent text-xs">_</span>
        </div>

        {/* Quick Command Chips */}
        <div className="pt-2 flex flex-wrap gap-1.5 text-[10px]">
          <span className="text-pakcat-text-secondary self-center mr-1">run:</span>
          {["about", "systems", "status", "meow", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-1.5 py-0.5 border border-[#3B121E] text-pakcat-text-secondary hover:border-[#80142B] hover:text-[#E27D95] hover:bg-[#280A15] transition-colors rounded-sm"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Bottom Tech Tags */}
        <div className="pt-3 border-t border-[#3B121E] mt-3">
          <p className="text-pakcat-text-secondary text-xs mb-1">substrate:</p>
          <div className="flex flex-wrap gap-1 text-xs">
            <span className="text-[#E27D95]">python</span>
            <span className="text-pakcat-text-secondary">pytorch</span>
            <span className="text-[#E27D95]">uv</span>
            <span className="text-pakcat-text-secondary">postgres</span>
            <span className="text-[#E27D95]">sqlite</span>
            <span className="text-pakcat-text-secondary">ast</span>
            <span className="text-[#E27D95]">llama.cpp</span>
            <span className="text-pakcat-text-secondary">fastapi</span>
            <span className="text-pakcat-accent-code">docker</span>
          </div>
        </div>
      </div>
    </div>
  );
}
