import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useShop, type Order, type OrderStatus } from "@/lib/shop-context";
import { Package, ChevronRight, Check, Truck, MapPin, Gift } from "lucide-react";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "My Orders — MEYU" },
      { name: "description", content: "Track your MEYU orders." },
    ],
  }),
  component: OrdersPage,
});

const STATUS_STEPS: { key: OrderStatus; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "placed", label: "Order Placed", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "out_for_delivery", label: "Out for Delivery", icon: MapPin },
  { key: "delivered", label: "Delivered", icon: Gift },
];

function statusIndex(s: OrderStatus) {
  return STATUS_STEPS.findIndex((x) => x.key === s);
}

function OrderCard({ order }: { order: Order }) {
  const current = statusIndex(order.status);
  const dateStr = new Date(order.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-[var(--gold)]/20 bg-[oklch(0.13_0.008_60)] overflow-hidden transition-all hover:border-[var(--gold)]/40 hover:shadow-[0_10px_40px_-15px_var(--gold)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">Order ID</div>
          <div className="mt-0.5 font-mono text-sm font-medium text-white">{order.id}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Placed On</div>
          <div className="mt-0.5 text-sm text-white">{dateStr}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Total</div>
          <div className="mt-0.5 text-sm font-medium text-[var(--gold)]">
            ₹{order.total.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="px-5 py-6">
        <div className="relative flex justify-between">
          {/* connector line */}
          <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-0.5 bg-white/10" />
          <div
            className="absolute left-[calc(12.5%)] top-4 h-0.5 bg-gradient-to-r from-[var(--gold)] to-[oklch(0.62_0.13_75)] transition-all duration-700"
            style={{ width: `${(current / (STATUS_STEPS.length - 1)) * 75}%` }}
          />

          {STATUS_STEPS.map((step, i) => {
            const done = i <= current;
            const active = i === current;
            return (
              <div key={step.key} className="relative flex flex-col items-center gap-2 z-10" style={{ width: "25%" }}>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    done
                      ? active
                        ? "border-[var(--gold)] bg-[var(--gold)] text-black shadow-[0_0_16px_-4px_var(--gold)]"
                        : "border-[var(--gold)] bg-[var(--gold)]/20 text-[var(--gold)]"
                      : "border-white/20 bg-white/5 text-white/30"
                  }`}
                >
                  {done && !active ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-3.5 w-3.5" />
                  )}
                </div>
                <span
                  className={`text-center text-[10px] leading-tight ${
                    active ? "text-[var(--gold)]" : done ? "text-white/70" : "text-white/30"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Items */}
      <div className="border-t border-white/10 px-5 py-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-3">
          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
        </div>
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {order.items.slice(0, 6).map(({ product, qty }) => (
            <div key={product.id} className="relative flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="h-16 w-14 rounded-lg object-cover border border-white/10"
              />
              {qty > 1 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--gold)] text-[9px] font-bold text-black">
                  {qty}
                </span>
              )}
            </div>
          ))}
          {order.items.length > 6 && (
            <div className="flex h-16 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-white/50">
              +{order.items.length - 6}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OrdersPage() {
  const { orders, user } = useShop();

  return (
    <div className="min-h-screen bg-[oklch(0.1_0.005_60)] text-white">
      <Navbar />
      <main className="mx-auto max-w-[900px] px-6 pt-28 pb-24 lg:px-10">
        <nav className="flex items-center gap-2 text-xs text-white/50 mb-8">
          <Link to="/" className="hover:text-[var(--gold)] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-white/30" />
          {user && (
            <>
              <Link to="/profile" className="hover:text-[var(--gold)] transition-colors">Profile</Link>
              <ChevronRight className="h-3 w-3 text-white/30" />
            </>
          )}
          <span className="text-[var(--gold)]">Orders</span>
        </nav>

        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">Account</div>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.06em] md:text-5xl">
              My Orders
            </h1>
          </div>
          <span className="text-sm text-white/50">{orders.length} order{orders.length !== 1 ? "s" : ""}</span>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Package className="mb-4 h-16 w-16 text-white/20" />
            <h2 className="font-display text-2xl text-white/60">No orders yet</h2>
            <p className="mt-2 text-sm text-white/40">Your luxury wardrobe is waiting to be filled.</p>
            <Link
              to="/products"
              className="mt-6 rounded-full border border-[var(--gold)]/60 px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
