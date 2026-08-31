export type Visibility = 'draft' | 'published';

export interface Product {
  name: string;
  slug: string;
  category: string;
  brand: string;
  shortDescription: string;
  description: string;
  images: string[];
  specifications: Record<string, string>;
  priceLabel?: string;
  featured: boolean;
  published: Visibility;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
  displayOrder: number;
  published: Visibility;
}

export interface Branch {
  name: string;
  generalLocation: string;
  phone: string;
  whatsapp: string;
  openingHours: string;
  mapUrl: string;
}

export interface ContactConfig {
  whatsapp: string;
  phone: string;
  defaultMessage: string;
}
