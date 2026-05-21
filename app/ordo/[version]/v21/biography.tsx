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
				className="w-full md:max-w-[347px] flex items-center justify-center h-14 font-raleway font-extrabold cursor-pointer text-[#000] rounded-[40px] px-6 shadow-md text-base uppercase tracking-wide transition-all hover:brightness-110 bg-[linear-gradient(88.53deg,_#16FFA6_35%,_#12ED28_100%)] border-2 border-[#008A13]/50"
			>
				<span>Participar gratuitamente</span>
				<ArrowUpRight />
			</button>
		)
	}

	return (
		<section
			className={`md:min-h-[1815px] md:h-[1815px] flex flex-col items-center p-4 md:p-0 justify-start overflow-hidden bg-[#031B22] bg-[url('/images/v21/bg-elton-euler-mobile.webp')] md:bg-[url('/images/v21/bg-elton-euler.webp')] bg-cover bg-top md:bg-center z-0`}
		>
			<div className="mx-auto sm:px-4 lg:w-[1080px] w-full">
				<div className="mt-8 md:mt-24">
					<div className="text-2xl md:text-3xl font-bold uppercase text-[#C0964B] text-center">
						Que bom que você não desistiu.
					</div>
					<div className="font-raleway text-[#F4F0E1] text-base text-center my-8 max-w-[688px] mx-auto font-extralight">
						<span className="font-bold">Chega de dar o seu máximo e no fim ficar se questionando o que faltou.</span> {' '}
						Depois desse evento você nunca mais vai se perguntar o que falta para você ter o resultado merecido pelo seu esforço.{' '}
						<span className="font-bold">Faça parte do Resgate dos Otimistas</span> ou continue se questionando e justificando o seu "quase sucesso".
					</div>
					<div className="max-w-[347px] mx-auto">
						<ButtonParticipate />
					</div>
				</div>

				<div className="flex justify-center md:justify-end mt-[700px] xs:mt-[800px] 2xs:mt-[850px] sm:mt-[1100px] md:mt-[350px] w-full">
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
			<footer className="container mx-auto sm:px-4 lg:w-[1080px] w-auto my-24 md:mt-56 flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-0">
				<div className="font-normal font-raleway text-[14px] text-white hidden lg:block">
					<p>
						Copyright © O Resgate Dos Otimistas.
					</p>
					<p>
						Todos os direitos reservados.
					</p>
				</div>
				<Image
					src="/images//v21/logo-alianca-divergente.png"
					alt="Logomarca Aliança Divergente"
					width={250}
					height={32}
					priority
					className="object-contain"
				/>
				
				<div className="font-normal font-raleway text-[14px] text-white text-center lg:hidden block">
					<p>
						Copyright © O Resgate Dos Otimistas.
					</p>
					<p>
						Todos os direitos reservados.
					</p>
				</div>
			</footer>
		</section>
	);
}
