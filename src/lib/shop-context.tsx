import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/lib/catalog";
import { toast } from "sonner";

export type CartItem = { product: Product; qty: number };

export type OrderStatus = "placed" | "shipped" | "out_for_delivery" | "delivered";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: OrderStatus;
};

export type AuthUser = { email: string };

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  cartTotal: number;
  orders: Order[];
  user: AuthUser | null;
  // cart
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  // wishlist
  toggleWishlist: (p: Product) => void;
  isWishlisted: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
  // orders
  placeOrder: () => string | null;
  // auth
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
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
const USER_KEY = "meyu.user.v1";
const USERS_KEY = "meyu.users.v1";
const ORDERS_KEY = "meyu.orders.v1";

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

function loadUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function loadUsers(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    setCart(loadCart());
    setWishlist(loadWishlist());
    setUser(loadUser());
    setOrders(loadOrders());
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

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

  const placeOrder = (): string | null => {
    if (cart.length === 0) return null;
    const orderId = `MEYU${Date.now().toString(36).toUpperCase()}`;
    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      total: cart.reduce((n, c) => n + c.qty * c.product.price, 0),
      date: new Date().toISOString(),
      status: "placed",
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return orderId;
  };

  const login = (email: string, password: string): boolean => {
    const users = loadUsers();
    const stored = users[email.toLowerCase()];
    if (!stored) return false;
    if (stored !== password) return false;
    setUser({ email: email.toLowerCase() });
    return true;
  };

  const register = (email: string, password: string): boolean => {
    const users = loadUsers();
    const key = email.toLowerCase();
    if (users[key]) return false;
    users[key] = password;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser({ email: key });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo<ShopState>(
    () => ({
      cart,
      wishlist,
      orders,
      user,
      cartCount: cart.reduce((n, c) => n + c.qty, 0),
      cartTotal: cart.reduce((n, c) => n + c.qty * c.product.price, 0),
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      removeFromWishlist,
      placeOrder,
      login,
      register,
      logout,
      cartOpen,
      setCartOpen,
      wishlistOpen,
      setWishlistOpen,
      searchOpen,
      setSearchOpen,
      loginOpen,
      setLoginOpen,
    }),
    [cart, wishlist, orders, user, cartOpen, wishlistOpen, searchOpen, loginOpen],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
