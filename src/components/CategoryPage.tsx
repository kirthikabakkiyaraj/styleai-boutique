import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Heart, Eye, ShoppingBag } from "lucide-react";

export type CategoryItem = {
  name: string;
  image: string;
  badge?: string;
};

export type CategorySection = {
  title: string;
  subtitle?: string;
  items: CategoryItem[];
  cols?: 2 | 3 | 4 | 5;
};

type Props = {
  pageTitle: string;
  pageKicker: string;
  pageBlurb: string;
  shopMenu: CategoryItem[];
  featured: CategoryItem[];
  sections: CategorySection[];
  fabrics?: string[];
};

export function CategoryPage({
  pageTitle,
  pageKicker,
  pageBlurb,
  shopMenu,
  featured,
  sections,
  fabrics = ["Cotton", "Silk", "Georgette", "Rayon", "Chiffon", "Linen", "Velvet", "Organza"],
}: Props) {
  return (
    <div className="min-h-screen bg-[oklch(0.12_0.005_60)] text-white">
      {/* Hero / page header */}
      <section className="relative overflow-hidden border-b border-[var(--gold)]/30">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(1200px 400px at 20% 0%, oklch(0.3 0.08 75 / 0.35), transparent 60%), radial-gradient(900px 350px at 90% 100%, oklch(0.25 0.1 45 / 0.3), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-14 pt-28 lg:px-10 lg:pt-32">
          <div
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[var(--gold)] opacity-0 animate-[fade-in_0.6s_ease-out_0.05s_forwards]"
          >
            <Sparkles className="h-3 w-3" />
            {pageKicker}
          </div>
          <h1 className="mt-3 font-display text-5xl uppercase leading-tight tracking-wide md:text-7xl opacity-0 animate-[fade-in_0.7s_ease-out_0.15s_forwards] bg-gradient-to-r from-white via-[oklch(0.92_0.06_85)] to-[var(--gold)] bg-clip-text text-transparent">
            {pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 opacity-0 animate-[fade-in_0.7s_ease-out_0.3s_forwards]">
            {pageBlurb}
          </p>
          <div className="mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-0 animate-[fade-in_0.7s_ease-out_0.45s_forwards]" />
        </div>
      </section>

      {/* Shop circular categories */}
      <section className="mx-auto max-w-[1400px] px-6 pt-12 lg:px-10">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">Shop</div>
        <div className="mt-6 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shopMenu.map((c, i) => (
            <CircleCategory key={c.name} item={c} index={i} />
          ))}
        </div>
      </section>

      {/* Featured visual cards */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">
              Premium Collection
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Featured Categories</h2>
          </div>
          <Link
            to="/"
            className="hidden items-center gap-1 text-xs uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-[var(--gold)] md:inline-flex"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {featured.map((c, i) => (
            <FeaturedCard key={c.name} item={c} index={i} />
          ))}
        </div>
      </section>

      {/* Themed sections */}
      {sections.map((sec, idx) => (
        <SectionGrid key={sec.title} section={sec} sectionIndex={idx} />
      ))}

      {/* Shop by fabric */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-br from-[oklch(0.16_0.01_60)] to-[oklch(0.1_0.005_60)] p-8 md:p-12">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">Curated</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Shop by Fabric</h2>
          <div className="mt-8 grid grid-cols-4 gap-6 md:grid-cols-8">
            {fabrics.map((f, i) => (
              <FabricCircle key={f} name={f} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function CircleCategory({ item, index }: { item: CategoryItem; index: number }) {
  return (
    <button
      className="group flex shrink-0 flex-col items-center gap-3 opacity-0"
      style={{
        animation: `fade-in 0.5s ease-out ${0.05 * index + 0.1}s forwards, scale-in 0.4s ease-out ${0.05 * index + 0.1}s forwards`,
      }}
    >
      <div className="relative">
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[var(--gold)] via-[oklch(0.78_0.13_75)] to-[oklch(0.55_0.13_45)] opacity-70 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur-md" />
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[var(--gold)]/70 bg-[oklch(0.16_0.01_60)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.08] group-hover:border-[var(--gold)] group-hover:shadow-[0_10px_30px_-8px_var(--gold)] md:h-28 md:w-28">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={224}
            height={224}
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/80 transition-colors group-hover:text-[var(--gold)]">
        {item.name}
      </span>
    </button>
  );
}

function FabricCircle({ name, index }: { name: string; index: number }) {
  return (
    <button
      className="group flex flex-col items-center gap-2 opacity-0"
      style={{ animation: `fade-in 0.5s ease-out ${0.04 * index}s forwards` }}
    >
      <div className="relative h-20 w-20">
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.55_0.13_45)] opacity-60 blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-[var(--gold)]/70 bg-gradient-to-br from-[oklch(0.18_0.01_60)] to-[oklch(0.1_0.005_60)] font-display text-sm text-[var(--gold)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_24px_-8px_var(--gold)]">
          {name.charAt(0)}
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors group-hover:text-[var(--gold)]">
        {name}
      </span>
    </button>
  );
}

function FeaturedCard({ item, index }: { item: CategoryItem; index: number }) {
  return (
    <button
      className="group relative overflow-hidden rounded-3xl p-[1.5px] opacity-0 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_var(--gold)]"
      style={{ animation: `fade-in 0.6s ease-out ${0.08 * index + 0.1}s forwards` }}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "var(--gradient-gold)" }}
      />
      <div className="relative overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[oklch(0.1_0.005_60)]">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={768}
            height={960}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Permanent dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-black/70 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] shadow-[0_8px_30px_-8px_var(--gold)]">
              View Collection <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
        {/* Label */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-end justify-between">
            <div className="font-display text-xl uppercase tracking-wide text-white md:text-2xl">
              {item.name}
            </div>
            {item.badge && (
              <span className="rounded-full border border-[var(--gold)]/60 bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-wider text-[var(--gold)] backdrop-blur">
                {item.badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function SectionGrid({ section, sectionIndex }: { section: CategorySection; sectionIndex: number }) {
  const cols = section.cols ?? 3;
  const gridClass =
    cols === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : cols === 3
        ? "grid-cols-2 md:grid-cols-3"
        : cols === 4
          ? "grid-cols-2 md:grid-cols-4"
          : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5";

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
      <div
        className="mb-6 flex items-end justify-between opacity-0"
        style={{ animation: `fade-in 0.6s ease-out ${0.05 * sectionIndex}s forwards` }}
      >
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">
            {section.subtitle ?? "Explore"}
          </div>
          <h3 className="mt-2 font-display text-2xl uppercase tracking-wide md:text-3xl">
            {section.title}
          </h3>
          <div className="mt-3 h-px w-20 bg-gradient-to-r from-[var(--gold)] to-transparent" />
        </div>
        <button className="hidden items-center gap-1 text-xs uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-[var(--gold)] md:inline-flex">
          See all <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className={`grid gap-4 md:gap-6 ${gridClass}`}>
        {section.items.map((it, i) => (
          <SectionCard key={it.name} item={it} index={i} />
        ))}
      </div>
    </section>
  );
}

function SectionCard({ item, index }: { item: CategoryItem; index: number }) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-[var(--gold)]/40 bg-[oklch(0.14_0.008_60)] opacity-0 shadow-[0_10px_30px_-15px_oklch(0.05_0_0/0.6)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--gold)] hover:shadow-[0_20px_45px_-15px_var(--gold)]"
      style={{ animation: `fade-in 0.5s ease-out ${0.06 * index}s forwards` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={768}
          height={960}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Quick action icons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <IconBtn label="Wishlist" hoverAnim="hover:animate-[scale-in_0.3s_ease-out]">
            <Heart className="h-3.5 w-3.5" />
          </IconBtn>
          <IconBtn label="Quick view">
            <Eye className="h-3.5 w-3.5" />
          </IconBtn>
          <IconBtn label="Add to cart">
            <ShoppingBag className="h-3.5 w-3.5" />
          </IconBtn>
        </div>

        {/* Hover collection overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-black/70 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
            View Collection <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--gold)]/20 bg-black/40 p-4">
        <div className="font-display text-lg uppercase tracking-wide text-[var(--gold)]">
          {item.name}
        </div>
        {item.badge && (
          <span className="rounded-full border border-[var(--gold)]/60 bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-wider text-[var(--gold)]">
            {item.badge}
          </span>
        )}
      </div>
    </div>
  );
}

function IconBtn({
  children,
  label,
  hoverAnim = "",
}: {
  children: React.ReactNode;
  label: string;
  hoverAnim?: string;
}) {
  return (
    <button
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-full border border-[var(--gold)]/60 bg-black/70 text-[var(--gold)] backdrop-blur transition-all duration-200 hover:scale-110 hover:border-[var(--gold)] hover:bg-black hover:shadow-[0_0_15px_-2px_var(--gold)] active:scale-95 ${hoverAnim}`}
    >
      {children}
    </button>
  );
}
