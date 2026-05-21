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
      Faça seu diagnóstico
      <br />
      <span className="text-[#C0964B]">
        de dependência
      </span>
      <br />
      <span className="text-[#C0964B]">
        emocional
      </span>{" "}
      gratuito
    </p>
  ),
  text: (
    <p>
      Descubra exatamente os padrões invisíveis que travam o <span className="uppercase font-bold">seu crescimento financeiro</span> e aprenda como superá-los com clareza e direção.
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
        Descubra exatamente os padrões invisíveis que travam o <span className="uppercase font-bold">seu crescimento financeiro</span>    e aprenda como superá-los com clareza e direção.
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
        Descubra exatamente os padrões invisíveis que travam o <span className="uppercase font-bold">seu crescimento financeiro</span>    e aprenda como superá-los com clareza e direção.
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