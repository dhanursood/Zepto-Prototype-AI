
import React, { useState } from 'react';
import { FALLBACK_IMAGE } from '../constants';

interface CategoryCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, onClick }) => {
  const [imgSrc, setImgSrc] = useState(image);

  const handleImageError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  return (
    <div 
      className="flex flex-col items-center gap-2 group cursor-pointer" 
      onClick={onClick}
    >
      <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:border-zepto-purple group-hover:shadow-md transition-all relative flex items-center justify-center">
        <img 
          src={imgSrc} 
          alt={name} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" 
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <span className="text-[10px] text-center font-black text-gray-800 truncate w-full group-hover:text-zepto-purple transition-colors uppercase tracking-tight">
        {name}
      </span>
    </div>
  );
};

export default CategoryCard;
