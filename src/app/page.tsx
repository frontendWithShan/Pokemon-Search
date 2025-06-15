import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Pokémon
            <span className="block text-yellow-300">Search</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover and explore the world of Pokémon with our comprehensive search application. 
            Find your favorite Pokémon by type, name, and more!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Advanced Search</h3>
            <p className="text-blue-100">Search by name or filter by Pokémon type</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-white mb-2">Responsive Design</h3>
            <p className="text-blue-100">Perfect experience on all devices</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Fast & Modern</h3>
            <p className="text-blue-100">Built with Next.js and Tailwind CSS</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/home"
            className="group bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="text-white/80 text-sm">
            Powered by PokéAPI
          </div>
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-300/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}