
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Malai Paneer',
    price: 95,
    originalPrice: 110,
    unit: '200g',
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop',
    description: 'Fresh and soft malai paneer, perfect for curry.',
    isVeg: true
  },
  {
    id: 'p2',
    name: 'Basmati Rice - Premium',
    price: 150,
    unit: '1kg',
    category: 'Grocery',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    description: 'Long grain aromatic basmati rice.',
    isVeg: true
  },
  {
    id: 'p3',
    name: 'Onion / Pyaz',
    price: 35,
    unit: '1kg',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop',
    description: 'Fresh red onions.',
    isVeg: true
  },
  {
    id: 'p4',
    name: 'Tomato / Tamatar',
    price: 45,
    unit: '500g',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop',
    description: 'Hybrid tomatoes.',
    isVeg: true
  },
  {
    id: 'p5',
    name: 'Ginger Garlic Paste',
    price: 25,
    unit: '100g',
    category: 'Grocery',
    imageUrl: 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?w=400&h=400&fit=crop',
    description: 'Home-style ginger garlic paste.',
    isVeg: true
  },
  {
    id: 'p6',
    name: 'Neutrogena Salicylic Face Wash',
    price: 550,
    unit: '175ml',
    category: 'Personal Care',
    imageUrl: 'https://images.unsplash.com/photo-1556228578-8c7c0f44bb0b?w=400&h=400&fit=crop',
    description: 'Oil-free acne wash with salicylic acid.',
    ingredients: ['Salicylic Acid', 'Water', 'Glycerin']
  },
  {
    id: 'p7',
    name: 'iPhone 15 Case - Clear',
    price: 1299,
    unit: '1 pc',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
    description: 'Crystal clear magsafe compatible case.',
    specs: { 'Compatibility': 'iPhone 15', 'Material': 'TPU' }
  },
  {
    id: 'p8',
    name: 'Cinthol Soap - Cool',
    price: 180,
    unit: '3 x 125g',
    category: 'Personal Care',
    imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=400&fit=crop',
    description: 'Deodorant and cooling soap.'
  }
];

export const CATEGORIES = [
  { 
    name: 'Vegetables', 
    icon: '🥕', 
    image: 'https://images.unsplash.com/photo-1597362871122-33169a63bc59?w=300&h=300&fit=crop' 
  },
  { 
    name: 'Fruits', 
    icon: '🍎', 
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop' 
  },
  { 
    name: 'Dairy', 
    icon: '🥛', 
    image: 'https://images.unsplash.com/photo-1563636619-e91082a83dca?w=300&h=300&fit=crop' 
  },
  { 
    name: 'Meat', 
    icon: '🥩', 
    image: 'https://images.unsplash.com/photo-1607623814075-e45df204346d?w=300&h=300&fit=crop' 
  },
  { 
    name: 'Personal Care', 
    icon: '🧴', 
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143aba7a?w=300&h=300&fit=crop' 
  },
  { 
    name: 'Electronics', 
    icon: '🔌', 
    image: 'https://images.unsplash.com/photo-1546868831-70c266a858e2?w=300&h=300&fit=crop' 
  },
  { 
    name: 'Grocery', 
    icon: '🍚', 
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop' 
  },
  { 
    name: 'Snacks', 
    icon: '🍿', 
    image: 'https://images.unsplash.com/photo-1599490659223-930b447ffad6?w=300&h=300&fit=crop' 
  }
];

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=400&fit=crop';
