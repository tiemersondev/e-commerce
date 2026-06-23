// src/data/products.ts

export interface ProductImage {
  thumbnail: string;
  full: string;
}

export interface Product {
  id: string;
  slug: string;
  category: string;
  company: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  originalPrice?: number;
  rating: number;
  stock: number;
  images: ProductImage[];
}

export const products: Product[] = [
  {
    id: 'sneakers-fall-limited-edition',
    slug: 'fall-limited-edition-sneakers',
    category: 'Women',
    company: 'SNEAKER COMPANY',
    name: 'Fall Limited Edition Sneakers',
    description:
      'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
    price: 125.0,
    discountPercentage: 50,
    originalPrice: 250.0,
    rating: 4.8,
    stock: 10,
    images: [
      {
        thumbnail: '/images/image-product-1-thumbnail.jpg',
        full: '/images/image-product-1.jpg',
      },
      {
        thumbnail: '/images/image-product-2-thumbnail.jpg',
        full: '/images/image-product-2.jpg',
      },
      {
        thumbnail: '/images/image-product-3-thumbnail.jpg',
        full: '/images/image-product-3.jpg',
      },
      {
        thumbnail: '/images/image-product-4-thumbnail.jpg',
        full: '/images/image-product-4.jpg',
      },
    ],
  },
  // Você pode adicionar mais produtos aqui no futuro
];