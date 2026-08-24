import React from 'react';
import { Shield, Lock, Eye, Cookie, ExternalLink, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Shield className="w-3.5 h-3.5" />
          Transparência & Segurança
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Política de Privacidade</h1>
        <p className="text-xs text-slate-400 mt-1">Última atualização: Agosto de 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand-600" />
            <h2 className="text-xl font-bold text-slate-900">1. Compromisso com a Privacidade</h2>
          </div>
          <p>
            O <strong>{SITE_CONFIG.name}</strong> respeita integralmente a privacidade de seus usuários e tem como princípio fundamental a minimização da coleta de dados. Nossa plataforma foi projetada para que você possa utilizá-la para orçar e planejar obras e reformas residenciais sem necessidade de criar conta, fornecer e-mail ou dados de cartões de crédito.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-brand-600" />
            <h2 className="text-xl font-bold text-slate-900">2. Armazenamento Local no Navegador (Local Storage)</h2>
          </div>
          <p>
            Os valores informados nas calculadoras (medidas de paredes, áreas de pisos, preferências de traços e coeficientes de perda) são armazenados <strong>exclusivamente na memória local do seu próprio navegador web (localStorage)</strong>.
          </p>
          <p>
            Esses dados não são transferidos para nossos servidores nem compartilhados com terceiros. Você pode apagar esses dados a qualquer momento limpando o cache e dados de navegação do seu dispositivo.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold text-slate-900">3. Cookies e Anúncios de Terceiros (Google AdSense)</h2>
          </div>
          <p>
            Para manter a plataforma e as 10 calculadoras 100% gratuitas para o público, veiculamos anúncios publicitários fornecidos por parceiros de mídia programática, em especial o <strong>Google AdSense</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              Fornecedores terceirizados, incluindo o <strong>Google</strong>, utilizam cookies para veicular anúncios com base em visitas anteriores dos usuários a este ou a outros sites na internet.
            </li>
            <li>
              Com o uso de cookies de publicidade (como o cookie DART), o Google e seus parceiros podem veicular anúncios para os usuários com base nas visitas feitas a este site e/ou a outros sites na internet.
            </li>
            <li>
              Os usuários podem desativar a publicidade personalizada acessando as{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 font-bold underline inline-flex items-center gap-1"
              >
                Configurações de Anúncios do Google <ExternalLink className="w-3 h-3" />
              </a>
              . Como alternativa, você pode desativar o uso de cookies de terceiros para publicidade personalizada acessando{' '}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 font-bold underline inline-flex items-center gap-1"
              >
                www.aboutads.info <ExternalLink className="w-3 h-3" />
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Ferramentas de Análise (Google Analytics)</h2>
          <p>
            Utilizamos o <strong>Google Analytics</strong> para coletar dados estatísticos anônimos de audiência (páginas mais acessadas, tipo de dispositivo, tempo de permanência e calculadoras mais utilizadas). Essas métricas nos ajudam a aprimorar as funcionalidades e a usabilidade do site sem identificar individualmente nenhum usuário.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. Conformidade com a LGPD (Lei nº 13.709/2018)</h2>
          <p>
            O {SITE_CONFIG.name} atua em total conformidade com a Lei Geral de Proteção de Dados Pessoais brasileira (LGPD). Asseguramos que:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>Nenhum dado pessoal sensível é coletado sem consentimento explícito.</li>
            <li>Qualquer mensagem enviada via formulário de contato é utilizada exclusivamente para a finalidade de atendimento e resposta ao usuário.</li>
            <li>O titular pode solicitar a exclusão de qualquer registro de suporte pelo e-mail institucional.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">6. Links para Sites Externos</h2>
          <p>
            Nosso site pode conter links para lojas de materiais de construção, depósitos e parceiros comerciais. Não nos responsabilizamos pelas práticas de privacidade ou pelo conteúdo de sites de terceiros. Recomendamos a leitura das respectivas políticas de privacidade ao navegar fora do {SITE_CONFIG.name}.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-brand-600" />
            <h2 className="text-lg font-bold text-slate-900">Contato sobre Privacidade</h2>
          </div>
          <p>
            Caso tenha alguma dúvida sobre esta Política de Privacidade ou sobre o tratamento de dados na plataforma, entre em contato conosco pelo e-mail:{' '}
            <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-brand-600 font-bold underline">
              {SITE_CONFIG.contactEmail}
            </a>
            .
          </p>
        </section>
      </div>

      {/* Publicidade Discreta */}
      <AdPlaceholder slot="bottom-banner" category="Geral" />
    </div>
  );
};
