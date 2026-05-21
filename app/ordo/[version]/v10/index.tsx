"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { text } from "stream/consumers";
import { getTagIdByTemperature } from "@/lib/temperature-utils";

export default function Formv10() {
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

  const fullUrl = Object.values(params).flat().join('/');
	
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
    const basePath = `/quest/${params.headline}/${params.version}/${params.temperature}/${params.slug?.[0] || ""}/typ`;

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
        className={`relative flex flex-col items-center p-4 md:p-0 justify-center overflow-hidden bg-gradient-to-r from-[#000000] via-[#07242c] to-[#000000] z-0 ${
          isDark
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
          className={`container mx-auto px-4 py-20 md:py-32 relative ${
            isPicture ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "text-center"
          }`}
        >
          {/* Coluna única centralizada ou duas colunas */}
          <div className="w-full max-w-2xl mx-auto mb-12">
            {isLogo && (
              <div className="mb-8 flex justify-center">
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
            )}
            <div className="my-8">
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
                    className={`text-4xl md:text-5xl max-w-2xl mx-auto leading-none ${
                      isDark ? "text-[#f4f0e1]" : "text-[#07242c]"
                    }`}
                  >
                    {titleRedLine}
                  </div>
                </>
              )}
            </div>

            <p className="mb-8 max-w-xl mx-auto">
              {redLine ? (
                <span
                  className={`text-xl md:text-3xl ${
                    isDark ? "text-[#f4f0e1]" : "text-[#07242c]"
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
              className={`${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"} ${
                isPicture ? "max-w-lg text-center md:text-left" : "max-w-md"
              } mx-auto text-lg mb-4 font-medium`}
            >
              <span
                className={`${isDark ? "text-[#f4f0e1]" : "text-[#07242c]"}`}
              >
                Preencha os dados abaixo para fazer o seu diagnóstico de
                bloqueio de permissão gratuito e destrave seu teto financeiro
                imediatamente
              </span>
            </div>
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
                  className={`w-full px-4 py-3 rounded-md bg-[#f4f0e1]/90 text-[#07242c] ${
                    !isDark ? "border border-gray-300" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-500" />
                </div>
                <div className="flex">
                  <select
                    className={`py-3 pl-10 pr-2 rounded-l-md bg-[#f4f0e1]/90 text-[#07242c] border-r border-gray-300 focus:ring-0 focus:outline-none ${
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
                    className={`flex-1 px-4 py-3 rounded-r-md bg-[#f4f0e1]/90 text-[#07242c] focus:outline-none ${
                      !isDark ? "border border-gray-300" : ""
                    }`}
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
                    : "QUERO MEDIR MINHA PERMISSÃO"}
                </span>
              </button>
            </form>

            <p
              className={`text-[#C0964B] text-lg mt-4 ${
                isPicture ? "hidden" : "block"
              }`}
              style={{ color: "#C0964B" }}
            >
              ONLINE E GRATUITO. 24, 25 e 26/11 - 19h55
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
        <footer className="w-full mb-24 max-w-3xl mx-auto">
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
        </footer>
      </section>
    </div>
  );
}
