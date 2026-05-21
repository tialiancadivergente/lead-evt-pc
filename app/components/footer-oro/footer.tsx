import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoVariant = "default" | "dark";

type FooterLdiProps = {
  className?: string;
  darkTheme?: boolean;
  logoVariant?: LogoVariant;
};

const LOGO_BY_VARIANT: Record<LogoVariant, string> = {
  default: "/images/logo.png",
  dark: "/images/v5/LOGO OLDI.png",
};

export default function FooterOro({
  className,
  darkTheme = false,
  logoVariant = "default",
}: FooterLdiProps) {
  const textColorClass = darkTheme ? "text-[#0A3740]" : "text-white";
  const logoSrc = LOGO_BY_VARIANT[logoVariant];

  return (
    <div className={cn("w-full bg-custom-background pb-6", className)}>
      <footer
        className="
          container mx-auto
          flex md:flex-row flex-col
          items-center justify-between
          gap-6 w-full md:gap-2
        "
      >
        <div
          className={cn(
            "text-[14px] text-center md:text-left leading-[135%] font-mulish hidden md:block",
            textColorClass
          )}
        >
          Copyright © O Levante dos Improváveis. <br />
          Todos os direitos reservados.
        </div>

        <Image src={logoSrc} alt="Risk" width={250} height={32} />

        <div
          className={cn(
            "text-[14px] text-center md:text-left leading-[135%] font-mulish block md:hidden",
            textColorClass
          )}
        >
          Copyright © O Levante dos Improváveis. <br />
          Todos os direitos reservados.
        </div>

        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-2">
            <Link
              href="https://www.oresgatedosotimistas.com.br/politica-de-privacidade"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-[14px] text-center md:text-left leading-[135%] font-mulish transition-colors duration-200 hover:text-[#C0964B]",
                textColorClass
              )}
            >
              Política de privacidade
            </Link>

            <span
              className={cn(
                "text-[14px] text-center md:text-left leading-[135%] font-mulish",
                textColorClass
              )}
            >
              |
            </span>

            <Link
              href="https://www.oresgatedosotimistas.com.br/termos-de-uso"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-[14px] text-center md:text-left leading-[135%] font-mulish transition-colors duration-200 hover:text-[#C0964B]",
                textColorClass
              )}
            >
              Termos de uso
            </Link>
          </div>

          <p
            className={cn(
              "text-[12px] text-center md:text-left leading-[135%] font-mulish",
              textColorClass
            )}
          >
            ALIANCA DIVERGENTE LTDA - CNPJ: 59.301.463.0001-36
            <br />
          </p>
        </div>
      </footer>

      <div className="container mx-auto w-full mt-6 md:mt-8 px-4 md:px-0">
        <p
          className={cn(
            "font-mulish font-bold text-[14px] text-center md:text-left leading-[135%] mb-2",
            textColorClass
          )}
        >
          AVISO LEGAL:
        </p>

        <p
          className={cn(
            "font-mulish text-[14px] text-center md:text-left leading-[135%]",
            textColorClass
          )}
        >
          Os resultados podem variar de pessoa para pessoa. Este método tem
          caráter educacional e de desenvolvimento pessoal, não garantindo
          ganhos financeiros imediatos ou específicos. O sucesso depende da
          aplicação prática de cada participante. Este site não é afiliado,
          endossado ou patrocinado pelo Google ou Meta.
        </p>
      </div>
    </div>
  );
}