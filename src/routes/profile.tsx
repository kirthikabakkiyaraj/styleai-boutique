import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useShop } from "@/lib/shop-context";
import { User, Package, Heart, ShoppingBag, LogOut, ChevronRight } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — MEYU" },
      { name: "description", content: "Your MEYU profile — orders, wishlist, and account details." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, logout, orders, cart, wishlist } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate({ to: "/" });
  }, [user, navigate]);

  if (!user) return null;

  const initials = user.email.slice(0, 2).toUpperCase();

  const stats = [
    { label: "Orders", value: orders.length, icon: Package, href: "/orders" },
    { label: "Wishlist", value: wishlist.length, icon: Heart, href: "/" },
    { label: "Cart Items", value: cart.reduce((n, c) => n + c.qty, 0), icon: ShoppingBag, href: "/" },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.1_0.005_60)] text-white">
      <Navbar />
      <main className="mx-auto max-w-[900px] px-6 pt-28 pb-24 lg:px-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-white/50 mb-10">
          <Link to="/" className="hover:text-[var(--gold)] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-white/30" />
          <span className="text-[var(--gold)]">Profile</span>
        </nav>

        {/* Profile Card */}
        <div className="relative overflow-hidden rounded-3xl border border-[var(--gold)]/30 bg-gradient-to-br from-[oklch(0.15_0.01_60)] to-[oklch(0.12_0.005_60)] p-8 shadow-[0_20px_60px_-20px_oklch(0.82_0.14_85/0.4)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--gold)]/5 blur-3xl" />

          <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[oklch(0.88_0.1_88)] to-[oklch(0.62_0.13_75)] flex items-center justify-center shadow-[0_0_40px_-10px_var(--gold)]">
                  <span className="font-display text-3xl font-bold text-black">{initials}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-2 border-[oklch(0.12_0.005_60)] flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)] mb-1">Member</div>
              <h1 className="font-display text-3xl text-white mb-1">{user.email.split("@")[0]}</h1>
              <p className="text-sm text-white/60">{user.email}</p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <Link
                    key={s.label}
                    to={s.href}
                    className="group flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[var(--gold)]/50 hover:bg-[var(--gold)]/5"
                  >
                    <s.icon className="h-5 w-5 text-[var(--gold)]" />
                    <span className="text-xl font-bold text-white">{s.value}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">{s.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link
            to="/orders"
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-[oklch(0.14_0.008_60)] p-5 transition-all hover:border-[var(--gold)]/40 hover:bg-[oklch(0.16_0.01_60)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10">
                <Package className="h-5 w-5 text-[var(--gold)]" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">My Orders</div>
                <div className="text-xs text-white/50">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[var(--gold)]" />
          </Link>

          <Link
            to="/products"
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-[oklch(0.14_0.008_60)] p-5 transition-all hover:border-[var(--gold)]/40 hover:bg-[oklch(0.16_0.01_60)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10">
                <ShoppingBag className="h-5 w-5 text-[var(--gold)]" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Browse Collections</div>
                <div className="text-xs text-white/50">Discover new arrivals</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[var(--gold)]" />
          </Link>
        </div>

        {/* Logout */}
        <div className="mt-6">
          <button
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 py-4 text-sm text-red-400 transition-all hover:border-red-500/40 hover:bg-red-500/10 active:scale-98"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
