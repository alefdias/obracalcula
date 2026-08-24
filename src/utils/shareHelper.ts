/**
 * Helper para compartilhamento de cálculos via WhatsApp, Área de Transferência e Web Share API
 */

export interface ShareDataPayload {
  title: string;
  calculatorName: string;
  summaryText: string;
  details?: { label: string; value: string }[];
}

export function generateShareText(data: ShareDataPayload): string {
  const currentUrl = window.location.href;
  let text = `📐 *ObraCalcula — ${data.calculatorName}*\n\n`;
  text += `📊 *Resultado:* ${data.summaryText}\n\n`;
  
  if (data.details && data.details.length > 0) {
    text += `*Detalhes da Estimativa:*\n`;
    data.details.forEach(item => {
      text += `• ${item.label}: *${item.value}*\n`;
    });
    text += `\n`;
  }
  
  text += `💡 *Calcule o material da sua obra em:* ${currentUrl}\n`;
  text += `_Calcule. Compre. Construa._`;
  return text;
}

export function shareViaWhatsApp(data: ShareDataPayload) {
  const text = generateShareText(data);
  const encoded = encodeURIComponent(text);
  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
}

export async function copyToClipboard(data: ShareDataPayload): Promise<boolean> {
  const text = generateShareText(data);
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Falha ao copiar:', err);
    return false;
  }
}

export async function shareNative(data: ShareDataPayload): Promise<boolean> {
  const text = generateShareText(data);
  if (navigator.share) {
    try {
      await navigator.share({
        title: `CalculaObra — ${data.calculatorName}`,
        text: text,
        url: window.location.href,
      });
      return true;
    } catch (e) {
      // User cancelled or share failed
      return false;
    }
  }
  return false;
}

export function triggerPrint() {
  window.print();
}
