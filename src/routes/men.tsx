import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { CategoryPage } from "@/components/CategoryPage";

import shirt from "@/assets/p-shirt.jpg";
import tshirt from "@/assets/p-tshirt.jpg";
import jacket from "@/assets/p-jacket.jpg";
import mensEthnic from "@/assets/p-mens-ethnic.jpg";
import shirtCasual from "@/assets/c-shirt-casual.jpg";
import shirtFormal from "@/assets/c-shirt-formal.jpg";
import shirtPrinted from "@/assets/c-shirt-printed.jpg";
import shirtLinen from "@/assets/c-shirt-linen.jpg";
import teePlain from "@/assets/c-tee-plain.jpg";
import teeGraphic from "@/assets/c-tee-graphic.jpg";
import teePolo from "@/assets/c-tee-polo.jpg";
import teeOversized from "@/assets/c-tee-oversized.jpg";
import jeans from "@/assets/c-jeans.jpg";
import trousers from "@/assets/c-trousers.jpg";
import hoodie from "@/assets/c-hoodie.jpg";
import blazerM from "@/assets/c-blazer-m.jpg";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: "Shop Men — MEYU" },
      { name: "description", content: "Shop men's shirts, t-shirts, ethnic, bottom wear & outerwear. Modern luxury edits by MEYU." },
      { property: "og:title", content: "Shop Men — MEYU" },
      { property: "og:description", content: "Modern luxury edits — shirts, tees, ethnic & outerwear for men." },
    ],
  }),
  component: MenPage,
});

function MenPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <CategoryPage
        pageTitle="Shop Men"
        pageKicker="Men · Tailored Edit"
        pageBlurb="Sharp tailoring, refined fabrics and contemporary silhouettes — an edit built for the modern man."
        shopMenu={["Shop All", "Shirts", "T-Shirts", "Ethnic Wear", "Bottom Wear", "Outerwear"]}
        featured={[
          { name: "Shirts", image: shirt, badge: "Trending" },
          { name: "T-Shirts", image: tshirt, badge: "New" },
          { name: "Jackets", image: jacket },
          { name: "Ethnic", image: mensEthnic, badge: "Festive" },
        ]}
        sections={[
          {
            title: "Shirts",
            subtitle: "Tailored · Daily",
            cols: 4,
            items: [
              { name: "Casual Shirts", image: shirtCasual, badge: "Bestseller" },
              { name: "Formal Shirts", image: shirtFormal },
              { name: "Printed Shirts", image: shirtPrinted, badge: "Bold" },
              { name: "Linen Shirts", image: shirtLinen, badge: "Summer" },
            ],
          },
          {
            title: "T-Shirts",
            subtitle: "Everyday · Essentials",
            cols: 4,
            items: [
              { name: "Plain", image: teePlain },
              { name: "Graphic", image: teeGraphic, badge: "Hot" },
              { name: "Polo", image: teePolo },
              { name: "Oversized", image: teeOversized, badge: "Trend" },
            ],
          },
          {
            title: "Bottom Wear",
            subtitle: "Denim · Tailored",
            cols: 2,
            items: [
              { name: "Jeans", image: jeans },
              { name: "Trousers", image: trousers },
            ],
          },
          {
            title: "Outerwear",
            subtitle: "Layer · Statement",
            cols: 3,
            items: [
              { name: "Jackets", image: jacket },
              { name: "Hoodies", image: hoodie, badge: "Cozy" },
              { name: "Blazers", image: blazerM, badge: "Sharp" },
            ],
          },
        ]}
        accent="cool"
      />
      <Footer />
      <AIChat />
    </div>
  );
}
