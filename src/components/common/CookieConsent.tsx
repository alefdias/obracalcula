import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('obracalcula_cookie_consent');
      if (!consent) {
        // Pequeno delay para animação suave após carregamento da página
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignora erro em navegadores com restrição de storage
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('obracalcula_cookie_consent', 'all');
    } catch {}
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    try {
      localStorage.setItem('obracalcula_cookie_consent', 'necessary');
    } catch {}
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Consentimento de Cookies e Privacidade"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-slate-200/90 text-slate-800 text-sm space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-amber-100 text-amber-800 rounded-xl flex-shrink-0">
              <Cookie className="w-5 h-5" />
            </span>
            <h4 className="font-bold text-slate-900 text-base">
              Privacidade & Cookies
            </h4>
          </div>
          <button
            type="button"
            onClick={handleAcceptNecessary}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            title="Fechar"
            aria-label="Fechar banner de cookies"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Utilizamos cookies essenciais para salvar seus cálculos na memória do navegador e tecnologias de parceiros (como Google AdSense e Analytics) para manter as calculadoras 100% gratuitas. Consulte nossa{' '}
          <Link
            to="/privacidade"
            className="text-brand-600 font-semibold underline underline-offset-2 hover:text-brand-700"
          >
            Política de Privacidade
          </Link>
          .
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="flex-1 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-bold rounded-xl text-xs shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            Aceitar Todos
          </button>
          <button
            type="button"
            onClick={handleAcceptNecessary}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
          >
            Apenas Essenciais
          </button>
        </div>
      </div>
    </aside>
  );
};
