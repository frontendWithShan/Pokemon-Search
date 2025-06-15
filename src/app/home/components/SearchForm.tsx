'use client';
import { usePokemonSearch } from "@/app/context/PokemonSearchContext";
import { useState, useEffect } from 'react';

interface PokemonType {
  name: string;
  url: string;
}

export function SearchForm({ serverTypes }: { serverTypes: PokemonType[] }) {
  const {
    type,
    setType,
    searchTerm,
    setSearchTerm,
    loading,
    handleSearch
  } = usePokemonSearch();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-6xl mx-auto mb-8 px-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative lg:w-64">
              <div className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-700 text-sm font-medium">
                Loading types...
              </div>
            </div>
            <div className="relative flex-1">
              <div className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-700 text-sm">
                Search Pokémon by name...
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-400 text-white rounded-xl font-medium">
              Search
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 px-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative lg:w-64">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </div>

           <button
            onClick={handleSearch} 
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