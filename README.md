# 🏗️ ObraCalcula — Calcule. Compre. Construa.

<p align="center">
  <img src="https://img.shields.io/badge/Status-100%25%20Conclu%C3%ADdo-success?style=for-the-badge&logo=checkmarx" alt="Status">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Cloudflare%20Pages-Ready-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Pages">
</p>

<p align="center">
  <b>Plataforma brasileira de calculadoras inteligentes para construção civil e reforma residencial.</b><br>
  Descubra a quantidade exata de materiais para comprar em menos de 30 segundos — sem cadastro, sem enrolação e sem desperdício de dinheiro na obra! 🇧🇷⚡
</p>

---

## 🌟 Destaques & Diferenciais

* 🤖 **Busca Inteligente em Linguagem Natural (IA/NLP)**: Digite como no WhatsApp (*"quantos piso preciso 50m"*, *"tinta para quarto 4x3"*, *"tijolos muro 10x2.8"*) e receba o cálculo na hora!
* 📱 **Mobile-First & Ultra Veloz**: Feito para abrir no canteiro de obras ou no balcão do depósito em < 0.5s.
* 📐 **Precisão de Engenharia (ABNT / SINAPI)**: Fórmulas reais de consumo com margens técnicas de perda por corte e quebra.
* 📲 **Compartilhamento 1-Clique para WhatsApp**: Envie o orçamento formatado para o pedreiro ou vendedor da loja de materiais.
* 💾 **Memória no Navegador (LocalStorage)**: Salva o histórico das suas medições com total privacidade (100% LGPD).
* 🎯 **SEO Agressivo**: Otimizado para ranquear no topo do Google para buscas de *"Quanto Material Comprar"*.
* 💰 **Pronto para Monetização**: Espaços estratégicos para Google AdSense e Links de Afiliados (Leroy Merlin, Mercado Livre, Amazon).

---

## 🧮 As 10 Calculadoras Inclusas

| Ícone | Ferramenta | O que calcula |
| :---: | :--- | :--- |
| 🔲 | **Calculadora de Piso e Azulejo** | Área total, quantidade exata de peças, caixas fechadas, margem de perda e rodapés. |
| 🧱 | **Calculadora de Tijolos e Blocos** | Múltiplas paredes simultâneas com dedução automática de portas e janelas. |
| 🎨 | **Calculadora de Tinta e Pintura** | Paredes + teto, número de demãos, latas de 18L, galões de 3,6L e quartos de 900ml. |
| 🏗️ | **Calculadora de Concreto** | Volume em m³ e traço completo (cimento 50kg, areia e brita) para lajes, vigas e sapatas. |
| 📦 | **Calculadora de Sacos de Cimento** | Quantidade de sacos de 50kg para contrapiso, reboco paulista, assentamento e concreto. |
| 🪣 | **Calculadora de Argamassa Colante** | Sacos de 20kg de AC-I, AC-II e AC-III para colagem simples ou dupla colagem (>30x30cm). |
| 🏠 | **Calculadora de Telhas e Telhado** | Telhas cerâmicas (Romana, Portuguesa, Colonial), fibrocimento e correção de inclinação trigonométrica. |
| 📐 | **Calculadora de Rejunte** | Fórmula oficial dos fabricantes $[(C+L) \times E \times J \times 1.58] / (C \times L)$ em kg e pacotes. |
| 📏 | **Calculadora de Rodapé** | Metros lineares, réguas comerciais de 2,40m e desconto de portas com cortes a 45°. |
| 🧴 | **Calculadora de Massa Corrida** | Massa PVA e Acrílica (barricas de 25kg e baldes) por tipo de superfície e demãos. |

---

## 💻 Tecnologias Utilizadas

* ⚡ **[Vite](https://vitejs.dev/)** — Bundler de altíssima performance.
* ⚛️ **[React 18](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)** — Arquitetura modular, tipada e escalável.
* 🎨 **[Tailwind CSS](https://tailwindcss.com/)** — Design moderno, elegante e responsivo.
* 🛡️ **[Lucide React](https://lucide.dev/)** — Ícones leves e profissionais.
* 🧭 **[React Router DOM v6](https://reactrouter.com/)** — Roteamento SPA com URLs canônicas amigáveis para SEO.
* ☁️ **[Cloudflare Pages](https://pages.cloudflare.com/)** — Deploy contínuo global com latência ultra-baixa no Brasil.

---

## 🚀 Como Rodar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/alefdias/obracalcula.git
cd obracalcula
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Executar o servidor de desenvolvimento
```bash
npm run dev
```
Abra seu navegador em `http://localhost:5173`.

### 4. Gerar build de produção
```bash
npm run build
```

---

## ☁️ Deploy na Cloudflare Pages

O projeto já possui o arquivo `public/_redirects` configurado para roteamento SPA sem erros 404.

1. Acesse o **[Cloudflare Dashboard](https://dash.cloudflare.com/)**
2. Vá em **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
3. Selecione o repositório `alefdias/obracalcula`
4. Preencha as configurações de build:
   * **Framework preset**: `Vite`
   * **Build command**: `npm run build`
   * **Build output directory**: `dist`
5. Clique em **Save and Deploy** 🚀

---

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

<p align="center">
  Feito com ☕ e dedicação por <b>Alef Dias</b> 🇧🇷<br>
  <i>ObraCalcula — Calcule. Compre. Construa.</i>
</p>
