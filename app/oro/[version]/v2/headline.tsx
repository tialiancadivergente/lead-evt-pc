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
        className="uppercase font-spectral text-[#07242C] font-extrabold"
      >
        Faça seu diagnóstico de <span className="text-[#006D71]">dependência emocional</span> gratuito
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
        className="uppercase font-spectral text-[#07242C] font-extrabold"
      >
        Você está vivendo tudo <span className="text-[#006D71]">o que poderia viver?</span>
      </p>
    ),
    text: (
      <p>
        Participe de uma imersão prática <span className="uppercase font-bold">focada em desenvolvimento pessoal</span> para quem sente que pode viver mais e quer clareza, direção e evolução real na carreira, nos relacionamentos e nas decisões da vida.
      </p>
    ),
  },

    {
    id: "h2",
    isPicture: false,
    isLogo: true,
    title: (
      <p
        className="uppercase font-spectral text-[#07242C] font-extrabold"
      >
        Você não está atrasado<br />
        <span className="text-[#006D71]">Está emocionalmente preso.</span>
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
        className="uppercase font-spectral text-[#07242C] font-extrabold"
      >
        Tem gente menos preparada vivendo melhor que você.<br />
        <span className="text-[#006D71]">E isso não é injustiça.</span>
      </p>
    ),
    text: (
      <p>
        Identifique o bloqueio invisível que <span className="uppercase font-bold">impede sua evolução e o seu sucesso financeiro</span> e descubra como destravá-lo.
      </p>
    ),
  },
];
