
'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface PokemonCardProps {
  name: string;
}

export default function PokemonCard({ name }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getPokemonId = (name: string) => {
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash % 1010) + 1; 
  };

  const pokemonId = getPokemonId(name);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  const fallbackImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:bg-white/90 transition-all duration-300 group cursor-pointer">
      <div className="relative aspect-square mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {!imageError ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className={`object-contain p-4 transition-all duration-300 group-hover:scale-110 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
        ) : (
          <Image
            src={fallbackImageUrl}
            alt={name}
            fill
            className={`object-contain p-4 transition-all duration-300 group-hover:scale-110 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 capitalize group-hover:text-blue-600 transition-colors duration-200">
            {name}
          </h3>
          <div className="flex items-center text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
            <span className="text-xs font-medium mr-1">Details</span>
            <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>#{pokemonId.toString().padStart(3, '0')}</span>
          <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
          <span className="capitalize">Pokémon</span>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-indigo-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-indigo-400/10 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}