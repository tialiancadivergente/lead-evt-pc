export interface QuestionOption {
  value: string;
  label: string;
  weight: number;
  weightV2?: number;
}

export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
  type?: string;
  placeholder?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Em qual faixa etária você se encaixa?",
    options: [
      { value: "18-24", label: "18-24", weight: 7.13, weightV2: 10.6 },
      { value: "25-35", label: "25-35", weight: 14.78, weightV2: 16.48 },
      { value: "36-45", label: "36-45", weight: 19.25, weightV2: 18.68 },
      { value: "46-55", label: "46-55", weight: 18.55, weightV2: 24.07 },
      { value: "56+", label: "56 ou mais", weight: 14.6, weightV2: 26.52 },
    ],
  },
  {
    id: 2,
    question: "Qual é o seu nível de escolaridade?",
    options: [
      { value: "fundamental1", label: "Ensino Fundamental 1 (1º ao 5º ano)", weight: 6.42, weightV2: 14.5 },
      { value: "fundamental2", label: "Ensino Fundamental 2 (6º ao 9º ano)", weight: 7.64, weightV2: 18.6 },
      { value: "medio", label: "Ensino Médio (1º ao 3º)", weight: 8.88, weightV2: 15.37 },
      { value: "superior-incompleto", label: "Ensino Superior Incompleto", weight: 14.1, weightV2: 12.01 },
      { value: "superior", label: "Ensino Superior (Graduação/Faculdade)", weight: 20.95, weightV2: 28.6 },
      { value: "pos", label: "Pós-Graduação", weight: 23.97, weightV2: 35.8 },
      { value: "mestrado", label: "Mestrado", weight: 37.31, weightV2: 54.1 },
      { value: "doutorado", label: "Doutorado", weight: 31.24, weightV2: 56.8 },
    ],
  },
  {
    id: 3,
    question: "Qual seu sexo?",
    options: [
      { value: "feminino", label: "Sou do sexo Feminino", weight: 12.86, weightV2: 0 },
      { value: "masculino", label: "Sou do sexo Masculino", weight: 22.18, weightV2: 0 },
    ],
  },
  {
    id: 4,
    question: "Qual seu estado civil?",
    options: [
      { value: "solteiro", label: "Solteiro(o)", weight: 14.39, weightV2: 21.83 },
      { value: "casado", label: "Casado(o)", weight: 14.57, weightV2: 20.58 },
      { value: "separado", label: "Separado(o)", weight: 19.99, weightV2: 24.37 },
      { value: "viuvo", label: "Viúvo(o)", weight: 14.63, weightV2: 12.01 },
    ],
  },
  {
    id: 5,
    question: "Você tem filhos?",
    options: [
      { value: "sim", label: "Sim", weight: 14.68, weightV2: 19.97 },
      { value: "nao", label: "Não", weight: 18.83, weightV2: 28.29 },
    ],
  },
  {
    id: 6,
    question: "Qual das opções representa a sua renda mensal hoje?",
    options: [
      { value: "ate1000", label: "Até R$ 1.000,00", weight: 6.86, weightV2: 14.40 },
      { value: "1101a2500", label: "De R$ 1.101,00 a R$ 2.500,00", weight: 9.82, weightV2: 14.77 },
      { value: "2501a4000", label: "De R$ 2.501,00 a R$ 4.000,00", weight: 16.21, weightV2: 21.60 },
      { value: "4001a10000", label: "De R$ 4.001,00 a R$ 10.000,00", weight: 25.55, weightV2: 32.68 },
      { value: "acima10000", label: "Acima de R$ 10.000,00", weight: 40.83, weightV2: 52.59 },
    ],
  },
  {
    id: 7,
    question: "Você trabalha como (marque o trabalho que te gera mais renda):",
    options: [
      { value: "clt", label: "Funcionário CLT", weight: 8.15, weightV2: 16.72 },
      { value: "pj", label: "Funcionário PJ", weight: 20.61, weightV2: 38.08 },
      { value: "publico", label: "Funcionário Público", weight: 10.4, weightV2: 24.85 },
      { value: "autonomo", label: "Autônomo", weight: 20.61, weightV2: 22.00 },
      { value: "aposentado", label: "Aposentado", weight: 10.26, weightV2: 6.9 },
      { value: "liberal", label: "Profissional Liberal", weight: 31.52, weightV2: 31.76 },
      { value: "empresario", label: "Empresário", weight: 52, weightV2: 46.88 },
      { value: "desempregado", label: "Estou desempregado no momento", weight: 10.44, weightV2: 20.30 },
    ],
  },
  {
    id: 8,
    question: "Com que frequência você se sente sozinho(a)/travado(a) e com baixos resultados?",
    options: [
      { value: "as vezes", label: "Às vezes", weight: 13.96, weightV2: 22.70 },
      { value: "frequentemente", label: "Frequentemente", weight: 22.26, weightV2: 23.59 },
      { value: "sempre", label: "Sempre", weight: 20.94, weightV2: 23.15 },
      { value: "raramente", label: "Raramente", weight: 11.39, weightV2: 18.25 },
      { value: "nunca", label: "Nunca", weight: 6.73, weightV2: 0.00 },
    ],
  },
  {
    id: 9,
    question: "Você já buscou algum tipo de ajuda ou suporte (terapia, coaching, grupos de apoio) para lidar com seus desafios emocionais?",
    options: [
      { value: "sim", label: "Sim", weight: 29.04, weightV2: 33.52 },
      { value: "nao", label: "Não", weight: 8.31, weightV2: 8.71 },
    ],
  },
  {
    id: 10,
    question: "Se sim, o método utilizado foi eficaz?",
    options: [
      { value: "sim", label: "Sim", weight: 13.89, weightV2: 0 },
      { value: "parcialmente", label: "Parcialmente", weight: 23.51, weightV2: 0 },
      { value: "nao", label: "Não", weight: 16.32, weightV2: 18.6 },
      { value: "Nunca fiz", label: "Nunca fiz", weight: 11.24, weightV2: 12.6 },
    ],
  },
  {
    id: 11,
    question: "Você conhece o Elton Euler?",
    options: [
      { value: "sim", label: "Sim", weight: 0, weightV2: 0 },
      { value: "nao", label: "Não", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 12,
    question: "Você conhece a Aliança Divergente?",
    options: [
      { value: "sim", label: "Sim", weight: 0, weightV2: 0 },
      { value: "nao", label: "Não", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 13,
    question: "O que você mais espera mudar ou resolver participando d'O Resgate dos Otimistas?",
    type: "open",
    placeholder: "Digite aqui...",
    options: [],
  },
];