"use client";

import React, { useState, useRef, useEffect } from "react";

interface CommandHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export function TerminalCard() {
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "whoami",
      output: (
        <span className="text-white/80">
          Ashish Dhankecha — AI Developer &amp; Systems Builder (Surat, India)
        </span>
      ),
    },
    {
      command: "cat creed.txt",
      output: (
        <div className="space-y-1 text-white/70">
          <p className="text-white font-semibold">I WILL MAKE IT HAPPEN. No matter what.</p>
          <p className="text-white/50 text-xs">
            I don&apos;t limit myself to one stack. If something needs to be learned, I learn it.
            If something breaks, I figure out why.
          </p>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const executeCommand = (cmd: string) => {
    const clean = cmd.trim().toLowerCase();
    if (!clean) return;

    let output: React.ReactNode = "";

    switch (clean) {
      case "help":
        output = (
          <div className="text-xs space-y-1 text-white/70">
            <p className="text-white/40">Available commands:</p>
            <p><span className="text-emerald-400 font-mono">whoami</span> — Identity &amp; role</p>
            <p><span className="text-emerald-400 font-mono">systems</span> — Monorepo cognitive systems (ÆON, LEO, VANI, SIH26117)</p>
            <p><span className="text-emerald-400 font-mono">skills</span> — Tech stack &amp; tooling breakdown</p>
            <p><span className="text-emerald-400 font-mono">creed</span> — Core engineering philosophy</p>
            <p><span className="text-emerald-400 font-mono">status</span> — Runtime telemetry &amp; invariant checks</p>
            <p><span className="text-emerald-400 font-mono">contact</span> — Email &amp; social links</p>
            <p><span className="text-emerald-400 font-mono">clear</span> — Clear terminal output</p>
          </div>
        );
        break;
      case "whoami":
        output = (
          <p className="text-xs text-white/80">
            Ashish Dhankecha — AI Developer &amp; Systems Builder. Computer Engineering @ SSASIT.
          </p>
        );
        break;
      case "systems":
      case "projects":
      case "ls":
        output = (
          <div className="text-xs space-y-1.5 text-white/80">
            <p><span className="text-white font-medium">[01] ÆON OS:</span> 28-package cognitive agentic monorepo (Flagship)</p>
            <p><span className="text-white font-medium">[02] LEO:</span> Companion OS kernel with multimodal perception</p>
            <p><span className="text-white font-medium">[03] VANI:</span> 50-year sovereign AI OS with AST guardian invariants</p>
            <p><span className="text-white font-medium">[04] SIH26117:</span> Sovereign agentic developer workbench (1-day sprint)</p>
          </div>
        );
        break;
      case "skills":
      case "stack":
        output = (
          <div className="text-xs space-y-1 text-white/70">
            <p><span className="text-white/40">Runtime:</span> Python, TypeScript, Linux, uv, Bash</p>
            <p><span className="text-white/40">AI/ML:</span> llama.cpp, Local SLMs, PyTorch, vLLM, LangChain</p>
            <p><span className="text-white/40">Web &amp; Infra:</span> Next.js 15, React 19, Tailwind, Docker, PostgreSQL, SQLite</p>
          </div>
        );
        break;
      case "creed":
        output = (
          <div className="text-xs space-y-1 text-white/80 border-l border-emerald-500/40 pl-3">
            <p className="text-white font-bold">&ldquo;I will make it happen. No matter what.&rdquo;</p>
            <p className="text-white/60">I don&apos;t need to know everything before I start. I need to know how to figure it out.</p>
          </div>
        );
        break;
      case "status":
      case "sys":
      case "uptime":
        output = (
          <div className="text-xs space-y-0.5 text-white/70 font-mono">
            <p><span className="text-emerald-400">● Core Status:</span> Active &amp; Operational</p>
            <p><span className="text-emerald-400">● Invariants:</span> 100% acyclic graph checks passed</p>
            <p><span className="text-emerald-400">● Inference:</span> Local quantized SLM via llama.cpp</p>
            <p><span className="text-emerald-400">● Host OS:</span> Linux 6.x / uv package environment</p>
          </div>
        );
        break;
      case "contact":
        output = (
          <p className="text-xs text-white/80">
            Email: <a href="mailto:ashishdhankecha256@gmail.com" className="text-emerald-400 underline underline-offset-2">ashishdhankecha256@gmail.com</a>
            <br />GitHub: <a href="https://github.com/Ashish-Dhankecha" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline underline-offset-2">github.com/Ashish-Dhankecha</a>
          </p>
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        output = (
          <span className="text-xs text-rose-400/90">
            zsh: command not found: {clean}. Type <span className="text-white underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> for commands.
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
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="glass-card rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl bg-black/60 p-4 sm:p-5 font-mono text-xs text-white/90 relative overflow-hidden">
      {/* Top macOS Chrome Window Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/20" />
        </div>
        <span className="text-[11px] text-white/40 font-mono tracking-tight">
          ashish@workstation: ~ (zsh)
        </span>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline text-white/40">online</span>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div ref={outputContainerRef} className="space-y-3 max-h-64 sm:max-h-72 overflow-y-auto pr-1">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-emerald-400 font-bold">ashish@arch:~$</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
      </div>

      {/* Active Command Input Line */}
      <div className="pt-3 mt-3 border-t border-white/10 flex items-center gap-2">
        <span className="text-emerald-400 font-bold shrink-0">ashish@arch:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help', 'systems', 'creed'..."
          className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none font-mono text-xs"
        />
        <span className="terminal-cursor !w-2 !h-3.5" />
      </div>

      {/* Quick Command Action Pills */}
      <div className="pt-2.5 mt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className="text-white/30 mr-1 text-[10px]">suggested:</span>
        {["whoami", "systems", "skills", "creed", "status", "clear"].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 rounded-md glass border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
