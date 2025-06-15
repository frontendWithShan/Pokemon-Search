'use client';
import { useState, useEffect, useCallback } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonTypeResponse {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

export function usePokemonSearch() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([]);
  const [type, setType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const fetchAllPokemon = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      setAllPokemon(data.results);
      setFilteredPokemon(data.results);
      setDisplayedPokemon(data.results);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonByType = async (typeName: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
      const data: PokemonTypeResponse = await response.json();
      
      const pokemonList = data.pokemon.map((item) => ({
        name: item.pokemon.name,
        url: item.pokemon.url
      }));
      
      setFilteredPokemon(pokemonList);
      return pokemonList;
    } catch (error) {
      console.error('Error fetching Pokemon by type:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchValue: string, typeValue: string) => {
    setSearchTerm(searchValue);
    setType(typeValue);
    setHasSearched(true);
    setLoading(true);

    try {
      let pokemonToFilter: Pokemon[] = [];

      if (typeValue) {
        pokemonToFilter = await fetchPokemonByType(typeValue);
      } else {
        pokemonToFilter = allPokemon;
      }

      let results = pokemonToFilter;
      if (searchValue.trim()) {
        results = pokemonToFilter.filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      setDisplayedPokemon(results);
      setFilteredPokemon(pokemonToFilter); 
    } catch (error) {
      console.error('Error in search:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = useCallback(() => {
    setType('');
    setSearchTerm('');
    setHasSearched(false);
    setFilteredPokemon(allPokemon);
    setDisplayedPokemon(allPokemon);
  }, [allPokemon]);

  return {
    allPokemon: filteredPokemon, 
    filteredList: displayedPokemon,
    loading,
    searchTerm,
    type,
    handleSearch,
    clearFilters,
    hasSearched
  };
}