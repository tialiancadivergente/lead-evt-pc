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
  phrase?: string;
}

export const questionsQv: Question[] = [
  {
    id: 1,
    question: "Em qual faixa etária você se encaixa?",
    options: [
      { value: "18-24", label: "18-24", weight:0, weightV2: 0},
      { value: "25-35", label: "25-35", weight:0, weightV2: 0},
      { value: "36-45", label: "36-45", weight:0, weightV2: 0},
      { value: "46-55", label: "46-55", weight:0, weightV2: 0},
      { value: "56+", label: "56 ou mais", weight:0, weightV2: 0},
    ],
  },
  {
    id: 2,
    question: "Qual é o seu nível de escolaridade?",
    options: [
      { value: "fundamental1", label: "Ensino Fundamental 1 (1º ao 5º ano)", weight: 0, weightV2: 0},
      { value: "fundamental2", label: "Ensino Fundamental 2 (6º ao 9º ano)", weight: 0, weightV2: 0},
      { value: "medio", label: "Ensino Médio (1º ao 3º)", weight: 0, weightV2: 0},
      { value: "superior-incompleto", label: "Ensino Superior Incompleto", weight: 0, weightV2: 0},
      { value: "superior", label: "Ensino Superior (Graduação/Faculdade)", weight: 0, weightV2: 0},
      { value: "pos-mestrado-doutorado", label: "Pós-Graduação Mestrado Doutorado", weight: 0, weightV2: 0},
    ],
  },
  {
    id: 3,
    question: "Qual seu sexo?",
    options: [
      { value: "feminino", label: "Sou do sexo Feminino", weight: 0, weightV2: 0 },
      { value: "masculino", label: "Sou do sexo Masculino", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 4,
    question: "Qual seu estado civil?",
    options: [
      { value: "solteiro", label: "Solteira(o)", weight: 0, weightV2: 0 },
      { value: "casado", label: "Casada(o)", weight: 0, weightV2: 0 },
      { value: "viuvo", label: "Viúva(o)", weight: 0, weightV2: 0 },
      { value: "separado", label: "Separada(o)", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 5,
    question: "Você tem filhos?",
    options: [
      { value: "sim", label: "Sim", weight: 0, weightV2: 0 },
      { value: "nao", label: "Não", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 6,
    question: "Qual das opções representa a sua renda mensal hoje?",
    options: [
      { value: "ate1000", label: "Até R$ 1.000,00", weight: 0, weightV2: 0 },
      { value: "1101a2500", label: "De R$ 1.101,00 a R$ 2.500,00", weight: 0, weightV2: 0 },
      { value: "2501a4000", label: "De R$ 2.501,00 a R$ 4.000,00", weight: 0, weightV2: 0 },
      { value: "4001a10000", label: "De R$ 4.001,00 a R$ 10.000,00", weight: 0, weightV2: 0 },
      { value: "acima10000", label: "Acima de R$ 10.000,00", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 7,
    question: "Você trabalha como (marque o trabalho que te gera mais renda):",
    options: [
      { value: "clt", label: "Funcionário CLT", weight: 0, weightV2: 0 },
      { value: "pj", label: "Funcionário PJ", weight: 0, weightV2: 0 },
      { value: "publico", label: "Funcionário Público", weight: 0, weightV2: 0 },
      { value: "autonomo", label: "Autônomo", weight: 0, weightV2: 0 },
      { value: "aposentado", label: "Aposentado", weight: 0, weightV2: 0 },
      { value: "liberal", label: "Profissional Liberal", weight: 0, weightV2: 0 },
      { value: "empresario", label: "Empresário", weight: 0, weightV2: 0 },
      { value: "desempregado", label: "Estou desempregado no momento", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 8,
    question: "Com que frequência você se sente sozinho(a)/travado(a) e com baixos resultados?",
    options: [
      { value: "nunca", label: "Nunca", weight: 0, weightV2: 0 },
      { value: "raramente", label: "Raramente", weight: 0, weightV2: 0 },
      { value: "as vezes", label: "Às vezes", weight: 0, weightV2: 0 },
      { value: "frequentemente", label: "Frequentemente", weight: 0, weightV2: 0 },
      { value: "sempre", label: "Sempre", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 9,
    question: "Você já buscou algum tipo de ajuda ou suporte (terapia, coaching, grupos de apoio) para lidar com seus desafios emocionais?",
    options: [
      { value: "sim", label: "Sim", weight: 0, weightV2: 0 },
      { value: "nao", label: "Não", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 10,
    question: "Se sim, o método utilizado foi eficaz?",
    options: [
      { value: "sim", label: "Sim", weight: 0, weightV2: 0 },
      { value: "parcialmente", label: "Parcialmente", weight: 0, weightV2: 0 },
      { value: "nao", label: "Não", weight: 0, weightV2: 0 },
      { value: "Nunca fiz", label: "Nunca fiz", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 11,
    question: "Quanto essa afirmação condiz com você?",
    phrase: "Me sinto plenamente realizado(a) com meus relacionamentos e minha vida familiar.",
    options: [
      { value: "condizTotalmenteComigo", label: "Condiz totalmente comigo", weight: 0, weightV2: 0 },
      { value: "condizParcialmenteComigo", label: "Condiz parcialmente comigo", weight: 0, weightV2: 0 },
      { value: "naoCondizComigo", label: "Não condiz comigo", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 12,
    question: "Quanto essa afirmação condiz com você?",
    phrase: "Minha saúde física e mental está excelente.",
    options: [
      { value: "condizTotalmenteComigo", label: "Condiz totalmente comigo", weight: 0, weightV2: 0 },
      { value: "condizParcialmenteComigo", label: "Condiz parcialmente comigo", weight: 0, weightV2: 0 },
      { value: "naoCondizComigo", label: "Não condiz comigo", weight: 0, weightV2: 0 },
    ],
  },
  {
    id: 13,
    question: "Quanto essa afirmação condiz com você?",
    phrase: "Tenho ótimos resultados e sinto que estou no caminho certo em relação à minha vida financeira.",
    options: [
      { value: "condizTotalmenteComigo", label: "Condiz totalmente comigo", weight: 0, weightV2: 0 },
      { value: "condizParcialmenteComigo", label: "Condiz parcialmente comigo", weight: 0, weightV2: 0 },
      { value: "naoCondizComigo", label: "Não condiz comigo", weight: 0, weightV2: 0 },
    ],
  },
  
  {
    id: 14,
    question: "Quanto essa afirmação condiz com você?",
    phrase: "Vejo gente com menos preparo, menos esforço… e mesmo assim ganhando mais do que eu.",
    options: [
      { value: "condizTotalmenteComigo", label: "Condiz totalmente comigo", weight: 0, weightV2: 0 },
      { value: "condizParcialmenteComigo", label: "Condiz parcialmente comigo", weight: 0, weightV2: 0 },
      { value: "naoCondizComigo", label: "Não condiz comigo", weight: 0, weightV2: 0 },
    ],
  },
  
  {
    id: 15,
    question: "Quanto essa afirmação condiz com você?",
    phrase: "Sempre que o dinheiro começa a sobrar um pouco… aparece um novo pepino pra resolver.",
    options: [
      { value: "condizTotalmenteComigo", label: "Condiz totalmente comigo", weight: 0, weightV2: 0 },
      { value: "condizParcialmenteComigo", label: "Condiz parcialmente comigo", weight: 0, weightV2: 0 },
      { value: "naoCondizComigo", label: "Não condiz comigo", weight: 0, weightV2: 0 },
    ],
  },
  
  {
    id: 16,
    question: "Quanto essa afirmação condiz com você?",
    phrase: "A opinião de familiares, amigos ou conhecidos ainda define as minhas decisões.",
    options: [
      { value: "condizTotalmenteComigo", label: "Condiz totalmente comigo", weight: 0, weightV2: 0 },
      { value: "condizParcialmenteComigo", label: "Condiz parcialmente comigo", weight: 0, weightV2: 0 },
      { value: "naoCondizComigo", label: "Não condiz comigo", weight: 0, weightV2: 0 },
    ],
  },
  
  {
    id: 17,
    question: "Quanto essa afirmação condiz com você?",
    phrase: "Já me disseram que sou inteligente, talentoso(a)… mas minha vida e meus resultados não refletem nada disso.",
    options: [
      { value: "condizTotalmenteComigo", label: "Condiz totalmente comigo", weight: 0, weightV2: 0 },
      { value: "condizParcialmenteComigo", label: "Condiz parcialmente comigo", weight: 0, weightV2: 0 },
      { value: "naoCondizComigo", label: "Não condiz comigo", weight: 0, weightV2: 0 },
    ],
  },
  
  {
    id: 18,
    question: "Quanto essa afirmação condiz com você?",
    phrase: "Sinto que poderia ter ido muito mais longe — na vida, no dinheiro, em tudo… mas não sei por que isso não aconteceu.",
    options: [
      { value: "condizTotalmenteComigo", label: "Condiz totalmente comigo", weight: 0, weightV2: 0 },
      { value: "condizParcialmenteComigo", label: "Condiz parcialmente comigo", weight: 0, weightV2: 0 },
      { value: "naoCondizComigo", label: "Não condiz comigo", weight: 0, weightV2: 0 },
    ],
  },
];