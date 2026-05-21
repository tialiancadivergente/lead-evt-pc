"use client";

import React, { useEffect, useState } from "react";
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
	const [countdown, setCountdown] = useState("01:00");

	useEffect(() => {
		let timeLeft = 60; // 1 minuto

		const interval = setInterval(() => {
			timeLeft--;

			if (timeLeft <= 0) {
				clearInterval(interval);
				setCountdown("00:00");
				return;
			}

			const minutes = Math.floor(timeLeft / 60);
			const seconds = timeLeft % 60;

			setCountdown(
				`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
			);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section
			id="hero"
			className={`relative h-[1100px] md:h-[902px] flex flex-col items-center p-4 md:p-0 pt-[50px] md:pt-[69px] justify-start overflow-hidden bg-[#071117] bg-[url('/images/oro/v8/o_resgate_dos_otimistas_cida_elton_mobile.webp')] md:bg-[url('/images/oro/v8/o_resgate_dos_otimistas_cida_elton_desktop.webp')] bg-cover bg-center z-0`}
		>
			<div
				className="
					absolute top-0 left-0 z-20
					w-full h-[45px] md:h-[55px]
					bg-[#A50F13]
					px-[40.37px] md:px-[47.16px]
					py-[9.42px] md:py-[11px]
					flex items-center justify-center
				"
			>
				<div
					className="
						w-[337px] md:w-[394px]
						flex items-center justify-center
						gap-[6px]
						uppercase
						leading-[125%]
					"
					style={{ fontFamily: "Mulish, sans-serif" }}
				>
					<span className="font-extrabold text-[16.15px] md:text-[18.86px] text-[#FFFFFF] whitespace-nowrap">
						Sua vida vai destravar daqui:
					</span>
					<span className="font-extrabold text-[21.28px] md:text-[24.86px] text-[#FFFFFF] whitespace-nowrap">
						{countdown}
					</span>
				</div>
			</div>

			<div
				className={`mx-auto md:ml-[180px] md:mr-auto sm:px-4 2md:pt-6 -mt-4 md:-mt-[60px] relative lg:w-[1080px] w-full flex justify-center md:justify-start`}
			>
				<div className="w-full 2md:max-w-[580px] max-w-[440px]">
					<div className="mt-[10px] md:mt-[30px] flex justify-center md:justify-start">
						<Image
							src="/images/oro/v5/logo_resgate_dos_otimistas.png"
							alt="Logo Resgate dos Otimistas"
							width={424}
							height={164}
							priority
							className="object-contain w-[280px] md:w-[424px] h-auto select-none pointer-events-none"
						/>
					</div>
					<div
						className={`text-[#fff] font-raleway font-medium text-[14px] flex items-center mt-2 md:-mt-4 justify-start sm:gap-8 gap-2 xl:text-2xl sm:text-2xl text-sm`}
					>
						<div className="flex items-center justify-center leading-none gap-2 text-[#F4F0E1] font-raleway font-medium text-xs md:text-[14px]">
							<CalendarDays className="text-[#C0964B]" size={18} />
							16, 17 e 18/03 | Às 19h55
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
							emailInputClassName="w-full h-[58px] border border-[#D9D3BA] flex rounded-[200px] flex-1 px-4 py-4 bg-[#F4F0E11A] placeholder:text-[#F4F0E1] text-[#F4F0E1] font-raleway font-medium text-[16px]"
							ddiSelectClassName="h-[58px] py-4 pl-10 pr-2 bg-[#F4F0E11A] rounded-l-[200px] border border-[#D9D3BA] border-r-[0px] text-[#F4F0E1] font-raleway font-medium text-[16px] focus:outline-none"
							phoneInputClassName="w-full !h-[58px] px-4 py-4 rounded-r-[200px] bg-[#F4F0E11A] placeholder:text-[#F4F0E1] text-[#F4F0E1] font-raleway font-medium text-[16px] focus:outline-none border border-[#D9D3BA] border-l-[0px]"
							buttonClassName="w-full h-14 font-raleway font-extrabold text-[#000000] rounded-[50px] px-6 text-base uppercase tracking-wide transition-all hover:brightness-110 border-2 border-transparent [background:linear-gradient(88.53deg,_#FFD17E_0%,_#B37E21_100%)_padding-box,_linear-gradient(180deg,_#FFDA99_0%,_#AD7512_100%)_border-box] shadow-[0px_6px_13px_0px_rgba(179,126,33,0.25)]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}