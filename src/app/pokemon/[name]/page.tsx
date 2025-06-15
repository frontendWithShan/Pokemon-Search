import { fetchPokemonDetails } from '@/app/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ArrowLeft, Zap, Shield, Sword, Heart, Gauge, Star } from 'lucide-react';

export default async function PokemonDetails({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemon = await fetchPokemonDetails(name);

  const typeGradients: Record<string, string> = {
    normal: 'from-gray-400 to-gray-500',
    fire: 'from-red-400 to-orange-500',
    water: 'from-blue-400 to-cyan-500',
    electric: 'from-yellow-300 to-yellow-500',
    grass: 'from-green-400 to-emerald-500',
    ice: 'from-blue-200 to-cyan-300',
    fighting: 'from-red-600 to-red-800',
    poison: 'from-purple-400 to-purple-600',
    ground: 'from-yellow-500 to-amber-600',
    flying: 'from-indigo-300 to-blue-400',
    psychic: 'from-pink-400 to-purple-500',
    bug: 'from-lime-400 to-green-500',
    rock: 'from-yellow-600 to-amber-700',
    ghost: 'from-purple-600 to-indigo-700',
    dragon: 'from-indigo-600 to-purple-700',
    dark: 'from-gray-700 to-gray-900',
    steel: 'from-gray-400 to-slate-500',
    fairy: 'from-pink-300 to-rose-400',
  };

  const getStatIcon = (statName: string) => {
    switch (statName) {
      case 'hp': return <Heart className="h-4 w-4" />;
      case 'attack': return <Sword className="h-4 w-4" />;
      case 'defense': return <Shield className="h-4 w-4" />;
      case 'special-attack': return <Zap className="h-4 w-4" />;
      case 'special-defense': return <Shield className="h-4 w-4" />;
      case 'speed': return <Gauge className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const primaryType = pokemon.types[0]?.type.name || 'normal';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${typeGradients[primaryType]} via-opacity-90`}>
      <div className="bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/home' },
              { label: pokemon.name, href: '#' },
            ]}
          />
          
          <Link 
            href="/home" 
            className="inline-flex items-center mt-4 text-white/90 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
            Back 
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          <div className={`bg-gradient-to-r ${typeGradients[primaryType]} p-8 text-white`}>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-80 h-80 bg-white/20 rounded-full p-8 backdrop-blur-sm">
                  <div className="relative w-full h-full">
                    <Image
                      src={pokemon.sprites.other['official-artwork'].front_default}
                      alt={pokemon.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                      sizes="320px"
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold">#{pokemon.id.toString().padStart(3, '0')}</span>
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-5xl lg:text-6xl font-bold capitalize mb-4 drop-shadow-lg">
                  {pokemon.name}
                </h1>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="bg-white/30 backdrop-blur-sm text-white px-6 py-2 rounded-full text-lg font-semibold capitalize border border-white/20"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold">{pokemon.height / 10}m</div>
                    <div className="text-sm opacity-80">Height</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold">{pokemon.weight / 10}kg</div>
                    <div className="text-sm opacity-80">Weight</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              Base Stats
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="text-gray-600">
                        {getStatIcon(stat.stat.name)}
                      </div>
                      <span className="font-semibold text-gray-900 capitalize">
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${typeGradients[primaryType]} h-3 rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: `${Math.min(100, (stat.base_stat / 200) * 100)}%`,
                        animationDelay: '0.5s'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  Abilities
                </h3>
                <div className="space-y-3">
                  {pokemon.abilities.map((ability) => (
                    <div 
                      key={ability.ability.name} 
                      className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 capitalize">
                          {ability.ability.name.replace('-', ' ')}
                        </span>
                        {ability.is_hidden && (
                          <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                            Hidden
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Sword className="h-5 w-5 text-green-600" />
                  </div>
                  Sample Moves
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.moves.slice(0, 12).map((move) => (
                    <span
                      key={move.move.name}
                      className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-green-100 hover:to-emerald-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-green-800 transition-all duration-200 capitalize cursor-default"
                    >
                      {move.move.name.replace('-', ' ')}
                    </span>
                  ))}
                  {pokemon.moves.length > 12 && (
                    <span className="bg-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-600">
                      +{pokemon.moves.length - 12} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}