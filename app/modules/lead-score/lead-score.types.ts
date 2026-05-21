export type AnswerValue = string | string[];

export interface BackendOption {
  option_id: string;
  option_key: string;
  option_text: string;
  display_order: number;
  weight?: number | string | null;
  option_score?: number | string | null;
  option_weight?: number | string | null;
  points?: number | string | null;
}

export interface BackendQuestion {
  question_id: string;
  question_key: string;
  question_text: string;
  input_type: string;
  display_order: number;
  required: boolean;
  options?: BackendOption[];
}

export interface BackendQuestionsResponse {
  form_version_id: string;
  questions: BackendQuestion[];
}

export interface QuizOption {
  value: string;
  label: string;
  optionId: string;
  points?: number;
}

export interface QuizQuestion {
  id: string;
  key: string;
  question: string;
  inputType: string;
  required: boolean;
  options: QuizOption[];
}

export interface LeadScoreAnswerPayload {
  question_id: string;
  option_id?: string;
  answer_text?: string;
  answer_number?: number;
  answer_bool?: boolean;
  answered_at: string;
}

export interface LeadScoreStartPayload {
  lead_registration_request_id: string;
  form_version_id: string;
  submitted_at: string;
  answers: LeadScoreAnswerPayload[];
  raw_payload: {
    source: string;
    step: string;
  };
}

export interface QuestTesteUrlContext {
  formVersionId: string;
  leadRegistrationRequestId: string;
  temperature: string;
  theme: string;
}
