
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  category: string;
  imageUrl: string;
  description: string;
  ingredients?: string[];
  specs?: Record<string, string>;
  isVeg?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AIResponse {
  summary: string;
  products: { id: string; quantity: number }[];
  explanation?: string;
  type: 'recipe' | 'qa' | 'compatibility' | 'care';
}

export enum AppView {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  PDP = 'PDP',
  CART = 'CART',
  PROFILE = 'PROFILE'
}
