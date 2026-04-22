import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";

const LOCATIONS = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad", "Kolkata", "Pune", "Jaipur"];

export function LoginPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("styleai_login_seen")) return;
    const t = window.setTimeout(() => setOpen(true), 120_000); // 2 minutes
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem("styleai_login_seen", "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md" onClick={close} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gold/40 bg-card p-8 shadow-[var(--shadow-elegant)]">
        <button onClick={close} aria-label="Close" className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.82_0.14_85)] to-transparent" />

        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-3xl">Welcome to <span className="text-gold">StyleAI</span></h3>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to unlock personalized luxury picks.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            close();
          }}
          className="mt-6 space-y-3"
        >
          <Field label="Username" type="text" placeholder="your@email.com" />
          <Field label="Password" type="password" placeholder="••••••••" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Gender</label>
              <select className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm focus:border-gold focus:outline-none">
                <option>Women</option>
                <option>Men</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Location</label>
              <select className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm focus:border-gold focus:outline-none">
                {LOCATIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 rounded-full bg-gold py-3 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground hover:glow-gold">
              Login
            </button>
            <button type="button" onClick={close} className="flex-1 rounded-full border border-border py-3 text-xs uppercase tracking-[0.25em] text-foreground/80 hover:border-gold hover:text-primary">
              Skip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      <input
        {...rest}
        className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
      />
    </div>
  );
}
