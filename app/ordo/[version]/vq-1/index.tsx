"use client";

import React from "react";
import { useState, useEffect } from "react";
import { LoaderCircle, MoveUpRight, Phone } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { getTagIdByTemperature } from "@/lib/temperature-utils";

export default function QuizV1({ theme = "2" }: { theme?: string }) {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [temperatura, setTemperatura] = useState<string | null>(null);
  const [tipo, setTipo] = useState<string | null>(null);
  const [versao, setVersao] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<Record<string, string> | null>(
    null
  );
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [ddi, setDdi] = useState("+55");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [domain, setDomain] = useState<string>("");
  const [redLine, setRedLine] = useState<string | null>(null);
  const [titleRedLine, setTitleRedLine] = useState<React.ReactNode | null>(
    null
  );
  const [isLogo, setIsLogo] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [isPicture, setIsPicture] = useState(false);
  const [tagId, setTagId] = useState<number | null>(null);
  const fullUrl = Object.values(params).flat().join("/");

  const launch = "oro";

  // Capturar o domínio da página
  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window !== "undefined") {
      const currentDomain = window.location.hostname;
      console.log("Current domain:", currentDomain);
      setDomain(currentDomain);
    }
  }, []);

  // Capturar UTMs da queryString
  useEffect(() => {
    if (searchParams) {
      const utmParams: Record<string, string> = {};
      let hasUtm = false;

      // Lista de parâmetros UTM comuns
      const utmKeys = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "utm_id",
      ];

      // Verificar cada parâmetro UTM
      utmKeys.forEach((key) => {
        const value = searchParams.get(key);
        if (value) {
          utmParams[key] = value;
          hasUtm = true;
        }
      });

      // Adicionar outros parâmetros da query que não são UTM
      searchParams.forEach((value, key) => {
        if (!utmKeys.includes(key) && key !== "temperatura") {
          utmParams[key] = value;
          hasUtm = true;
        }
      });

      // Definir formFields apenas se houver UTMs
      if (hasUtm) {
        console.log("UTM params:", utmParams);
        setFormFields(utmParams);
      }
    }
  }, [searchParams]);

  // Mapeamento dos benefícios para exibição
  const benefitsMapping = [
    {
      id: "h1",
      isPicture: false,
      isLogo: true,
      title: (
        <p
          className={`max-w-md sm:text-xl text-base uppercase font-normal leading-7 md:-leading-10 `}
        >
          Faça seu diagnóstico de{" "}
          <span className="text-[#c0964b] sm:text-4xl text-2xl font-bold ">
            DEPENDÊNCIA EMOCIONAL
          </span>{" "}
          gratuito
        </p>
      ),
      text: (
        <p className={`sm:text-xl text-base`}>
          Descubra como AUMENTAR O SEU NÍVEL DE PERMISSÃO e melhorar seus
          resultados nas finanças, nos relacionamentos e na saúde.
        </p>
      ),
    },
  ];

  useEffect(() => {
    if (params && params.temperature) {
      console.log("temperatura param", params.temperature);
      let tipoValue = params.headline;
      const versaoValue = params.version;
      const temperaturaValue = params.temperature;
      const isDarkValue = params.theme;

      if (isDarkValue === "2") {
        setIsDark(false);
      } else {
        setIsDark(true);
      }

      const redLineVersion = params.headline;
      tipoValue = `redline-${redLineVersion}`;
      console.log("RedLine Version:", redLineVersion);
      const redLineText = benefitsMapping.find(
        (benefit) => benefit.id === redLineVersion
      )?.text;
      const titleRedLineText = benefitsMapping.find(
        (benefit) => benefit.id === redLineVersion
      )?.title;
      const _isLogo = benefitsMapping.find(
        (benefit) => benefit.id === redLineVersion
      )?.isLogo;
      const _isPicture = benefitsMapping.find(
        (benefit) => benefit.id === redLineVersion
      )?.isPicture;
      if (redLineText) {
        setRedLine(redLineText as unknown as string);
        console.log("RedLine:", redLineText);
      }

      if (titleRedLineText) {
        setTitleRedLine(titleRedLineText);
        console.log("Title RedLine:", titleRedLineText);
      }

      if (_isPicture !== undefined) {
        setIsPicture(_isPicture);
      }

      if (_isLogo !== undefined) {
        setIsLogo(_isLogo);
      }

      console.log("Tipo:", tipoValue);
      console.log("Versão:", versaoValue);
      console.log("Temperatura:", temperaturaValue);

      setTipo(tipoValue);
      setVersao(versaoValue as string);
      setTemperatura(temperaturaValue as string);

      // Definir tagId baseado na temperatura
      const calculatedTagId = getTagIdByTemperature(temperaturaValue as string);
      setTagId(calculatedTagId);
      console.log("TagId definido:", calculatedTagId);
    }
  }, [params]);

  // Função para construir a URL de redirecionamento
  const buildRedirectUrl = () => {
    // Construir o path base com os valores dinâmicos
    const basePath = `/quest-vq/${params.headline}/${params.version}/${
      params.temperature
    }/${params.slug?.[0] || ""}/typ`;

    // Iniciar com os parâmetros de email e telefone
    const queryParams = new URLSearchParams();

    // Adicionar UTMs se existirem
    if (formFields) {
      Object.entries(formFields).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
    }

    // Construir a URL completa
    return `${basePath}?${queryParams.toString()}`;
  };

  const handleStartQuiz = async () => {
    setIsSubmitting(true);
    // Preparar dados para localStorage
    const leadData: Record<string, any> = {
      temperature: temperatura,
      tipo,
      version: versao,
      launch,
      domain,
      parametroCompleto: fullUrl,
      date: new Date().toISOString(),
    };

    // Adicionar formFields aos dados do localStorage apenas se existir
    if (formFields) {
      leadData.formFields = formFields;
    }

    const leads = JSON.parse(localStorage.getItem("leads") || "[]");
    leads.push(leadData);
    localStorage.setItem("leads", JSON.stringify(leads));

    setSuccess(true);

    setIsSubmitting(false);

    // Redirecionar após um breve delay para mostrar a mensagem de sucesso
    setTimeout(() => {
      const redirectUrl = buildRedirectUrl();

      const funnels = {
        q: "https://sf.aliancadivergente.com.br/sf/?sfunnel=48",
        m: "https://sf.aliancadivergente.com.br/sf/?sfunnel=39",
        f: "https://sf.aliancadivergente.com.br/sf/?sfunnel=31",
      };

      // Adicionar parâmetros da URL atual
      const currentUrl = new URL(window.location.href);
      const currentParams = new URLSearchParams(currentUrl.search);

      // Construir URLs com parâmetros adicionais
      Object.keys(funnels).forEach((key) => {
        const url = new URL(funnels[key as keyof typeof funnels]);

        // Adicionar todos os parâmetros da URL atual
        currentParams.forEach((value, param) => {
          url.searchParams.append(param, value);
        });

        // Atualizar a URL no objeto funnels
        funnels[key as keyof typeof funnels] = url.toString();
      });

      // if (Object.keys(funnels).includes(temperatura || '')) {
      //   window.location.href = funnels[temperatura as keyof typeof funnels];
      //   return; // Interrompe a execução para evitar o redirecionamento padrão
      // }

      if (typeof window !== "undefined") {
        window.history.pushState({}, "", redirectUrl);
      }

      // Usar window.location.href para navegação completa
      if (typeof window !== "undefined") {
        window.location.href = redirectUrl;
      }
    }, 1500);
  };

  const styleDescription = "text-[#006d71] font-bold";

  return (
    <div>
      <section
        id="hero-section"
        className="p-4 sm:bg-[url('/images/vq-1/bg-quiz.webp')] bg-[url('/images/vq-1/bg-quiz-mobile.webp')] bg-center bg-cover bg-no-repeat w-full min-h-screen flex items-center justify-center"
      >
        <div
          className={`container mx-auto lg:w-[1080px] w-full flex items-center justify-center`}
        >
          {/* Coluna única centralizada ou duas colunas */}
          <div className="w-full max-w-[688px] flex flex-col items-center gap-10">
            {isLogo && (
              <div className="w-full flex justify-center">
                <Image
                  src={
                    isDark
                      ? "/images/logo-o-resgate-dos-otimistas-white.png"
                      : "/images/logo-o-resgate-dos-otimistas.png"
                  }
                  alt="Logotipo Resgate dos otimistas"
                  width={621}
                  height={181}
                  priority
                  className="object-contain select-none md:w-[550px] sm:w-[450px] min-w-[350px] pointer-events-none"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            )}
            <div className="text-[#07242c] sm:text-5xl text-[40px]/[44px] font-bold text-center">
              DESCUBRA O SEU NÍVEL DE PERMISSÃO
            </div>
            <div className="text-[#07242c] sm:text-2xl text-xl font-normal text-center">
              Responda este{" "}
              <span className={styleDescription}>quiz de 2 minutos</span> e
              realize o teste de dependência emocional{" "}
              <span className={styleDescription}>
                para identificar os seus bloqueios de Permissão e começar a
                viver uma vida memoráve
              </span>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 max-w-[380px] bg-gradient-to-r from-[#16FFA6] to-[#12ED28] text-black font-extrabold font-roboto py-5 px-6 rounded-xl text-base md:text-lg uppercase tracking-wide transition-all hover:brightness-110 hover:shadow-lg"
              disabled={isSubmitting}
              style={{
                boxShadow: "inset 0 -3px 1px #00000040, inset 0 0 6px #0eac45",
                transition: "transform 0.2s, box-shadow 0.2s, filter 0.2s",
              }}
              onClick={handleStartQuiz}
            >
              <span>
                {isSubmitting
                  ? "PROCESSANDO..."
                  : success
                  ? "REDIRECIONANDO..."
                  : "INICIAR O QUIZ"}
              </span>
              {!success && <MoveUpRight size={20} />}
              {success && <LoaderCircle size={20} className="animate-spin" />}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
