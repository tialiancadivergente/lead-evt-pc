"use client";

import React from "react";
import { CalendarDays, Smartphone } from "lucide-react";
import Image from "next/image";
import {
	LeadCaptureForm,
	LeadCaptureSubmitData,
} from "@/app/components/form/lead-capture-form";

interface ContainerProps {
	titleRedLine: React.ReactNode | null,
	redLine: React.ReactNode | null,
	formName: string,
	onSubmit: (data: LeadCaptureSubmitData) => void | Promise<void>;
	submitError?: string | null;
}

export default function HeroSection({
	titleRedLine,
	redLine,
	formName,
	onSubmit,
	submitError
}: ContainerProps) {
	return (
		<div>
			<section
				id="hero"
				className={`relative h-[1100px] md:h-[902px] flex flex-col items-center p-4 md:p-0 justify-start md:justify-center overflow-hidden bg-[url('/images/v21/bg-mobile.webp')] md:bg-[url('/images/v21/bg.webp')] bg-cover bg-center z-0`}
			>
				<div
					className={`mx-auto sm:px-4 2md:pt-6 pt-2 relative lg:w-[1080px] w-full flex justify-center md:justify-start`}
				>
					<div className="w-full 2md:max-w-[528px] max-w-[440px]">
						<div className="mb-8 flex justify-center md:justify-start">
							<Image
								src="/images/v21/logo_o_resgate_dos_otimistas.webp"
								alt="Logotipo Resgate dos otimistas"
								width={424}
								height={164}
								priority
								className="object-contain select-none pointer-events-none 2md:w-[424px] w-[348px]"
								style={{
									maxWidth: "100%",
									height: "auto",
								}}
							/>
						</div>
						<div
							className={`text-[#fff] font-raleway font-medium text-[14px] flex items-center mt-8 justify-start sm:gap-8 gap-2 xl:text-2xl sm:text-2xl text-sm`}
						>
							<div className="flex items-center justify-center leading-none gap-2 text-[#F4F0E1] font-raleway font-medium text-xs md:text-[14px]">
								<CalendarDays className="text-[#C0964B]" size={18} />
								16, 17 e 18/03 - 19h55
							</div>
							<div className="flex items-center justify-center leading-none gap-2 text-[#F4F0E1] font-raleway font-medium text-xs md:text-[14px]">
								<Smartphone className="text-[#C0964B]" size={18} />
								Online e Gratuito
							</div>
						</div>
						<div className="mt-6 mb-2 font-bebas-neue text-left">
							<div
								className={`2md:text-[40px] text-2xl leading-none text-left text-[#f4f0e1] font-spectral font-extrabold`}
							>
								{titleRedLine}
							</div>
						</div>

						<div
							className="mb-8 mt-4 text-[#D3CAC0] 2md:text-2xl text-base font-extralight font-spectral"
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
						<div className="max-w-lg">
							<LeadCaptureForm
								formName={formName}
								onSubmit={onSubmit}
								submitError={submitError}
								emailInputClassName="w-full border border-[#D9D3BA] flex rounded-[200px] flex-1 px-4 py-4 bg-[#F4F0E1]/10 text-[#F4F0E1]"
								ddiSelectClassName="py-4 pl-10 pr-2 bg-[#FFFFFF]/20 rounded-l-[200px] border border-[#D9D3BA] border-r-[0px] text-[#F4F0E1] focus:outline-none"
								phoneInputClassName="w-full px-4 py-4 rounded-r-[200px] bg-[#F4F0E1]/10 text-[#F4F0E1] focus:outline-none h-[53px] border border-[#D9D3BA] border-l-[0px]"
								buttonClassName="w-full h-14 font-raleway font-extrabold text-[#000] rounded-[40px] px-6 shadow-md text-base uppercase tracking-wide transition-all hover:brightness-110 bg-[linear-gradient(88.53deg,_#FFD17E_0%,_#B37E21_100%)] border-none"
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
