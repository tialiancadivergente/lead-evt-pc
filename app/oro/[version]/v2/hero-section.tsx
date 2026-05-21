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
		<section
			id="hero"
			className={`relative min-h-[860px] md:h-[902px] flex flex-col items-center p-4 pb-12 md:p-0 justify-start md:justify-center overflow-hidden bg-[#D3CAC0] bg-[url('/images/oro/v2/o_resgate_dos_otimistas_white_mobile.webp')] md:bg-[url('/images/oro/v2/o_resgate_dos_otimistas_white.webp')] bg-cover bg-center z-0`}
		>
			<div
				className={`mx-auto sm:px-4 2md:pt-6 pt-2 relative lg:w-[1080px] w-full flex justify-center md:justify-start`}
			>
				<div className="w-full 2md:max-w-[528px] max-w-[440px]">
					<div className="mt-[225px] mb-2 flex justify-center md:justify-start md:hidden">
						<Image
							src="/images/logo-oro-dark.webp"
							alt="Logotipo Resgate dos otimistas"
							width={480}
							height={147}
							priority
							className="object-contain select-none pointer-events-none"
							style={{
								maxWidth: "100%",
								height: "auto",
							}}
						/>
					</div>
					<div
						className={`text-[#fff] font-raleway font-medium text-[14px] flex items-center justify-start sm:gap-8 gap-2 xl:text-2xl sm:text-2xl text-sm`}
					>
						<div className="flex items-center justify-center leading-none gap-2 text-[#07242C] font-raleway font-medium text-xs md:text-[14px]">
							<CalendarDays className="text-[#006D71]" size={18} />
							15, 16 e 17 de Junho - 19h55
						</div>
						<div className="flex items-center justify-center leading-none gap-2 text-[#07242C] font-raleway font-medium text-xs md:text-[14px]">
							<Smartphone className="text-[#006D71]" size={18} />
							Online e Gratuito
						</div>
					</div>
					<div className="mt-4 mb-2 font-bebas-neue text-left">
						<div
							className={`2md:text-[36px] text-2xl leading-none text-left !text-[#07242C] font-spectral font-extrabold`}
						>
							{titleRedLine}
						</div>
					</div>

					<div
						className="mb-4 mt-4 text-[#07242C] 2md:text-2xl text-base font-extralight font-spectral"
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
							emailInputClassName="w-full h-[58px] border border-[#FBFBFB] flex rounded-[8px] flex-1 px-4 py-4 bg-[#FFFFFF26] text-[#07242C] placeholder:text-[#07242C]"
							ddiSelectClassName="py-4 pl-10 h-[58px] pr-2 bg-[#BBAFA2] rounded-l-[8px] border border-[#FBFBFB] border-r-[0px] text-[#07242C] font-medium focus:outline-none"
							phoneInputClassName="w-full !h-[58px] px-4 py-4 rounded-r-[8px] bg-[#FFFFFF26] text-[#07242C] focus:outline-none h-[53px] border border-[#FBFBFB] border-l-[0px] placeholder:text-[#07242C]"
							buttonClassName="w-full h-14 font-raleway font-extrabold text-[#FFFFFF] rounded-[8px] px-6 text-base uppercase tracking-wide transition-all hover:brightness-110 border border-[1px] border-solid border-image-[linear-gradient(180deg,_rgba(51,239,149,0.25)_0%,_#33EF95_100%)] [background:linear-gradient(90deg,_#0B7843_0%,_#00BE62_100%)_padding-box,_linear-gradient(180deg,_rgba(51,239,149,0.25)_0%,_#33EF95_100%)_border-box] shadow-[0px_3px_7px_0px_#4E392759,_0px_12px_12px_0px_#4E39274F,_0px_28px_17px_0px_#4E39272E,_0px_49px_20px_0px_#4E39270D,_0px_77px_22px_0px_#4E392703]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
