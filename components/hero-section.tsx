"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useSearchParams } from "next/navigation"
import { NormalizedTemperature, normalizeTemperature } from "@/lib/temperature-utils"
import { LEAD_TRACK_CONFIG } from "@/lib/config/lead-track-config"
import { useCreateLeadCapture } from "@/app/modules/lead-capture/hook/use-create-lead-capture"
import { LeadCaptureForm, LeadCaptureSubmitData } from "@/app/components/form/lead-capture-form"
import { getTrackingCookies, getTrackingPageInfo, getTrackingUtmInfo } from "@/lib/tracking/lead-tracking-browser"
import { LeadRegistrationPayload } from "@/app/modules/lead-capture/lead-capture.model"
import { HeadlineV9 } from "@/lib/config/headline/headline-v9"

export default function HeroSection() {
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
    const numericCandidate = parts.find((part) => /^\d+$/.test(part));
    if (numericCandidate) {
      return Number(numericCandidate);
    }

    return undefined;
  };

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

      const redLineText = HeadlineV9.find(
        (benefit) => benefit.id === redLineVersion
      )?.text;

      const titleRedLineText = HeadlineV9.find(
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
      )}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.normalizedPhone)}`;
    } catch (error) {
      console.error("Erro ao enviar cadastro:", error);
      setSubmitError("Nao foi possivel enviar seu cadastro agora.");
    }
  };

  const isDark = false;

  return (
    <section id="hero" className={`relative flex items-center overflow-hidden bg-gradient-to-r from-[#000000] via-[#0a3a4a] to-[#000000] mb-[-50px] lg:mb-[-150px] z-0`}>
      {/* Background com overlay */}
      <div className="absolute inset-0 bg-[url('/images/paper-texture.png')] bg-cover bg-center opacity-15"></div>

      <div className="container mx-auto px-4 pb-20 md:pb-32 pt-10 md:pt-16 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-12 z-[0]">
          {/* Coluna da esquerda - Formulário */}
          <div className="w-full md:w-1/2 lg:w-2/5 mb-12 md:mb-0 text-center md:text-left">
            <div className="mb-8 flex justify-center md:justify-start">
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
            <div className="my-4">
              {!titleRedLine ? (
                <>
                  <p className="text-[#f4f0e1] text-xl mb-1">Faça seu diagnóstico de</p>
                  <h2 className="text-[#c0964b] text-3xl md:text-4xl font-bold mb-1">DEPENDÊNCIA</h2>
                  <h2 className="text-[#c0964b] text-3xl md:text-4xl font-bold mb-2">EMOCIONAL <span className="text-[#D3CAC0] text-2xl block md:inline">gratuito</span></h2>
                </>
              ) : (
                <>
                  {titleRedLine}
                </>
              )}
            </div>

            <p className="text-[#f4f0e1]/80 mb-8 max-w-md mx-auto md:mx-0">
              {redLine ? (
                <span className="text-[#f4f0e1] text-lg md:text-2xl">
                  {redLine}
                </span>
              ) : (
                <>
                  Descubra como <span className="font-bold">AUMENTAR O SEU NÍVEL DE PERMISSÃO</span> e melhorar seus
                  resultados nas finanças, nos relacionamentos e na saúde.
                </>
              )}
            </p>
            <div className="text-[#f4f0e1] text-lg mb-4 font-medium">
              <span className="text-[#f4f0e1]">Preencha os campos abaixo agora:</span>
            </div>
            <div className="w-full max-w-md mx-auto md:mx-0">
              <LeadCaptureForm
                formName={launch}
                onSubmit={handleLeadCaptureSubmit}
                submitError={submitError}
                emailInputClassName="w-full px-4 py-3 rounded-md bg-[#f4f0e1]/90 text-[#07242c] border border-gray-300"
                ddiSelectClassName="py-3 pl-10 pr-2 rounded-l-md bg-[#f4f0e1]/90 text-[#07242c] border-r border-gray-300 focus:ring-0 focus:outline-none border border-gray-300"
                phoneInputClassName="flex-1 px-4 py-3 rounded-r-md bg-[#f4f0e1]/90 text-[#07242c] focus:outline-none border border-gray-300"
                buttonClassName="w-full bg-custom-primary-gold text-white font-medium py-3 px-6 rounded-md transition-all hover:brightness-110 uppercase text-sm tracking-wider"
              />
            </div>
            <p className="text-[#C0964B] text-lg mt-4 text-center md:text-left" style={{ color: "#C0964B" }}>ONLINE E GRATUITO. 15, 16 e 17 DE JULHO às 19h55</p>
          </div>

          {/* Coluna da direita - Imagem Hero */}
          <div className="w-full md:w-1/2 lg:w-3/5 relative flex justify-center md:justify-end mt-[-50px] mb-[-150px]">
            <div className="relative w-full" style={{ height: "540px" }}>
              <div className="absolute inset-0 flex items-center justify-center md:justify-end">
                <Image
                  src="/images/hero-images.png"
                  alt="Mentor e histórias de transformação"
                  width={600}
                  height={540}
                  priority
                  className="object-contain select-none pointer-events-none -mt-16 md:mt-0"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
