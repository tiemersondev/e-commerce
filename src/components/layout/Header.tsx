"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingCart, User, X, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";

const navItems = [
  { label: "Coleções", href: "#collections" },
  { label: "Masculino", href: "#men" },
  { label: "Feminino", href: "#women" },
  { label: "Sobre", href: "#about" },
  { label: "Contato", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { items, totalItems, removeItem, clearCart, isCartOpen, toggleCart, closeCart } = useCart();

  const handleCheckout = () => {
    closeCart();
    window.setTimeout(() => {
      router.push('/checkout');
    }, 100);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-fm-very-dark-blue transition hover:border-fm-orange hover:text-fm-orange md:hidden"
              onClick={() => setIsMenuOpen((current) => !current)}
              aria-label="Alternar menu mobile"
              aria-expanded={isMenuOpen}
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
              aria-label="Abrir carrinho"
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
                  className="absolute right-0 top-[calc(100%_+_12px)] z-50 w-[320px] min-w-[280px] rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.25)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-bold text-fm-very-dark-blue">Carrinho</p>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="text-slate-500 transition hover:text-fm-very-dark-blue"
                      aria-label="Fechar carrinho"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {items.length === 0 ? (
                    <p className="py-10 text-center text-sm text-fm-dark-grayish-blue">Seu carrinho está vazio.</p>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-3xl bg-fm-light-grayish-blue px-4 py-3 text-sm font-semibold text-fm-very-dark-blue">
                        Você tem {totalItems} item{totalItems > 1 ? "s" : ""} no carrinho.
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
                            aria-label="Remover item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleCheckout}
                        aria-label="Ir para checkout"
                        className="w-full rounded-3xl bg-[#ff7a00] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#ff7a00]/20 transition hover:bg-[#ff9a5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a00]/50"
                      >
                        Finalizar Compra
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/30" />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute inset-y-0 left-0 z-[70] w-[80%] max-w-[280px] rounded-r-3xl border-r border-slate-200 bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="text-xl font-bold uppercase tracking-[0.35em] text-fm-very-dark-blue">sneakers</span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-fm-light-grayish-blue text-fm-very-dark-blue transition hover:bg-slate-100"
                  aria-label="Fechar menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
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
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
