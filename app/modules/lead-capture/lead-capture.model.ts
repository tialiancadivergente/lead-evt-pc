import { z } from "zod";

export interface LeadRegistrationUtms {
  gc_id?: string;
  h_ad_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  target?: string;
  sck?: string;
  url?: string;
  gad_source?: string;
  gad_campaignid?: string;
  gclid?: string;
}

export interface LeadRegistrationCookies {
  _fbc?: string;
  _fbp?: string;
  _gcl_au?: string;
  _gcl_aw?: string;
  _ga?: string;
  ttclid?: string;
}

export interface LeadRegistrationMetadados {
  url?: string;
  referer?: string;
  ip?: string;
  user_agent?: string;
  cookies?: LeadRegistrationCookies;
  temperature?: 'f' | 'm' | 'q' | 'org' | 't';
  form_version_id?: string;
}

export interface LeadRegistrationPayload {
  email: string;
  telefone: string;
  launch: string;
  season: string;
  cpf?: string;
  page?: string;
  path?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  tag_id: string;
  utms?: LeadRegistrationUtms;
  metadados?: LeadRegistrationMetadados;
}

export interface LeadCaptureRequest {
  email: string;
  ddi: string;
  whatsapp: string;
}

export interface LeadCaptureStartResponse {
  queued: boolean,
  queueName: string,
  requestId: string
}

export const leadCaptureFormSchema = z.object({
  email: z.string().trim().email("Informe um e-mail valido."),
  ddi: z.string().min(1, "Selecione um DDI."),
  whatsapp: z.string().trim().min(15, "Informe um WhatsApp valido."),
});

export type LeadCaptureFormValues = z.infer<typeof leadCaptureFormSchema>;
