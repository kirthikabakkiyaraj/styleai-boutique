import { Heart } from "lucide-react";
import { products } from "@/lib/catalog";

export function ProductGrid() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-primary">Featured</div>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Just Dropped</h2>
          </div>
          <button className="text-xs uppercase tracking-[0.3em] text-foreground/80 transition-colors hover:text-primary">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:border-gold/60 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button
                  aria-label="Wishlist"
                  className="absolute right-3 top-3 rounded-full bg-background/70 p-2 text-foreground backdrop-blur-md transition-all hover:bg-gold hover:text-primary-foreground"
                >
                  <Heart className="h-4 w-4" />
                </button>
                {p.oldPrice && (
                  <span className="absolute left-3 top-3 rounded-full border border-gold/50 bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-widest text-primary backdrop-blur-md">
                    -{Math.round((1 - p.price / p.oldPrice) * 100)}%
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{p.brand}</div>
                <h3 className="mt-1 truncate text-sm text-foreground">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-gold text-base font-medium">₹{p.price.toLocaleString("en-IN")}</span>
                  {p.oldPrice && (
                    <span className="text-xs text-muted-foreground line-through">₹{p.oldPrice.toLocaleString("en-IN")}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
