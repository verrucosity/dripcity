"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartLine } from "@/lib/types";

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  commerceEnabled: boolean;
  open: () => void;
  close: () => void;
  addLine: (line: CartLine) => void;
  removeLine: (key: string) => void;
  subtotal: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "drip-city-records-cart";

export function lineKey(line: Pick<CartLine, "handle" | "size">) {
  return `${line.handle}__${line.size}`;
}

export function CartProvider({
  children,
  commerceEnabled,
}: {
  children: ReactNode;
  commerceEnabled: boolean;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setLines(JSON.parse(stored));
      } catch {
        setLines([]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addLine = (line: CartLine) => {
    setLines((current) => {
      const key = lineKey(line);
      const existing = current.find((item) => lineKey(item) === key);
      if (existing) {
        return current.map((item) =>
          lineKey(item) === key ? { ...item, quantity: item.quantity + line.quantity } : item
        );
      }
      return [...current, line];
    });
    setIsOpen(true);
  };

  const removeLine = (key: string) => {
    setLines((current) => current.filter((item) => lineKey(item) !== key));
  };

  const subtotal = useMemo(
    () => lines.reduce((total, line) => total + line.price * line.quantity, 0),
    [lines]
  );
  const count = useMemo(() => lines.reduce((total, line) => total + line.quantity, 0), [lines]);

  const value: CartContextValue = {
    lines,
    isOpen,
    commerceEnabled,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    addLine,
    removeLine,
    subtotal,
    count,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
