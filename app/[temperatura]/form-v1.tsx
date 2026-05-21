"use client";

import Header from "@/components/header"
import SplashScreen from '../components/SplashScreen'
import HeroSection from "@/components/hero-section"
import type React from "react"
import { useState, useEffect } from "react"
import { Phone } from "lucide-react"
import Image from "next/image"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import useLeadTracking from "../hooks/useLeadTracking"
import { sendLeadTracking } from "@/lib/tracking/leadTracking"
import {
  TRACKING_BASE_URL,
  TRACKING_EVENT_ID,
  TRACKING_EVENT_NAME,
  TRACKING_GA_PROPERTY_ID,
  TRACKING_SECONDARY_WEBHOOK,
} from "@/lib/config/tracking"


export default function Form() {
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [temperatura, setTemperatura] = useState<string | null>(null)
    const [tipo, setTipo] = useState<string | null>(null)
    const [versao, setVersao] = useState<string | null>(null)
    const [formFields, setFormFields] = useState<Record<string, string> | null>(null)
    const [email, setEmail] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [ddi, setDdi] = useState("+55")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [domain, setDomain] = useState<string>("")
    const [internalVersion, setInternalVersion] = useState<number>();
    const launch = "oro"
    const { trackLead, userIp } = useLeadTracking({
      baseUrl: TRACKING_BASE_URL,
      eventId: TRACKING_EVENT_ID,
      eventName: TRACKING_EVENT_NAME,
      gaPropertyId: TRACKING_GA_PROPERTY_ID,
      defaultExtraParams: {
        launch,
      },
    })
  

  // Capturar o domínio da página
  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window !== 'undefined') {
      const currentDomain = window.location.hostname;
      console.log('Current domain:', currentDomain);
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
        'utm_source', 
        'utm_medium', 
        'utm_campaign', 
        'utm_term', 
        'utm_content',
        'utm_id'
      ];
      
      // Verificar cada parâmetro UTM
      utmKeys.forEach(key => {
        const value = searchParams.get(key);
        if (value) {
          utmParams[key] = value;
          hasUtm = true;
        }
      });
      
      // Adicionar outros parâmetros da query que não são UTM
      searchParams.forEach((value, key) => {
        if (!utmKeys.includes(key) && key !== 'temperatura') {
          utmParams[key] = value;
          hasUtm = true;
        }
      });
      
      // Definir formFields apenas se houver UTMs
      if (hasUtm) {
        console.log('UTM params:', utmParams);
        setFormFields(utmParams);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (params && params.temperatura) {
      console.log('temperatura param', params.temperatura)
      
      // Verificar se params.temperatura não é null ou undefined
      const paramValue = params.temperatura as string;
      if (paramValue) {
        const parts = paramValue.split('-');

        console.log('parts.length:', parts.length)

        if (parts.length === 5) {
          setInternalVersion(2)
        } else {
          setInternalVersion(1)
        }
        
        if (paramValue.indexOf('v1') != -1) {
          const tipoValue = parts[2];
          const versaoValue = parts[1];
          const temperaturaValue = parts[parts.length - 1];
          
          console.log('Tipo:', tipoValue);
          console.log('Versão:', versaoValue);
          console.log('Temperatura:', temperaturaValue);
          
          setTipo(tipoValue);
          setVersao(versaoValue);
          setTemperatura(temperaturaValue);
        } else if (paramValue.indexOf('v9') != -1) {
          const tipoValue = parts[0];
          const versaoValue = parts[1];
          const temperaturaValue = parts[2];
          
          console.log('Tipo:', tipoValue);
          console.log('Versão:', versaoValue);
          console.log('Temperatura:', temperaturaValue);
          
          setTipo(tipoValue);
          setVersao(versaoValue);
          setTemperatura(temperaturaValue);
        } else {
          // Caso o formato não seja o esperado, usar o valor completo como temperatura
          console.log('Formato inesperado, usando valor completo');
          setTemperatura(paramValue);
        }
      } else {
        console.log('params.temperatura é null ou undefined');
      }
    }
  }, [params])

  // Função para construir a URL de redirecionamento
  const buildRedirectUrl = () => {
    // Construir o path base com os valores dinâmicos
    const basePath = `/quiz/${tipo || 'oro'}-${versao || 'v9'}-${temperatura || 'q'}-typ`;
    
    // Iniciar com os parâmetros de email e telefone
    const queryParams = new URLSearchParams();
    queryParams.append('email', email);
    queryParams.append('phone', `${ddi}${whatsapp.replace(/\s+|-|\(|\)|\./g, "")}`);
    
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
    e.preventDefault()
    setIsSubmitting(true)

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
        parametroCompleto: params.temperatura,
        domain,
        uri: domain,
        path: window.location.pathname,
      };
      
      // Adicionar formFields ao payload apenas se existir
      if (formFields) {
        payload.formFields = formFields;
      }
      
      const response = await fetch('/api/register-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Falha ao registrar lead');
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
        parametroCompleto: params.temperatura,
        date: new Date().toISOString() 
      };
      
      // Adicionar formFields aos dados do localStorage apenas se existir
      if (formFields) {
        leadData.formFields = formFields;
      }
      
      const leads = JSON.parse(localStorage.getItem("leads") || "[]")
      leads.push(leadData)
      localStorage.setItem("leads", JSON.stringify(leads))

      const extraTrackingParams = {
        temperature: temperatura ?? undefined,
        tipo: tipo ?? undefined,
        version: versao ?? undefined,
        domain,
        parametroCompleto: (params.temperatura as string) ?? undefined,
        path: typeof window !== "undefined" ? window.location.pathname : undefined,
      }

      await trackLead({
        leadEmail: email,
        leadPhone: fullPhone,
        extraParams: extraTrackingParams,
      })

      if (TRACKING_SECONDARY_WEBHOOK) {
        await sendLeadTracking(
          {
            baseUrl: TRACKING_SECONDARY_WEBHOOK,
            eventId: TRACKING_EVENT_ID,
            eventName: TRACKING_EVENT_NAME,
            gaPropertyId: TRACKING_GA_PROPERTY_ID,
          },
          {
            leadEmail: email,
            leadPhone: fullPhone,
            ipAddress: userIp ?? null,
            extraParams: extraTrackingParams,
          },
        )
      }

      setSuccess(true)
      
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    } finally {
      setIsSubmitting(false)
      
      // Redirecionar após um breve delay para mostrar a mensagem de sucesso
      setTimeout(() => {
        const redirectUrl = buildRedirectUrl();
        console.log('Redirecionando para:', redirectUrl);

        const funnels = {
          q: 'https://sf.aliancadivergente.com.br/sf/?sfunnel=64',
          m: 'https://sf.aliancadivergente.com.br/sf/?sfunnel=61',
          f: 'https://sf.aliancadivergente.com.br/sf/?sfunnel=57',
        }
        
        // Adicionar parâmetros da URL atual
        const currentUrl = new URL(window.location.href);
        const currentParams = new URLSearchParams(currentUrl.search);
        
        // Construir URLs com parâmetros adicionais
        Object.keys(funnels).forEach(key => {
          const url = new URL(funnels[key as keyof typeof funnels]);
          
          // Adicionar todos os parâmetros da URL atual
          currentParams.forEach((value, param) => {
            url.searchParams.append(param, value);
          });
          
          const fullPhone = whatsapp.replace(/\s+|-|\(|\)|\./g, "");
          // Adicionar email, telefone e país
          url.searchParams.append('email', email);
          url.searchParams.append('phone', fullPhone);
          url.searchParams.append('country', ddi.replace('+', ''));
          
          // Atualizar a URL no objeto funnels
          funnels[key as keyof typeof funnels] = url.toString();
        });

        // if (versao === 'v9') {
        //   if (Object.keys(funnels).includes(temperatura || '')) {
        //     window.location.href = funnels[temperatura as keyof typeof funnels];
        //     return; // Interrompe a execução para evitar o redirecionamento padrão
        //   }
        // }

        // Adicionar entrada ao histórico de navegação antes do redirecionamento completo
        if (typeof window !== 'undefined') {
          window.history.pushState({}, '', redirectUrl);
        }
        
        // Usar window.location.href para navegação completa
        if (typeof window !== 'undefined') {
          window.location.href = redirectUrl;
        }
      }, 1500);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "whatsapp") {
      // Remove todos os caracteres não numéricos
      const numericValue = value.replace(/\D/g, "");
      
      // Aplica a formatação de acordo com a quantidade de dígitos
      let formattedValue = numericValue;
      
      setWhatsapp(formattedValue);
    } else {
      setWhatsapp(value);
    }
  };


    return (
        <SplashScreen>
            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');
        .font-raleway {
          font-family: 'Raleway', sans-serif;
        }
        @media (max-width: 768px) {
          .slice-1 {
            min-height: 780px;
            background-image: url('/images/Elton-Euler-Resgate-dos-Otimistas-Mobile-Slice-1.webp');
            padding: 4rem 1rem;
          }
          p {
            font-size: 1rem;
          }
        }
        @media (max-width: 768px) {
          .slice-1 {
            min-height: 780px;
          }
          .slice-2 {
            background-image: url('/images/Elton-Euler-Resgate-dos-Otimistas-Mobile-Slice-2.webp');
            min-height: 880px;
            padding: 5rem 2rem;
          }
          .slice-3 {
            background-image: url('/images/Elton-Euler-Resgate-dos-Otimistas-Mobile-Slice-3.webp');
            min-height: 2369px;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .slice-1 {
            min-height: 600px;
          }
          .slice-2 {
            min-height: 550px;
          }
          .slice-3 {
            min-height: 1100px;
          }
        }
        @media (min-width: 1025px) {
          .slice-1 {
            min-height: 812px;
          }
          .slice-2 {
            min-height: 734px;
          }
          .slice-3 {
            min-height: 1429px;
          }
        }
        @media (min-width: 2000px) {
          .slice-1 {
            min-height: 1000px;
          }
          .slice-2 {
            min-height: 800px;
          }
          .slice-3 {
            min-height: 1700px;
          }
        }
        @media (min-width: 2400px) {
          .slice-1 {
            min-height: 1200px;
          }
          .slice-2 {
            min-height: 950px;
          }
          .slice-3 {
            min-height: 1950px;
          }
        }
      `}</style>
            <main className="flex flex-col gap-0 w-full font-raleway">
                <div className="slice-1 min-h-screen bg-[url('/images/Elton-Euler-Resgate-dos-Otimistas-Desktop-Slice-1.webp')] bg-cover bg-top bg-center bg-no-repeat m-0 p-0 border-none flex-grow flex flex-col justify-end items-center text-white">
                    <div className="max-w-[680px] mx-auto">
                      {internalVersion === 1 && (
                        <>
                          <h1 className="text-2xl md:text-3xl mb-2 text-left md:text-center">FAÇA SEU <span className="font-semibold">DIAGNÓSTICO DE <br /> DEPENDÊNCIA EMOCIONAL</span> GRATUITO</h1>
                          <p className="mb-4 text-2xl text-left md:text-center">Descubra como <span className="font-bold">aumentar seu nível de permissão</span> e melhorar seus resultados nas finanças, nos relacionamentos e na saúde</p>
                        </>
                      )}

                      {internalVersion === 2 && (
                        <>
                          <h1 className="text-3xl md:text-5xl mb-2 text-left md:text-center text-[#F89500]">De otimista a <span className="font-bold">bem-sucedido!</span></h1>
                          <p className="mb-4 text-2xl text-left md:text-center">Descubra como <span className="font-bold">aumentar seu nível de permissão</span> e melhorar seus resultados nas finanças, nos relacionamentos e na saúde</p>
                        </>
                      )}
                    </div>
                    <form onSubmit={handleSubmit} id="cadastro" name={launch} className="flex flex-col items-center w-full max-w-md">
                        <input 
                            type="email"
                            id="form-field-email"
                            placeholder="Digite seu melhor e-mail:" 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mb-3 p-3 w-full border border-white rounded bg-transparent text-white placeholder-white font-medium" />
                        <input
                            type="tel"
                            id="form-field-telefone"
                            value={whatsapp}
                            onChange={handleChange}
                            name="whatsapp"
                            required
                            placeholder="WhatsApp com DDD - Ex: (11) 98765-1234" 
                            className="mb-3 p-3 w-full border border-white rounded bg-transparent text-white placeholder-white font-medium" />
                        <button type="submit" className="bg-[#F89500] w-full hover:bg-orange-600 text-white py-3 px-6 rounded font-bold">{isSubmitting ? "PROCESSANDO..." : success ? "SUCESSO! AGUARDE..." : "PARTICIPAR GRATUITAMENTE"}</button>
                    </form>
                    <p className="mt-3 text-xl text-[#F89500] font-semibold">ONLINE E GRATUITO. 01, 02 e 03/09 - 19h55</p>
                </div>
                <div className="slice-2 min-h-screen w-full bg-[url('/images/Elton-Euler-Resgate-dos-Otimistas-Desktop-Slice-2.webp')] bg-cover bg-center bg-no-repeat m-0 p-0 border-none flex justify-center text-center">
                    <div className="mx-auto mt-40 max-w-[680px]">
                        <h2 className="font-semibold mb-4 text-[#555555] md:text-center text-left md:text-4xl text-3xl">Que bom que você não desistiu.</h2>
                        <p className="text-lg md:text-center text-left md:text-lg text-base">Chega de dar o seu máximo e no fim ficar se questionando o que faltou. Depois desse evento você nunca mais vai se perguntar o que falta para você ter o resultado merecido pelo seu esforço. Faça parte do Resgate dos Otimistas ou continue se questionando e justificando o seu "quase sucesso".</p>
                    </div>
                </div>
                <div className="slice-3 min-h-screen w-full bg-[url('/images/Elton-Euler-Resgate-dos-Otimistas-Desktop-Slice-3.webp')] bg-cover bg-center bg-no-repeat m-0 p-0 border-none flex justify-center text-left">
                    <div className="max-w-[1200px] p-8 text-white md:grid md:grid-cols-2 md:gap-8">
                        <div className="col-span-1 hidden md:block">
                            {/* Coluna esquerda vazia - visível apenas em desktop */}
                        </div>
                        <div className="md:col-span-1 w-full mt-[550px] md:mt-0">
                            <h2 className="text-4xl font-normal mb-4">Elton Euler</h2>
                            <p className="text-base mb-4 font-extralight">"Eu não dei certo na vida ensinando as pessoas a serem bem sucedidas. Eu dei certo antes, mas logo percebi que tinha muitas pessoas vivendo como eu vivia antes, sendo otimistas sem resultado. Foi quando eu decidi começar a fazer por elas o que eu tinha conseguido fazer por mim e uma das coisas que eu mais amo hoje é resgatar otimistas sem resultados e mostrar para eles o que falta para eles se tornarem pessoas bem sucedidas".</p>
                            <p className="text-base mb-4">Elton é um dos grandes exemplos de persistência e superação da atualidade. Alguém que conhece bem a dor de ser um otimista sem resultados. Antes de se tornar um multimilionário e uma referência no desenvolvimento humano, Elton quebrou 17 vezes, chegou a acreditar que sucesso não era pra ele. Desistiu de empreender e procurou emprego até perceber que "otimista uma vez, otimista para sempre".</p>
                            <p className="text-base mb-4">Ao perceber que não conseguiria viver como uma "pessoa normal" e que aquele emprego não pagaria suas dívidas, suas contas e nem realizaria seus sonhos, Elton decidiu retornar ao mundo dos negócios e tentar dar a volta por cima. Mas sabia que daquela vez só o otimismo não seria suficiente. Ele precisaria encontrar o que estava faltando.</p>
                            <p className="text-base mb-4">Ao descobrir, ele conseguiu sair das dívidas e se tornar um milionário em menos de 3 anos, e já apoiou mais de 60 mil pessoas em 40 países com suas técnicas e métodos que ele passa com uma clareza única, e que certamente irão mudar a sua forma de ver o mundo e os resultados que você extrai dele.</p>
                            <p className="text-base mb-4">Terapeuta, empresário, escritor e pesquisador, Elton é uma daquelas pessoas que tem o poder de te mostrar o que ninguém conseguiu e te fazer entender claramente o que fazer. Se você for estiver vivendo como um(a) otimista sem resultados, tudo que você precisa hoje é de um encontro com ele.</p>
                            <p className="text-base mb-4">Você pode ser o(a) próximo otimista a ser resgatado por ele. Não perca essa oportunidade.</p>
                            <br />
                            <a href="#formulario" className="bg-[#F89500] hover:bg-orange-600 text-white py-5 px-11 rounded-full font-bold shadow-[0_0_15px_rgba(248,149,0,0.7)] hover:shadow-[0_0_20px_rgba(248,149,0,0.9)]">Participar Gratuitamente</a>
                        </div>
                    </div>
                </div>
            </main>
        </SplashScreen>
    )
} 