"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingCart, User, X, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";

const navItems = [
  { label: "Collections", href: "#collections" },
  { label: "Men", href: "#men" },
  { label: "Women", href: "#women" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, totalItems, removeItem, clearCart, isCartOpen, toggleCart, closeCart } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-fm-very-dark-blue transition hover:border-fm-orange hover:text-fm-orange md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label="Open menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="text-xl font-extrabold uppercase tracking-[0.45em] text-fm-very-dark-blue md:text-2xl">
            sneakers
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-fm-dark-grayish-blue transition hover:text-fm-very-dark-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative flex items-center gap-3">
          <button
            type="button"
            aria-label="Open cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-fm-very-dark-blue transition hover:border-fm-orange hover:text-fm-orange"
            onClick={toggleCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 ? (
              <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-[#ff7a00] px-1.5 text-[10px] font-bold text-white shadow-sm shadow-black/15">
                {totalItems}
              </span>
            ) : null}
          </button>

          <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-fm-light-grayish-blue md:flex">
            <User className="h-5 w-5 text-fm-very-dark-blue" />
          </div>

          <AnimatePresence>
            {isCartOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-[calc(100%_+_12px)] z-50 w-[320px] rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.25)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-fm-very-dark-blue">Cart</p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="text-slate-500 transition hover:text-fm-very-dark-blue"
                    aria-label="Close cart"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {items.length === 0 ? (
                  <p className="py-10 text-center text-sm text-fm-dark-grayish-blue">Your cart is empty.</p>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-3xl bg-fm-light-grayish-blue px-4 py-3 text-sm font-semibold text-fm-very-dark-blue">
                      You have {totalItems} item{totalItems > 1 ? "s" : ""} in your cart.
                    </div>
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <img
                          src={item.product.images[0].thumbnail}
                          alt={item.product.name}
                          className="h-14 w-14 rounded-2xl object-cover"
                        />
                        <div className="min-w-0 flex-1 text-sm">
                          <p className="font-semibold text-fm-very-dark-blue">{item.product.name}</p>
                          <p className="text-fm-dark-grayish-blue">
                            ${item.product.price.toFixed(2)} x {item.quantity}{' '}
                            <span className="font-bold text-fm-very-dark-blue">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="text-fm-dark-grayish-blue transition hover:text-fm-orange"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={clearCart}
                      className="w-full rounded-3xl bg-fm-orange px-4 py-3 text-sm font-bold text-white transition hover:bg-[#ff9a5a]"
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-60 md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />

          <nav
            className="fixed inset-y-0 left-0 w-[80%] max-w-[280px] bg-white shadow-2xl border-r border-slate-200 p-6 rounded-r-3xl transform transition-transform duration-300"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative mb-10 h-11">
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="absolute left-0 top-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-fm-very-dark-blue shadow-md shadow-black/5 transition hover:bg-fm-light-grayish-blue"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 pt-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-lg font-semibold text-fm-very-dark-blue transition hover:text-fm-orange"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
