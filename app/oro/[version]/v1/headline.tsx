import type { ReactNode } from "react";

interface IHeadline {
  id: number | string;
  isPicture: boolean;
  isLogo: boolean;
  title: ReactNode;
  text: ReactNode;
}

export const Headline: IHeadline[] = [
  {
    id: "h0",
    isPicture: false,
    isLogo: true,
    title: (
      <p
        className="uppercase font-spectral text-[#D3CAC0] font-extrabold"
      >
        Faça seu diagnóstico de <span className="text-[#C0964B]">dependência emocional</span> gratuito
      </p>
    ),
    text: (
      <p>
        Descubra como <span className="uppercase font-bold">aumentar o seu nível de permissão</span> e melhorar seus resultados nas finanças, nos relacionamentos e na saúde.
      </p>
    ),
  },
  {
    id: "h1",
    isPicture: false,
    isLogo: true,
    title: (
      <p
        className="uppercase font-spectral text-[#D3CAC0] font-extrabold"
      >
        Você já percebeu que sempre fica no “quase”?<br />
        <span className="text-[#C0964B]">Quase cresce. Quase prospera. Quase dá certo.</span>
      </p>
    ),
    text: (
      <p>
        Descubra quais <span className="uppercase font-bold">bloqueios invisíveis</span> te puxam de volta toda vez em um diagnóstico gratuito.
      </p>
    ),
  },

    {
    id: "h2",
    isPicture: false,
    isLogo: true,
    title: (
      <p
        className="uppercase font-spectral text-[#D3CAC0] font-extrabold"
      >
        Você não está atrasado<br />
        <span className="text-[#C0964B]">Está emocionalmente preso.</span>
      </p>
    ),
    text: (
      <p>
        Descubra o bloqueio invisível <span className="uppercase font-bold">bloqueio invisível</span> que está limitando seus resultados pessoais e financeiros em um diagnóstico gratuito e personalizado.
      </p>
    ),
  },
  {
    id: "h3",
    isPicture: false,
    isLogo: true,
    title: (
      <p
        className="uppercase font-spectral text-[#D3CAC0] font-extrabold"
      >
        Tem gente menos preparada vivendo melhor que você.<br />
        <span className="text-[#C0964B]">E isso não é injustiça.</span>
      </p>
    ),
    text: (
      <p>
        Identifique o bloqueio invisível que <span className="uppercase font-bold">impede sua evolução e o seu sucesso financeiro</span> e descubra como destravá-lo.
      </p>
    ),
  },
];