"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/cart-context";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ fullName: "", email: "", address: "", city: "", zip: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) {
      return;
    }

    setIsSubmitting(true);
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <section className="min-h-screen bg-[#f8f9fb] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[32px] bg-white p-8 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.15)]">
          <h1 className="text-3xl font-bold text-fm-very-dark-blue">Carrinho vazio</h1>
          <p className="mt-4 text-fm-dark-grayish-blue">Adicione produtos ao carrinho antes de avançar para o checkout.</p>
          <Link href="/" className="mt-6 inline-flex rounded-[25px] bg-[#ff7a00] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ff9a5a]">
            Voltar para a loja
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f8f9fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[32px] bg-white p-8 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.15)] sm:p-10">
          <h1 className="text-3xl font-bold text-fm-very-dark-blue">Checkout</h1>
          <p className="mt-2 text-fm-dark-grayish-blue">Revise seu pedido e confirme os dados para finalizar a compra.</p>

          <div className="mt-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-fm-very-dark-blue" htmlFor="fullName">
                  Nome completo
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[20px] border border-slate-200 bg-fm-light-grayish-blue px-4 py-3 text-sm text-fm-very-dark-blue outline-none transition focus:border-fm-orange focus:ring-2 focus:ring-fm-orange/20"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-fm-very-dark-blue" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-[20px] border border-slate-200 bg-fm-light-grayish-blue px-4 py-3 text-sm text-fm-very-dark-blue outline-none transition focus:border-fm-orange focus:ring-2 focus:ring-fm-orange/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-fm-very-dark-blue" htmlFor="zip">
                    CEP
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    required
                    className="w-full rounded-[20px] border border-slate-200 bg-fm-light-grayish-blue px-4 py-3 text-sm text-fm-very-dark-blue outline-none transition focus:border-fm-orange focus:ring-2 focus:ring-fm-orange/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-fm-very-dark-blue" htmlFor="address">
                  Endereço
                </label>
                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[20px] border border-slate-200 bg-fm-light-grayish-blue px-4 py-3 text-sm text-fm-very-dark-blue outline-none transition focus:border-fm-orange focus:ring-2 focus:ring-fm-orange/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-fm-very-dark-blue" htmlFor="city">
                  Cidade
                </label>
                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[20px] border border-slate-200 bg-fm-light-grayish-blue px-4 py-3 text-sm text-fm-very-dark-blue outline-none transition focus:border-fm-orange focus:ring-2 focus:ring-fm-orange/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-[25px] bg-[#ff7a00] px-6 py-4 text-base font-bold text-white transition hover:bg-[#ff9a5a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Finalizando pedido..." : "Confirmar pedido"}
              </button>
            </form>

            <aside className="rounded-[32px] border border-slate-200 bg-fm-light-grayish-blue p-6">
              <h2 className="text-xl font-bold text-fm-very-dark-blue">Resumo do pedido</h2>
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 rounded-3xl bg-white p-4">
                    <img src={item.product.images[0].thumbnail} alt={item.product.name} className="h-16 w-16 rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="font-semibold text-fm-very-dark-blue">{item.product.name}</p>
                      <p className="text-fm-dark-grayish-blue">Qtd: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-fm-very-dark-blue">{formatCurrency(item.quantity * item.product.price)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[24px] bg-white p-5">
                <div className="flex items-center justify-between text-sm text-fm-dark-grayish-blue">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-fm-dark-grayish-blue">
                  <span>Envio</span>
                  <span>Grátis</span>
                </div>
                <div className="mt-5 flex items-center justify-between text-lg font-bold text-fm-very-dark-blue">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
