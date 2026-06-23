"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm"
    >
      <div className="relative overflow-hidden bg-fm-light-grayish-blue">
        <Image
          src={product.images[0].thumbnail}
          alt={product.name}
          width={600}
          height={600}
          className="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 p-4 text-white backdrop-blur-sm">
          <span className="rounded-full bg-fm-orange px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {product.category}
          </span>
          <span className="text-sm font-semibold">{product.rating.toFixed(1)} ★</span>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-fm-dark-grayish-blue">{product.company}</p>
          <h2 className="text-xl font-semibold text-fm-very-dark-blue">{product.name}</h2>
          <p className="text-sm leading-6 text-fm-dark-grayish-blue">{product.description}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-2xl font-bold text-fm-very-dark-blue">${product.price.toFixed(2)}</p>
            {product.discountPercentage ? (
              <p className="text-sm text-fm-grayish-blue line-through">${product.originalPrice?.toFixed(2)}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex items-center rounded-full bg-fm-very-dark-blue px-4 py-3 text-sm font-semibold text-white transition hover:bg-fm-orange"
            >
              View product
            </Link>
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-fm-light-grayish-blue text-fm-very-dark-blue transition hover:bg-fm-orange hover:text-white"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
