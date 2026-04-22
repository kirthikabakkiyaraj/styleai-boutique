import { useState } from "react";
import { Sparkles, Send, X } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const seed: Msg[] = [
  { role: "ai", text: "Hi, I'm your StyleAI assistant. Try: \"Men black shirt under ₹1500\" or \"Women party dress in Chennai\"." },
];

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMsgs((m) => [
      ...m,
      { role: "user", text: q },
      { role: "ai", text: `Curating picks for "${q}" — here are 4 styles matched to your taste ✨` },
    ]);
    setInput("");
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
          style={{ animation: "var(--animate-float)" }}
          aria-label="Open AI assistant"
        >
          <Sparkles className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-40 flex h-[520px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl glass-dark shadow-[var(--shadow-elegant)]">
          <div className="flex items-center justify-between border-b border-gold/20 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <div className="text-sm font-medium">StyleAI Assistant</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-4 w-4" /></button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    m.role === "user"
                      ? "bg-gold text-primary-foreground"
                      : "border border-gold/20 bg-background/50 text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gold/20 p-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask StyleAI…"
                className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
              />
              <button onClick={send} className="rounded-full bg-gold p-1.5 text-primary-foreground" aria-label="Send">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
