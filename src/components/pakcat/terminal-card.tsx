"use client";

import React, { useState, useRef, useEffect } from "react";

interface CommandHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export function TerminalCard() {
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleCatClick = () => {};

  const executeCommand = (cmd: string) => {
    const clean = cmd.trim().toLowerCase();
    if (!clean) return;

    let output: React.ReactNode = "";

    switch (clean) {
      case "help":
        output = (
          <div className="text-xs space-y-0.5 text-[var(--muted)]">
            <p>Available commands:</p>
            <p><span className="text-[var(--accent-brass)]">about</span> - First-principles architecture philosophy</p>
            <p><span className="text-[var(--accent-brass)]">systems</span> - Active cognitive systems (Ashi, Leo, Vani)</p>
            <p><span className="text-[var(--accent-brass)]">status</span> - Core runtime invariants &amp; telemetry</p>
            <p><span className="text-[var(--accent-brass)]">meow</span> - Calibrate cat sensors</p>
            <p><span className="text-[var(--accent-brass)]">contact</span> - Reach out to Ashish</p>
            <p><span className="text-[var(--accent-brass)]">clear</span> - Clear terminal session</p>
          </div>
        );
        break;
      case "about":
        output = (
          <p className="text-xs text-[var(--muted)]">
            Ashish Dhankecha is an AI Developer &amp; Systems Builder.
            All-rounder skill: <span className="text-[var(--accent-gold)] font-bold">I WILL MAKE IT HAPPEN. No matter what.</span>
          </p>
        );
        break;
      case "systems":
      case "projects":
      case "ls":
        output = (
          <div className="text-xs space-y-1 text-[var(--muted)]">
            <p><span className="text-[var(--accent-gold)]">[01] Ashi:</span> 28-package cognitive OS monorepo (Flagship)</p>
            <p><span className="text-[var(--accent-gold)]">[02] LEO:</span> Companion OS kernel &amp; forensic audit</p>
            <p><span className="text-[var(--accent-gold)]">[03] VANI:</span> 50-year sovereign AI OS with AST guardian</p>
            <p><span className="text-[var(--accent-gold)]">[04] SIH26117:</span> Sovereign agentic AI workbench (hackathon sprint)</p>
          </div>
        );
        break;
      case "status":
      case "sys":
        output = (
          <div className="text-xs space-y-0.5 text-[var(--muted)]">
            <p><span className="text-[var(--accent-gold)]">● CPU/Runtime:</span> Active (Linux / uv environment)</p>
            <p><span className="text-[var(--accent-gold)]">● Inference:</span> llama.cpp quantized sub-2B SLM</p>
            <p><span className="text-[var(--accent-gold)]">● Invariants:</span> 100% acyclic graph checks passed</p>
            <p><span className="text-[var(--accent-gold)]">● Vacuous Success:</span> Eliminated</p>
          </div>
        );
        break;
      case "meow":
      case "cat":
        output = (
          <p className="text-xs text-[var(--accent-brass)]">
            😺 Purr subsystem active. Sensor telemetry nominal.
          </p>
        );
        break;
      case "contact":
        output = (
          <p className="text-xs text-[var(--muted)]">
            Email: <a href="mailto:ashishdhankecha256@gmail.com" className="text-[var(--accent-gold)] underline">ashishdhankecha256@gmail.com</a>
          </p>
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        output = (
          <span className="text-xs text-[#e58e8e]">
            command not found: {clean}. Type <span className="text-[var(--accent-brass)]">help</span> for commands.
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
      <div className="border-b border-[var(--line)] pb-3 mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--accent-enamel)] shadow-[0_0_8px_var(--accent-glow)]" />
          <div className="w-3 h-3 rounded-full bg-[#bf9c62]" />
          <div className="w-3 h-3 rounded-full bg-[#ffe4a5]" />
        </div>
        <span className="text-[var(--muted)] text-xs tracking-wider">
          system.terminal
        </span>
      </div>

      <div className="text-[var(--ink)] leading-relaxed space-y-1">
        {/* Clickable Cat ASCII */}
        <div className="flex items-start justify-between">
          <pre
            onClick={handleCatClick}
            title="Click me!"
            className="font-mono text-[var(--accent-brass)] text-xs leading-tight hover:text-[var(--accent-gold)] transition-colors cursor-pointer select-none py-1"
          >
{`  /\\_/\\
 ( o.o )
  > ^ <`}
          </pre>
          <span className="text-[10px] text-[var(--muted)]/60 font-mono mt-1">
            [click cat]
          </span>
        </div>

        {/* Live Telemetry Lines */}
        <div className="pt-2 space-y-1 text-xs">
          <p>
            <span className="text-[var(--accent-gold)]">$</span> system.online{" "}
            <span className="text-[var(--accent-gold)]">true</span>
          </p>
          <p>
            <span className="text-[var(--accent-gold)]">$</span> build.status{" "}
            <span className="text-[var(--accent-gold)]">stable</span>
          </p>
          <p>
            <span className="text-[var(--accent-gold)]">$</span> uptime{" "}
            <span className="text-[var(--accent-gold)]">2026.09+</span>
          </p>
          <p>
            <span className="text-[var(--accent-gold)]">$</span> architecture{" "}
            <span className="text-[var(--accent-gold)]">acyclic_monorepo</span>
          </p>
          <p>
            <span className="text-[var(--accent-gold)]">$</span> mode{" "}
            <span className="text-[var(--accent-gold)]">production_lab</span>
          </p>
        </div>

        {/* Command Output History */}
        {history.length > 0 && (
          <div className="pt-3 border-t border-[var(--line)] mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <p className="text-xs text-[var(--muted)]">
                  <span className="text-[var(--accent-gold)]">$</span> {item.command}
                </p>
                <div className="pl-3">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>
        )}

        {/* Interactive Input Prompt */}
        <div className="pt-3 border-t border-[var(--line)] mt-3 flex items-center gap-2">
          <span className="text-[var(--accent-gold)] text-xs shrink-0">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help', 'systems', 'meow'..."
            className="w-full bg-transparent text-xs text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:outline-none font-mono"
          />
          <span className="cursor-blink text-[var(--accent-brass)] text-xs">_</span>
        </div>

        {/* Quick Command Chips */}
        <div className="pt-2 flex flex-wrap gap-1.5 text-[10px]">
          <span className="text-[var(--muted)] self-center mr-1">run:</span>
          {["about", "systems", "status", "meow", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-1.5 py-0.5 border border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent-brass)] hover:text-[var(--accent-brass)] hover:bg-[var(--panel-hover)] transition-colors rounded-sm"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Bottom Tech Tags */}
        <div className="pt-3 border-t border-[var(--line)] mt-3">
          <p className="text-[var(--muted)] text-xs mb-1">substrate:</p>
          <div className="flex flex-wrap gap-1 text-xs">
            <span className="text-[var(--accent-brass)]">python</span>
            <span className="text-[var(--muted)]">pytorch</span>
            <span className="text-[var(--accent-brass)]">uv</span>
            <span className="text-[var(--muted)]">postgres</span>
            <span className="text-[var(--accent-brass)]">sqlite</span>
            <span className="text-[var(--muted)]">ast</span>
            <span className="text-[var(--accent-brass)]">llama.cpp</span>
            <span className="text-[var(--muted)]">fastapi</span>
            <span className="text-[var(--accent-gold)]">docker</span>
          </div>
        </div>
      </div>
    </div>
  );
}
