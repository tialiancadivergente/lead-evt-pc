"use client";

import { Button } from "@/components/ui/button";
import { handleScroll } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Biography() {

	const ButtonParticipate = () => {
		return (
			<button
				onClick={handleScroll}
				className="h-16 font-raleway font-extrabold text-[#FFFFFF] rounded-[8px] px-12 pt-4 pb-4 text-base uppercase tracking-wide transition-all hover:brightness-110 border border-solid border-image-[linear-gradient(180deg,_rgba(51,239,149,0.25)_0%,_#33EF95_100%)] [background:linear-gradient(90deg,_#0B7843_0%,_#00BE62_100%)_padding-box,_linear-gradient(180deg,_rgba(51,239,149,0.25)_0%,_#33EF95_100%)_border-box] shadow-[0px_3px_7px_0px_#4E392759,_0px_12px_12px_0px_#4E39274F,_0px_28px_17px_0px_#4E39272E,_0px_49px_20px_0px_#4E39270D,_0px_77px_22px_0px_#4E392703] gap-[10px] flex items-center justify-center"
			>
				<span>Participar gratuitamente</span>
			</button>
		)
	}

	return (
		<section
			className={`md:min-h-[1670px] md:h-[1670px] flex flex-col items-center pb-14 p-4 md:p-0 justify-start overflow-hidden bg-[#031B22] bg-[url('/images/oro/v2/biografia_elton_white_mobile.webp')] md:bg-[url('/images/oro/v2/biografia_elton_white.webp')] bg-cover bg-top md:bg-center z-0`}
		>
			<div className="mx-auto sm:px-4 lg:w-[1080px] w-full">
				<div className="mt-[220px] md:mt-24">
					<div className="text-2xl md:text-3xl font-bold uppercase text-[#006D71] text-left md:text-center">
						Que bom que você não desistiu.
					</div>
					<div className="font-mulish text-[#07242C] text-base text-left md:text-center my-8 max-w-[688px] mx-auto font-extralight">
						<span className="font-bold">Chega de dar o seu máximo e no fim ficar se questionando o que faltou.</span> {' '}
						<span className="font-">Depois desse evento você nunca mais vai se perguntar o que falta para você ter o resultado merecido pelo seu esforço.</span>{' '}
						<span className="font-bold">Faça parte do Resgate dos Otimistas</span> ou continue se questionando e justificando o seu "quase sucesso".
					</div>
					<div className="max-w-[347px] mx-auto">
						<ButtonParticipate />
					</div>
				</div>

				<div className="flex justify-center md:justify-end mt-[400px] xs:mt-[800px] 2xs:mt-[850px] sm:mt-[1100px] md:mt-[535px] w-full">
					<div className="w-full max-w-[512px] text-[#07242C]">
						<div className="font-spectral text-2xl md:text-[32px] font-bold">
							QUEM VAI SER O SEU MENTOR NESSA JORNADA?
						</div>
						<div className="flex flex-col mt-4 mb-6 text-xl md:text-2xl font-bold">
							<p className="text-[#006D71]">
								Elton Euler
							</p>
							<p className="text-[#07242C]">
								Líder e Idealizador da Aliança Divergente
							</p>
						</div>
						<div className="flex flex-col gap-6 font-regular font-raleway">
							<p>
								Elton Euler é um dos maiores exemplos de superação e transformação da atualidade
							</p>
							<p>
								Antes de se tornar multimilionário e referência no desenvolvimento humano, quebrou 17 vezes e chegou a acreditar que o sucesso não era para ele.
							</p>
							<p>
								Decidido a mudar sua história, Elton descobriu o que realmente bloqueava seus resultados e, em menos de 3 anos, saiu das dívidas e construiu uma vida de prosperidade.
							</p>
							<p>
								Hoje, já apoiou mais de 100 mil pessoas em 40 países a destravarem suas vidas financeiras, relacionais, emocionais e sua saúde com técnicas práticas e poderosas.
							</p>
							<p>
								Agora, ele vai te mostrar o que está faltando para você desbloquear sua Permissão e elevar sua vida a um novo patamar.
							</p>
							<p className="font-bold">
								Você está pronto para descobrir?
							</p>
							<ButtonParticipate />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
