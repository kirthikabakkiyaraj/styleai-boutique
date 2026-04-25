import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Menu, X, LogOut, Package, ChevronDown } from "lucide-react";
import { womenMenu, menMenu } from "@/lib/catalog";
import menuWomen from "@/assets/menu-women.jpg";
import menuMen from "@/assets/menu-men.jpg";
import meyuLogo from "@/assets/meyu-logo.png";
import { useShop } from "@/lib/shop-context";

type MenuKey = "women" | "men" | null;

export function Navbar() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const userDropRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { cartCount, wishlist, setCartOpen, setWishlistOpen, setSearchOpen, setLoginOpen, user, logout } =
    useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (userDropRef.current && !userDropRef.current.contains(e.target as Node)) {
        setUserDropOpen(false);
      }
    };
    if (userDropOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [userDropOpen]);

  const enter = (k: MenuKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(k);
  };
  const leave = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  };

  const NavTrigger = ({ k, label, to }: { k: MenuKey; label: string; to?: string }) => {
    const inner = (
      <>
        {label}
        <span
          className={`pointer-events-none absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
            open === k ? "w-full" : "w-0"
          }`}
        />
      </>
    );
    const cls =
      "relative px-1 py-2 text-sm tracking-[0.18em] uppercase text-foreground/80 transition-colors hover:text-primary";
    if (to) {
      return (
        <Link to={to} onMouseEnter={() => enter(k)} onFocus={() => enter(k)} className={cls}>
          {inner}
        </Link>
      );
    }
    return (
      <button onMouseEnter={() => enter(k)} onFocus={() => enter(k)} className={cls}>
        {inner}
      </button>
    );
  };

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

        <nav className="hidden items-center gap-10 md:flex">
          <NavTrigger k="women" label="Women" to="/women" />
          <NavTrigger k="men" label="Men" to="/men" />
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 text-left text-sm text-muted-foreground/70 transition-colors hover:border-gold/60 lg:flex"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="w-48">Search products, styles…</span>
          </button>
          <IconBtn label="Search" onClick={() => setSearchOpen(true)} className="lg:hidden">
            <Search className="h-[18px] w-[18px]" />
          </IconBtn>

          {/* User auth area */}
          <div ref={userDropRef} className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setUserDropOpen((v) => !v)}
                  aria-label="Account menu"
                  className="relative flex items-center gap-1.5 rounded-full p-2 text-foreground/85 transition-colors hover:text-primary"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.62_0.13_75)] text-[9px] font-bold text-black">
                    {user.email.slice(0, 2).toUpperCase()}
                  </div>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${userDropOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {userDropOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[var(--gold)]/25 bg-[oklch(0.13_0.008_60)] shadow-[0_20px_50px_-15px_oklch(0.82_0.14_85/0.4)] overflow-hidden z-50"
                    style={{ animation: "var(--animate-mega-in)" }}
                  >
                    <div className="border-b border-white/10 px-4 py-3">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
                        Signed In As
                      </div>
                      <div className="mt-0.5 truncate text-sm text-white">{user.email}</div>
                    </div>
                    <div className="py-1">
                      <DropItem
                        icon={User}
                        label="My Profile"
                        onClick={() => {
                          navigate({ to: "/profile" });
                          setUserDropOpen(false);
                        }}
                      />
                      <DropItem
                        icon={Package}
                        label="My Orders"
                        onClick={() => {
                          navigate({ to: "/orders" });
                          setUserDropOpen(false);
                        }}
                      />
                      <div className="my-1 h-px bg-white/10" />
                      <DropItem
                        icon={LogOut}
                        label="Sign Out"
                        danger
                        onClick={() => {
                          logout();
                          setUserDropOpen(false);
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <IconBtn label="Account" onClick={() => setLoginOpen(true)}>
                <User className="h-[18px] w-[18px]" />
              </IconBtn>
            )}
          </div>

          <IconBtn
            label="Wishlist"
            onClick={() => setWishlistOpen(true)}
            badge={wishlist.length || undefined}
          >
            <Heart className="h-[18px] w-[18px]" />
          </IconBtn>
          <IconBtn label="Cart" onClick={() => setCartOpen(true)} badge={cartCount || undefined}>
            <ShoppingBag className="h-[18px] w-[18px]" />
          </IconBtn>
          <button
            className="ml-1 rounded-full p-2 hover:text-primary md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {menuData && (
        <div
          onMouseEnter={() => enter(open)}
          className="hidden border-t border-border bg-background/95 backdrop-blur-xl md:block"
          style={{ animation: "var(--animate-mega-in)" }}
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-10 py-10">
            {menuData.map((col) => (
              <div key={col.title} className="col-span-2">
                <div className="mb-4 text-[10px] uppercase tracking-[0.25em] text-primary">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => {
                    const gender = open === "men" ? "men" : "women";
                    const isAll =
                      l === "Shop All" ||
                      l === "Ethnic Wear" ||
                      l === "Bottom Wear" ||
                      l === "Outerwear";
                    return (
                      <li key={l}>
                        <Link
                          to="/products"
                          search={isAll ? { gender } : { gender, category: l }}
                          onClick={() => setOpen(null)}
                          className="text-sm text-foreground/80 transition-colors hover:text-primary"
                        >
                          {l}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <div className="col-span-4">
              <div className="group relative h-72 overflow-hidden rounded-md border border-border">
                <img
                  src={menuImg}
                  alt="Featured"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Limited Drop</div>
                  <div className="mt-1 font-display text-2xl">
                    Up to <span className="text-gold">75% OFF</span>
                  </div>
                  <Link
                    to={open === "men" ? "/men" : "/women"}
                    onClick={() => setOpen(null)}
                    className="mt-3 inline-block text-xs uppercase tracking-[0.25em] text-foreground underline-offset-4 hover:underline"
                  >
                    Shop now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-gold/30 bg-card p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-display text-xl">
                <img src={meyuLogo} alt="MEYU" className="h-7 w-auto" />
                <span className="tracking-[0.3em] text-gold">MEYU</span>
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8 space-y-6">
              {(["women", "men"] as const).map((g) => (
                <div key={g}>
                  <div className="text-xs uppercase tracking-[0.3em] text-primary">{g}</div>
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                    {(g === "men" ? menMenu : womenMenu)
                      .flatMap((c) => c.links)
                      .slice(0, 8)
                      .map((l) => (
                        <Link
                          key={l}
                          to="/products"
                          search={{ gender: g, category: l }}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-foreground/80"
                        >
                          {l}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
              {user ? (
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Account</div>
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <Package className="h-4 w-4" /> My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-2 text-sm text-red-400"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setLoginOpen(true);
                  }}
                  className="w-full rounded-full border border-gold/60 py-2.5 text-sm text-gold transition-colors hover:bg-gold/10"
                >
                  Sign In / Register
                </button>
              )}
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
  onClick,
  className,
}: {
  children: React.ReactNode;
  label: string;
  badge?: number;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`relative rounded-full p-2 text-foreground/85 transition-colors hover:text-primary ${className ?? ""}`}
    >
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-primary-foreground">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function DropItem({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
        danger ? "text-red-400 hover:text-red-300" : "text-white/80 hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      {label}
    </button>
  );
}
