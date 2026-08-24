import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, AlertTriangle, FileText, Scale, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <FileText className="w-3.5 h-3.5" />
          Termos e Condições
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Termos de Uso</h1>
        <p className="text-xs text-slate-400 mt-1">Última atualização: Agosto de 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-brand-600" />
            <h2 className="text-xl font-bold text-slate-900">1. Aceitação dos Termos</h2>
          </div>
          <p>
            Ao acessar e utilizar o site <strong>{SITE_CONFIG.name}</strong> ({SITE_CONFIG.domain}), você concorda expressamente com os presentes Termos de Uso e com nossa{' '}
            <Link to="/privacidade" className="text-brand-600 font-bold underline">
              Política de Privacidade
            </Link>
            . Se você não concordar com qualquer um dos termos, recomendamos a não utilização da plataforma.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold text-slate-900">2. Natureza Estimativa e Isenção de Responsabilidade</h2>
          </div>
          <p>
            O <strong>{SITE_CONFIG.name}</strong> fornece ferramentas matemáticas para estimativa e planejamento preliminar de quantitativos de materiais da construção civil (pisos, tintas, tijolos, concreto, argamassa, cimento, telhas, rejunte, rodapés e massas).
          </p>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 space-y-2">
            <p className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0" />
              Aviso Técnico Importante:
            </p>
            <p>
              As estimativas são baseadas em coeficientes médios da indústria, normas ABNT e tabelas de referência SINAPI. Fatores como irregularidades no contrapiso, espessura da junta, habilidade de corte do profissional, traço da argamassa e especificações particulares de cada fabricante podem alterar o consumo real na obra.
            </p>
          </div>
          <p>
            <strong>É de responsabilidade exclusiva do usuário</strong> validar as quantidades calculadas com o seu profissional responsável (engenheiro, arquiteto, mestre de obras ou pedreiro) antes de efetuar compras em depósitos ou fornecedores. O {SITE_CONFIG.name} não se responsabiliza por eventuais sobras, faltas ou custos adicionais decorrentes de compras efetuadas.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900">3. Gratuidade e Sem Cadastro Obrigatório</h2>
          </div>
          <p>
            O acesso a todas as ferramentas e conteúdos do site é gratuito e irrestrito. Não cobramos valores de assinatura e não exigimos a criação de contas ou o fornecimento de dados financeiros.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Propriedade Intelectual</h2>
          <p>
            Todo o código-fonte, algoritmos, design visual, textos explicativos, logotipos e ilustrações disponibilizados no {SITE_CONFIG.name} são protegidos pelas leis de propriedade intelectual e direitos autorais. É proibida a reprodução ou cópia integral da plataforma sem autorização prévia por escrito.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. Links para Terceiros e Anunciantes</h2>
          <p>
            O site pode exibir links e anúncios patrocinados de parceiros comerciais (lojas de varejo, depósitos, fabricantes). O {SITE_CONFIG.name} não tem ingerência sobre políticas de preços, estoques, entregas ou garantias de produtos adquiridos em sites de terceiros.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">6. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito de atualizar ou modificar estes Termos de Uso a qualquer momento, visando refletir melhorias no serviço ou adequações a novas exigências legais. A data da versão mais recente estará sempre indicada no topo desta página.
          </p>
        </section>
      </div>

      {/* Publicidade Discreta */}
      <AdPlaceholder slot="bottom-banner" category="Geral" />
    </div>
  );
};
