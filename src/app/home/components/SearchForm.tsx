'use client';
import { usePokemonSearch } from "@/app/context/PokemonSearchContext";
import { useState } from 'react';

interface PokemonType {
  name: string;
  url: string;
}

export function SearchForm({ serverTypes }: { serverTypes: PokemonType[] }) {
  const [localType, setLocalType] = useState('');
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Context
  const context = usePokemonSearch();

  const handleManualSearch = () => {
    setIsSearching(true);
    
    if (context) {
      context.handleSearch(localSearchTerm, localType);
    }
    
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleManualSearch();
    }
  };

  const loading = context?.loading ?? isSearching;

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 px-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative lg:w-64">
            <select
              value={localType}
              onChange={(e) => setLocalType(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <option value="">All Pokémon Types</option>
              {serverTypes.map((pokemonType) => (
                <option key={pokemonType.name} value={pokemonType.name}>
                  {pokemonType.name.charAt(0).toUpperCase() + pokemonType.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Pokémon by name..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              onKeyDown={handleKeyPress}
            />
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <button
            onClick={handleManualSearch}
            disabled={loading}
            className="px-6 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </div>
  );
}