export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-10 px-6 md:grid-cols-4 lg:px-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-2xl"><span className="text-gold">Style</span>AI</div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Luxury fashion, intelligently curated. Where heritage craftsmanship meets your personal style.
          </p>
        </div>
        {[
          { t: "Shop", l: ["Women", "Men", "Kids", "New In"] },
          { t: "Help", l: ["Contact", "Shipping", "Returns", "Size Guide"] },
          { t: "Brand", l: ["About", "Sustainability", "Press", "Careers"] },
        ].map((c) => (
          <div key={c.t}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{c.t}</div>
            <ul className="mt-4 space-y-2">
              {c.l.map((x) => (
                <li key={x}><a href="#" className="text-sm text-foreground/75 hover:text-primary">{x}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-[1400px] border-t border-border px-6 pt-6 text-center text-xs text-muted-foreground lg:px-10">
        © {new Date().getFullYear()} StyleAI · Crafted with intelligence.
      </div>
    </footer>
  );
}
