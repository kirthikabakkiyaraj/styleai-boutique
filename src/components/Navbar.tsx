import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { womenMenu, menMenu } from "@/lib/catalog";
import menuWomen from "@/assets/menu-women.jpg";
import menuMen from "@/assets/menu-men.jpg";
import meyuLogo from "@/assets/meyu-logo.png";

type MenuKey = "women" | "men" | "kids" | null;

export function Navbar() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enter = (k: MenuKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(k);
  };
  const leave = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  };

  const NavTrigger = ({ k, label }: { k: MenuKey; label: string }) => (
    <button
      onMouseEnter={() => enter(k)}
      onFocus={() => enter(k)}
      className="relative px-1 py-2 text-sm tracking-[0.18em] uppercase text-foreground/80 transition-colors hover:text-primary"
    >
      {label}
      <span
        className={`pointer-events-none absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
          open === k ? "w-full" : "w-0"
        }`}
      />
    </button>
  );

  const menuData = open === "women" ? womenMenu : open === "men" ? menMenu : null;
  const menuImg = open === "women" ? menuWomen : menuMen;

  return (
    <header
      onMouseLeave={leave}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" aria-label="MEYU home" className="group flex items-center gap-2.5">
          <img
            src={meyuLogo}
            alt="MEYU"
            className="h-9 w-auto transition-all duration-500 group-hover:drop-shadow-[0_0_10px_var(--gold)]"
          />
          <span className="font-display text-xl font-semibold tracking-[0.35em] text-foreground transition-colors group-hover:text-gold">
            MEYU
          </span>
        </Link>

        {/* Center menu */}
        <nav className="hidden items-center gap-10 md:flex">
          <NavTrigger k="women" label="Women" />
          <NavTrigger k="men" label="Men" />
          <NavTrigger k="kids" label="Kids" />
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 lg:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search for products, styles..."
              className="w-56 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
            />
          </div>
          <IconBtn label="Account"><User className="h-[18px] w-[18px]" /></IconBtn>
          <IconBtn label="Wishlist"><Heart className="h-[18px] w-[18px]" /></IconBtn>
          <IconBtn label="Cart" badge={2}><ShoppingBag className="h-[18px] w-[18px]" /></IconBtn>
          <button
            className="ml-1 rounded-full p-2 hover:text-primary md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mega menu */}
      {menuData && (
        <div
          onMouseEnter={() => enter(open)}
          className="hidden border-t border-border bg-background/95 backdrop-blur-xl md:block"
          style={{ animation: "var(--animate-mega-in)" }}
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-10 py-10">
            {menuData.map((col) => (
              <div key={col.title} className="col-span-2">
                <div className="mb-4 text-[10px] uppercase tracking-[0.25em] text-primary">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a className="text-sm text-foreground/80 transition-colors hover:text-primary" href="#">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-4">
              <div className="group relative h-72 overflow-hidden rounded-md border border-border">
                <img src={menuImg} alt="Featured" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Limited Drop</div>
                  <div className="mt-1 font-display text-2xl">Up to <span className="text-gold">75% OFF</span></div>
                  <button className="mt-3 text-xs uppercase tracking-[0.25em] text-foreground underline-offset-4 hover:underline">
                    Shop now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-gold/30 bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-display text-xl"><img src={meyuLogo} alt="MEYU" className="h-7 w-auto" /><span className="tracking-[0.3em] text-gold">MEYU</span></span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-8 space-y-6">
              {(["Women", "Men", "Kids"] as const).map((s) => (
                <div key={s}>
                  <div className="text-xs uppercase tracking-[0.3em] text-primary">{s}</div>
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                    {(s === "Men" ? menMenu : womenMenu).flatMap((c) => c.links).slice(0, 8).map((l) => (
                      <a key={l} href="#" className="text-sm text-foreground/80">{l}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function IconBtn({
  children,
  label,
  badge,
}: {
  children: React.ReactNode;
  label: string;
  badge?: number;
}) {
  return (
    <button
      aria-label={label}
      className="relative rounded-full p-2 text-foreground/85 transition-colors hover:text-primary"
    >
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-primary-foreground">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
