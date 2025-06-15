import { PokemonSearchProvider } from '@/app/context/PokemonSearchContext';
import { SearchForm } from '@/app/home/components/SearchForm';
import { PokemonGrid } from '@/app/home/components/PokemonGrid';

interface PokemonType {
  name: string;
  url: string;
}

async function fetchPokemonTypes(): Promise<PokemonType[]> {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type', {
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon types');
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokemon types:', error);
    return [];
  }
}

export default async function HomePage() {
  const types = await fetchPokemonTypes();

  return (
    <PokemonSearchProvider initialTypes={types}>
      <div>
        <SearchForm serverTypes={types} />
        <PokemonGrid />
      </div>
    </PokemonSearchProvider>
  );
}