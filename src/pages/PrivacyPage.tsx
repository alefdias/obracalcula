import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <h1 className="text-3xl font-black text-slate-900">Política de Privacidade</h1>
      <p className="text-xs text-slate-400">Última atualização: Agosto de 2026</p>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-lg font-bold text-slate-900">1. Armazenamento Local no Navegador</h2>
        <p>
          O ObraCalcula prioriza a sua privacidade. Seus cálculos anteriores e preferências de unidade são salvos <strong>exclusivamente na memória local do seu navegador (localStorage)</strong>. Nenhuma medida de cômodo ou dado de sua obra é enviado para servidores externos.
        </p>

        <h2 className="text-lg font-bold text-slate-900">2. Cookies e Anúncios de Terceiros</h2>
        <p>
          Podemos exibir anúncios de parceiros comerciais e redes de publicidade (como Google AdSense) para manter a plataforma gratuita. Tais serviços podem utilizar cookies anônimos para exibição de anúncios relevantes.
        </p>

        <h2 className="text-lg font-bold text-slate-900">3. Conformidade com a LGPD</h2>
        <p>
          O ObraCalcula respeita a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), garantindo que nenhum dado pessoal sensível seja coletado sem consentimento explícito.
        </p>
      </div>
    </div>
  );
};
