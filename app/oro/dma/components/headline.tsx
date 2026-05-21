import type { ReactNode } from "react";

interface IHeadline {
  id: number | string;
  isPicture: boolean;
  isLogo: boolean;
  title: ReactNode;
  text: ReactNode | null;
}

export const Headline: IHeadline[] = [
  {
    id: "h0",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="uppercase font-spectral text-[#07242C] font-extrabold">
        Você quer entender como <span className="text-[#006D71]">evoluir seu desenvolvimento pessoal</span> e ter mais clareza e direção na sua vida
      </p>
    ),
    text: null,
  },
];