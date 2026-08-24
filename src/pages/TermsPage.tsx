import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <h1 className="text-3xl font-black text-slate-900">Termos de Uso</h1>
      <p className="text-xs text-slate-400">Última atualização: Agosto de 2026</p>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-lg font-bold text-slate-900">1. Natureza Estimativa das Calculadoras</h2>
        <p>
          O ObraCalcula disponibiliza ferramentas de simulação e cálculo matemático com base em coeficientes médios, tabelas técnicas (SINAPI/ABNT) e normas usuais da construção civil brasileira. Todos os resultados gerados são <strong>estimativas orientativas</strong> e não substituem o projeto executivo de engenharia ou arquitetura.
        </p>

        <h2 className="text-lg font-bold text-slate-900">2. Responsabilidade sobre Compras</h2>
        <p>
          O usuário é o único responsável pela conferência final das medidas no canteiro de obras e pela aprovação das quantidades junto ao seu profissional de execução (pedreiro, mestre de obras, arquiteto ou engenheiro) antes da efetivação de compras junto aos depósitos ou fornecedores.
        </p>

        <h2 className="text-lg font-bold text-slate-900">3. Gratuidade e Sem Cadastro</h2>
        <p>
          O uso da plataforma é gratuito e não exige criação de login ou fornecimento de cartão de crédito.
        </p>
      </div>
    </div>
  );
};
