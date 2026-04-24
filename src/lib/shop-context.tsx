import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/lib/catalog";
import { toast } from "sonner";

export type CartItem = { product: Product; qty: number };

type ShopState = {
  cart: CartItem[];
  wishlist: string[]; // product ids
  cartCount: number;
  cartTotal: number;
  // cart
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  // wishlist
  toggleWishlist: (p: Product) => void;
  isWishlisted: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
  // ui
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  loginOpen: boolean;
  setLoginOpen: (v: boolean) => void;
};

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = "meyu.cart.v1";
const WL_KEY = "meyu.wishlist.v1";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const ids = JSON.parse(raw) as { id: string; qty: number }[];
    return ids
      .map(({ id, qty }) => {
        const product = products.find((p) => p.id === id);
        return product ? { product, qty } : null;
      })
      .filter(Boolean) as CartItem[];
  } catch {
    return [];
  }
}

function loadWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WL_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Hydrate after mount (avoid SSR mismatch)
  useEffect(() => {
    setCart(loadCart());
    setWishlist(loadWishlist());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cart.map((c) => ({ id: c.product.id, qty: c.qty }))),
    );
  }, [cart]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(WL_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (p: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === p.id);
      if (existing) {
        return prev.map((c) =>
          c.product.id === p.id ? { ...c, qty: c.qty + qty } : c,
        );
      }
      return [...prev, { product: p, qty }];
    });
    toast.success(`Added to cart`, { description: p.name });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.product.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((c) => (c.product.id === id ? { ...c, qty } : c)));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (p: Product) => {
    setWishlist((prev) => {
      if (prev.includes(p.id)) {
        toast(`Removed from wishlist`, { description: p.name });
        return prev.filter((i) => i !== p.id);
      }
      toast.success(`Saved to wishlist`, { description: p.name });
      return [...prev, p.id];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((i) => i !== id));
  };

  const isWishlisted = (id: string) => wishlist.includes(id);

  const value = useMemo<ShopState>(
    () => ({
      cart,
      wishlist,
      cartCount: cart.reduce((n, c) => n + c.qty, 0),
      cartTotal: cart.reduce((n, c) => n + c.qty * c.product.price, 0),
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      removeFromWishlist,
      cartOpen,
      setCartOpen,
      wishlistOpen,
      setWishlistOpen,
      searchOpen,
      setSearchOpen,
      loginOpen,
      setLoginOpen,
    }),
    [cart, wishlist, cartOpen, wishlistOpen, searchOpen, loginOpen],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
