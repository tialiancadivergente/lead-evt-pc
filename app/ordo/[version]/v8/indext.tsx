"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { getTagIdByTemperature } from "@/lib/temperature-utils";

export default function Formv8() {
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
  const [isDark, setIsDark] = useState(true);	
  const [isPicture, setIsPicture] = useState(false);
  const [redLine, setRedLine] = useState<string | null>(null);
  const [titleRedLine, setTitleRedLine] = useState<React.ReactNode | null>(
    null
  );
	const fullUrl = Object.values(params).flat().join("/");
  const [isLogo, setIsLogo] = useState(true);
  const [tagId, setTagId] = useState<number | null>(null);

  const launch = "oro";

  // Mapeamento dos benefícios para exibição
  const benefitsMapping = [
    {
      id: 2,
      isPicture: false,
      isLogo: true,
      text: "Descubra o padrão invisível que trava a sua vida — mesmo quando você se esforça.",
    },
    {
      id: 3,
      isPicture: false,
      isLogo: true,
      text: "Você vai entender por que tenta tanto e ainda assim não tem o resultado que merece.",
    },
    {
      id: 4,
      isPicture: false,
      isLogo: true,
      text: "A explicação que nenhuma terapia, mentor ou curso conseguiu te dar — até agora.",
    },
    {
      id: 5,
      isLogo: true,
      text: "Você vai ver que sua vida não travou por falta de esforço — travou por lealdades invisíveis que você nunca questionou.",
    },
    {
      id: 6,
      isLogo: true,
      text: "Entenda por que toda vez que sua vida melhora, algo acontece e te puxa de volta.",
    },
    {
      id: 7,
      isLogo: true,
      text: "Você vai descobrir o nome, a origem e o impacto do padrão invisível que tem sabotado silenciosamente sua vida — e vai aprender como quebrá-lo.",
    },
    {
      id: 8,
      isLogo: true,
      text: "Esse é o seu dia D. O divisor entre continuar repetindo o passado ou assumir que é possível, sim, viver de outro jeito — se você tiver coragem de quebrar o ciclo.",
    },
    {
      id: 9,
      isLogo: true,
      text: (
        <>
          Descubra como se sentir recompensado financeiramente e encontrar
          sentido naquilo que você decidiu fazer
        </>
      ),
    },
    {
      id: 10,
      isLogo: true,
      title: (
        <>
          <h2 className="text-[#c0964b] text-3xl md:text-4xl font-bold mb-1">
            DE OTIMISTA
          </h2>
          <h2 className="text-[#c0964b] text-3xl md:text-4xl font-bold mb-2">
            {" "}
            A BEM SUCEDIDO{" "}
          </h2>
        </>
      ),
      text: (
        <>
          Descubra porque você não foi mais longe na sua busca pelo sucesso e
          como aumentar sua permissão para poder conquistar mais
        </>
      ),
    },
    {
      id: 11,
      isLogo: true,
      title: (
        <>
          <h2 className="text-[#c0964b] text-3xl md:text-4xl font-bold mb-1">
            DE OTIMISTA
          </h2>
          <h2 className="text-[#c0964b] text-3xl md:text-4xl font-bold mb-2">
            {" "}
            A BEM SUCEDIDO
          </h2>
        </>
      ),
      text: (
        <>
          Descubra o que falta para você se sentir recompensado financeiramente
          e encontrar sentido no que você decidiu fazer.
        </>
      ),
    },
    {
      id: 12,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Receba um diagnóstico prático que esclarece por que sua vida{" "}
          <span className="text-[#c0964b]">
            financeira e emocional travou depois das indecisões amorosas.
          </span>
        </span>
      ),
    },
    {
      id: 13,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Receba um passo a passo claro para{" "}
          <span className="text-[#c0964b]">
            destravar seu financeiro em apenas 3 dias.
          </span>
        </span>
      ),
    },
    {
      id: 14,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Descubra exatamente o que trava seus ganhos financeiros e{" "}
          <span className="text-[#c0964b]">
            como superá-los sem precisar trabalhar mais ou estudar mais
          </span>
        </span>
      ),
    },
    {
      id: 15,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Descubra o diagnóstico que celebridades{" "}
          <span className="text-[#c0964b]">
            fazem escondido para destravar a vida!
          </span>
        </span>
      ),
    },
    {
      id: 16,
      isLogo: false,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          VOCÊ VEIO ATÉ AQUI PORQUE{" "}
          <span className="text-[#c0964b]">
            ALGO CHAMOU SUA ATENÇÃO NO MEU VÍDEO
          </span>
        </span>
      ),
    },
    {
      id: 17,
      isLogo: false,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          E, NOS PRÓXIMOS DIAS, EU VOU FAZER UM EVENTO{" "}
          <span className="text-[#c0964b]">PARA APROFUNDAR NESSE ASSUNTO</span>
        </span>
      ),
    },
    {
      id: 18,
      isLogo: false,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          PREENCHA O FORMULÁRIO ABAIXO PARA TER
          <span className="text-[#c0964b]"> ACESSO AO EVENTO E SABER MAIS</span>
        </span>
      ),
    },
    //oro_junho25-leads-adv038-reels
    {
      id: 19,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Conheça o diagnóstico emocional secreto que famosos fazem para{" "}
          <span className="text-[#c0964b]">
            destravarem suas vidas sem exposição pública
          </span>
        </span>
      ),
    },
    // oro_junho25-leads-adv061-reels
    {
      id: 20,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Faça o diagnóstico <span className="text-[#c0964b]">GRATUITO</span>{" "}
          que revela por que você não é bem remunerado!
        </span>
      ),
    },
    // oro-leads-adv27-reels
    {
      id: 21,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Entenda exatamente por que cursos, livros e imersões anteriores{" "}
          <span className="text-[#c0964b]">
            não funcionaram para você até agora
          </span>
        </span>
      ),
    },
    // oro_mar24-leads-adv95
    {
      id: 22,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Chega de aceitar menos do que você merece!{" "}
          <span className="text-[#c0964b]">
            Descubra por que você ainda não foi mais longe
          </span>{" "}
          e o que falta para ter a vida que sempre quis.
        </span>
      ),
    },
    // oro-leads-adv25-reels
    {
      id: 23,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Você trabalha, trabalha e o dinheiro não vem?Descubra o motivo fazendo
          um <span className="text-[#c0964b]">diagnóstico gratuito!</span>
        </span>
      ),
    },
    // oro_mar24-leads-adv94-v1
    {
      id: 24,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Faça seu diagnóstico de dependência emocional de forma gratuita e{" "}
          <span className="text-[#c0964b]">
            descubra o padrão controlador que bloqueia seus resultados
          </span>
        </span>
      ),
    },
    // oro_mar24-cadastros-opc-adv02-reels
    {
      id: 25,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          <span className="text-[#c0964b]">
            Você está trabalhando duro e não vê dinheiro?
          </span>{" "}
          Descubra o que falta para resolver isso de uma vez por todas!
        </span>
      ),
    },
    // oro-leads-adv26-reels
    {
      id: 26,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Descubra exatamente o nível de sua{" "}
          <span className="text-[#c0964b]">dependência emocional</span> e como
          isso afeta diretamente seu sucesso financeiro.
        </span>
      ),
    },
    // oro_mar25-leads-adv014f-reels
    {
      id: 27,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Aprenda como lidar e resolver sua relação com pessoas narcisistas
          através de um{" "}
          <span className="text-[#c0964b]">método prático e comprovado</span>
        </span>
      ),
    },
    // oro_mar25-leads-adv058f--reels
    {
      id: 28,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Faça{" "}
          <span className="text-[#c0964b]">GRATUITAMENTE o Diagnóstico</span>{" "}
          que revela por que você ainda não ganha o dinheiro que merece!
        </span>
      ),
    },
    // oro_jun24-leads-adv54-feed + oro_mar25-leads-adv027f-reels
    {
      id: 29,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Tenha acesso a protocolos práticos que já{" "}
          <span className="text-[#c0964b]">
            transformaram a vida financeira, pessoal e emocional
          </span>{" "}
          de milhares de pessoas.
        </span>
      ),
    },
    //  AD1 – https://www.instagram.com/p/DJibMCtMrtc/
    {
      id: 30,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          <span className="text-[#c0964b]">
            Esqueça todas as técnicas, ferramentas e conceitos de negócio.
          </span>{" "}
          A primeira coisa a se fazer para alcançar o sucesso profissional e
          financeiro é um diagnóstico de dependência emocional.{" "}
          <span className="text-[#c0964b]">Forma gratuita.</span>
        </span>
      ),
    },
    //  AD2 – https://www.instagram.com/p/DKQvRdqstur/
    {
      id: 31,
      isLogo: true,
      title: (
        <>
          <h2 className="text-[#e5e7eb] text-3xl md:text-4xl font-bold mb-1">
            Quem vive sem limites nas relações,{" "}
            <span className="text-[#c0964b]">
              vive com limites nos resultados.
            </span>{" "}
          </h2>
        </>
      ),
      text: (
        <span className="text-3xl md:text-4xl">
          Faça o teste de dependência emocional para identificar os seus
          bloqueios de permissão e começar a viver uma vida memorável.
        </span>
      ),
    },
    //  AD3 – https://www.instagram.com/p/DJmkKLnsnRI/
    {
      id: 32,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Teste seu nível de{" "}
          <span className="text-[#c0964b]">dependência emocional</span> e
          descubra como o peso dos problemas dos outros pode estar puxando seus
          resultados para baixo.
        </span>
      ),
    },
    {
      id: 33,
      isLogo: true,
      title: (
        <>
          <h2 className="text-[#e5e7eb] text-3xl md:text-4xl font-bold mb-1">
            Já reparou que gente mais despreparada que você{" "}
            <span className="text-[#c0964b] font-bold">
              está indo mais longe?
            </span>
          </h2>
        </>
      ),
      text: (
        <span className="text-xl md:text-2xl">
          O que te faz ficar para trás não é falta de competência:{" "}
          <span className="text-[#c0964b] font-bold">
            é falta de permissão.
          </span>
        </span>
      ),
    },
    {
      id: 34,
      isLogo: true,
      title: (
        <>
          <h2 className="text-[#e5e7eb] text-3xl md:text-4xl font-bold mb-1">
            Tem gente que estudou menos, errou mais e mesmo assim{" "}
            <span className="text-[#c0964b] font-bold">
              ganha mais do que você.
            </span>
          </h2>
        </>
      ),
      text: (
        <span className="text-xl md:text-2xl">
          Isso tem uma explicação.{" "}
          <span className="text-[#c0964b] font-bold">
            E você precisa descobrir qual é.
          </span>
        </span>
      ),
    },
    {
      id: 35,
      isLogo: true,
      title: (
        <>
          <h2 className="text-[#e5e7eb] text-3xl md:text-4xl font-bold mb-1">
            Você vê pessoas com metade da sua bagagem tendo o{" "}
            <span className="text-[#c0964b]">dobro de resultado?</span>
          </h2>
        </>
      ),
      text: (
        <span className="text-xl md:text-2xl">
          Isso só é normal pra quem ainda não entendeu o que é{" "}
          <span className="text-[#c0964b] font-bold">permissão.</span>
        </span>
      ),
    },
    {
      id: 36,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          Descubra exatamente o que está travando os seus ganhos financeiros e
          como superá-los{" "}
          <span className="text-[#c0964b] font-bold">
            sem precisar trabalhar mais ou estudar mais.
          </span>
        </span>
      ),
    },
    {
      id: 37,
      isLogo: true,
      title: (
        <>
          <h2 className="text-[#e5e7eb] text-3xl md:text-4xl font-bold mb-1">
            Chega de dar o seu máximo e no fim ficar se perguntando o que
            faltou.
          </h2>
        </>
      ),
      text: (
        <span className="text-xl md:text-2xl">
          É hora de começar{" "}
          <span className="text-[#c0964b] font-bold">
            a vida memorável com que você sempre sonhou.
          </span>
        </span>
      ),
    },
    {
      id: 38,
      isLogo: true,
      title: <></>,
      text: (
        <span className="text-3xl md:text-4xl">
          <span className="text-[#c0964b] font-bold">
            Eu quebrei 17 vezes. Na décima oitava vez, deu certo. E o segredo
            está aqui.
          </span>
        </span>
      ),
    },
    {
      id: 39,
      isLogo: true,
      title: (
        <>
          <h2 className="text-[#e5e7eb] text-3xl md:text-4xl font-bold mb-1">
            O RESULTADO QUE VOCÊ QUER ESTÁ NA PERMISSÃO{" "}
            <span className="text-[#c0964b]">QUE VOCÊ NÃO TEM</span>
          </h2>
        </>
      ),
      text: (
        <span className="text-xl md:text-2xl">
          Descubra como aumentar sua Permissão e quebrar os{" "}
          <span className="text-[#c0964b] font-bold">
            padrões que te impedem de conquistar o que você deseja
          </span>
        </span>
      ),
    },
    {
      id: "J1",
      isLogo: true,
      title: (
        <>
          <h2 className="text-[#e5e7eb] text-3xl md:text-4xl font-bold mb-1">
            O RESULTADO QUE VOCÊ QUER ESTÁ NA PERMISSÃO{" "}
            <span className="text-[#c0964b]">QUE VOCÊ NÃO TEM</span>
          </h2>
        </>
      ),
      text: (
        <span className="text-xl md:text-2xl">
          Descubra como aumentar sua Permissão e quebrar os{" "}
          <span className="text-[#c0964b] font-bold">
            padrões que te impedem de conquistar o que você deseja
          </span>
        </span>
      ),
    },
  ];

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

      console.log("payload ======>", payload);

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
    <section
      id="hero"
      className={`relative flex items-center bg-[#fff] overflow-hidden mb-[-50px] lg:mb-[-150px] z-0`}
    >
      <div className="container mx-auto px-4 pb-20 md:pb-32 pt-10 md:pt-16 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-12 z-[0]">
          {/* Coluna da esquerda - Formulário */}
          <div className="w-full md:w-1/2 lg:w-2/5 text-center md:text-left z-10">
            {isLogo && (
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
            )}
            <div className="mt-4 mb-2">
              {!titleRedLine ? (
                <>
                  <p className="text-[#104448] text-xl mb-1 font-bold">
                    Faça seu diagnóstico de
                  </p>
                  <h2 className="text-[#C0964B] text-3xl md:text-4xl font-bold mb-1">
                    DEPENDÊNCIA
                  </h2>
                  <h2 className="text-[#C0964B] text-3xl md:text-4xl font-bold mb-1">
                    EMOCIONAL
                  </h2>
                  <p className="text-[#104448] text-2xl block md:inline font-bold">
                    GRATUITO
                  </p>
                </>
              ) : (
                <>{titleRedLine}</>
              )}
            </div>

            <p className="text-[#05242C] mb-4 max-w-md mx-auto md:mx-0 font-bold">
              {redLine ? (
                <span className="text-[#05242C] text-lg md:text-2xl">
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
            <form
              onSubmit={handleSubmit}
              id="cadastro"
              name={launch}
              className="space-y-4 max-w-md mx-auto md:mx-0"
            >
              <div>
                <input
                  type="email"
                  id="form-field-email"
                  placeholder="Seu melhor e-mail"
                  className="w-full px-4 py-3 rounded-full border border-[#104448] bg-[#f4f0e1]/90 text-[#104448] placeholder:text-[#104448]"
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
                    className="py-3 pl-10 pr-2 rounded-l-full bg-[#E8E4D6] text-[#07242c] border-r-0 border border-[#104448] focus:ring-0 focus:outline-none"
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
                    className="flex-1 px-4 py-3 rounded-r-full bg-[#f4f0e1]/90 text-[#07242c] focus:outline-none border-l-0 border border-[#104448] placeholder:text-[#104448]"
                    value={whatsapp}
                    onChange={handleChange}
                    name="whatsapp"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#104448] font-bold text-white py-3 px-6 rounded-full transition-all hover:brightness-110 uppercase text-sm tracking-wider"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "PROCESSANDO..."
                  : success
                  ? "SUCESSO! AGUARDE..."
                  : "PARTICIPAR GRATUITAMENTE"}
              </button>
            </form>

            <p className="text-[#07242C] text-lg font-bold mt-4 text-center md:text-left">
              ONLINE E GRATUITO. 24, 25 e 26/11 - 19h55
            </p>
          </div>

          {/* Coluna da direita - Imagem Hero */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="w-full">
              <div className="inset-0 flex items-center justify-center md:justify-end">
                <Image
                  src="/images/v8/Resgate-dos-Otimistas-Dependencia-emocional.png"
                  alt="Mentor e histórias de transformação"
                  width={1335}
                  height={822}
                  priority
                  className="object-contain select-none pointer-events-none scale-150"
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
  );
}
