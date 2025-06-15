'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonType {
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

interface PokemonSearchContextType {
  allPokemon: Pokemon[];
  filteredList: Pokemon[];
  loading: boolean;
  searchTerm: string;
  type: string;
  hasSearched: boolean;
  setSearchTerm: (term: string) => void;
  setType: (type: string) => void;
  handleSearch: (searchTerm?: string, type?: string) => void;
  clearFilters: () => void;
}

const PokemonSearchContext = createContext<PokemonSearchContextType | undefined>(undefined);

export function PokemonSearchProvider({ 
  children, 
}: { 
  children: ReactNode;
  initialTypes?: PokemonType[];
}) {
  const [hasSearched, setHasSearched] = useState(false);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([]);
  const [type, setType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); 
  const [mounted, setMounted] = useState(false);
  
  // Cache for different types
  const [pokemonCache, setPokemonCache] = useState<{
    data: Pokemon[] | null;
    timestamp: number;
  }>({ data: null, timestamp: 0 });
  
  const [typeCache, setTypeCache] = useState<{
    [key: string]: { data: Pokemon[]; timestamp: number };
  }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchAllPokemon();
    }
  }, [mounted]);

  const fetchAllPokemon = async () => {
    try {
      setLoading(true);
      
      if (pokemonCache.data && 
          Date.now() - pokemonCache.timestamp < 86400000) {
        setAllPokemon(pokemonCache.data);
        setDisplayedPokemon(pokemonCache.data);
      } else {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        
        setAllPokemon(data.results);
        setDisplayedPokemon(data.results);
        
        setPokemonCache({
          data: data.results,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonByType = async (typeName: string): Promise<Pokemon[]> => {
    try {
      if (typeCache[typeName] && Date.now() - typeCache[typeName].timestamp < 86400000) {
        return typeCache[typeName].data;
      }
      
      const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
      const data: PokemonTypeResponse = await response.json();
      
      const pokemonList = data.pokemon.map((item) => ({
        name: item.pokemon.name,
        url: item.pokemon.url
      }));
      
      setTypeCache(prev => ({
        ...prev,
        [typeName]: { data: pokemonList, timestamp: Date.now() }
      }));
      
      return pokemonList;
    } catch (error) {
      console.error('Error fetching Pokemon by type:', error);
      return [];
    }
  };

  const handleSearch = async (newSearchTerm?: string, newType?: string) => {
    setHasSearched(true);
    setLoading(true);
    
    const termToUse = newSearchTerm !== undefined ? newSearchTerm : searchTerm;
    const typeToUse = newType !== undefined ? newType : type;
    
    if (newSearchTerm !== undefined) setSearchTerm(newSearchTerm);
    if (newType !== undefined) setType(newType);
    
    try {
      let baseList = allPokemon;
  
      if (typeToUse) {
        baseList = await fetchPokemonByType(typeToUse);
      }
      
      let finalList = baseList;
      if (termToUse.trim()) {
        finalList = baseList.filter(pokemon =>
          pokemon.name.toLowerCase().includes(termToUse.toLowerCase())
        );
      }
      
      setDisplayedPokemon(finalList); 
      
    } catch (error) {
      console.error('Error in handleSearch:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setType('');
    setHasSearched(false); 
    setSearchTerm('');
    setDisplayedPokemon(allPokemon);
  };

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <PokemonSearchContext.Provider
      value={{
        allPokemon,
        filteredList: displayedPokemon,
        loading,
        searchTerm,
        type,
        hasSearched,
        setSearchTerm,
        setType,
        handleSearch,
        clearFilters,
      }}
    >
      {children}
    </PokemonSearchContext.Provider>
  );
}

export function usePokemonSearch() {
  const context = useContext(PokemonSearchContext);
  if (context === undefined) {
    throw new Error('usePokemonSearch must be used within a PokemonSearchProvider');
  }
  return context;
}