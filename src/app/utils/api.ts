import { PokemonBasic, PokemonDetails, PokemonType } from '@/types/pokemon';
import axios from 'axios';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

export const fetchPokemonTypes = async (): Promise<PokemonType[]> => {
  try {
    const response = await axios.get(`${POKEAPI_BASE}/type`);
    return response.data.results.filter((type: PokemonType) => type.name !== 'unknown' && type.name !== 'shadow');
  } catch (error) {
    console.error('Error fetching Pokémon types:', error);
    throw error;
  }
};

export const fetchPokemonByType = async (type: string): Promise<PokemonBasic[]> => {
  try {
    const response = await axios.get(`${POKEAPI_BASE}/type/${type}`);
    return response.data.pokemon.map((entry: { pokemon: PokemonBasic }) => entry.pokemon);
  } catch (error) {
    console.error(`Error fetching Pokémon by type ${type}:`, error);
    throw error;
  }
};

export const fetchPokemonList = async (limit: number = 151): Promise<PokemonBasic[]> => {
  try {
    const response = await axios.get(`${POKEAPI_BASE}/pokemon?limit=${limit}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  try {
    const response = await axios.get(`${POKEAPI_BASE}/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokémon details for ${name}:`, error);
    throw error;
  }
};