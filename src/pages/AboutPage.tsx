import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Target, 
  Award, 
  Users, 
  ShieldCheck, 
  BookOpen, 
  ArrowRight,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100/80 text-brand-800 rounded-full text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          Sobre a Plataforma
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Simplificando a Construção Civil no Brasil
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          O <strong>{SITE_CONFIG.name}</strong> nasceu com um propósito claro: eliminar o desperdício de dinheiro e materiais em obras e reformas residenciais através de tecnologia acessível, rápida e 100% gratuita.
        </p>
      </div>

      {/* Grid de Missão, Visão e Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Nossa Missão</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Permitir que qualquer pessoa — de proprietários de primeira viagem a mestres de obras experientes — calcule a lista exata de materiais para sua obra em menos de 1 minuto, sem sobras e sem faltas.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Rigor Técnico</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Todas as 10 calculadoras foram programadas seguindo os padrões das normas técnicas da <strong>ABNT</strong> e coeficientes de consumo do <strong>SINAPI</strong> da Caixa Econômica Federal.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">100% Gratuito</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Acreditamos na democratização do conhecimento. Não cobramos mensalidades, não exigimos cadastro nem coletamos senhas ou dados bancários dos usuários.
          </p>
        </div>
      </div>

      {/* Metodologia de Cálculo e Engenharia */}
      <div className="bg-gradient-to-br from-brand-900 to-slate-900 text-white p-8 sm:p-10 rounded-3xl space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-brand-800/80 rounded-xl">
            <Cpu className="w-6 h-6 text-accent-400" />
          </span>
          <h2 className="text-2xl font-black tracking-tight">Metodologia e Fórmulas de Engenharia</h2>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          No Brasil, estima-se que entre <strong>20% a 30% dos materiais de construção</strong> comprados para uma reforma são desperdiçados devido a erros de cálculo manual, sobras cortadas incorretamente ou compra inadequada de embalagens.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-2">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Margens de Perda Parametrizadas</h4>
              <p className="text-slate-300 text-xs mt-1">
                Ajuste fino de 5% a 20% dependendo do tipo de corte (reto vs diagonal) e experiência na aplicação.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Conversão em Embalagens Comerciais</h4>
              <p className="text-slate-300 text-xs mt-1">
                Cálculos convertidos automaticamente em sacos de 20kg/50kg, latas de 18L, galões de 3,6L e caixas comerciais.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Dedução Automática de Vãos</h4>
              <p className="text-slate-300 text-xs mt-1">
                Desconto preciso de portas, janelas e vãos estruturais para evitar compras de tijolos ou tintas em excesso.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Padrões Brasileiros de Medidas</h4>
              <p className="text-slate-300 text-xs mt-1">
                Tijolos baianos de 8 furos, blocos estruturais de concreto, telhas coloniais, porcelanatos retificados e muito mais.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modelo de Sustentabilidade da Plataforma */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-600" />
          Como Mantemos a Plataforma Gratuita
        </h2>
        <p>
          Para manter os servidores, atualizações de fórmulas e novas calculadoras funcionando gratuitamente para todo o Brasil, o <strong>{SITE_CONFIG.name}</strong> é financiado exclusivamente por meio de publicidade programática contextual (como a rede do <strong>Google AdSense</strong>) e parcerias com depósitos e varejistas de materiais de construção.
        </p>
        <p>
          Temos o compromisso inegociável de manter os anúncios discretos, rápidos e sem impacto negativo na experiência do usuário, nunca cobrando pelo uso das ferramentas de cálculo.
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-slate-100 p-8 rounded-2xl space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Pronto para calcular os materiais da sua obra?
        </h3>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Explore nossa lista completa com 10 calculadoras especializadas ou tire dúvidas sobre rendimentos de insumos.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/calculadoras"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-sm transition-all inline-flex items-center gap-2"
          >
            Ver Todas as Calculadoras
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contato"
            className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold rounded-xl text-sm transition-all"
          >
            Fale Conosco
          </Link>
        </div>
      </div>

      {/* Publicidade Discreta */}
      <AdPlaceholder slot="bottom-banner" category="Construção e Reforma" />
    </div>
  );
};
