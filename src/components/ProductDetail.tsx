"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/data/products";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const { addItem, items, openCart } = useCart();

  const activeImage = product.images[activeImageIndex];

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  const isInCart = items.some((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
    setConfirmationVisible(true);

    window.setTimeout(() => {
      setConfirmationVisible(false);
    }, 1800);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePreviousImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const thumbnails = useMemo(
    () => product.images.map((image, index) => ({ image, index })),
    [product.images]
  );

  const closeLightbox = () => setIsLightboxOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    if (isLightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  return (
    <section className="min-h-screen bg-[#f8f9fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-white p-6 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.15)] sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <button
              type="button"
              className="group relative block overflow-hidden rounded-[32px] bg-slate-100 shadow-sm"
              onClick={() => setIsLightboxOpen(true)}
            >
              <Image
                src={activeImage.full}
                alt={`${product.name} image ${activeImageIndex + 1}`}
                width={900}
                height={900}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </button>

            <div className="grid grid-cols-4 gap-4">
              {thumbnails.map(({ image, index }) => (
                <button
                  key={image.full}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`overflow-hidden rounded-3xl border transition duration-200 ${
                    activeImageIndex === index
                      ? "border-fm-orange bg-fm-orange/5"
                      : "border-transparent bg-white hover:border-fm-orange"
                  }`}
                >
                  <Image
                    src={image.thumbnail}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-fm-orange">{product.company}</p>
            <h1 className="text-4xl font-bold tracking-tight text-fm-very-dark-blue sm:text-5xl">
              {product.name}
            </h1>
            <p className="max-w-xl text-base leading-7 text-fm-dark-grayish-blue">
              {product.description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-fm-very-dark-blue">{formatCurrency(product.price)}</span>
                {product.discountPercentage ? (
                  <span className="rounded-xl bg-fm-pale-orange px-4 py-2 text-sm font-bold text-fm-orange">
                    {product.discountPercentage}%
                  </span>
                ) : null}
              </div>
              {product.originalPrice ? (
                <span className="text-sm font-semibold text-fm-grayish-blue line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)]">
              <div className="flex items-center justify-between rounded-[25px] bg-fm-light-grayish-blue px-4 py-4 text-lg font-bold text-fm-very-dark-blue">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="h-10 w-10 rounded-xl bg-white text-2xl text-fm-orange transition hover:bg-fm-pale-orange"
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="h-10 w-10 rounded-xl bg-white text-2xl text-fm-orange transition hover:bg-fm-pale-orange"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="relative z-0">
                <button
                  className="relative z-10 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[25px] bg-[#ff7a00] px-6 text-base font-bold text-white shadow-lg shadow-[#ff7a00]/30 transition hover:bg-[#ff9a5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9a5a]"
                  type="button"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {isInCart ? `Atualizar carrinho (${quantity})` : `Add ${quantity} to cart`}
                </button>
                {confirmationVisible ? (
                  <div className="pointer-events-none absolute left-1/2 bottom-full z-20 mb-3 -translate-x-1/2 flex w-max rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-black/20">
                    Item adicionado ao carrinho!
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl rounded-[32px] bg-white p-4 sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-fm-very-dark-blue shadow-lg shadow-black/10 transition hover:bg-fm-light-grayish-blue"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative overflow-hidden rounded-[32px] bg-slate-100">
                <Image
                  src={activeImage.full}
                  alt={`${product.name} lightbox image ${activeImageIndex + 1}`}
                  width={1000}
                  height={1000}
                  className="h-[560px] w-full object-cover"
                />
                <button
                  type="button"
                  onClick={handlePreviousImage}
                  className="absolute left-5 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-fm-very-dark-blue shadow-lg shadow-black/10 transition hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-5 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-fm-very-dark-blue shadow-lg shadow-black/10 transition hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-4">
                {thumbnails.map(({ image, index }) => (
                  <button
                    key={image.full}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`overflow-hidden rounded-3xl border transition ${
                      activeImageIndex === index
                        ? "border-fm-orange bg-fm-orange/10"
                        : "border-transparent hover:border-fm-orange"
                    }`}
                  >
                    <Image
                      src={image.thumbnail}
                      alt={`${product.name} lightbox thumbnail ${index + 1}`}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
