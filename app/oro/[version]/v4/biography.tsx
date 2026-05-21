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
				className="
				w-full md:w-[512px]
				h-[56px]
				flex items-center justify-center gap-[10px]
				font-raleway font-extrabold
				text-white
				rounded-[10px]
				py-[16px]
				text-[12px] md:text-base uppercase tracking-wide
				transition-all hover:brightness-110
				bg-[linear-gradient(88.53deg,_#D10C10_0%,_#9B0609_100%)]
			"
			>
				<span className="">Participar gratuitamente</span>
				<ArrowUpRight size={20} strokeWidth={2.5} />
			</button>
		)
	}
	return (
		<section
			className={`min-h-[2060px] md:h-[1608px] md:min-h-[1608px] flex flex-col items-center p-4 md:p-0 justify-start overflow-hidden bg-[#D3CAC0] bg-[url('/images/oro/v4/biografia_elton_clara_mobile.webp')] md:bg-[url('/images/oro/v4/biografia_elton_clara.webp')] bg-cover bg-top md:bg-center z-0`}		>
			<div className="mx-auto px-4 w-full max-w-[1200px]">
				<div className="pt-[20px] md:pt-[100px] w-full flex flex-col items-end text-right">
					<div className="text-2xl md:text-[45px]/[54px] w-full md:w-[512px] font-bold uppercase text-[#006D71] text-left">
						Que bom que você não desistiu.
					</div>
					<div className="font-raleway text-[#104448] text-base text-left my-8 w-full md:max-w-[512px] md:ml-auto">
						<span className="font-bold">Chega de dar o seu máximo e no fim ficar se questionando o que faltou.</span> {' '}
						Depois desse evento você nunca mais vai se perguntar o que falta para você ter o resultado merecido pelo seu esforço.{' '}
						<p className="mt-4 font-bold">Faça parte do Resgate dos Otimistas</p> ou continue se questionando e justificando o seu "quase sucesso".
					</div>
					<div className="w-full flex md:justify-end justify-center">
						<ButtonParticipate />
					</div>
				</div>

				<div className="flex justify-center md:justify-start mt-[800px] md:mt-[245px] w-full">
					<div className="w-full max-w-[512px] text-[#07242C]">
						<div className="font-spectral text-2xl md:text-[32px] font-bold">
							QUEM VAI SER O SEU MENTOR NESSA JORNADA?
						</div>
						<div className="flex flex-col mt-4 mb-6 text-xl md:text-2xl font-bold">
							<p className="text-[#006D71]">
								Elton Euler
							</p>
							<p className="text-[#006D71]">
								Líder e Idealizador da Aliança Divergente
							</p>
						</div>
						<div className="flex flex-col gap-6 font-extralight font-raleway">
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
