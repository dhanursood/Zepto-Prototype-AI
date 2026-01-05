
import React, { useState } from 'react';
import { Product } from '../types';
import { FALLBACK_IMAGE } from '../constants';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
  onClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, onAdd, onRemove, onClick }) => {
  const [imgSrc, setImgSrc] = useState(product.imageUrl);

  const handleImageError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  return (
    <div className="bg-white rounded-2xl p-3 border border-gray-100 zepto-card-shadow flex flex-col h-full hover:border-zepto-purple/20 transition-all group">
      <div className="relative cursor-pointer mb-3 bg-gray-50 rounded-xl p-2 h-36 flex items-center justify-center overflow-hidden" onClick={() => onClick?.(product)}>
        <img 
            src={imgSrc} 
            alt={product.name} 
            className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" 
            onError={handleImageError}
            loading="lazy"
        />
        {product.isVeg && (
          <div className="absolute top-2 left-2 bg-white border border-green-600 w-4 h-4 flex items-center justify-center rounded-[2px] shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
          </div>
        )}
      </div>
      
      <div className="flex-1 px-1">
        <h3 className="text-[13px] font-bold text-gray-900 line-clamp-2 leading-[1.3] mb-1 group-hover:text-zepto-purple transition-colors">{product.name}</h3>
        <p className="text-[11px] font-bold text-gray-400 mb-3">{product.unit}</p>
      </div>

      <div className="flex items-center justify-between mt-auto px-1 pb-1">
        <div className="flex flex-col">
          <span className="text-sm font-black text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-[10px] text-gray-400 font-bold line-through">₹{product.originalPrice}</span>
          )}
        </div>
        
        {quantity > 0 ? (
          <div className="flex items-center bg-zepto-pink text-white rounded-xl px-2 h-9 shadow-lg shadow-zepto-pink/20">
            <button onClick={() => onRemove(product.id)} className="w-7 h-7 flex items-center justify-center font-black text-lg active:scale-125 transition-transform">-</button>
            <span className="mx-2 text-sm font-black w-4 text-center">{quantity}</span>
            <button onClick={() => onAdd(product)} className="w-7 h-7 flex items-center justify-center font-black text-lg active:scale-125 transition-transform">+</button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(product)}
            className="border-2 border-zepto-pink text-zepto-pink font-black text-[11px] py-1 px-5 rounded-xl uppercase tracking-widest hover:bg-zepto-pink hover:text-white active:scale-95 transition-all h-9"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
