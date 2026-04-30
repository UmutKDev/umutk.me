"use client";

import { useEffect, useMemo, useState } from "react";

const COMMANDS = [
  {
    cmd: "whoami",
    out: "umut.kiziloglu — full-stack developer",
  },
  {
    cmd: "cat ./focus.md",
    out: "next.js · typescript · nestjs · postgres · docker · ssr",
  },
  {
    cmd: "uptime",
    out: "building reliable web since 2023 · agile · figma → prod",
  },
  {
    cmd: "ssh hello@umutk.me",
    out: "connection established. welcome.",
  },
];

export function Terminal() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"cmd" | "out" | "pause">("cmd");

  const current = COMMANDS[step % COMMANDS.length];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === "cmd") {
      if (typed.length < current.cmd.length) {
        timeout = setTimeout(() => setTyped(current.cmd.slice(0, typed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => {
          setPhase("out");
          setTyped("");
        }, 380);
      }
    } else if (phase === "out") {
      if (typed.length < current.out.length) {
        timeout = setTimeout(() => setTyped(current.out.slice(0, typed.length + 1)), 22);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1300);
      }
    } else {
      timeout = setTimeout(() => {
        setStep((s) => s + 1);
        setTyped("");
        setPhase("cmd");
      }, 380);
    }
    return () => clearTimeout(timeout);
  }, [typed, phase, current]);

  const history = useMemo(() => {
    const result: { cmd: string; out: string }[] = [];
    for (let i = Math.max(0, step - 2); i < step; i++) {
      result.push(COMMANDS[i % COMMANDS.length]);
    }
    return result;
  }, [step]);

  return (
    <div className="text-mono text-[12.5px] leading-relaxed text-[#e8e3d6]">
      {history.map((h, i) => (
        <div key={`${h.cmd}-${i}`} className="opacity-45">
          <Line cmd={h.cmd} out={h.out} done />
        </div>
      ))}
      <div>
        <Prompt />
        <span className="text-[#f5f1e8]">
          {phase === "cmd" ? typed : current.cmd}
        </span>
        {phase === "cmd" && <Caret />}
      </div>
      {phase !== "cmd" && (
        <div className="pl-4 text-[#cfc8b7]">
          <span className="text-[var(--color-accent-soft)]">›</span>{" "}
          <span>{phase === "out" ? typed : current.out}</span>
          {phase === "out" && <Caret />}
        </div>
      )}
    </div>
  );
}

function Prompt() {
  return (
    <span className="text-white/55">
      <span className="text-[var(--color-accent-soft)]">~/umutk</span>
      <span className="mx-1 text-white/30">$</span>
    </span>
  );
}

function Line({ cmd, out, done }: { cmd: string; out: string; done?: boolean }) {
  return (
    <>
      <div>
        <Prompt />
        <span className={done ? "text-white/55" : "text-[#f5f1e8]"}>{cmd}</span>
      </div>
      <div className="pl-4 text-white/40">
        <span className="text-[var(--color-accent-soft)]/60">›</span> {out}
      </div>
    </>
  );
}

function Caret() {
  return (
    <span className="anim-blink ml-0.5 inline-block h-[1.05em] w-[0.55em] -translate-y-[0.1em] bg-[var(--color-accent-soft)] align-middle" />
  );
}
