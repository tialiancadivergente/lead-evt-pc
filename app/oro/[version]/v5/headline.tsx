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
    id: "h1",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="uppercase font-spectral text-[#D3CAC0] font-extrabold">
        Entenda como emoções,
        <br />
        <span className="text-[#C0964B]">
          hábitos e comportamentos
        </span>
        <br />
        influenciam suas decisões
        <br />
        do dia a dia e os seus
        <br />
        resultados.
      </p>
    ),
    text: (
      <p>
        Descubra exatamente os padrões invisíveis que travam o{" "}
        <span className="uppercase font-bold">seu crescimento financeiro</span>{" "}
        e aprenda como superá-los com clareza e direção.
      </p>
    ),
  },
  {
    id: "h2",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="uppercase font-spectral text-[#D3CAC0] font-extrabold">
        Participe{" "}
        <span className="text-[#C0964B]">gratuitamente</span>
        <br />
        de uma experiência online
        <br />
        voltada para autoconhecimento,
        <br />
        clareza pessoal e desenvolvimento
        <br />
        humano.
      </p>
    ),
    text: (
      <p>
        Descubra exatamente os padrões invisíveis que travam o{" "}
        <span className="uppercase font-bold">seu crescimento financeiro</span>{" "}
        e aprenda como superá-los com clareza e direção.
      </p>
    ),
  },
];