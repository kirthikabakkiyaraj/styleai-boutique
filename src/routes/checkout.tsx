import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useShop } from "@/lib/shop-context";
import { useState } from "react";
import { CircleCheck as CheckCircle, ChevronRight, ShoppingBag, Package } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout — MEYU" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, cartTotal, placeOrder, user, setLoginOpen } = useShop();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [step, setStep] = useState<"address" | "payment" | "success">("address");

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    pincode: "",
    state: "",
  });

  const handleAddressNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const id = placeOrder();
    if (id) {
      setOrderId(id);
      setStep("success");
    }
  };

  if (step === "success" && orderId) {
    return (
      <div className="min-h-screen bg-[oklch(0.1_0.005_60)] text-white">
        <Navbar />
        <main className="mx-auto flex min-h-[80vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
          <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.88_0.1_88)] to-[oklch(0.62_0.13_75)] shadow-[0_0_60px_-10px_var(--gold)]">
            <CheckCircle className="h-12 w-12 text-black" />
          </div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)] mb-2">
            Order Confirmed
          </div>
          <h1 className="font-display text-4xl text-white">Thank You!</h1>
          <p className="mt-3 text-sm text-white/60">
            Your luxury order has been placed successfully.
          </p>

          <div className="mt-8 w-full rounded-2xl border border-[var(--gold)]/30 bg-[oklch(0.14_0.008_60)] p-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-1">Order ID</div>
            <div className="font-mono text-lg font-bold text-[var(--gold)]">{orderId}</div>
            <div className="mt-4 text-xs text-white/50">
              Estimated delivery: 3–5 business days
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 w-full sm:flex-row">
            <Link
              to="/orders"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.88_0.1_88)] via-[oklch(0.72_0.15_75)] to-[oklch(0.88_0.1_88)] py-3.5 text-sm font-semibold text-black"
            >
              <Package className="h-4 w-4" /> Track Order
            </Link>
            <Link
              to="/"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/50 py-3.5 text-sm text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0 && step !== "success") {
    return (
      <div className="min-h-screen bg-[oklch(0.1_0.005_60)] text-white">
        <Navbar />
        <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
          <ShoppingBag className="mb-4 h-16 w-16 text-white/20" />
          <h2 className="font-display text-2xl text-white/60">Your cart is empty</h2>
          <Link
            to="/products"
            className="mt-6 rounded-full border border-[var(--gold)]/60 px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors"
          >
            Shop Now
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[oklch(0.1_0.005_60)] text-white">
      <Navbar />
      <main className="mx-auto max-w-[1100px] px-6 pt-28 pb-24 lg:px-10">
        <nav className="flex items-center gap-2 text-xs text-white/50 mb-8">
          <Link to="/" className="hover:text-[var(--gold)] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-white/30" />
          <span className="text-[var(--gold)]">Checkout</span>
        </nav>

        {/* Step indicators */}
        <div className="mb-10 flex items-center gap-3">
          {(["address", "payment"] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              {i > 0 && <div className="h-px w-8 bg-white/20" />}
              <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] ${step === s ? "text-[var(--gold)]" : step === "payment" && s === "address" ? "text-white/50" : "text-white/30"}`}>
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${step === s ? "bg-[var(--gold)] text-black" : step === "payment" && s === "address" ? "bg-[var(--gold)]/20 text-[var(--gold)]" : "bg-white/10 text-white/30"}`}>
                  {step === "payment" && s === "address" ? "✓" : i + 1}
                </span>
                {s === "address" ? "Delivery Address" : "Payment"}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left: Form */}
          <div>
            {step === "address" && (
              <form onSubmit={handleAddressNext} className="space-y-5">
                <h2 className="font-display text-2xl mb-4">Delivery Address</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" value={address.name} onChange={(v) => setAddress({ ...address, name: v })} placeholder="Arjun Sharma" required />
                  <Field label="Phone Number" value={address.phone} onChange={(v) => setAddress({ ...address, phone: v })} placeholder="+91 98765 43210" required />
                </div>
                <Field label="Address Line" value={address.line1} onChange={(v) => setAddress({ ...address, line1: v })} placeholder="House no., Street, Area" required />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="City" value={address.city} onChange={(v) => setAddress({ ...address, city: v })} placeholder="Mumbai" required />
                  <Field label="Pincode" value={address.pincode} onChange={(v) => setAddress({ ...address, pincode: v })} placeholder="400001" required />
                  <Field label="State" value={address.state} onChange={(v) => setAddress({ ...address, state: v })} placeholder="Maharashtra" required />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-gradient-to-r from-[oklch(0.88_0.1_88)] via-[oklch(0.72_0.15_75)] to-[oklch(0.88_0.1_88)] bg-[length:200%_auto] py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition-all hover:shadow-[0_8px_30px_-8px_var(--gold)] active:scale-95"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handlePayment} className="space-y-5">
                <h2 className="font-display text-2xl mb-4">Payment</h2>

                <div className="space-y-3">
                  {[
                    { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives" },
                    { id: "upi", label: "UPI / PhonePe / GPay", desc: "Instant payment via UPI" },
                    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      htmlFor={opt.id}
                      className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/15 bg-white/5 p-4 transition-all hover:border-[var(--gold)]/50 has-[:checked]:border-[var(--gold)] has-[:checked]:bg-[var(--gold)]/5"
                    >
                      <input
                        id={opt.id}
                        type="radio"
                        name="payment"
                        defaultChecked={opt.id === "cod"}
                        className="accent-[var(--gold)]"
                      />
                      <div>
                        <div className="text-sm font-medium text-white">{opt.label}</div>
                        <div className="text-xs text-white/50">{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("address")}
                    className="rounded-full border border-white/20 px-6 py-3.5 text-sm text-white/70 hover:border-[var(--gold)]/40 hover:text-white transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-gradient-to-r from-[oklch(0.88_0.1_88)] via-[oklch(0.72_0.15_75)] to-[oklch(0.88_0.1_88)] bg-[length:200%_auto] py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-black transition-all hover:shadow-[0_8px_30px_-8px_var(--gold)] active:scale-95"
                  >
                    Place Order — ₹{cartTotal.toLocaleString("en-IN")}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="rounded-2xl border border-[var(--gold)]/20 bg-[oklch(0.13_0.008_60)] p-5 h-fit">
            <h3 className="font-display text-xl mb-5">Order Summary</h3>
            <div className="max-h-72 space-y-3 overflow-y-auto pr-1 [scrollbar-width:thin]">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-14 rounded-lg object-cover border border-white/10 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-white/50">{product.brand}</div>
                    <div className="text-sm text-white truncate">{product.name}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-white/50">Qty: {qty}</span>
                      <span className="text-sm font-medium text-[var(--gold)]">
                        ₹{(product.price * qty).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
              <div className="flex justify-between text-sm text-white/70">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-white/70">
                <span>Delivery</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold">
                <span>Total</span>
                <span className="text-[var(--gold)]">₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.25em] text-white/60 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30 transition-all"
      />
    </div>
  );
}
