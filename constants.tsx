
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  // Vegetables
  {
    id: 'p3',
    name: 'Onion / Pyaz',
    price: 35,
    unit: '1kg',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop',
    description: 'Fresh red onions, essential for every Indian kitchen.',
    isVeg: true
  },
  {
    id: 'p4',
    name: 'Tomato / Tamatar',
    price: 45,
    unit: '500g',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop',
    description: 'Fresh hybrid tomatoes, firm and juicy.',
    isVeg: true
  },
  {
    id: 'p10',
    name: 'Potato / Aloo',
    price: 30,
    unit: '1kg',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?w=400&h=400&fit=crop',
    description: 'Versatile fresh potatoes.',
    isVeg: true
  },
  {
    id: 'p9',
    name: 'Coriander / Dhania',
    price: 15,
    unit: '100g',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1588877381448-5883a79f5493?w=400&h=400&fit=crop',
    description: 'Fresh aromatic coriander leaves.',
    isVeg: true
  },

  // Fruits
  {
    id: 'p11',
    name: 'Banana - Robusta',
    price: 48,
    unit: '6 pcs',
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ad99026?w=400&h=400&fit=crop',
    description: 'Perfectly ripe Robusta bananas.',
    isVeg: true
  },
  {
    id: 'p26',
    name: 'Apple - Royal Gala',
    price: 180,
    unit: '4 pcs',
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=400&h=400&fit=crop',
    description: 'Crunchy and sweet Royal Gala apples.',
    isVeg: true
  },

  // Dairy
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
    id: 'p12',
    name: 'Fresh Milk - Full Cream',
    price: 33,
    unit: '500ml',
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-1255818c0533?w=400&h=400&fit=crop',
    description: 'Farm fresh full cream milk.',
    isVeg: true
  },

  // Beverages
  {
    id: 'p13',
    name: 'Coca-Cola Zero Sugar',
    price: 40,
    unit: '300ml Can',
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1622708782596-13d9e6055a86?w=400&h=400&fit=crop',
    description: 'The classic taste of Coca-Cola with zero sugar.',
    isVeg: true
  },
  {
    id: 'p14',
    name: 'Red Bull Energy Drink',
    price: 125,
    unit: '250ml',
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1622543925917-763c34d1538c?w=400&h=400&fit=crop',
    description: 'Vitalizes body and mind.',
    isVeg: true
  },

  // Instant Food
  {
    id: 'p16',
    name: 'Maggi 2-Minute Noodles',
    price: 140,
    unit: '560g Pack',
    category: 'Instant Food',
    imageUrl: 'https://images.unsplash.com/photo-1612927621481-d8ebb21c9400?w=400&h=400&fit=crop',
    description: 'Indias favorite instant noodles.',
    isVeg: true
  },
  {
    id: 'p30',
    name: 'Pringles Potato Chips',
    price: 110,
    unit: '107g',
    category: 'Instant Food',
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop',
    description: 'Sour cream and onion chips.',
    isVeg: true
  },

  // Personal Care & Beauty
  {
    id: 'p27b',
    name: 'Dove Intense Repair Shampoo',
    price: 450,
    unit: '340ml',
    category: 'Personal Care',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop',
    description: 'Best for dry and damaged hair. Provides deep nourishment to the scalp.',
    ingredients: ['Fiber Actives', 'Micro Moisture Serum', 'Glycerin'],
    specs: { 'Hair Type': 'Dry, Damaged', 'Benefit': 'Strength & Shine' }
  },
  {
    id: 'p28b',
    name: 'Ketoconazole Anti-Dandruff Shampoo',
    price: 320,
    unit: '100ml',
    category: 'Personal Care',
    imageUrl: 'https://images.unsplash.com/photo-1551443878-4f519750ef91?w=400&h=400&fit=crop',
    description: 'Medicated formula to treat fungal dandruff and itchy scalp.',
    ingredients: ['Ketoconazole 2%', 'Purified Water'],
    specs: { 'Ailment': 'Dandruff, Seborrheic Dermatitis', 'Scalp Type': 'Itchy, Flaky' }
  },
  {
    id: 'p6',
    name: 'Neutrogena Salicylic Face Wash',
    price: 550,
    unit: '175ml',
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1556228578-8c7c0f44bb0b?w=400&h=400&fit=crop',
    description: 'Oil-free acne wash. Contains salicylic acid to clear breakouts and prevent new ones.',
    ingredients: ['2% Salicylic Acid', 'Water', 'Glycerin'],
    specs: { 'Skin Type': 'Oily, Acne-Prone', 'Ailment': 'Acne, Blackheads' }
  },
  {
    id: 'p33c',
    name: 'Calamine Anti-Itch Lotion',
    price: 180,
    unit: '120ml',
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1556228852-6d35a585d566?w=400&h=400&fit=crop',
    description: 'Soothing lotion for skin irritation, prickly heat, and insect bites.',
    ingredients: ['Calamine', 'Zinc Oxide', 'Glycerin'],
    specs: { 'Ailment': 'Skin Irritation, Prickly Heat, Rash', 'Skin Type': 'Sensitive' }
  },

  // Supplements (p46-p48 + NEW)
  {
    id: 'p20',
    name: 'Vitamin C Effervescent',
    price: 295,
    unit: '20 Tablets',
    category: 'Supplements',
    imageUrl: 'https://images.unsplash.com/photo-1616671285454-e9ca7a980766?w=400&h=400&fit=crop',
    description: 'Immunity booster orange flavor tablets.',
    isVeg: true
  },
  {
    id: 'p57',
    name: 'Daily Multivitamins for Men',
    price: 899,
    unit: '60 Capsules',
    category: 'Supplements',
    imageUrl: 'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?w=400&h=400&fit=crop',
    description: 'Essential minerals and vitamins for energy and stamina.',
    isVeg: true
  },
  {
    id: 'p58',
    name: 'Biotin 10000mcg - Hair & Skin',
    price: 650,
    unit: '60 Tablets',
    category: 'Supplements',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    description: 'High potency Biotin for hair growth and glowing skin.',
    isVeg: true
  },
  {
    id: 'p59s',
    name: 'Fish Oil Omega-3 1000mg',
    price: 1100,
    unit: '60 Softgels',
    category: 'Supplements',
    imageUrl: 'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?w=400&h=400&fit=crop',
    description: 'Supports heart health, brain function, and joint mobility.'
  },
  {
    id: 'p60s',
    name: 'Vitamin D3 60K UI',
    price: 120,
    unit: '4 Capsules',
    category: 'Supplements',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    description: 'Supports bone health and calcium absorption. Weekly dose.',
    isVeg: true
  },

  // Wellness (NEW)
  {
    id: 'p61w',
    name: 'Vaporizing Colds Rub',
    price: 145,
    unit: '50g Jar',
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop',
    description: 'Fast relief from cough, cold symptoms, and body aches.',
    ingredients: ['Menthol', 'Camphor', 'Eucalyptus Oil'],
    specs: { 'Ailment': 'Cough, Cold, Blocked Nose' }
  },
  {
    id: 'p62w',
    name: 'Fast Acting Pain Relief Spray',
    price: 240,
    unit: '55g',
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop',
    description: 'Rapid relief from back pain, joint pain, and muscle strains.',
    specs: { 'Ailment': 'Muscle Pain, Joint Pain, Sprain' }
  },
  {
    id: 'p63w',
    name: 'Antacid Liquid - Mint Flavor',
    price: 130,
    unit: '200ml',
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop',
    description: 'Neutralizes acidity and provides quick relief from gas and bloating.',
    isVeg: true,
    specs: { 'Ailment': 'Acidity, Gas, Heartburn' }
  },
  {
    id: 'p64w',
    name: 'Digital Flex-Tip Thermometer',
    price: 350,
    unit: '1 unit',
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop',
    description: 'Accurate and fast reading digital thermometer with flexible tip.',
    specs: { 'Type': 'Medical Device' }
  },
  {
    id: 'p65w',
    name: 'Orthopedic Electric Heat Pad',
    price: 899,
    unit: '1 unit',
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop',
    description: 'Therapeutic heat for back and neck pain relief.',
    specs: { 'Ailment': 'Back Pain, Chronic Pain' }
  },

  // Electronics & Accessories
  {
    id: 'p7',
    name: 'iPhone 15 Case - Clear',
    price: 1299,
    unit: '1 pc',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
    description: 'Crystal clear magsafe compatible case.',
    specs: { 'Compatibility': 'iPhone 15', 'Port Type': 'USB-C' }
  },
  {
    id: 'p7b',
    name: 'iPhone 14 Case - Silicone',
    price: 999,
    unit: '1 pc',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
    description: 'Soft-touch silicone case with microfiber lining.',
    specs: { 'Compatibility': 'iPhone 14, iPhone 13', 'Port Type': 'Lightning' }
  },
  {
    id: 'p22',
    name: 'USB-C to USB-C Fast Cable',
    price: 499,
    unit: '1m',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop',
    description: 'Durable braided fast charging cable for modern devices.',
    specs: { 'Port': 'USB-C', 'Compatibility': 'iPhone 15, iPad Pro, Android' }
  },
  {
    id: 'p22b',
    name: 'Lightning to USB-C Cable',
    price: 549,
    unit: '1m',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop',
    description: 'Official spec charging and data sync cable for older iPhones.',
    specs: { 'Port': 'Lightning', 'Compatibility': 'iPhone 14, 13, 12, 11, SE' }
  },
  {
    id: 'p22c',
    name: 'Apple MFi Certified Lightning Cable',
    price: 899,
    unit: '2m',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop',
    description: 'Longer cable for convenience, fully certified by Apple.',
    specs: { 'Port': 'Lightning', 'Compatibility': 'All Lightning iPhones' }
  },

  // Self Care
  {
    id: 'p36b',
    name: 'Silk Sleep Eye Mask',
    price: 199,
    unit: '1 unit',
    category: 'Self Care',
    imageUrl: 'https://images.unsplash.com/photo-1614232230302-3f1ec2a7f9b0?w=400&h=400&fit=crop',
    description: 'Padded mask for restful sleep.'
  }
];

export const CATEGORIES = [
  { name: 'Vegetables', icon: '🥕', image: 'https://images.unsplash.com/photo-1597362871122-33169a63bc59?w=300&h=300&fit=crop' },
  { name: 'Fruits', icon: '🍎', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop' },
  { name: 'Dairy', icon: '🥛', image: 'https://images.unsplash.com/photo-1563636619-e91082a83dca?w=300&h=300&fit=crop' },
  { name: 'Beverages', icon: '🥤', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?w=300&h=300&fit=crop' },
  { name: 'Instant Food', icon: '🍜', image: 'https://images.unsplash.com/photo-1612927621481-d8ebb21c9400?w=300&h=300&fit=crop' },
  { name: 'Personal Care', icon: '🧴', image: 'https://images.unsplash.com/photo-1556229162-5c63ed9c4ffb?w=300&h=300&fit=crop' },
  { name: 'Beauty', icon: '💄', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop' },
  { name: 'Supplements', icon: '💊', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop' },
  { name: 'Electronics', icon: '🔌', image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=300&h=300&fit=crop' },
  { name: 'Self Care', icon: '🧘', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop' },
  { name: 'Wellness', icon: '🩹', image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=300&h=300&fit=crop' },
  { name: 'Home Care', icon: '🧹', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop' }
];

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=400&fit=crop';
