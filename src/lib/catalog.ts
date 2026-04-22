import dress from "@/assets/p-dress.jpg";
import coord from "@/assets/p-coord.jpg";
import top from "@/assets/p-top.jpg";
import ethnic from "@/assets/p-ethnic.jpg";
import shirt from "@/assets/p-shirt.jpg";
import tshirt from "@/assets/p-tshirt.jpg";
import jacket from "@/assets/p-jacket.jpg";
import mensEthnic from "@/assets/p-mens-ethnic.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  gender: "women" | "men";
  category: string;
};

export const products: Product[] = [
  { id: "w1", name: "Onyx Pleated Gown", brand: "Maison Aria", price: 4499, oldPrice: 7999, image: dress, gender: "women", category: "Dresses" },
  { id: "w2", name: "Noir Co-ord Set", brand: "Velour", price: 3299, oldPrice: 5499, image: coord, gender: "women", category: "Co-ord Sets" },
  { id: "w3", name: "Silk Square Top", brand: "Ivoire", price: 1899, oldPrice: 2999, image: top, gender: "women", category: "Tops" },
  { id: "w4", name: "Royal Anarkali", brand: "Suriya", price: 6999, oldPrice: 11999, image: ethnic, gender: "women", category: "Ethnic" },
  { id: "m1", name: "Midnight Formal Shirt", brand: "Atelier 9", price: 1799, oldPrice: 2499, image: shirt, gender: "men", category: "Shirts" },
  { id: "m2", name: "Essential Black Tee", brand: "North&Co", price: 899, oldPrice: 1499, image: tshirt, gender: "men", category: "T-Shirts" },
  { id: "m3", name: "Gold-Zip Biker Jacket", brand: "Rovere", price: 5999, oldPrice: 8999, image: jacket, gender: "men", category: "Jackets" },
  { id: "m4", name: "Heritage Sherwani", brand: "Raahi", price: 8499, oldPrice: 13999, image: mensEthnic, gender: "men", category: "Ethnic" },
];

export const categories = {
  women: [
    { name: "Dresses", image: dress },
    { name: "Co-ord Sets", image: coord },
    { name: "Tops", image: top },
    { name: "Ethnic", image: ethnic },
  ],
  men: [
    { name: "Shirts", image: shirt },
    { name: "T-Shirts", image: tshirt },
    { name: "Jackets", image: jacket },
    { name: "Ethnic", image: mensEthnic },
  ],
};

export const womenMenu = [
  { title: "Shop", links: ["Shop All", "Dresses", "Tops", "Co-ord Sets", "Ethnic Wear"] },
  { title: "Ethnic", links: ["Kurtis", "Sarees", "Lehenga", "Anarkali", "Dupattas"] },
  { title: "Bottom Wear", links: ["Jeans", "Trousers", "Skirts", "Palazzo", "Shorts"] },
  { title: "Outerwear", links: ["Jackets", "Shrugs", "Blazers", "Coats", "Capes"] },
];

export const menMenu = [
  { title: "Shop", links: ["Shop All", "Shirts", "T-Shirts", "Jackets", "Ethnic Wear"] },
  { title: "Shirts", links: ["Casual", "Formal", "Printed", "Linen", "Oxford"] },
  { title: "T-Shirts", links: ["Plain", "Graphic", "Polo", "Oversized", "Henley"] },
  { title: "Bottoms & Outerwear", links: ["Jeans", "Trousers", "Chinos", "Hoodies", "Blazers"] },
];
