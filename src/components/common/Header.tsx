import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calculator, 
  Menu, 
  X, 
  Hammer, 
  Paintbrush, 
  LayoutGrid, 
  BookOpen, 
  Search,
  Layers,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-brand-950/95 backdrop-blur-md border-b border-brand-800/60 text-white transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={closeMenu} 
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-accent-400 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <Calculator className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans flex items-center">
                Obra<span className="text-accent-400">Calcula</span>
              </span>
              <span className="text-[10px] text-slate-300 font-semibold tracking-wider uppercase -mt-1 hidden sm:block">
                Calcule. Compre. Construa.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') ? 'bg-white/10 text-white font-semibold' : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Início
            </Link>

            <Link
              to="/calculadoras"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/calculadoras') ? 'bg-white/10 text-white font-semibold' : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Calculadoras
            </Link>

            <Link
              to="/calculadoras?cat=construcao"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
            >
              Construção
            </Link>

            <Link
              to="/calculadoras?cat=reforma"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
            >
              Reforma
            </Link>

            <Link
              to="/materiais"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/materiais') ? 'bg-white/10 text-white font-semibold' : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Materiais
            </Link>

            <Link
              to="/sobre"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/sobre') ? 'bg-white/10 text-white font-semibold' : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Sobre
            </Link>

            <Link
              to="/contato"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/contato') ? 'bg-white/10 text-white font-semibold' : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Contato
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/calculadoras"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-500 hover:bg-accent-400 active:bg-accent-600 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-sm hover:shadow hover:scale-[1.02]"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Calculadoras</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent-400"
              aria-label="Abrir menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-950 border-b border-brand-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                isActive('/') ? 'bg-white/10 text-white font-bold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Início
            </Link>
            <Link
              to="/calculadoras"
              onClick={closeMenu}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                isActive('/calculadoras') ? 'bg-white/10 text-white font-bold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Todas as Calculadoras
            </Link>
            <Link
              to="/materiais"
              onClick={closeMenu}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                isActive('/materiais') ? 'bg-white/10 text-white font-bold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Guia de Materiais & Rendimentos
            </Link>
            <Link
              to="/como-funciona"
              onClick={closeMenu}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                isActive('/como-funciona') ? 'bg-white/10 text-white font-bold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Como Funciona
            </Link>
            <Link
              to="/sobre"
              onClick={closeMenu}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                isActive('/sobre') ? 'bg-white/10 text-white font-bold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Sobre Nós
            </Link>
            <Link
              to="/contato"
              onClick={closeMenu}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                isActive('/contato') ? 'bg-white/10 text-white font-bold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Contato & Suporte
            </Link>
          </div>

          <div className="pt-2">
            <Link
              to="/calculadoras"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-accent-500 hover:bg-accent-400 text-slate-950 font-bold rounded-xl text-base"
            >
              <Calculator className="w-5 h-5" />
              <span>Ver todas as calculadoras</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
