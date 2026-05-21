"use client";

import React from "react";
import { Award, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import {
	LeadCaptureForm,
	LeadCaptureSubmitData,
} from "@/app/components/form/lead-capture-form";

interface ContainerTesteProps {
	titleRedLine: React.ReactNode | null,
	redLine: React.ReactNode | null,
	formName: string,
	onSubmit: (data: LeadCaptureSubmitData) => void | Promise<void>;
	submitError?: string | null;
}

export default function ContainerTeste({
	titleRedLine,
	redLine,
	formName,
	onSubmit,
	submitError
}: ContainerTesteProps) {
	return (
		<div>
			<section
				id="hero"
				className={`relative min-h-screen flex flex-col items-center p-4 md:p-0 justify-center overflow-hidden bg-[url('/images/v16/bg.png')] bg-cover bg-center z-0`}
			>
				<div className="absolute lg:top-0 top-[-300px] lg:right-[-50px] right-[-180px] bg-no-repeat block lg:w-[545px] w-[350px]">
					<Image
						src="/images/v16/bg-right-top.png"
						alt="Background top right and left"
						width={545}
						height={1106}
						priority
						className="object-contain"
						style={{
							transformOrigin: "center",
						}}
					/>
				</div>

				<div className="absolute sm:top-28 top-24 xl:right-60 lg:right-[-100px] right-[-30px] lg:w-[680px] sm:w-[400px] w-[280px] bg-no-repeat">
					<Image
						src="/images/v16/Elton-Euler-Resgate-dos-Otimistas-Dependencia-emocional.png"
						alt="DEPENDÃŠNCIA EMOCIONAL"
						width={764}
						height={852}
						className="object-contain"
					/>
				</div>

				<div className="absolute bottom-0 w-full bg-no-repeat md:block hidden">
					<Image
						src="/images/v16/bg-left-bottom.png"
						alt="Background top right and left"
						width={563}
						height={617}
						priority
						className="object-contain"
						style={{
							transformOrigin: "center",
						}}
					/>
				</div>

				<div className="absolute sm:left-0 left-[300px] bottom-0 bg-no-repeat block lg:w-[329px] w-[200px]">
					<Image
						src="/images/v16/bg-bottom-left.png"
						alt="Background top right and left"
						width={329}
						height={364}
						priority
						className="object-contain"
						style={{
							transformOrigin: "center",
						}}
					/>
				</div>

				<div className="absolute top-0 left-0 bg-no-repeat block lg:w-[400px] w-[200px]">
					<Image
						src="/images/v16/bg-left-top.png"
						alt="Background top right and left"
						width={400}
						height={583}
						priority
						className="object-contain"
						style={{
							transformOrigin: "center",
						}}
					/>
				</div>

				<div
					className={`container mx-auto sm:px-4 pt-6 relative lg:w-[1080px] w-auto`}
				>
					<div className="w-full">
						<div className="mb-8 flex justify-start">
							<Image
								src="/images/logo-resgate-dos-otimistas.png"
								alt="Logotipo Resgate dos otimistas"
								width={322}
								height={171}
								priority
								className="object-contain select-none pointer-events-none lg:w-[322px] sm:w-[250px] w-[200px]"
								style={{
									maxWidth: "100%",
									height: "auto",
								}}
							/>
						</div>
						<div className="mt-8 mb-2 font-bebas-neue text-left">
							<div
								className={`text-4xl md:text-5xl max-w-2xl leading-none text-left text-[#f4f0e1]`}
							>
								{titleRedLine}
							</div>
						</div>

						<div
							className="mb-12 sm:mt-0 mt-0 text-[#f4f0e1] lg:text-xl sm:text-[16px] sm:text-[14px]/[20px] text-[12px]/[18px] max-w-[180px] sm:max-w-[200px] lg:max-w-[350px] md:max-w-[350px]"
							style={{ fontFamily: 'Arial, sans-serif' }}
						>
							{redLine ? (
								redLine
							) : (
								<>
									Descubra como{" "}
									<span className="font-bold text-[#C0964B]">
										AUMENTAR O SEU NÃVEL DE PERMISSÃƒO
									</span>{" "}
									e melhorar seus resultados nas finanÃ§as, nos relacionamentos e
									na saÃºde.
								</>
							)}
						</div>
						<LeadCaptureForm
							formName={formName}
							onSubmit={onSubmit}
							submitError={submitError}
							emailInputClassName="w-full flex rounded-none flex-1 px-4 py-4 bg-[#f4f0e1]/90 text-[#07242c]"
							ddiSelectClassName="py-4 pl-10 pr-2 bg-[#f4f0e1]/90 rounded-none text-[#07242c] focus:outline-none"
							phoneInputClassName="w-full px-4 py-4 rounded-none bg-[#f4f0e1]/90 text-[#07242c] focus:outline-none h-[52px]"
							buttonClassName="w-full bg-gradient-to-r from-[#0a6d6d] to-[#0e7c7b] text-[#f4f0e1] py-5 px-6 shadow-md text-base md:text-lg uppercase tracking-wide transition-all hover:brightness-110"
						/>

						<div
							className={`text-[#fff] flex items-center mt-8 justify-start sm:gap-8 gap-2 xl:text-2xl sm:text-2xl text-sm`}
						>
							<div className="flex items-center justify-center leading-none gap-1 text-[#fff]">
								<Award color="#C0964B" size={16} /> 100% GRATUITO
							</div>
							<div className="flex items-center justify-center leading-none gap-1 text-[#fff]">
								<Calendar color="#C0964B" size={16} />
								24, 25 E 26/11
							</div>
							<div className="flex items-center justify-center leading-none gap-1 text-[#fff]">
								<Clock color="#C0964B" size={16} />
								Ã€S 19H55
							</div>
						</div>
					</div>

					<div className="w-full h-full -mt-14 md:mt-6">
						<Image
							src="/images/foto.png"
							alt="Picture"
							width={600}
							height={400}
						/>
					</div>
				</div>
				<footer className="container mb-24 mt-8 sm:px-4 z-10 mx-auto lg:w-[1080px] w-auto">
					<div className="text-left text-[#f4f0e1] text-xs md:text-sm font-serif tracking-wide">
						<div
							className="text-[#f4f0e1]"
							style={{ fontFamily: 'Arial, sans-serif' }}
						>
							© 2026. All rights reserved. Politica de Privacidade.
						</div>
					</div>
				</footer>
			</section>
		</div>
	);
}
