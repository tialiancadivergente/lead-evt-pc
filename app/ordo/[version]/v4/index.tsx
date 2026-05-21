"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { text } from "stream/consumers";
import { getTagIdByTemperature } from "@/lib/temperature-utils";

export default function Formv4({ theme = "2" }: { theme?: string }) {
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
  const [percent, setPercent] = useState<string | null>(null);
  const [tagId, setTagId] = useState<number | null>(null);
  const [themeValue, setThemeValue] = useState<string>(theme);
  const fullUrl = Object.values(params).flat().join("/");

  const launch = "oro";

  // Mapeamento do theme para a imagem de background
  const themeBackgroundMap: Record<string, string> = {
    "1": "/images/v4/BG-ORO-DARK.webp",
    "2": "/images/v4/BG-ORO.webp",
  };

  const themeMobileBackgroundMap: Record<string, string> = {
    "2": "/images/v4/ORO-Mobile.webp",
    "1": "/images/v4/ORO-Mobile-DARK.webp",
  };

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
          <span className="text-[#c0964b] sm:text-4xl text-2xl font-bold ">DEPENDÊNCIA
          EMOCIONAL</span> gratuito
        </p>
      ),
      text: (
        <p className={`sm:text-xl text-base`}>
          Descubra como AUMENTAR O SEU NÍVEL DE PERMISSÃO e melhorar seus resultados nas finanças, nos relacionamentos e na saúde.
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

      // Atualizar themeValue com base nos params ou props
      const currentTheme = theme;
      setThemeValue(currentTheme);

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
    const basePath = `/quest-v4/${params.headline}/${params.version}/${
      params.temperature
    }/${params.slug?.[0] || ""}/${isDark ? "1" : "2"}/typ`;

    // Iniciar com os parâmetros de email e telefone
    const queryParams = new URLSearchParams();
    queryParams.append("email", email);
    queryParams.append(
      "phone",
      `${ddi}${whatsapp.replace(/\s+|-|\(|\)|\./g, "")}`
    );

    // Adicionar UTMs se existirem
    if (formFields) {
      Object.entries(formFields).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
    }

    // Construir a URL completa
    return `${basePath}?${queryParams.toString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const cleanedPhone = whatsapp.replace(/\s+|-|\(|\)|\./g, "");

      const fullPhone = `${ddi}${cleanedPhone}`;

      // Preparar o payload para a API
      const payload: Record<string, any> = {
        email,
        phone: fullPhone,
        temperature: temperatura,
        tipo,
        version: versao,
        parametroCompleto: fullUrl,
        domain,
        uri: domain,
        tagId: tagId,
        launch,
        path: window.location.pathname,
      };

      // Adicionar formFields ao payload apenas se existir
      if (formFields) {
        payload.formFields = formFields;
      }

      const response = await fetch("/api/register-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha ao registrar lead");
      }

      // Preparar dados para localStorage
      const leadData: Record<string, any> = {
        email,
        whatsapp: fullPhone,
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
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    } finally {
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

          const fullPhone = whatsapp.replace(/\s+|-|\(|\)|\./g, "");
          // Adicionar email, telefone e país
          url.searchParams.append("email", email);
          url.searchParams.append("phone", fullPhone);
          url.searchParams.append("country", ddi.replace("+", ""));

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
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "whatsapp") {
      // Remove todos os caracteres não numéricos
      const numericValue = value.replace(/\D/g, "");

      // Aplica a formatação de acordo com a quantidade de dígitos
      let formattedValue = numericValue;
      if (ddi === "+55") {
        // Formato brasileiro: (XX) XXXXX-XXXX
        if (numericValue.length <= 2) {
          formattedValue = numericValue;
        } else if (numericValue.length <= 7) {
          formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(
            2
          )}`;
        } else {
          formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(
            2,
            7
          )}-${numericValue.slice(7, 11)}`;
        }
      } else {
        // Formato genérico para outros países
        if (numericValue.length > 3 && numericValue.length <= 7) {
          formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
            3
          )}`;
        } else if (numericValue.length > 7) {
          formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
            3,
            7
          )}-${numericValue.slice(7)}`;
        }
      }

      setWhatsapp(formattedValue);
    } else {
      setWhatsapp(value);
    }
  };

  // Obter o caminho da imagem de background baseado no theme
  const backgroundImage = themeBackgroundMap[themeValue] || themeBackgroundMap["2"];
  const backgroundImageMobile = themeMobileBackgroundMap[themeValue] || themeMobileBackgroundMap["2"];

  return (
    <div>
      <style dangerouslySetInnerHTML={{
        __html: `
          #hero-section {
            background-image: url('${backgroundImage}');
          }
          @media (max-width: 640px) {
            #hero-section {
              background-image: url('${backgroundImageMobile}');
            }
          }
        `
      }} />
      <section
        id="hero-section"
        className="relative flex flex-col items-center p-2 md:p-0 justify-center overflow-hidden z-0 bg-[#D3CAC0] bg-top sm:bg-center bg-cover bg-no-repeat w-full h-full min-h-screen"
      >

        <div
          className={`lg:container mx-auto px-4 py-10 relative lg:w-[1080px] w-full`}
        >
          {/* Coluna única centralizada ou duas colunas */}
          <div className="w-full">
            {isLogo && (
              <div className={`sm:mb-8 mb-0 flex sm:justify-start justify-center sm:mt-0 ${isDark ? "mt-36" : "mt-44"}`}>
                <Image
                  src={isDark ? "/images/logo-o-resgate-dos-otimistas-white.png" : "/images/logo-o-resgate-dos-otimistas.png"}
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
            <div className={`sm:mt-8 mt-4 text-left ${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"}`}>
              {!titleRedLine ? (
                <>
                  <p className="text-[#f4f0e1] lg:text-2xl md:text-2xl text-xs mb-1">
                    FAÇA SEU DIAGNÓSTICO DE
                  </p>
                  <h2 className="text-[#c0964b] text-2xl lg:text-5xl md:text-5xl font-bold mb-1">
                    DEPENDÊNCIA
                  </h2>
                  <h2 className="text-[#c0964b] text-2xl lg:text-5xl md:text-5xl font-bold">
                    EMOCIONAL{" "}
                  </h2>
                  <span className="text-[#D3CAC0] text-2xl lg:text-3xl md:text-3xl block md:inline">
                    GRATUITO
                  </span>
                </>
              ) : (
                <>
                  <div
                    className={`text-2xl lg:text-5xl max-w-2xl leading-none ${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"}`}
                  >
                    {titleRedLine}
                  </div>
                </>
              )}
            </div>

            <p className={`mb-4 sm:mb-8 sm:mt-6 mt-2 flex items-center text-left md:max-w-[486px] max-w-[420px] ${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"}`}>
              {redLine ? (
                <span>{redLine}</span>
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
            <p className={`text-base lg:text-xl text-left max-w-[486px] ${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"} mb-4`}>
              Preencha os campos abaixo agora:
            </p>
            <form
              onSubmit={handleSubmit}
              id="cadastro"
              name={launch}
              className={`space-y-4 md:max-w-[486px] max-w-[420px]`}
            >
              <div>
                <input
                  type="email"
                  id="form-field-email"
                  placeholder="Seu melhor e-mail"
                  className={`w-full px-4 py-3 rounded-md bg-[#D3CAC0] text-[#07242c] border border-[#737373] placeholder:text-[#07242c]`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:flex hidden items-center pointer-events-none">
                  <Phone size={18} className="text-gray-500" />
                </div>
                <div className="flex">
                  <select
                    className={`py-3 sm:pl-10 pl-0 sm:pr-2 pr-1 rounded-l-md border bg-[#D3CAC0] text-[#07242c] focus:ring-0 focus:outline-none border-[#737373]`}
                    value={ddi}
                    onChange={(e) => setDdi(e.target.value)}
                  >
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+351">🇵🇹 +351</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+54">🇦🇷 +54</option>
                    <option value="+56">🇨🇱 +56</option>
                    <option value="+57">🇨🇴 +57</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Seu WhatsApp"
                    id="form-field-telefone"
                    className={`flex-1 sm:px-4 px-1 py-3 rounded-r-md bg-[#D3CAC0] text-[#07242c] focus:outline-none border border-l-0 border-[#737373] placeholder:text-[#07242c]`}
                    value={whatsapp}
                    onChange={handleChange}
                    name="whatsapp"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#16FFA6] to-[#12ED28] text-black font-extrabold font-roboto py-5 px-6 rounded-full text-base md:text-lg uppercase tracking-wide transition-all hover:brightness-110 hover:shadow-lg"
                disabled={isSubmitting}
                style={{
                  boxShadow: "inset 0 -3px 1px #00000040, inset 0 0 6px #0eac45",
                  transition: "transform 0.2s, box-shadow 0.2s, filter 0.2s",
                }}
              >
                <span>
                  {isSubmitting
                    ? "PROCESSANDO..."
                    : success
                    ? "SUCESSO! AGUARDE..."
                    : "GARANTIR MEU LUGAR"}
                </span>
              </button>
            </form>

            <p
              className={`sm:text-xl text-lg mt-4 sm:ml-10 ml-0 sm:text-left text-center`}
              style={{ color: isDark ? "#c0964b" : "#07242c" }}
            >
              ONLINE E GRATUITO | 24, 25 e 26/11 - 19h55
            </p>
          </div>

          {isPicture && (
            <div className="w-full h-full -mt-14 md:mt-6">
              <Image
                src="/images/foto.png"
                alt="Picture"
                width={600}
                height={400}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
