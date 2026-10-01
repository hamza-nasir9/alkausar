"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "alkausar-cart-v1";

export const makeLineId = (item) =>
  [item.id, item.weight || "", item.custom ? JSON.stringify(item.custom) : ""].join("|");

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "ADD": {
      const lineId = makeLineId(action.item);
      const qty = action.item.qty || 1;
      if (state.some((i) => i.lineId === lineId))
        return state.map((i) => (i.lineId === lineId ? { ...i, qty: i.qty + qty } : i));
      return [...state, { ...action.item, lineId, qty }];
    }
    case "SET_QTY":
      return state.map((i) => (i.lineId === action.lineId ? { ...i, qty: action.qty } : i)).filter((i) => i.qty > 0);
    case "REMOVE":
      return state.filter((i) => i.lineId !== action.lineId);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "HYDRATE", payload: JSON.parse(saved) });
    } catch (e) {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {}
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const addItem = useCallback((item, { open = true } = {}) => {
    dispatch({ type: "ADD", item });
    if (open) setIsOpen(true);
  }, []);
  // Checkout replaces the tray drawer while it is open
  const openCheckout = useCallback(() => {
    setIsOpen(false);
    setCheckoutOpen(true);
  }, []);
  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);

  // Brief site-wide notification (auto-dismisses; see components/global/Toast.jsx)
  const notify = useCallback((message, tone = "success") => setToast({ id: Date.now(), message, tone }), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const setQty = useCallback((lineId, qty) => dispatch({ type: "SET_QTY", lineId, qty }), []);
  const removeItem = useCallback((lineId) => dispatch({ type: "REMOVE", lineId }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, count, total, isOpen, hydrated, openCart, closeCart, addItem, setQty, removeItem, clearCart, checkoutOpen, openCheckout, closeCheckout, toast, notify, dismissToast }),
    [items, count, total, isOpen, hydrated, openCart, closeCart, addItem, setQty, removeItem, clearCart, checkoutOpen, openCheckout, closeCheckout, toast, notify, dismissToast]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
