"use client";

import React from "react";
import { CalendarDays, Smartphone, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import {
	LeadCaptureForm,
	LeadCaptureSubmitData,
} from "./lead-capture-form";

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
		<section
			id="hero"
			className={`relative h-[1171px] md:h-[901px] flex flex-col items-center p-4 md:p-0 justify-start md:justify-center overflow-hidden bg-[#071117] bg-[url('/images/oro/v3/o_resgate_dos_otimistas_mobile.webp')] md:bg-[url('/images/oro/v3/o_resgate_dos_otimistas.webp')] bg-cover bg-top md:bg-center z-0`}		>
			<div
				className={`mx-auto sm:px-4 2md:pt-6 pt-2 relative lg:w-[1080px] w-full flex justify-center md:justify-start`}
			>
				<div className="w-full 2md:max-w-[528px] max-w-[440px] pt-48 2md:pt-32">
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
					<div className="md:mt-6 mt-3 mb-2 font-bebas-neue text-left">
						<div
							className={`2md:text-[40px] text-2xl leading-none text-left text-[#f4f0e1] font-spectral font-extrabold`}
						>
							{titleRedLine}
						</div>
					</div>

					<div
						className="md:mb-8 mb-4 mt-4 text-[#D3CAC0] 2md:text-2xl text-base font-extralight font-spectral"
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
							submitLabel={
								<span className="inline-flex items-center gap-2">
									PARTICIPAR GRATUITAMENTE
									<ArrowUpRight size={18} />
								</span>
							}
							emailInputClassName="w-full h-[48px] md:h-[58px] border border-[#F4F0E11A] flex rounded-[10px] flex-1 px-4 py-4 bg-[#F4F0E11A] text-[#F4F0E1] focus:text-[#F4F0E1] placeholder:text-[#F4F0E1] focus:placeholder:text-[#F4F0E1]"
							ddiSelectClassName="h-[48px] md:h-[58px] py-4 pl-10 pr-2 bg-[#FFFFFF33] rounded-l-[10px] border border-[#FFFFFF33] border-r-[0px] text-[#F4F0E1] focus:outline-none"
							phoneInputClassName="w-full !h-[48px] md:!h-[58px] px-4 py-4 rounded-r-[10px] bg-[#F4F0E11A] text-[#F4F0E1] focus:text-[#F4F0E1] placeholder:text-[#F4F0E1] focus:placeholder:text-[#F4F0E1] focus:outline-none border border-[#F4F0E11A] border-l-[0px]"
							buttonClassName="w-full max-w-[512px] h-[46px] md:h-[56px] flex items-center justify-center gap-2 whitespace-nowrap font-raleway font-extrabold text-[#FFFFFF] rounded-[10px] px-[48px] py-[16px] text-base uppercase tracking-wide transition-all hover:brightness-110 border border-transparent bg-[linear-gradient(88.53deg,_#D10C10_0%,_#9B0609_100%)] shadow-[0px_6px_13px_0px_#00000033]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
