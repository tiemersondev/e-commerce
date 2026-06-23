import ProductDetail from "@/components/ProductDetail";
import { products } from "@/data/products";

export default function Home() {
  const product = products[0];

  return <ProductDetail product={product} />;
}
