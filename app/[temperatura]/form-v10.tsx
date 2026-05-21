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

  useEffect(() => {
    if (searchParams) {
      const utmParams: Record<string, string> = {};
      let hasUtm = false;

      const utmKeys = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "utm_id",
      ];

      utmKeys.forEach((key) => {
        const value = searchParams.get(key);
        if (value) {
          utmParams[key] = value;
          hasUtm = true;
        }
      });

      searchParams.forEach((value, key) => {
        if (!utmKeys.includes(key) && key !== "temperatura") {
          utmParams[key] = value;
          hasUtm = true;
        }
      });

      if (hasUtm) {
        console.log("UTM params:", utmParams);
        setFormFields(utmParams);
      }
    }
  }, [searchParams]);

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
        <div className="absolute inset-0 bg-[url('/images/paper-texture.png')] bg-cover bg-center opacity-15"></div>

        <div
          className={`container mx-auto px-4 py-10 sm:py-20 md:py-32 relative`}
        >
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
                Preencha os dados abaixo para se inscrever gratuitamente para o
                evento:
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
      </section>

      <div className="bg-[#031B22] bg-[radial-gradient(50%_75.08%_at_50%_100.2%,_rgba(16,68,72,0.5)_0%,_rgba(16,68,72,0.2)_34.73%,_rgba(16,68,72,0)_100%)] py-[80px] px-4">
        <footer className="container mx-auto lg:w-[1080px] w-full flex flex-col gap-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
            <div className="font-normal font-raleway text-[14px] text-white text-center lg:text-left order-2 lg:order-1">
              <p>
                Copyright © O Resgate dos Otimistas.
              </p>

              <p>
                Todos os direitos reservados.
              </p>
            </div>

            <div className="flex justify-center order-1 lg:order-2">
              <Image
                src="/images/logo-resgate-dos-otimistas.png"
                alt="Logomarca O Resgate dos Otimistas"
                width={220}
                height={28}
                priority
                className="object-contain w-[180px] lg:w-[220px]"
              />
            </div>

            <div className="font-normal font-raleway text-[14px] text-white text-center lg:text-right order-3">
              <div className="flex items-center justify-center lg:justify-end gap-3 flex-wrap">
                <a
                  href="https://www.oresgatedosotimistas.com.br/politica-de-privacidade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  Política de privacidade
                </a>

                <span>|</span>

                <a
                  href="https://www.oresgatedosotimistas.com.br/termos-de-uso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  Termos de uso
                </a>
              </div>

              <div className="mt-1 text-[14px]">
                <p>
                  CNPJ: 59.301.463.0001-36
                </p>
              </div>
            </div>
          </div>

          <div className="text-white font-raleway text-[14px] max-w-[1080px] mx-auto w-full text-center">
            <h3 className="font-bold uppercase mb-4">
              AVISO LEGAL:
            </h3>

            <p className="leading-relaxed max-w-[1000px] mx-auto">
              Os resultados podem variar de pessoa para pessoa. Este método tem caráter educacional e de desenvolvimento pessoal, não garantindo ganhos financeiros imediatos ou específicos. O sucesso depende da aplicação prática de cada participante. Este site não é afiliado, endossado ou patrocinado pelo Google Ads, Meta Ads ou TikTok Ads.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}