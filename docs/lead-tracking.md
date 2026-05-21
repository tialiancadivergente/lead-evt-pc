# Lead Tracking

Este projeto inclui um utilitário para replicar o script de tracking de leads (coleta de UTMs, cookies e dados de navegação) de forma reutilizável em React/Next.js.

## Estrutura

- `lib/tracking/leadTracking.ts`: funções puras para montar parâmetros, enviar o evento ao webhook e publicar o resultado no `dataLayer`.
- `app/hooks/useLeadTracking.ts`: hook que injeta o utilitário em componentes client-side, reaproveitando o IP capturado pelo hook existente `useUserIP`.
- `lib/config/tracking.ts`: valores padrão (com suporte a variáveis `NEXT_PUBLIC_*`) para URL, evento e GA4.

## Uso Básico

```tsx
import useLeadTracking from "@/app/hooks/useLeadTracking";
import { TRACKING_EVENT_ID } from "@/lib/config/tracking";

const { trackLead } = useLeadTracking({ eventId: TRACKING_EVENT_ID });

const handleSubmit = async () => {
  // ... lógica de submissão

  void trackLead({
    leadEmail: email,
    leadPhone: phone,
    extraParams: { source: "landing-v1" },
  });
};
```

O hook cuida de:

- Combinar UTMs, cookies (`_ga`, `_fbp`, `_gcl_*`, `ttclid`, etc.) e dados de navegação
- Reaproveitar o IP obtido em `/api/get-ip`
- Publicar o resultado no `dataLayer` (`event: "web_tracking_response"`)
- Fazer fallback com `Image()` caso o `fetch` falhe

## Customização

Passe valores específicos ao hook ou diretamente a `sendLeadTracking`:

- `baseUrl`: altera o endpoint (padrão: `https://webhooks.o-meu-gps.com/webhook/lead`)
- `eventName`: nome do evento (padrão: `lead`)
- `eventId`: ID único do evento (opcional)
- `gaPropertyId`: ID GA4 utilizado para derivar o cookie `_ga_<ID>`
- `defaultExtraParams`: pares chave/valor adicionados em toda chamada `trackLead`

Para ambientes, defina as variáveis:

```
NEXT_PUBLIC_TRACKING_BASE_URL
NEXT_PUBLIC_TRACKING_EVENT_NAME
NEXT_PUBLIC_TRACKING_EVENT_ID
NEXT_PUBLIC_TRACKING_GA_ID
NEXT_PUBLIC_TRACKING_SECONDARY_WEBHOOK
NEXT_PUBLIC_TRACKING_LEADSCORE_SUMMARY_WEBHOOK
NEXT_PUBLIC_TRACKING_LEADSCORE_RESPONSES_WEBHOOK
NEXT_PUBLIC_TRACKING_LEADSCORE_EVENT_NAME
NEXT_PUBLIC_TRACKING_LEADSCORE_EVENT_ID
NEXT_PUBLIC_TRACKING_PAGEVIEW_WEBHOOK
NEXT_PUBLIC_TRACKING_PAGEVIEW_EVENT_NAME
NEXT_PUBLIC_TRACKING_PAGEVIEW_EVENT_ID
NEXT_PUBLIC_TRACKING_PAGEVIEW_DELAYED_WEBHOOK
```

## Uso direto (sem hook)

```ts
import { sendLeadTracking } from "@/lib/tracking/leadTracking";

await sendLeadTracking(
  { eventName: "lead", eventId: "form-xpto" },
  { leadEmail: email, extraParams: { stage: "quiz" } },
);
```

Nesse cenário, lembre-se de passar `ipAddress` caso já tenha o valor em mãos.

## LeadScore (Quiz)

O arquivo `lib/tracking/leadScoreTracking.ts` replica o snippet antigo do LeadScore:

- Captura cookies `_ga` e `_ga_<property>`
- Envia respostas `pergunta01` … `pergunta10`, `resultado_v2`, `pontuacao_v2`
- Usa fallback com `Image()` em caso de falha

No fluxo do quiz (`app/quiz/[form]/page.tsx`), ao completar o formulário chamamos:

```ts
await sendLeadScoreTracking({
  baseUrl: TRACKING_LEADSCORE_RESPONSES_WEBHOOK,
  gaPropertyId: TRACKING_GA_PROPERTY_ID,
  answers: leadScoreAnswers,
  resultadoV2: faixaV2,
  pontuacaoV2: Math.round(totalScoreV2),
});
```

No quiz, enviados dois webhooks sequenciais antes do proxy:

1. `TRACKING_LEADSCORE_SUMMARY_WEBHOOK` (via `sendLeadTracking`), incluindo UTMs, cookies e dados agregados (faixa, pontuação, launch etc.).
2. `TRACKING_LEADSCORE_RESPONSES_WEBHOOK` (via `sendLeadScoreTracking`), com as respostas das dez perguntas e o resumo (`resultado_v2`, `pontuacao_v2`).

As respostas são montadas dinamicamente a partir das perguntas exibidas ao usuário, mantendo os payloads esperados pelo n8n.

## Page View

Em `components/hero-section.tsx` disparamos, no carregamento do componente, um evento `page_view` reaproveitando `sendLeadTracking`:

```ts
await sendLeadTracking(
  {
    baseUrl: TRACKING_PAGEVIEW_WEBHOOK,
    eventName: TRACKING_PAGEVIEW_EVENT_NAME,
    eventId,
    gaPropertyId: TRACKING_GA_PROPERTY_ID,
  },
  {
    ipAddress: userIp ?? null,
    extraParams: {
      launch,
      temperature: temperatura ?? undefined,
      tipo: tipo ?? undefined,
      version: versao ?? undefined,
    },
  },
);
```

Além do disparo imediato, agendamos outro hit para 1,5s depois (usando `TRACKING_PAGEVIEW_DELAYED_WEBHOOK`) para garantir que cookies como `_gcl_*` estejam disponíveis antes de enviar ao n8n.


