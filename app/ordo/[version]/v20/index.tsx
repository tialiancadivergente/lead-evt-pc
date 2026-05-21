"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useScreenSize } from "@/hooks/use-screen-size";
import { getTagIdByTemperature } from "@/lib/temperature-utils";

export default function Formv20() {
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
  const { width } = useScreenSize();
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
      id: 1,
      isPicture: false,
      isLogo: true,
      title: (
        <p
          className={`text-3xl md:text-4xl uppercase font-bold mx-auto leading-10 md:-leading-10 `}
        >
          Pare de assistir pessoas que sabem menos do que você ganharem mais
        </p>
      ),
      text: (
        <p
          className={`text-2xl md:text-xl md:uppercase capitalize text-center`}
        >
          Você não está ficando para trás por falta de conhecimento ou de força
          de vontade,{" "}
          <span
            className={`${isDark ? "text-[#c0964b]" : "text-bold"} font-bold`}
          >
            você está ficando para trás por falta de permissão.
          </span>
        </p>
      ),
    },
    {
      id: 2,
      isPicture: false,
      isLogo: true,
      title: (
        <p
          className={`text-3x max-w-xl md:text-4xl uppercase font-bold mx-auto leading-10 md:-leading-10 `}
        >
          Tem gente que estudou menos que você e ganhando bem mais
        </p>
      ),
      text: (
        <p className={`text-2xl md:text-2xl max-w-sm mx-auto text-center`}>
          E esse ciclo se repete pela sua falta de permissão
        </p>
      ),
    },
    {
      id: 3,
      isPicture: true,
      isLogo: true,
      title: (
        <p
          className={`text-3x max-w-lg md:text-4xl uppercase font-bold mx-auto leading-10 md:-leading-10 text-center md:text-left`}
        >
          Essa advogada saiu de R$3 mil para R$85 mil em menos de 60 dias
        </p>
      ),
      text: (
        <p
          className={`text-2xl md:text-2xl max-w-lg mx-auto text-center md:text-left`}
        >
          Destrave o seu teto financeiro eliminando o seu bloqueio e permissão.
          Capacidade e força de vontade você já tem.
        </p>
      ),
    },
    {
      id: "h2",
      isPicture: false,
      isLogo: true,
      title: (
        <p
          className={`text-3x max-w-xl md:text-4xl uppercase font-bold mx-auto leading-10 md:-leading-10 `}
        >
          Tem gente que estudou menos que você e ganhando bem mais
        </p>
      ),
      text: (
        <p className={`text-2xl md:text-2xl max-w-sm mx-auto text-center`}>
          E esse ciclo se repete pela sua falta de permissão
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
        setIsDark(true);
      } else {
        setIsDark(false);
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
    const basePath = `/quest/${params.headline}/${params.version}/${
      params.temperature
    }/${params.slug?.[0] || ""}/typ`;

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
        console.log("Redirecionando para:", redirectUrl);

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

  return (
    <div>
      <section
        id="hero"
        className={`relative flex flex-col items-center p-4 md:p-0 justify-center overflow-hidden bg-[#D5CABB] bg-[url('/images/v20/bg.png')] bg-cover bg-center z-0`}
      >
        <div className={`absolute top-[-30px] sm:top-0 left-[-70px] sm:left-[-50px] lg:left-0 w-full bg-no-repeat block`}>
          <Image
            src="/images/v20/bg-top-left.png"
            alt="Background top left"
            width={width > 1024 ? 562 : 300}
            height={width > 1024 ? 218 : 116}
            className="object-contain"
            style={{
              transformOrigin: "center",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        
        <div className="absolute bottom-28 left-0 w-full bg-no-repeat block lg:hidden">
          <Image
            src="/images/v20/torn-left-bottom.png"
            alt="Background bottom left"
            width={156}
            height={317}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute bottom-0 left-[-100px] lg:left-0 w-full bg-no-repeat block">
          <Image
            src="/images/v20/bg-bottom-left.png"
            alt="Background bottom left"
            width={width > 1024 ? 670 : 450}
            height={width > 1024 ? 880 : 600}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute top-0 right-0 bg-no-repeat block lg:hidden">
          <Image
            src="/images/v20/torn-top-left.png"
            alt="Background top right"
            width={139}
            height={120}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute top-0 right-[-120px] sm:right-[-80px] lg:right-0 bg-no-repeat block">
          <Image
            src="/images/v20/bg-top-right.png"
            alt="Background top right"
            width={width > 1024 ? 403 : 250}
            height={width > 1024 ? 1069 : 680}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div
          className={`container mx-auto px-4 py-10 relative grid grid-cols-1`}
        >
          {/* Coluna única centralizada ou duas colunas */}
          <div className="w-full">
            {isLogo && (
              <div className="flex justify-center">
                <Image
                  src="/images/v20/logo-resgate-dos-otimistas.png"
                  alt="Logotipo Resgate dos otimistas"
                  width={348}
                  height={152}
                  priority
                  className="object-contain select-none pointer-events-none"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            )}
            <div className="mb-6 mt-2 text-center">
              {!titleRedLine ? (
                <>
                  <p className="text-[#0D313E] text-xl sm:text-3xl mb-1">
                    FAÇA SEU DIAGNÓSTICO DE
                  </p>
                  <h2 className="text-[#0D313E] text-[32px] sm:text-5xl font-bold mb-1 leading-none">
                    DEPENDÊNCIA
                  </h2>
                  <h2 className="text-[#0D313E] text-[32px] sm:text-5xl font-bold leading-none">
                    EMOCIONAL{" "}
                  </h2>
                  <span className="text-[#0D313E] text-xl sm:text-3xl block md:inline">
                    GRATUITO
                  </span>
                </>
              ) : (
                <>
                  <div
                    className={`text-4xl md:text-5xl max-w-2xl mx-auto leading-none text-[#0D313E]`}
                  >
                    {titleRedLine}
                  </div>
                </>
              )}
            </div>

            <p className="text-[#0D313d] mb-6 mx-auto text-center text-lg sm:text-2xl sm:max-w-[600px] max-w-[400px]">
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

            <p className="text-center text-lg sm:text-2xl text-[#0D313d] max-w-[400px] mx-auto mb-2">
              Preencha os campos abaixo agora:
            </p>
            <form
              onSubmit={handleSubmit}
              id="cadastro"
              name={launch}
              className={`space-y-4 ${
                isPicture ? "max-w-lg" : "max-w-md"
              } mx-auto`}
            >
              <div>
                <input
                  type="email"
                  id="form-field-email"
                  placeholder="Seu melhor e-mail"
                  className={`w-full px-4 py-3 rounded-full bg-[#f4f0e1]/90 text-[#104448] border-[#104448] border placeholder:text-[#104448]`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-500" />
                </div>
                <div className="flex border-[#104448] border rounded-full">
                  <select
                    className={`py-3 pl-10 pr-2 rounded-l-full bg-[#E8E4D6] text-[#07242c] border-r border-gray-300 focus:ring-0 focus:outline-none ${
                      !isDark ? "border border-gray-300" : ""
                    }`}
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
                    className={`flex-1 px-4 py-3 rounded-r-full bg-[#f4f0e1]/90 text-[#07242c] focus:outline-none placeholder:text-[#104448]`}
                    value={whatsapp}
                    onChange={handleChange}
                    name="whatsapp"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0a6d6d] to-[#0e7c7b] text-[#f4f0e1] font-bold py-5 px-6 rounded-full shadow-md text-base md:text-lg uppercase tracking-wide transition-all hover:brightness-110"
                disabled={isSubmitting}
              >
                <span className="text-[#f4f0e1]">
                  {isSubmitting
                    ? "PROCESSANDO..."
                    : success
                    ? "SUCESSO! AGUARDE..."
                    : "PARTICIPAR GRATUITAMENTE"}
                </span>
              </button>
            </form>

            <p className={`text-[#0D313E] text-base sm:text-xl mt-4 text-center font-bold`}>
              100% GRATUITO | 24, 25 E 26/11 | 19H55
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
        <footer className="w-full mb-20 mt-10 max-w-3xl mx-auto z-10">
          <div className="text-center text-base sm:text-xl font-serif text-[#07242C]">
            © 2025 . All rights reserved. Política de Privacidade
          </div>
        </footer>
      </section>
    </div>
  );
}
