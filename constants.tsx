
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
    description: 'Fresh red onions, essential for every Indian kitchen. Known for their sharp aroma and sweet finish when cooked.',
    isVeg: true,
    highlights: ['Rich in antioxidants', 'Essential for Indian curries', 'Farm fresh quality'],
    shelfLife: '10-14 Days',
    storageInfo: 'Store in a cool, dry place away from direct sunlight.'
  },
  {
    id: 'p4',
    name: 'Tomato / Tamatar',
    price: 45,
    unit: '500g',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop',
    description: 'Fresh hybrid tomatoes, firm and juicy. Perfect for salads, gravies, and soups.',
    isVeg: true,
    highlights: ['High in Lycopene', 'Firm and juicy texture', 'Direct from farms'],
    shelfLife: '5-7 Days',
    storageInfo: 'Keep at room temperature until ripe, then refrigerate.'
  },
  {
    id: 'p10',
    name: 'Potato / Aloo',
    price: 30,
    unit: '1kg',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?w=400&h=400&fit=crop',
    description: 'Versatile fresh potatoes, sourced from the best growing regions.',
    isVeg: true,
    highlights: ['Rich in Carbohydrates', 'Uniform Size', 'Great for frying/boiling'],
    shelfLife: '15-20 Days',
    storageInfo: 'Store in a dark, cool, and well-ventilated place.'
  },
  {
    id: 'p41',
    name: 'Carrot - Orange',
    price: 40,
    unit: '500g',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop',
    description: 'Fresh and crunchy orange carrots. High in Vitamin A.',
    isVeg: true,
    highlights: ['Rich in Beta-carotene', 'Sweet & Crunchy', 'Great for salads'],
    shelfLife: '7 Days',
    storageInfo: 'Store in a refrigerator.'
  },
  {
    id: 'p42',
    name: 'Broccoli',
    price: 85,
    unit: '1 pc',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop',
    description: 'Fresh green broccoli florets. High in fiber and nutrients.',
    isVeg: true,
    highlights: ['Superfood', 'Vitamin C rich', 'Fresh & Green'],
    shelfLife: '4-5 Days',
    storageInfo: 'Keep refrigerated in a perforated bag.'
  },
  {
    id: 'p43',
    name: 'Ginger / Adrak',
    price: 25,
    unit: '100g',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&h=400&fit=crop',
    description: 'Strong flavored fresh ginger root. Excellent for tea and cooking.',
    isVeg: true,
    shelfLife: '15 Days'
  },
  {
    id: 'p9',
    name: 'Coriander / Dhania',
    price: 15,
    unit: '100g',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1588877381448-5883a79f5493?w=400&h=400&fit=crop',
    description: 'Fresh aromatic coriander leaves. Adds a burst of freshness to every dish.',
    isVeg: true,
    shelfLife: '2-3 Days',
    storageInfo: 'Wrap in paper towels and refrigerate in a plastic bag.'
  },

  // Fruits
  {
    id: 'p11',
    name: 'Banana - Robusta',
    price: 48,
    unit: '6 pcs',
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ad99026?w=400&h=400&fit=crop',
    description: 'Perfectly ripe Robusta bananas, high in energy and potassium.',
    isVeg: true,
    shelfLife: '3-4 Days',
    storageInfo: 'Store at room temperature. Keep away from direct sunlight.'
  },
  {
    id: 'p26',
    name: 'Apple - Royal Gala',
    price: 180,
    unit: '4 pcs',
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=400&h=400&fit=crop',
    description: 'Crunchy and sweet Royal Gala apples, imported from New Zealand.',
    isVeg: true,
    highlights: ['Crisp & Sweet', 'Fresh Arrival', 'High Fiber'],
    shelfLife: '7-10 Days',
    storageInfo: 'Store in the refrigerator for maximum crispness.'
  },
  {
    id: 'p45',
    name: 'Mango - Alphonso',
    price: 550,
    unit: '6 pcs',
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop',
    description: 'Premium King of Mangoes. Sweet, pulpy, and aromatic.',
    isVeg: true,
    highlights: ['Naturally Ripened', 'Aromatic & Sweet', 'Zero Fiber'],
    shelfLife: '4-5 Days'
  },
  {
    id: 'p46',
    name: 'Oranges - Valencia',
    price: 120,
    unit: '1kg',
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop',
    description: 'Juicy and seedless Valencia oranges, perfect for fresh juice.',
    isVeg: true,
    highlights: ['High Juice Content', 'Seedless', 'Vitamin C'],
    shelfLife: '7 Days'
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
    description: 'Fresh and soft malai paneer, perfect for curry. Made from 100% pure cow milk for the ultimate creamy texture.',
    isVeg: true,
    highlights: ['Pure milk product', 'No preservatives added', 'Extremely soft & creamy'],
    shelfLife: '15 Days',
    storageInfo: 'Store under refrigeration at 4°C or below.'
  },
  {
    id: 'p12',
    name: 'Fresh Milk - Full Cream',
    price: 33,
    unit: '500ml',
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-1255818c0533?w=400&h=400&fit=crop',
    description: 'Farm fresh full cream milk, homogenized and pasteurized for safety.',
    isVeg: true,
    shelfLife: '2 Days',
    storageInfo: 'Refrigerate immediately after purchase.'
  },
  {
    id: 'p47',
    name: 'Fresh Thick Curd / Dahi',
    price: 50,
    unit: '400g',
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=400&fit=crop',
    description: 'Rich, thick and creamy curd, made from pasteurized milk.',
    isVeg: true,
    highlights: ['Probiotic rich', 'Thick texture', 'No added colors'],
    shelfLife: '10 Days'
  },
  {
    id: 'p48',
    name: 'Pure Salted Butter',
    price: 255,
    unit: '500g',
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop',
    description: 'Classic salted butter. Perfect for baking, cooking, and spreading.',
    isVeg: true,
    shelfLife: '6 Months'
  },
  {
    id: 'p50',
    name: 'Brown Eggs - Farm Fresh',
    price: 85,
    unit: '6 pcs',
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=400&fit=crop',
    description: 'Nutritious farm fresh brown eggs, rich in protein and omega-3.',
    highlights: ['High Protein', 'Direct from farms', 'Safe Packaging'],
    shelfLife: '15 Days'
  },

  // Beverages
  {
    id: 'p13',
    name: 'Coca-Cola Zero Sugar',
    price: 40,
    unit: '300ml Can',
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1622708782596-13d9e6055a86?w=400&h=400&fit=crop',
    description: 'The classic taste of Coca-Cola with zero sugar. Great for those who want to enjoy the fizz without the calories.',
    isVeg: true,
    highlights: ['Zero Calories', 'Zero Sugar', 'Authentic Taste'],
    shelfLife: '6 Months',
    storageInfo: 'Best enjoyed chilled. Store in a cool, dry place.'
  },
  {
    id: 'p14',
    name: 'Red Bull Energy Drink',
    price: 125,
    unit: '250ml',
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1622543925917-763c34d1538c?w=400&h=400&fit=crop',
    description: 'Vitalizes body and mind. Red Bull Energy Drink is a functional beverage providing wings whenever you need them.',
    isVeg: true,
    highlights: ['Contains Caffeine', 'High B-Vitamins', 'Real Alpine Water'],
    shelfLife: '12 Months',
    storageInfo: 'Store in a cool dry place.'
  },
  {
    id: 'p51',
    name: 'Orange Juice - 100% Real',
    price: 135,
    unit: '1L',
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=400&fit=crop',
    description: 'No added sugar 100% orange juice. Refreshing and natural.',
    isVeg: true,
    highlights: ['No Added Sugar', 'Rich in Vitamin C', 'Natural Fiber'],
    shelfLife: '6 Months'
  },
  {
    id: 'p52',
    name: 'Instant Coffee - Classic',
    price: 340,
    unit: '100g Jar',
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    description: 'Aromatic and rich instant coffee blend for the perfect morning start.',
    isVeg: true,
    shelfLife: '18 Months'
  },

  // Instant Food
  {
    id: 'p16',
    name: 'Maggi 2-Minute Noodles',
    price: 140,
    unit: '560g Pack',
    category: 'Instant Food',
    imageUrl: 'https://images.unsplash.com/photo-1612927621481-d8ebb21c9400?w=400&h=400&fit=crop',
    description: 'Indias favorite instant noodles. Made with the finest quality spices and ingredients.',
    isVeg: true,
    highlights: ['Quick & Easy', 'Iconic Masala Taste', 'Iron Fortified'],
    shelfLife: '9 Months',
    storageInfo: 'Store in a cool, dry and hygienic place.'
  },
  {
    id: 'p30',
    name: 'Pringles Potato Chips',
    price: 110,
    unit: '107g',
    category: 'Instant Food',
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop',
    description: 'Sour cream and onion chips. Once you pop, the fun dont stop!',
    isVeg: true,
    shelfLife: '12 Months',
    storageInfo: 'Store in a cool, dry place away from heat.'
  },
  {
    id: 'p54',
    name: 'Cup Noodles - Masala',
    price: 45,
    unit: '70g Cup',
    category: 'Instant Food',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop',
    description: 'Instant cup noodles with hot masala seasoning. Just add water.',
    isVeg: true,
    highlights: ['Ready in 3 mins', 'Includes Fork', 'On-the-go snack'],
    shelfLife: '9 Months'
  },
  {
    id: 'p55',
    name: 'Durum Wheat Penne Pasta',
    price: 165,
    unit: '500g',
    category: 'Instant Food',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop',
    description: 'Premium penne pasta made from 100% Durum wheat semolina.',
    isVeg: true,
    highlights: ['No Maida', 'High Protein', 'Al Dente texture'],
    shelfLife: '12 Months'
  },

  // Beauty
  {
    id: 'p6',
    name: 'Neutrogena Salicylic Face Wash',
    price: 550,
    unit: '175ml',
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1556228578-8c7c0f44bb0b?w=400&h=400&fit=crop',
    description: 'Oil-free acne wash. Contains salicylic acid to clear breakouts and prevent new ones. Micro-clear technology helps clear oil instantly.',
    ingredients: ['2% Salicylic Acid', 'Water', 'Glycerin'],
    specs: { 'Skin Type': 'Oily, Acne-Prone', 'Ailment': 'Acne, Blackheads' },
    highlights: ['Dermatologist Recommended', 'Non-comedogenic', 'Oil-free Formula'],
    shelfLife: '36 Months',
    storageInfo: 'Keep in a cool dry place. For external use only.'
  },
  {
    id: 'p33c',
    name: 'Calamine Anti-Itch Lotion',
    price: 180,
    unit: '120ml',
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1556228852-6d35a585d566?w=400&h=400&fit=crop',
    description: 'Soothing lotion for skin irritation, prickly heat, and insect bites. Provides immediate cooling effect.',
    ingredients: ['Calamine', 'Zinc Oxide', 'Glycerin'],
    specs: { 'Ailment': 'Skin Irritation, Prickly Heat, Rash', 'Skin Type': 'Sensitive' },
    shelfLife: '36 Months'
  },
  {
    id: 'p56',
    name: 'Pure Aloe Vera Gel',
    price: 210,
    unit: '150g',
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop',
    description: 'Multipurpose skin and hair gel. 99% pure aloe vera extract.',
    isVeg: true,
    highlights: ['Paraben Free', 'Soothing Effect', 'Natural Glow'],
    shelfLife: '24 Months'
  },
  {
    id: 'p57b',
    name: 'Ultra Sheer SPF 50 Sunscreen',
    price: 675,
    unit: '88ml',
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1556229162-5c63ed9c4ffb?w=400&h=400&fit=crop',
    description: 'Broad spectrum UVA/UVB protection with Dry-Touch technology for a non-greasy feel.',
    highlights: ['Water Resistant', 'Non-Greasy', 'Broad Spectrum'],
    shelfLife: '36 Months'
  },

  // Personal Care
  {
    id: 'p27b',
    name: 'Dove Intense Repair Shampoo',
    price: 450,
    unit: '340ml',
    category: 'Personal Care',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop',
    description: 'Best for dry and damaged hair. Provides deep nourishment to the scalp and strengthens hair from within.',
    ingredients: ['Fiber Actives', 'Micro Moisture Serum', 'Glycerin'],
    specs: { 'Hair Type': 'Dry, Damaged', 'Benefit': 'Strength & Shine' },
    highlights: ['Nourishing Formula', 'Smooth & Shiny Hair', 'Gentle Cleansing'],
    shelfLife: '24 Months',
    storageInfo: 'Avoid contact with eyes. Store in a cool place.'
  },
  {
    id: 'p28b',
    name: 'Anti-Dandruff Shampoo',
    price: 320,
    unit: '100ml',
    category: 'Personal Care',
    imageUrl: 'https://images.unsplash.com/photo-1551443878-4f519750ef91?w=400&h=400&fit=crop',
    description: 'Medicated formula to treat fungal dandruff and itchy scalp. Results visible from the first wash.',
    ingredients: ['Ketoconazole 2%', 'Purified Water'],
    specs: { 'Ailment': 'Dandruff, Seborrheic Dermatitis', 'Scalp Type': 'Itchy, Flaky' },
    shelfLife: '24 Months'
  },

  // Supplements
  {
    id: 'p20',
    name: 'Vitamin C Effervescent',
    price: 295,
    unit: '20 Tablets',
    category: 'Supplements',
    imageUrl: 'https://images.unsplash.com/photo-1616671285454-e9ca7a980766?w=400&h=400&fit=crop',
    description: 'Immunity booster orange flavor tablets. Just drop in water and enjoy a refreshing health drink.',
    isVeg: true,
    highlights: ['Natural Vitamin C', 'Sugar-Free', 'High Absorption'],
    shelfLife: '18 Months'
  },
  {
    id: 'p57',
    name: 'Multivitamins for Men',
    price: 899,
    unit: '60 Capsules',
    category: 'Supplements',
    imageUrl: 'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?w=400&h=400&fit=crop',
    description: 'Essential minerals and vitamins for energy and stamina. Tailored for the modern lifestyle.',
    isVeg: true,
    shelfLife: '24 Months'
  },

  // Electronics
  {
    id: 'p7',
    name: 'iPhone 15 Case - Clear',
    price: 1299,
    unit: '1 pc',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
    description: 'Crystal clear magsafe compatible case. Show off your iPhone design while keeping it protected.',
    specs: { 'Compatibility': 'iPhone 15', 'Port Type': 'USB-C' },
    highlights: ['MagSafe Compatible', 'Drop Protection', 'Scratch Resistant'],
    shelfLife: 'N/A'
  },
  {
    id: 'p22',
    name: 'USB-C Fast Cable',
    price: 499,
    unit: '1m',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop',
    description: 'Durable braided fast charging cable for modern devices. Supports up to 60W power delivery.',
    specs: { 'Port': 'USB-C', 'Compatibility': 'iPhone 15, iPad Pro, Android' },
    highlights: ['60W Power Delivery', 'Braided Cable', 'Tangle Free'],
    shelfLife: 'N/A'
  },
  {
    id: 'p58b',
    name: 'TWS Bluetooth Earbuds',
    price: 1999,
    unit: '1 unit',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    description: 'Wireless earbuds with noise cancellation and 20-hour battery life.',
    specs: { 'Battery': '20 hours', 'Type': 'In-ear' },
    highlights: ['Active Noise Cancellation', 'Water Resistant', 'Touch Controls'],
    shelfLife: 'N/A'
  },
  {
    id: 'p59b',
    name: '10000mAh Power Bank',
    price: 1499,
    unit: '1 unit',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1609091839697-b23d70fcc463?w=400&h=400&fit=crop',
    description: 'Slim and light power bank with 18W fast charging support.',
    specs: { 'Capacity': '10000mAh', 'Ports': '2x USB-A, 1x USB-C' },
    highlights: ['Fast Charging', 'Overheat Protection', 'Slim Design'],
    shelfLife: 'N/A'
  },

  // Home Care
  {
    id: 'p60b',
    name: 'Lemon Dishwash Liquid',
    price: 155,
    unit: '750ml',
    category: 'Home Care',
    imageUrl: 'https://images.unsplash.com/photo-1585832770484-7289d1519242?w=400&h=400&fit=crop',
    description: 'Powerful grease-cutting liquid with the freshness of lemons.',
    isVeg: true,
    highlights: ['Tough on Grease', 'Gentle on Hands', 'Lemon Scent'],
    shelfLife: '24 Months'
  },
  {
    id: 'p61b',
    name: 'Liquid Detergent - Matic',
    price: 435,
    unit: '2L',
    category: 'Home Care',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop',
    description: 'Advanced liquid detergent for automatic washing machines. Removes tough stains.',
    highlights: ['Front/Top Load', 'Stain Buster', 'Fresh Fragrance'],
    shelfLife: '36 Months'
  },
  {
    id: 'p62b',
    name: 'Floor Cleaner - Pine',
    price: 185,
    unit: '1L',
    category: 'Home Care',
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop',
    description: 'Disinfectant floor cleaner. Kills 99.9% germs and leaves a pine scent.',
    isVeg: true,
    highlights: ['Antibacterial', 'Shiny Floors', 'Long-lasting Scent'],
    shelfLife: '24 Months'
  },

  // Wellness
  {
    id: 'p61w',
    name: 'Vaporizing Colds Rub',
    price: 145,
    unit: '50g Jar',
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop',
    description: 'Fast relief from cough, cold symptoms, and body aches. Safe for adults and children over 2 years.',
    ingredients: ['Menthol', 'Camphor', 'Eucalyptus Oil'],
    specs: { 'Ailment': 'Cough, Cold, Blocked Nose' },
    shelfLife: '36 Months'
  },
  {
    id: 'p64w',
    name: 'Digital Thermometer',
    price: 350,
    unit: '1 unit',
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop',
    description: 'Accurate and fast reading digital thermometer with flexible tip.',
    specs: { 'Type': 'Medical Device' },
    shelfLife: '5 Years Battery'
  },

  // Self Care
  {
    id: 'p36b',
    name: 'Silk Sleep Eye Mask',
    price: 199,
    unit: '1 unit',
    category: 'Self Care',
    imageUrl: 'https://images.unsplash.com/photo-1614232230302-3f1ec2a7f9b0?w=400&h=400&fit=crop',
    description: 'Padded mask for restful sleep. Made from premium mulberry silk.',
    shelfLife: 'N/A'
  },
  {
    id: 'p37b',
    name: 'Scented Candle - Lavender',
    price: 399,
    unit: '1 unit',
    category: 'Self Care',
    imageUrl: 'https://images.unsplash.com/photo-1602817754957-39ef7075d71c?w=400&h=400&fit=crop',
    description: 'Calming lavender scented soy candle. Burn time up to 15 hours.',
    highlights: ['Soy Wax', 'Relaxing Aroma', 'Hand poured'],
    shelfLife: 'N/A'
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
