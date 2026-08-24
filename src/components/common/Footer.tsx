import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Heart, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { CALCULATORS } from '../../data/calculatorRegistry';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-slate-300 border-t border-brand-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center shadow-md">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                Obra<span className="text-accent-400">Calcula</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A plataforma brasileira feita para pedreiros, construtores, arquitetos e proprietários calcularem
              a quantidade exata de materiais para obras e reformas sem desperdício.
            </p>
            <div className="p-3.5 bg-brand-900/60 rounded-xl border border-brand-800 text-xs text-slate-400 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" />
              <span>
                As estimativas utilizam tabelas oficiais e rendimentos de referência. Sempre consulte o manual do fabricante e as peculiaridades da sua estrutura.
              </span>
            </div>
          </div>

          {/* Construção & Pisos Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Construção & Pisos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/calculadora-de-piso" className="hover:text-accent-400 transition-colors">
                  Calculadora de Piso
                </Link>
              </li>
              <li>
                <Link to="/calculadora-de-tijolos" className="hover:text-accent-400 transition-colors">
                  Calculadora de Tijolos
                </Link>
              </li>
              <li>
                <Link to="/calculadora-de-concreto" className="hover:text-accent-400 transition-colors">
                  Calculadora de Concreto
                </Link>
              </li>
              <li>
                <Link to="/calculadora-de-cimento" className="hover:text-accent-400 transition-colors">
                  Calculadora de Cimento
                </Link>
              </li>
              <li>
                <Link to="/calculadora-de-argamassa" className="hover:text-accent-400 transition-colors">
                  Calculadora de Argamassa
                </Link>
              </li>
              <li>
                <Link to="/calculadora-de-rejunte" className="hover:text-accent-400 transition-colors">
                  Calculadora de Rejunte
                </Link>
              </li>
            </ul>
          </div>

          {/* Pintura, Telhado & Reforma */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Pintura & Cobertura
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/calculadora-de-tinta" className="hover:text-accent-400 transition-colors">
                  Calculadora de Tinta
                </Link>
              </li>
              <li>
                <Link to="/calculadora-de-telhas" className="hover:text-accent-400 transition-colors">
                  Calculadora de Telhas
                </Link>
              </li>
              <li>
                <Link to="/calculadora-de-rodape" className="hover:text-accent-400 transition-colors">
                  Calculadora de Rodapé
                </Link>
              </li>
              <li>
                <Link to="/calculadora-de-massa-corrida" className="hover:text-accent-400 transition-colors">
                  Calculadora de Massa Corrida
                </Link>
              </li>
              <li>
                <Link to="/materiais" className="hover:text-accent-400 transition-colors font-semibold text-brand-400">
                  Tabela de Rendimentos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Institucional & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Institucional
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sobre" className="hover:text-accent-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/como-funciona" className="hover:text-accent-400 transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-accent-400 transition-colors">
                  Contato & Suporte
                </Link>
              </li>
              <li>
                <Link to="/calculadoras" className="hover:text-accent-400 transition-colors">
                  Todas as Ferramentas
                </Link>
              </li>
              <li>
                <Link to="/termos" className="hover:text-accent-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="hover:text-accent-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-brand-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} ObraCalcula. Todos os direitos reservados. Feito para o Brasil 🇧🇷</p>
          <p className="flex items-center gap-1 font-semibold text-slate-400">
            Calcule. Compre. Construa.
          </p>
        </div>
      </div>
    </footer>
  );
};
