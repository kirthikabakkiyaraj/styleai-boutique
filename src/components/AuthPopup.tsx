import { useEffect, useRef, useState } from "react";
import { X, Sparkles, Eye, EyeOff } from "lucide-react";
import { useShop } from "@/lib/shop-context";

export function AuthPopup() {
  const { loginOpen, setLoginOpen, login, register } = useShop();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loginOpen) {
      setError("");
      setEmail("");
      setPassword("");
      setMode("login");
      setTimeout(() => emailRef.current?.focus(), 50);
    }
  }, [loginOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLoginOpen(false);
    };
    if (loginOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loginOpen, setLoginOpen]);

  if (!loginOpen) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (mode === "login") {
      const ok = login(email, password);
      if (!ok) setError("Invalid credentials. Try registering first.");
      else setLoginOpen(false);
    } else {
      const ok = register(email, password);
      if (!ok) setError("Email already registered. Please log in.");
      else setLoginOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setLoginOpen(false)}
      />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[var(--gold)]/40 bg-[oklch(0.12_0.005_60)] p-8 shadow-[0_30px_80px_-20px_oklch(0.82_0.14_85/0.5)]"
        style={{ animation: "var(--animate-fade-up)" }}
      >
        {/* top gold line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

        <button
          onClick={() => setLoginOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-white/50 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.62_0.13_75)] text-black shadow-[0_0_30px_-5px_var(--gold)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-3xl text-white">
            {mode === "login" ? "Welcome Back" : "Join"}{" "}
            <span className="text-[var(--gold)]">MEYU</span>
          </h3>
          <p className="mt-1 text-sm text-white/60">
            {mode === "login"
              ? "Sign in to your luxury wardrobe."
              : "Create your personal style account."}
          </p>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-white/60 mb-1">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/40 transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-white/60 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/40 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[oklch(0.88_0.1_88)] via-[oklch(0.72_0.15_75)] to-[oklch(0.88_0.1_88)] bg-[length:200%_auto] py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-black transition-all hover:shadow-[0_8px_30px_-8px_var(--gold)] active:scale-95"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-white/50">
          {mode === "login" ? "New to MEYU?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
            className="font-medium text-[var(--gold)] hover:text-white transition-colors"
          >
            {mode === "login" ? "Create Account" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
