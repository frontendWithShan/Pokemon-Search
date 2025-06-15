'use client';
import Link from 'next/link';
import PokemonCard from '@/components/PokemonCard';
import { usePokemonSearch } from '@/app/context/PokemonSearchContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState, useEffect } from 'react';

export function PokemonGrid() {
  const { filteredList, loading, searchTerm, type, clearFilters,hasSearched  } = usePokemonSearch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) return <LoadingSpinner />;

  const hasResults = filteredList.length > 0;
  const isFiltered = searchTerm || type;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {isFiltered && (
        <div className="mb-6 px-2">
          <div className="text-sm text-gray-600 bg-white/70 backdrop-blur-sm rounded-lg px-4 py-3 inline-block">
            {hasSearched  && (
              <>
                Found <span className="font-semibold text-gray-900">{filteredList.length}</span> Pokémon
                {searchTerm && (
                  <> matching &ldquo;<span className="font-medium text-blue-600">{searchTerm}</span>&rdquo;</>
                )}
                {type && (
                  <> of type <span className="font-medium text-purple-600 capitalize">{type}</span></>
                )}
              </>
            )}
            {!hasResults &&(
              <>
                No Pokémon found
                {searchTerm && (
                  <> matching &ldquo;<span className="font-medium text-red-500">{searchTerm}</span>&rdquo;</>
                )}
                {type && (
                  <> of type <span className="font-medium text-purple-600 capitalize">{type}</span></>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {hasResults ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
          {filteredList.map((pokemon, index) => (
            <div
              key={pokemon.name}
              className="pokemon-card-wrapper"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <Link 
                href={`/pokemon/${pokemon.name}`}
                className="block group transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
              >
                <PokemonCard name={pokemon.name} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4">
          <div className="mx-auto h-24 w-24 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center mb-6 shadow-lg">
            <span className="text-3xl text-gray-400">?</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">No Pokémon found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Try adjusting your search terms or filters to find what you&rsquo;re looking for.
          </p>
          {isFiltered && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        .pokemon-card-wrapper {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}