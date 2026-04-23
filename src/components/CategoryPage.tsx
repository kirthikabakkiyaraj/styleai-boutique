import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

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
  shopMenu: string[];
  featured: CategoryItem[];
  sections: CategorySection[];
  fabrics?: string[];
  accent?: "warm" | "cool";
};

export function CategoryPage({
  pageTitle,
  pageKicker,
  pageBlurb,
  shopMenu,
  featured,
  sections,
  fabrics = ["Cotton", "Silk", "Linen", "Georgette", "Chiffon", "Velvet"],
  accent = "warm",
}: Props) {
  const pageBg =
    accent === "warm"
      ? "bg-[oklch(0.97_0.02_85)] text-[oklch(0.18_0.02_60)]"
      : "bg-[oklch(0.94_0.01_80)] text-[oklch(0.16_0.01_60)]";

  return (
    <div className={`min-h-screen ${pageBg}`}>
      {/* Hero / page header */}
      <section className="relative overflow-hidden border-b border-[var(--gold)]/30">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(1200px 400px at 20% 0%, oklch(0.92 0.08 85 / 0.7), transparent 60%), radial-gradient(900px 350px at 90% 100%, oklch(0.9 0.1 35 / 0.4), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-12 pt-28 lg:px-10 lg:pt-32">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[oklch(0.55_0.13_75)]">
            <Sparkles className="h-3 w-3" />
            {pageKicker}
          </div>
          <h1 className="mt-3 font-display text-5xl leading-tight md:text-7xl">
            {pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[oklch(0.35_0.02_60)]">
            {pageBlurb}
          </p>

          {/* Shop top menu */}
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {shopMenu.map((label, i) => (
              <button
                key={label}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-all ${
                  i === 0
                    ? "border-transparent bg-gradient-to-r from-[oklch(0.7_0.15_75)] to-[oklch(0.85_0.13_85)] text-[oklch(0.15_0.005_60)] shadow-[0_8px_24px_-10px_oklch(0.7_0.15_75/0.6)]"
                    : "border-[var(--gold)]/40 bg-white/60 text-[oklch(0.25_0.02_60)] hover:border-[var(--gold)] hover:bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured visual cards */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[oklch(0.55_0.13_75)]">
              Premium Collection
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Featured Categories</h2>
          </div>
          <Link
            to="/"
            className="hidden items-center gap-1 text-xs uppercase tracking-[0.25em] text-[oklch(0.4_0.02_60)] hover:text-[oklch(0.55_0.13_75)] md:inline-flex"
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
      {sections.map((sec) => (
        <SectionGrid key={sec.title} section={sec} />
      ))}

      {/* Shop by fabric */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-br from-white to-[oklch(0.94_0.04_85)] p-8 md:p-12">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[oklch(0.55_0.13_75)]">
            Curated
          </div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Shop by Fabric</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {fabrics.map((f) => (
              <button
                key={f}
                className="rounded-full border border-[var(--gold)]/50 bg-white px-5 py-2 text-sm text-[oklch(0.2_0.02_60)] transition-all hover:scale-105 hover:border-[var(--gold)] hover:shadow-[0_8px_20px_-10px_oklch(0.7_0.15_75/0.5)]"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const palettes = [
  "from-[oklch(0.92_0.08_25)] to-[oklch(0.85_0.12_15)]",   // pink
  "from-[oklch(0.9_0.1_85)] to-[oklch(0.82_0.13_75)]",     // gold
  "from-[oklch(0.88_0.1_160)] to-[oklch(0.78_0.13_150)]",  // emerald
  "from-[oklch(0.88_0.09_265)] to-[oklch(0.78_0.12_260)]", // royal blue
  "from-[oklch(0.92_0.06_320)] to-[oklch(0.84_0.1_310)]",  // magenta
  "from-[oklch(0.92_0.07_55)] to-[oklch(0.84_0.11_45)]",   // amber
];

function FeaturedCard({ item, index }: { item: CategoryItem; index: number }) {
  const palette = palettes[index % palettes.length];
  return (
    <button className="group relative overflow-hidden rounded-3xl p-[2px] transition-transform duration-500 hover:-translate-y-1">
      <div
        className="absolute inset-0 rounded-3xl opacity-90"
        style={{ background: "var(--gradient-gold)" }}
      />
      <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)]">
        <div className={`relative aspect-[3/4] bg-gradient-to-br ${palette}`}>
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={768}
            height={960}
            className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
          />
          {/* View overlay */}
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="mb-16 rounded-full bg-white/95 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[oklch(0.2_0.02_60)] shadow-lg">
              View Collection
            </span>
          </div>
        </div>
        {/* Label */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
          <div className="flex items-end justify-between">
            <div className="font-display text-xl text-white md:text-2xl">{item.name}</div>
            {item.badge && (
              <span className="rounded-full bg-gradient-to-r from-[oklch(0.65_0.22_15)] to-[oklch(0.78_0.17_50)] px-2.5 py-1 text-[9px] uppercase tracking-wider text-white shadow-md">
                {item.badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function SectionGrid({ section }: { section: CategorySection }) {
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
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[oklch(0.55_0.13_75)]">
            {section.subtitle ?? "Explore"}
          </div>
          <h3 className="mt-2 font-display text-2xl md:text-3xl">{section.title}</h3>
        </div>
        <button className="hidden items-center gap-1 text-xs uppercase tracking-[0.25em] text-[oklch(0.4_0.02_60)] hover:text-[oklch(0.55_0.13_75)] md:inline-flex">
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
  const palette = palettes[(index + 2) % palettes.length];
  return (
    <button className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-15px_oklch(0.2_0.02_60/0.3)] ring-1 ring-[var(--gold)]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-15px_oklch(0.7_0.15_75/0.4)] hover:ring-[var(--gold)]">
      <div className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br ${palette}`}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={768}
          height={960}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-white/95 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[oklch(0.2_0.02_60)] shadow-lg">
            View Collection
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="font-display text-lg">{item.name}</div>
        <span className="rounded-full bg-gradient-to-r from-[oklch(0.7_0.2_345)] to-[oklch(0.78_0.15_60)] px-2.5 py-1 text-[9px] uppercase tracking-wider text-white">
          New
        </span>
      </div>
    </button>
  );
}
