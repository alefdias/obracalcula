import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  ShieldCheck,
  Building
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Dúvida sobre cálculo');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simula envio de contato
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100/80 text-brand-800 rounded-full text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          Fale Conosco
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Como Podemos Ajudar Você?
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Tem alguma dúvida sobre as calculadoras, quer sugerir uma nova ferramenta ou falar sobre parcerias comerciais? Nossa equipe está à disposição.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Informações de Contato e Canais */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Mail className="w-5 h-5 text-brand-600" />
              E-mail Institucional
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Para dúvidas gerais, sugestões de novos cálculos ou dúvidas sobre políticas:
            </p>
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="block p-3 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-xl text-xs font-mono text-brand-700 font-bold transition-all text-center"
            >
              {SITE_CONFIG.contactEmail}
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Tempo Médio de Resposta
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Respondemos a todas as mensagens enviadas em até <strong>24 a 48 horas úteis</strong>.
            </p>
          </div>

          <div className="bg-gradient-to-br from-brand-900 to-slate-900 text-white p-6 rounded-2xl space-y-3">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Building className="w-4 h-4 text-accent-400" />
              Parcerias & Anunciantes
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Depósitos de materiais, indústrias e lojas que desejam veicular anúncios contextuais ou integrar seus catálogos de preços podem nos contatar diretamente pelo e-mail de parcerias.
            </p>
          </div>
        </div>

        {/* Formulário de Contato */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Mensagem Enviada!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Obrigado pelo seu contato, <strong>{name}</strong>! Recebemos sua mensagem com sucesso e responderemos em breve no e-mail <strong>{email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-4 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm transition-all"
              >
                Enviar Nova Mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <MessageSquare className="w-5 h-5 text-brand-600" />
                <h3 className="text-xl font-bold text-slate-900">Envie uma Mensagem Direta</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Seu Nome *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Seu E-mail *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Assunto
                </label>
                <select
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                >
                  <option value="Dúvida sobre cálculo">Dúvida sobre cálculo de material</option>
                  <option value="Sugestão de nova calculadora">Sugestão de nova calculadora</option>
                  <option value="Reportar erro ou discrepância">Reportar erro ou discrepância de rendimento</option>
                  <option value="Parceria comercial ou publicidade">Parceria comercial / Publicidade</option>
                  <option value="Outro">Outro assunto</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mensagem *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva sua mensagem com detalhes..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-y"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Seus dados não são compartilhados com terceiros.
                </p>
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-bold rounded-xl text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar Mensagem
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Dúvidas Frequentes Rápidas */}
      <div className="bg-slate-100 p-8 rounded-3xl space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-600" />
          <h3 className="text-xl font-bold text-slate-900">Perguntas Frequentes sobre Suporte</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800">Como sugerir uma nova ferramenta?</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Basta nos enviar uma mensagem com o nome do material ou tipo de cálculo que gostaria de ver na plataforma. Avaliamos e implementamos novas ferramentas continuamente.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800">Preciso pagar ou assinar para usar?</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Não. O ObraCalcula é e sempre será 100% gratuito e aberto para todos os usuários no Brasil.
            </p>
          </div>
        </div>
      </div>

      {/* Publicidade Discreta */}
      <AdPlaceholder slot="bottom-banner" category="Suporte e Orçamentos" />
    </div>
  );
};
