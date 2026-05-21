"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { type LeadCaptureSubmitData } from "@/app/components/form/lead-capture-form";
import { LEAD_TRACK_CONFIG } from "@/lib/config/lead-track-config";
import {
  getTrackingCookies,
  getTrackingPageInfo,
  getTrackingUtmInfo,
} from "@/lib/tracking/lead-tracking-browser";
import {
  normalizeTemperature,
  type NormalizedTemperature,
} from "@/lib/temperature-utils";
import { useCreateLeadCapture } from "@/app/modules/lead-capture/hook/use-create-lead-capture";
import type {
  LeadRegistrationPayload,
} from "@/app/modules/lead-capture/lead-capture.model";
import ContainerTeste from "./container";
import { Headline } from "./headline";

export default function Formv6() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [titleRedLine, setTitleRedLine] = useState<React.ReactNode | null>(
    null
  );
  const [redLine, setRedLine] = useState<React.ReactNode | null>(null);
  const [temperatura, setTemperatura] = useState<NormalizedTemperature | undefined>(
    undefined
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<Record<string, string> | null>(
    null
  );

  const { launch, season, tag_id } = LEAD_TRACK_CONFIG;

  const mutationCreate = useCreateLeadCapture();

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
    if (params && params.temperature) {
      const temperaturaValue = normalizeTemperature(params.temperature);
      const redLineVersion = params.headline;

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

      setTemperatura(temperaturaValue);
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

      window.location.href = `/quiz-oro/?temperature=${temperatura}&requestId=${encodeURIComponent(
        requestId
      )}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.normalizedPhone)}`;
    } catch (error) {
      console.error("Erro ao enviar cadastro:", error);
      setSubmitError("Nao foi possivel enviar seu cadastro agora.");
    }
  };

  return (
    <ContainerTeste
      titleRedLine={titleRedLine}
      redLine={redLine}
      formName={launch}
      onSubmit={handleLeadCaptureSubmit}
      submitError={submitError}
    />
  );
}
