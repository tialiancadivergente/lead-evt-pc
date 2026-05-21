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
				className="w-full h-14 font-raleway font-extrabold text-[#000000] rounded-[50px] px-6 text-base uppercase tracking-wide transition-all hover:brightness-105 border-2 border-transparent [background:linear-gradient(90deg,_#90FF9F_0%,_#008A13_100%)_padding-box,_linear-gradient(180deg,_#90FF9F_0%,_#008A13_100%)_border-box] flex items-center justify-center gap-2"
			>
				<span>Participar gratuitamente</span>
				<ArrowUpRight size={18} strokeWidth={2.5} />
			</button>
		)
	}

	return (
		<section
			className={`md:min-h-[1606px] md:h-[1606px] flex flex-col items-center pb-14 p-4 md:p-0 justify-start overflow-hidden bg-[#031B22] bg-[url('/images/oro/v5/biografia_elton_mobile.webp')] md:bg-[url('/images/oro/v5/biografia_elton_desktop.webp')] bg-cover bg-top md:bg-center z-0`}
		>
			<div className="mx-auto sm:px-4 lg:w-[1080px] w-full">
				<div className="mt-7 md:mt-24 text-center md:text-left">

					<div className="text-2xl md:text-3xl font-bold uppercase text-[#C0964B] md:text-center">
						Que bom que você não desistiu.
					</div>

					<div className="font-raleway text-[#F4F0E1] text-[16px] md:text-[20px] my-8 max-w-[688px] mx-auto font-extralight md:text-center leading-relaxed">
						<span className="font-bold">
							Chega de dar o seu máximo e só ficar se perguntando o que faltou.
						</span>{' '}
						<span className="font-normal">
							Pare de cometer o erro de sempre se perguntar
						</span>{' '}
						<span className="font-bold">
							o que falta para você ter o resultado
						</span>{' '}
						<span className="font-normal">
							que o seu esforço realmente merece.
						</span>
					</div>

					<div className="max-w-[347px] mx-auto">
						<ButtonParticipate />
					</div>

				</div>

				<div className="flex justify-center md:justify-end mt-[800px] xs:mt-[850px] 2xs:mt-[900px] sm:mt-[1150px] md:mt-[535px] w-full">
					<div className="w-full max-w-[512px] text-[#D3CAC0]">
						<div className="font-spectral text-2xl md:text-[32px] font-bold">
							QUEM VAI SER O SEU MENTOR NESSA JORNADA?
						</div>

						<div className="flex flex-col mt-4 mb-6 text-xl md:text-2xl font-bold">
							<p className="text-[#C0964B]">
								Elton Euler
							</p>
							<p className="text-[#F4F0E1]">
								Líder e Idealizador da Aliança Divergente
							</p>
						</div>

						<div className="flex flex-col gap-6 font-extralight font-raleway">
							<p>
								Elton Euler é um dos maiores exemplos de superação e transformação da atualidade.
							</p>

							<p>
								Antes de se tornar multimilionário e referência no desenvolvimento humano, quebrou 17 vezes e chegou a acreditar que sua vida não tinha mais solução.
							</p>

							<p>
								Decidido a mudar sua história, Elton descobriu o que realmente bloqueava seus resultados e, em menos de 3 anos, saiu das dívidas e construiu uma vida de prosperidade.
							</p>

							<p>
								Hoje, já ajudou mais de 160 mil pessoas em 60 países a destravarem suas vidas financeiras, suas carreiras e suas relações emocionais com técnicas práticas e poderosas.
							</p>

							<p>
								Agora, ele vai te mostrar o que está faltando para você desbloquer sua Permissão e elevar sua vida a um novo patamar.
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