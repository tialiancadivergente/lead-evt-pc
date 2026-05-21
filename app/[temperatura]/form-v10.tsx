"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { NormalizedTemperature, normalizeTemperature } from "@/lib/temperature-utils";
import { LEAD_TRACK_CONFIG } from "@/lib/config/lead-track-config";
import { useCreateLeadCapture } from "../modules/lead-capture/hook/use-create-lead-capture";
import { Headline } from "@/lib/config/headline";
import { LeadCaptureForm, LeadCaptureSubmitData } from "../components/form/lead-capture-form";
import { getTrackingCookies, getTrackingPageInfo, getTrackingUtmInfo } from "@/lib/tracking/lead-tracking-browser";
import { LeadRegistrationPayload } from "../modules/lead-capture/lead-capture.model";
import Link from "next/link";

type LogoVariant = "default" | "dark";

type Formv10Props = {
  logoVariant?: LogoVariant;
};

export default function Formv10({ logoVariant = "default" }: Formv10Props) {
  const params = useParams();
  const searchParams = useSearchParams();
  const [titleRedLine, setTitleRedLine] = useState<React.ReactNode | null>(
    null
  );
  const [formFields, setFormFields] = useState<Record<string, string> | null>(
    null
  );
  const [redLine, setRedLine] = useState<React.ReactNode | null>(null);
  const [temperatura, setTemperatura] = useState<NormalizedTemperature | undefined>(
    undefined
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { launch, season, tag_id } = LEAD_TRACK_CONFIG;

  const mutationCreate = useCreateLeadCapture();

  const findHeadlineIdFromSlug = (parts: string[]): string | number | undefined => {
    const headlinePart = parts.find((part) => /^h\d+$/i.test(part));
    if (headlinePart) {
      return headlinePart.toLowerCase();
    }

    const numericCandidate = parts.find((part) => /^\d+$/.test(part));
    if (numericCandidate) {
      return Number(numericCandidate);
    }

    return undefined;
  };
  
  const LOGO_BY_VARIANT: Record<LogoVariant, string> = {
    default: "/images/logo.png",
    dark: "/images/v5/LOGO OLDI.png",
  };

  const logoSrc = LOGO_BY_VARIANT[logoVariant];

  // ************* INICIO - CODIGO LEGADO ************* 
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
  // ************* FINAL - CODIGO LEGADO ************* 

  useEffect(() => {
    if (params && params.temperatura) {
      const rawParam = Array.isArray(params.temperatura)
        ? params.temperatura[0]
        : params.temperatura;

      if (!rawParam) {
        return;
      }

      const parts = rawParam.split("-").filter(Boolean);
      const temperatureSegment = parts[parts.length - 1];
      const temperaturaValue = normalizeTemperature(temperatureSegment);
      const redLineVersion = findHeadlineIdFromSlug(parts);

      const redLineText = Headline.find(
        (benefit) => benefit.id === redLineVersion
      )?.text;

      const titleRedLineText = Headline.find(
        (benefit) => benefit.id === redLineVersion
      )?.title;

      if (redLineText) {
        setRedLine(redLineText);
      }

      if (titleRedLineText) {
        setTitleRedLine(titleRedLineText);
      }

      if (temperaturaValue) {
        setTemperatura(temperaturaValue);
      }
    }
  }, [params]);

  const handleLeadCaptureSubmit = async (data: LeadCaptureSubmitData) => {
    setSubmitError(null);

    try {
      const resolvedTagId = tag_id(temperatura);
      const { currentUrl, currentPath, currentPage } = getTrackingPageInfo();
      const { utmObject, getUtmValue } = getTrackingUtmInfo();
      const cookies = getTrackingCookies();

      // ************* INICIO - CODIGO LEGADO *************
      const payloadDynamo: Record<string, any> = {
        email: data.email,
        phone: data.normalizedPhone,
        temperature: temperatura,
        tipo: `redline-${params.headline}`,
        version: params.version,
        parametroCompleto: `${currentPage}${currentPath}`,
        domain: currentPage,
        uri: currentPage,
        tagId: resolvedTagId,
        launch,
        path: window.location.pathname,
      };

      // Adicionar formFields ao payload apenas se existir
      if (formFields) {
        payloadDynamo.formFields = formFields;
      }

      const responseDynamo = await fetch("/api/register-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadDynamo),
      });

      if (!responseDynamo.ok) {
        throw new Error("Falha ao registrar lead no dynamo");
      }
      // ************* FINAL - CODIGO LEGADO *************

      const payload: LeadRegistrationPayload = {
        email: data.email,
        telefone: data.normalizedPhone,
        launch,
        season,
        tag_id: resolvedTagId,
        page: currentPage,
        path: currentPath,
        utm_source: getUtmValue("utm_source"),
        utm_medium: getUtmValue("utm_medium"),
        utm_campaign: getUtmValue("utm_campaign"),
        utm_content: getUtmValue("utm_content"),
        utm_term: getUtmValue("utm_term"),
        utm_id: getUtmValue("utm_id"),
        utms: utmObject,
        metadados: {
          url: currentUrl,
          referer: document.referrer || "",
          ip: "",
          user_agent: navigator.userAgent || "",
          cookies,
          temperature: temperatura,
        },
      };

      const response = await mutationCreate.mutateAsync(payload);

      const requestId = response.data?.requestId;

      if (!requestId) {
        throw new Error("requestId nao retornado na resposta.");
      }

      window.location.href = `/quiz-new/?temperature=${temperatura}&requestId=${encodeURIComponent(
        requestId
      )}`;
    } catch (error) {
      console.error("Erro ao enviar cadastro:", error);
      setSubmitError("Nao foi possivel enviar seu cadastro agora.");
    }
  };

  const isDark = false;

  return (
    <div>
      <section
        id="hero"
        className={`relative flex flex-col items-center p-4 md:p-0 justify-center overflow-hidden bg-gradient-to-r from-[#000000] via-[#07242c] to-[#000000] z-0 ${isDark
          ? "bg-gradient-to-r from-[#000000] via-[#07242c] to-[#000000]"
          : "bg-gradient-to-r from-[#f4f0e1] via-[#f4f0e1] to-[#f4f0e1]"
          }`}
      >
        {/* Background com overlay */}
        <div className="absolute inset-0 bg-[url('/images/paper-texture.png')] bg-cover bg-center opacity-15"></div>

        <div className="absolute bottom-500 left-0 hidden md:block w-[200px] h-[200px] bg-no-repeat">
          <Image
            src="/images/bg-left.png"
            alt="Background top right and left"
            width={80}
            height={200}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute bottom-[500px] hidden md:block right-0 w-[150px] h-[200px] bg-no-repeat">
          <Image
            src="/images/bg-right-bottom.png"
            alt="Background top right and left"
            width={150}
            height={200}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-no-repeat hidden md:block">
          <Image
            src="/images/bg-top-right.png"
            alt="Background top right and left"
            width={400}
            height={200}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-no-repeat show md:hidden">
          <Image
            src="/images/bg-top-right.png"
            alt="Background top right and left"
            width={200}
            height={200}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 w-[500px] h-[200px] bg-no-repeat show md:hidden">
          <Image
            src="/images/bg-top-left.png"
            alt="Background top right and left"
            width={300}
            height={400}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 w-[500px] h-[200px] bg-no-repeat hidden md:block">
          <Image
            src="/images/bg-top-left.png"
            alt="Background top right and left"
            width={900}
            height={400}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div
          className={`container mx-auto px-4 py-10 sm:py-20 md:py-32 relative`}
        >
          {/* Coluna única centralizada ou duas colunas */}
          <div className="w-full max-w-2xl mx-auto mb-12">
            <div className="mb-4 sm:mb-8 flex justify-center">
              <Image
                src="/images/logo-resgate-dos-otimistas.png"
                alt="Logotipo Resgate dos otimistas"
                width={322}
                height={171}
                priority
                className="object-contain select-none pointer-events-none"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
            <div className="text-center my-4 sm:my-8">
              {!titleRedLine ? (
                <>
                  <p className="text-[#f4f0e1] text-2xl mb-1">
                    Faça seu diagnóstico de
                  </p>
                  <h2 className="text-[#c0964b] text-4xl md:text-5xl font-bold mb-1">
                    DEPENDÊNCIA
                  </h2>
                  <h2 className="text-[#c0964b] text-4xl md:text-5xl font-bold mb-2">
                    EMOCIONAL{" "}
                    <span className="text-[#D3CAC0] text-3xl block md:inline">
                      gratuito
                    </span>
                  </h2>
                </>
              ) : (
                <>
                  <div
                    className={`text-2xl sm:text-4xl max-w-2xl mx-auto leading-none ${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"
                      }`}
                  >
                    {titleRedLine}
                  </div>
                </>
              )}
            </div>

            <p className="mb-4 sm:mb-8 max-w-xl mx-auto">
              {redLine ? (
                <span
                  className={`text-xl md:text-3xl ${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"
                    }`}
                >
                  {redLine}
                </span>
              ) : (
                <>
                  Descubra como{" "}
                  <span className="font-bold">
                    AUMENTAR O SEU NÍVEL DE PERMISSÃO
                  </span>{" "}
                  e melhorar seus resultados nas finanças, nos relacionamentos e
                  na saúde.
                </>
              )}
            </p>
            <div
              className={`${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"} max-w-md mx-auto sm:text-lg text-base mb-4 font-medium text-center`}
            >
              <span
                className={`${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"} text-center`}
              >
                Preencha os dados abaixo para fazer o seu diagnóstico de
                bloqueio de permissão gratuito e destrave seu teto financeiro
                imediatamente
              </span>
            </div>
            <div className="flex w-full max-w-md mx-auto justify-center">
              <LeadCaptureForm
                formName={launch}
                onSubmit={handleLeadCaptureSubmit}
                submitError={submitError}
                emailInputClassName="w-full px-4 py-3 rounded-md bg-[#f4f0e1]/90 text-[#07242c] border border-gray-300"
                ddiSelectClassName="py-3 pl-10 pr-2 rounded-l-md bg-[#f4f0e1]/90 text-[#07242c] border-r border-gray-300 focus:ring-0 focus:outline-none border border-gray-300"
                phoneInputClassName="flex-1 px-4 py-3 rounded-r-md bg-[#f4f0e1]/90 text-[#07242c] focus:outline-none border border-gray-300"
                buttonClassName="w-full bg-gradient-to-r from-[#0a6d6d] to-[#0e7c7b] text-[#f4f0e1] font-bold py-3 sm:py-5 px-6 rounded-full shadow-md text-base md:text-lg uppercase tracking-wide transition-all hover:brightness-110"
              />
            </div>

            <p
              className={`text-[#C0964B] text-sm sm:text-lg mt-4 block text-center`}
              style={{ color: "#C0964B" }}
            >
              ONLINE E GRATUITO. 15, 16 e 17 de JUNHO ÀS 19H55
            </p>
          </div>
        </div>
        {/* <footer className="w-full mb-24 max-w-3xl mx-auto">
          <div className="w-full mb-6">
            <div
              className="border-t border-[#2a4447] w-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, #2a4447, transparent)",
              }}
            ></div>
          </div>
          <div className="text-center text-[#f4f0e1] text-xs md:text-sm font-serif tracking-wide pb-6">
            <div className={`${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"}`}>
              COPYRIGHT © 2025. O RESGATE DOS OTIMISTAS.
            </div>
            <div className={`${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"}`}>
              TODOS OS DIREITOS RESERVADOS.
            </div>
          </div>
        </footer> */}
        <div className="w-full pb-6">
          <footer
            className="
          container mx-auto
          flex md:flex-row flex-col
          items-center justify-between
          gap-6 w-full md:gap-2
        "
          >
            <div
              className="text-[14px] text-center md:text-left leading-[135%] font-mulish hidden md:block">
              Copyright © O Levante dos Improváveis. <br />
              Todos os direitos reservados.
            </div>

            <Image src={logoSrc} alt="Risk" width={250} height={32} />

            <div className="text-[14px] text-center md:text-left leading-[135%] font-mulish block md:hidden">
              Copyright © O Levante dos Improváveis. <br />
              Todos os direitos reservados.
            </div>

            <div className="flex flex-col items-center md:items-start space-x-2">
              <div className="flex items-center space-x-2">
                <Link
                  href="/politica-de-privacidade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-center md:text-left leading-[135%] font-mulish transition-colors duration-200 hover:text-[#C0964B]"
                >
                  Política de privacidade
                </Link>

                <span className="text-[14px] text-center md:text-left leading-[135%] font-mulish">|</span>

                <Link
                  href="/termos-de-uso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-center md:text-left leading-[135%] font-mulish transition-colors duration-200 hover:text-[#C0964B]"
                >
                  Termos de uso
                </Link>
              </div>

              <p className="text-[12px] text-center md:text-left leading-[135%] font-mulish">
                AEON LTDA CNPJ nº 48.424.807/0001-88
              </p>
            </div>
          </footer>

          <div className="container mx-auto w-full mt-6 md:mt-8 px-4 md:px-0">
            <p className="font-mulish font-bold text-[14px] text-center md:text-left leading-[135%] mb-2">
              AVISO LEGAL:
            </p>

            <p className="font-mulish text-[14px] text-center md:text-left leading-[135%]">
              Os resultados podem variar de pessoa para pessoa. Este método tem
              caráter educacional e de desenvolvimento pessoal, não garantindo
              ganhos financeiros imediatos ou específicos. O sucesso depende da
              aplicação prática de cada participante. Este site não é afiliado,
              endossado ou patrocinado pelo Google ou Meta.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
