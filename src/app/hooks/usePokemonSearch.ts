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

  useEffect(() => {
    fetchAllPokemon();
  }, []);
  
  useEffect(() => {
    if (type) {
      fetchPokemonByType(type);
    } else if (allPokemon.length > 0) {
      setFilteredPokemon(allPokemon);
      setDisplayedPokemon(allPokemon);
    }
  }, [type, allPokemon]);

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
      setDisplayedPokemon(pokemonList);
    } catch (error) {
      console.error('Error fetching Pokemon by type:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
  if (!searchTerm.trim()) {
    setDisplayedPokemon(filteredPokemon);
    return;
  }

  const searchResults = filteredPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  setDisplayedPokemon(searchResults);
};

  const clearFilters = useCallback(() => {
    setType('');
    setSearchTerm('');
    setFilteredPokemon(allPokemon);
    setDisplayedPokemon(allPokemon);
  }, [allPokemon]);

  return {
    filteredList: displayedPokemon,
    loading,
    searchTerm,
    setSearchTerm,
    type,
    setType,
    handleSearch,
    clearFilters
  };
}