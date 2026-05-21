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
			className={`relative h-[894px] md:h-[902px] flex flex-col items-center p-4 md:p-0 justify-start md:justify-center overflow-hidden bg-[#071117] bg-[url('/images/oro/v1/o_resgate_dos_otimistas_mobile.webp')] md:bg-[url('/images/oro/v1/o_resgate_dos_otimistas.webp')] bg-cover bg-center z-0`}
		>
			<div
				className={`mx-auto sm:px-4 2md:pt-6 pt-2 relative lg:w-[1080px] w-full flex justify-center md:justify-start`}
			>
				<div className="w-full 2md:max-w-[528px] max-w-[440px]">
					<div className="mt-[235px] mb-8 flex justify-center md:justify-start md:hidden">
						<Image
							src="/images/v21/logo_o_resgate_dos_otimistas.webp"
							alt="Logotipo Resgate dos otimistas"
							width={480}
							height={186}
							priority
							className="object-contain select-none pointer-events-none"
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
							className={`2md:text-[36px] text-2xl leading-none text-left text-[#f4f0e1] font-spectral font-extrabold`}
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
							emailInputClassName="w-full h-[58px] border border-[#6F6F6F] flex rounded-[8px] flex-1 px-4 py-4 bg-[#FFFFFF0A] text-[#F4F0E1]"
							ddiSelectClassName="h-[58px] py-4 pl-10 pr-2 bg-[#D9CFC31A] rounded-l-[8px] border border-[#6F6F6F] border-r-[0px] text-[#F4F0E1] focus:outline-none"
							phoneInputClassName="w-full !h-[58px] px-4 py-4 rounded-r-[8px] bg-[#FFFFFF0A] text-[#F4F0E1] focus:outline-none h-[53px] border border-[#6F6F6F] border-l-[0px]"
							buttonClassName="w-full h-14 font-raleway font-extrabold text-[#FFFFFF] rounded-[8px] px-6 text-base uppercase tracking-wide transition-all hover:brightness-110 border border-solid border-transparent [background:linear-gradient(90deg,_#6F0B08_0%,_#E82223_100%)_padding-box,_linear-gradient(180deg,_rgba(255,98,99,0.25)_0%,_#FF6263_100%)_border-box] shadow-[0px_6px_13px_0px_#CC1C1C33,_0px_23px_23px_0px_#CC1C1C2B,_0px_52px_31px_0px_#CC1C1C1A,_0px_93px_37px_0px_#CC1C1C08,_0px_145px_41px_0px_#CC1C1C00]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
