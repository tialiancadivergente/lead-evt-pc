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
				<span>QUERO ME INSCREVER</span>
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
						<p>
							O Resgate dos Otimistas é um treinamento online voltado para desenvolvimento pessoal, clareza emocional e tomada de decisão.
						</p>

						<p className="font-bold mt-4">
							Ao longo do conteúdo, você terá acesso a reflexões, exercícios e estratégias para compreender melhor padrões de comportamento, organização da vida pessoal e construção de hábitos mais conscientes.
						</p>

						<p className="mt-4">
							Uma experiência criada para pessoas que desejam evoluir com mais direção, responsabilidade e clareza sobre a própria trajetória.
						</p>
					</div>

					<div className="max-w-[347px] mx-auto">
						<ButtonParticipate />
					</div>

				</div>

				<div className="flex justify-center md:justify-end mt-[620px] xs:mt-[670px] 2xs:mt-[720px] sm:mt-[920px] md:mt-[330px] w-full">
					<div className="w-full max-w-[512px] text-[#D3CAC0]">
						<div className="font-spectral text-2xl md:text-[32px] font-bold">
							QUEM VAI TE GUIAR NESSA JORNADA?
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
								Elton Euler é empresário, mentor e estudioso do desenvolvimento humano, com anos de experiência ajudando pessoas a desenvolverem mais clareza sobre comportamento, decisões e crescimento pessoal.
							</p>

							<p>
								Ao longo da própria trajetória, enfrentou desafios financeiros e profissionais que o levaram a buscar novos caminhos, hábitos e formas de enxergar a vida.
							</p>

							<p>
								A partir dessa experiência, desenvolveu uma metodologia voltada para autoconhecimento, responsabilidade pessoal e construção de uma vida mais equilibrada em diferentes áreas.
							</p>

							<p>
								Nesta jornada, Elton vai compartilhar reflexões, ferramentas e estratégias que podem ajudar você a enxergar padrões, ampliar sua percepção e tomar decisões com mais consciência.
							</p>

							<p className="font-bold">
								Você está pronto para dar esse próximo passo?
							</p>

							<ButtonParticipate />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}