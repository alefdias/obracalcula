import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Share2, 
  Printer, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { shareViaWhatsApp, copyToClipboard, shareNative, triggerPrint, ShareDataPayload } from '../../utils/shareHelper';
import { trackCopyResult, trackShareWhatsApp } from '../../utils/analytics';

export interface ResultMetric {
  label: string;
  value: string;
  subValue?: string;
  highlight?: boolean;
  icon?: React.ReactNode;
}

export interface ResultPackageInfo {
  title: string;
  quantity: string;
  description: string;
  badge?: string;
}

interface ResultCardProps {
  calculatorName: string;
  mainHighlight: {
    value: string;
    unit: string;
    description?: string;
    secondaryHighlight?: string;
  };
  metrics: ResultMetric[];
  packageInfo?: ResultPackageInfo[];
  disclaimer?: string;
  onReset?: () => void;
  additionalNotes?: string[];
}

export const ResultCard: React.FC<ResultCardProps> = ({
  calculatorName,
  mainHighlight,
  metrics,
  packageInfo,
  disclaimer = 'Os valores são estimativas baseadas em rendimentos médios e normas técnicas. Considere características específicas da obra, juntas e recomendações do fabricante.',
  onReset,
  additionalNotes,
}) => {
  const [copied, setCopied] = useState(false);

  const getSharePayload = (): ShareDataPayload => {
    return {
      title: `Cálculo de ${calculatorName}`,
      calculatorName: calculatorName,
      summaryText: `${mainHighlight.value} ${mainHighlight.unit}${mainHighlight.secondaryHighlight ? ` (${mainHighlight.secondaryHighlight})` : ''}`,
      details: metrics.map(m => ({
        label: m.label,
        value: m.value + (m.subValue ? ` (${m.subValue})` : ''),
      })),
    };
  };

  const handleCopy = async () => {
    trackCopyResult(calculatorName);
    const success = await copyToClipboard(getSharePayload());
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    trackShareWhatsApp(calculatorName);
    shareViaWhatsApp(getSharePayload());
  };

  const handleNativeShare = async () => {
    trackShareWhatsApp(calculatorName);
    const shared = await shareNative(getSharePayload());
    if (!shared) {
      // fallback to copy
      handleCopy();
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-brand-200 shadow-result overflow-hidden transition-all duration-300 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-navy-900 text-white p-5 sm:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-accent-300 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Resultado do Cálculo</span>
          </div>
          <span className="text-xs text-slate-300 font-medium">ObraCalcula</span>
        </div>

        <div className="mt-2">
          <p className="text-sm text-slate-200 font-medium">{calculatorName}</p>
          <div className="flex flex-wrap items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
              {mainHighlight.value}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-accent-400">
              {mainHighlight.unit}
            </span>
          </div>

          {mainHighlight.secondaryHighlight && (
            <div className="inline-block mt-3 px-3.5 py-1.5 bg-accent-500 text-slate-950 font-bold rounded-lg text-sm sm:text-base shadow-sm">
              {mainHighlight.secondaryHighlight}
            </div>
          )}

          {mainHighlight.description && (
            <p className="text-sm text-slate-300 mt-2">
              {mainHighlight.description}
            </p>
          )}
        </div>
      </div>

      {/* Breakdown Details Grid */}
      <div className="p-5 sm:p-6 space-y-6">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Detalhamento do Cálculo
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metrics.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all ${
                  item.highlight
                    ? 'bg-brand-50/60 border-brand-200 text-brand-950'
                    : 'bg-slate-50 border-slate-200/80 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    {item.icon}
                    {item.label}
                  </span>
                  {item.highlight && (
                    <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
                  )}
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-lg font-bold tracking-tight">
                    {item.value}
                  </span>
                  {item.subValue && (
                    <span className="text-xs font-medium text-slate-500">
                      {item.subValue}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Packaging Recommendation */}
        {packageInfo && packageInfo.length > 0 && (
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2.5">
              <PackageCheck className="w-4 h-4 text-amber-700" />
              Sugestão de Compra no Depósito
            </h4>
            <div className="space-y-2">
              {packageInfo.map((pkg, pidx) => (
                <div key={pidx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-amber-200/60 shadow-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{pkg.title}</span>
                      {pkg.badge && (
                        <span className="text-[11px] font-semibold bg-brand-100 text-brand-800 px-2 py-0.5 rounded-md">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{pkg.description}</p>
                  </div>
                  <span className="text-base font-extrabold text-brand-700 bg-brand-50 px-3 py-1 rounded-md border border-brand-200/60 whitespace-nowrap">
                    {pkg.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Technical Notes */}
        {additionalNotes && additionalNotes.length > 0 && (
          <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 text-xs text-slate-600">
            {additionalNotes.map((note, nidx) => (
              <p key={nidx} className="flex items-start gap-1.5">
                <span className="text-brand-600 font-bold">•</span>
                <span>{note}</span>
              </p>
            ))}
          </div>
        )}

        {/* Action Buttons: WhatsApp, Copy, Print */}
        <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa52] text-white font-bold rounded-xl shadow-sm hover:shadow transition-all text-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>Enviar no WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white font-semibold rounded-xl transition-all text-sm shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={triggerPrint}
            title="Imprimir cálculo ou salvar em PDF"
            className="inline-flex items-center justify-center p-3 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl transition-all text-sm"
          >
            <Printer className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only sm:inline sm:text-xs">Imprimir</span>
          </button>
        </div>

        {/* Technical Disclaimer */}
        <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-400">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">{disclaimer}</p>
        </div>
      </div>
    </div>
  );
};
