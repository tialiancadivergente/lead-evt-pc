"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function TypeformIframe() {
	const searchParams = useSearchParams();

	const iframeSrc = useMemo(() => {
		const typeformUrl = new URL("https://aliancadivergentead.typeform.com/to/ctOpWA5Y");
		const queryString = searchParams.toString();

		if (queryString) {
			typeformUrl.search = queryString;
		}

		return typeformUrl.toString();
	}, [searchParams]);

	return (
		<iframe
			src={iframeSrc}
			title="Ficha de Interesse - ORO"
			className="min-h-screen h-full w-full border-0"
			allow="camera; microphone; autoplay; encrypted-media;"
			allowFullScreen
		/>
	);
}

export default function Application() {

	return (
		<div className="min-h-screen w-full bg-[#01251e]">
			<Suspense fallback={<div className="min-h-screen h-full w-full" />}>
				<TypeformIframe />
			</Suspense>
			<footer className="w-full bg-[#02201a]" aria-label="Rodapé principal">
				<div className="w-full max-w-[1024px] mx-auto flex flex-col md:flex-row justify-between items-center p-4 text-white/50 text-sm font-mulish">
					<p className="mb-2 md:mb-0 text-center md:text-left" tabIndex={0}>
						Este site não é afiliado ao Google. Os resultados podem variar.
					</p>
					<div className="flex w-full md:w-auto justify-between md:justify-normal items-center md:flex-row flex-col gap-2 md:gap-0">
						<nav aria-label="links legais" className="flex flex-col md:text-right text-center">
							<Link
								href="https://crm.imperio55.com.br/_assets/editora/politica/alianca_divergente_politicas_de_privacidade.pdf"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Política de Privacidade (abre em nova aba)"
							>
								Política de Privacidade
							</Link>
							<Link
								href="https://crm.imperio55.com.br/_assets/editora/politica/alianca_divergente_politicas_de_privacidade.pdf"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Termos de Uso (abre em nova aba)"
							>
								Termos de Uso
							</Link>
						</nav>
						<div
							className="hidden md:block w-px h-8 mx-4 border border-white/10"
							role="separator"
							aria-orientation="vertical"
						/>
						<address className="md:text-left text-center not-italic" aria-label="Informação da empresa">
							<span>⁠Editora Aliança Divergente LTDA</span>
							<br />
							<span>CNPJ: 48.424.807/0001-88</span>
						</address>
					</div>
				</div>
			</footer>
		</div>
	);
}
