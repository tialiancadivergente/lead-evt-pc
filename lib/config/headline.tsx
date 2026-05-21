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
    id: "h2",
    isPicture: false,
    isLogo: true,
    title: (
      <p
        className={`text-3xl md:text-4xl uppercase font-bold mx-auto leading-10 md:-leading-10 `}
      >
        Pare de assistir pessoas que sabem menos do que você ganharem mais
      </p>
    ),
    text: (
      <p className={`text-2xl md:text-xl md:uppercase capitalize text-center`}>
        Você não está ficando para trás por falta de conhecimento ou de força de
        vontade,{" "}
        <span className="text-[#c0964b]">
          você está ficando para trás por falta de permissão.
        </span>
      </p>
    ),
  },
  {
    id: 2,
    isPicture: false,
    isLogo: true,
    title: (
      <p
        className={`text-3x max-w-xl md:text-4xl uppercase font-bold mx-auto leading-10 md:-leading-10 `}
      >
        Tem gente que estudou menos que você e ganhando bem mais
      </p>
    ),
    text: (
      <p className={`text-2xl md:text-2xl max-w-sm mx-auto text-center`}>
        E esse ciclo se repete pela sua falta de permissão
      </p>
    ),
  },
  {
    id: 3,
    isPicture: true,
    isLogo: true,
    title: (
      <p
        className={`text-3x max-w-lg md:text-4xl uppercase font-bold mx-auto leading-10 md:-leading-10 text-center md:text-left`}
      >
        Essa advogada saiu de R$3 mil para R$85 mil em menos de 60 dias
      </p>
    ),
    text: (
      <p
        className={`text-2xl md:text-2xl max-w-lg mx-auto text-center md:text-left`}
      >
        Destrave o seu teto financeiro eliminando o seu bloqueio e permissão.
        Capacidade e força de vontade você já tem.
      </p>
    ),
  },
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
        className={`max-w-xl uppercase font-bold leading-10 md:-leading-10 `}
      >
        Tem gente que estudou menos que você e ganhando bem mais
      </p>
    ),
    text: (
      <p className={`text-2xl md:text-2xl max-w-sm text-left`}>
        E esse ciclo se repete pela sua falta de permissão
      </p>
    ),
  },
];
