"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CategoryId, Offer } from "@/data/offers";

type Filter = CategoryId | "sve";

type UIState = {
  activeOffer: Offer | null;
  openOffer: (offer: Offer) => void;
  closeOffer: () => void;
  inquiry: { open: boolean; offerSlug?: string; email?: string };
  openInquiry: (opts?: { offerSlug?: string; email?: string }) => void;
  closeInquiry: () => void;
  filter: Filter;
  setFilter: (f: Filter) => void;
  query: string;
  setQuery: (q: string) => void;
  /** Postavi filter (i opcionalno pretragu) pa skrolaj do liste putovanja */
  showCategory: (f: Filter, query?: string) => void;
};

const Ctx = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [inquiry, setInquiry] = useState<UIState["inquiry"]>({ open: false });
  const [filter, setFilter] = useState<Filter>("sve");
  const [query, setQuery] = useState("");

  const openInquiry = useCallback((opts?: { offerSlug?: string; email?: string }) => {
    setActiveOffer(null);
    setInquiry({ open: true, ...opts });
  }, []);

  const showCategory = useCallback((f: Filter, q = "") => {
    setFilter(f);
    setQuery(q);
    document.getElementById("putovanja")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo<UIState>(
    () => ({
      activeOffer,
      openOffer: setActiveOffer,
      closeOffer: () => setActiveOffer(null),
      inquiry,
      openInquiry,
      closeInquiry: () => setInquiry({ open: false }),
      filter,
      setFilter,
      query,
      setQuery,
      showCategory,
    }),
    [activeOffer, inquiry, openInquiry, filter, query, showCategory],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUI() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}
