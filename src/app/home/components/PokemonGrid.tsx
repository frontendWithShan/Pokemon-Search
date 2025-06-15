'use client';
import Link from 'next/link';
import PokemonCard from '@/components/PokemonCard';
import { usePokemonSearch } from '@/app/context/PokemonSearchContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState, useEffect, useMemo } from 'react';

const ITEMS_PER_PAGE = 100; 

export function PokemonGrid() {
  const { filteredList, loading, searchTerm, type, clearFilters, hasSearched } = usePokemonSearch();
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, type, filteredList.length]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredList.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
    
    return {
      items: currentItems,
      totalPages,
      totalItems: filteredList.length
    };
  }, [filteredList, currentPage]);

  if (!mounted || loading) return <LoadingSpinner />;

  const hasResults = filteredList.length > 0;
  const isFiltered = searchTerm || type;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationButtons = () => {
    const { totalPages } = paginatedData;
    if (totalPages <= 1) return null;

    const buttons = [];
    const showEllipsis = totalPages > 7;
    
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
    );

    if (showEllipsis) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 ${
            currentPage === 1
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700'
          }`}
        >
          1
        </button>
      );

      if (currentPage > 4) {
        buttons.push(
          <span key="ellipsis1" className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border-t border-b border-gray-300">
            ...
          </span>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 ${
              currentPage === i
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 3) {
        buttons.push(
          <span key="ellipsis2" className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border-t border-b border-gray-300">
            ...
          </span>
        );
      }

      if (totalPages > 1) {
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 ${
              currentPage === totalPages
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            {totalPages}
          </button>
        );
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 ${
              currentPage === i
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            {i}
          </button>
        );
      }
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    );

    return buttons;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {isFiltered && (
        <div className="mb-6 px-2">
          <div className="text-sm text-gray-600 bg-white/70 backdrop-blur-sm rounded-lg px-4 py-3 inline-block">
            {hasSearched && hasResults && (
              <>
                Found <span className="font-semibold text-gray-900">{paginatedData.totalItems}</span> Pokémon
                {searchTerm && (
                  <> matching &ldquo;<span className="font-medium text-blue-600">{searchTerm}</span>&rdquo;</>
                )}
                {type && (
                  <> of type <span className="font-medium text-purple-600 capitalize">{type}</span></>
                )}
                {paginatedData.totalPages > 1 && (
                  <> (Page {currentPage} of {paginatedData.totalPages})</>
                )}
              </>
            )}
            {!hasResults && (
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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {paginatedData.items.map((pokemon, index) => (
              <div
                key={`${pokemon.name}-${currentPage}`}
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

          {paginatedData.totalPages > 1 && (
            <div className="mt-12 mb-8">
              <nav className="flex items-center justify-center">
                <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-lg shadow-lg border border-white/20">
                  {renderPaginationButtons()}
                </div>
              </nav>
              
              <div className="text-center mt-4 text-sm text-gray-600">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, paginatedData.totalItems)} of {paginatedData.totalItems} Pokémon
              </div>
            </div>
          )}
        </>
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