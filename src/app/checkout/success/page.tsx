"use client";

import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <section className="min-h-screen bg-[#f8f9fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[32px] bg-white p-10 text-center shadow-[0_25px_80px_-30px_rgba(0,0,0,0.15)]">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-fm-orange">Pedido confirmado</p>
        <h1 className="mt-6 text-4xl font-bold text-fm-very-dark-blue">Obrigado pela sua compra!</h1>
        <p className="mt-4 text-fm-dark-grayish-blue">
          Seu pedido foi processado com sucesso. Em breve você receberá um e-mail com os detalhes da compra.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[25px] bg-[#ff7a00] px-6 py-4 text-base font-bold text-white transition hover:bg-[#ff9a5a]"
          >
            Voltar para a loja
          </Link>
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center rounded-[25px] border border-slate-200 bg-white px-6 py-4 text-base font-bold text-fm-very-dark-blue transition hover:border-fm-orange hover:text-fm-orange"
          >
            Ver pedido
          </Link>
        </div>
      </div>
    </section>
  );
}
