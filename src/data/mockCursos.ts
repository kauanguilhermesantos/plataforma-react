import { Curso } from '@/types/curso'

export const mockCursos: Curso[] = [
  {
    id: 1,
    titulo: "JavaScript Completo - Do Básico ao Avançado",
    descricao: "Aprenda JavaScript do zero e torne-se um desenvolvedor web completo.",
    thumbnail: "/placeholder.svg?height=100&width=150",
    categoria: "Programação",
    nivel: "Iniciante",
    status: "Publicado",
    estiloAprendizagem: "Teórico",
    tags: ["JavaScript", "Web", "Frontend"],
    instrutor: {
      nome: "Prof. Maria Silva",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Desenvolvedora Full Stack com 10 anos de experiência.",
    },
    modulos: [
      {
        id: 1,
        titulo: "Fundamentos do JavaScript",
        ordem: 1,
        aulas: [
          { id: 1, titulo: "Introdução ao JavaScript", tipo: "video", duracao: "15:30", concluida: true },
          { id: 2, titulo: "Variáveis e Tipos de Dados", tipo: "video", duracao: "20:15", concluida: true },
          { id: 3, titulo: "Operadores e Expressões", tipo: "video", duracao: "18:45", concluida: true },
          { id: 4, titulo: "Exercícios Práticos - Fundamentos", tipo: "video", duracao: "30:00", concluida: false },
        ]
      },
      {
        id: 2,
        titulo: "Estruturas de Controle",
        ordem: 2,
        aulas: [
          { id: 5, titulo: "Condicionais if/else", tipo: "video", duracao: "22:10", concluida: false },
          { id: 6, titulo: "Switch Case", tipo: "video", duracao: "12:30", concluida: false },
          { id: 7, titulo: "Loops for, while e do-while", tipo: "video", duracao: "25:45", concluida: false },
          { id: 8, titulo: "Quiz - Estruturas de Controle", tipo: "quiz", duracao: "15:00", concluida: false },
        ]
      },
      {
        id: 3,
        titulo: "Funções e Escopo",
        ordem: 3,
        aulas: [
          { id: 9, titulo: "Declaração de Funções", tipo: "video", duracao: "19:20", concluida: false },
          { id: 10, titulo: "Parâmetros e Retorno", tipo: "video", duracao: "16:35", concluida: false },
          { id: 11, titulo: "Arrow Functions", tipo: "video", duracao: "14:50", concluida: false },
          { id: 12, titulo: "Closures e Escopo", tipo: "video", duracao: "21:15", concluida: false },
        ]
      }
    ],
    recursos: [
      { id: 1, titulo: "E-book JavaScript Básico", tipo: "pdf", url: "#" },
      { id: 2, titulo: "Códigos Fonte", tipo: "pdf", url: "#" },
      { id: 3, titulo: "Cheat Sheet JavaScript", tipo: "pdf", url: "#" },
    ],
    alunos: 1250,
    avaliacao: 4.8,
    reviews: 324,
    dataCriacao: "2023-12-01",
    ultimoUpdate: "2024-01-15",
    duracaoTotal: "40h",
    progresso: 35
  },
  {
    id: 2,
    titulo: "React.js - Construindo Aplicações Modernas",
    instrutor: {
      nome: "Prof. João Santos",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Especialista em Frontend e React com 8 anos de experiência.",
    },
    categoria: "Programação",
    nivel: "Intermediário",
    status: "Publicado",
    alunos: 890,
    avaliacao: 4.9,
    reviews: 156,
    dataCriacao: "2023-11-15",
    ultimoUpdate: "2024-01-10",
    thumbnail: "/placeholder.svg?height=100&width=150",
    descricao: "Domine o React.js e crie aplicações web dinâmicas e responsivas.",
    estiloAprendizagem: "Pragmático",
    duracaoTotal: "40h",
    tags: ["React", "JavaScript", "Frontend"],
    modulos: [
      {
        id: 1,
        titulo: "Introdução ao React",
        ordem: 1,
        aulas: [
          { id: 1, titulo: "O que é React e por que usar?", tipo: "video", duracao: "18:20", concluida: true },
          { id: 2, titulo: "Configurando Ambiente de Desenvolvimento", tipo: "video", duracao: "25:30", concluida: true },
          { id: 3, titulo: "JSX e Componentes Básicos", tipo: "video", duracao: "22:15", concluida: true },
        ]
      },
      {
        id: 2,
        titulo: "Hooks e Estado",
        ordem: 2,
        aulas: [
          { id: 4, titulo: "useState - Gerenciando Estado", tipo: "video", duracao: "28:45", concluida: false },
          { id: 5, titulo: "useEffect - Efeitos Colaterais", tipo: "video", duracao: "32:10", concluida: false },
          { id: 6, titulo: "Custom Hooks", tipo: "video", duracao: "26:30", concluida: false },
        ]
      },
      {
        id: 3,
        titulo: "Projeto Prático - Todo App",
        ordem: 3,
        aulas: [
          { id: 7, titulo: "Estruturando o Projeto", tipo: "video", duracao: "35:20", concluida: false },
          { id: 8, titulo: "Implementando Funcionalidades", tipo: "video", duracao: "40:15", concluida: false },
          { id: 9, titulo: "Deploy da Aplicação", tipo: "video", duracao: "18:40", concluida: false },
        ]
      }
    ],
    recursos: [
      { id: 1, titulo: "Boas Práticas React", tipo: "pdf", url: "#" },
      { id: 2, titulo: "Projeto Todo App Completo", tipo: "pdf", url: "#" },
    ],
  },
  {
    id: 3,
    titulo: "Python para Data Science",
    instrutor: {
      nome: "Prof. Ana Costa",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Cientista de Dados com 6 anos de experiência em Python e Machine Learning.",
    },
    categoria: "Data Science",
    nivel: "Intermediário",
    status: "Publicado",
    alunos: 567,
    avaliacao: 4.7,
    reviews: 89,
    dataCriacao: "2023-10-20",
    ultimoUpdate: "2024-01-05",
    thumbnail: "/placeholder.svg?height=100&width=150",
    descricao: "Aprenda Python e suas bibliotecas para análise de dados e machine learning.",
    estiloAprendizagem: "Ativista",
    duracaoTotal: "40h",
    tags: ["Python", "Data Science", "Machine Learning"],
    modulos: [
      {
        id: 1,
        titulo: "Python para Análise de Dados",
        ordem: 1,
        aulas: [
          { id: 1, titulo: "Introdução ao Pandas", tipo: "video", duracao: "28:15", concluida: true },
          { id: 2, titulo: "Manipulação de DataFrames", tipo: "video", duracao: "32:40", concluida: true },
          { id: 3, titulo: "Análise Exploratória de Dados", tipo: "video", duracao: "35:20", concluida: false },
        ]
      },
      {
        id: 2,
        titulo: "Visualização de Dados",
        ordem: 2,
        aulas: [
          { id: 4, titulo: "Matplotlib Básico", tipo: "video", duracao: "26:50", concluida: false },
          { id: 5, titulo: "Seaborn para Visualizações Avançadas", tipo: "video", duracao: "30:15", concluida: false },
          { id: 6, titulo: "Plotly - Gráficos Interativos", tipo: "video", duracao: "29:30", concluida: false },
        ]
      },
      {
        id: 3,
        titulo: "Machine Learning Básico",
        ordem: 3,
        aulas: [
          { id: 7, titulo: "Introdução ao Scikit-learn", tipo: "video", duracao: "33:45", concluida: false },
          { id: 8, titulo: "Regressão Linear", tipo: "video", duracao: "38:20", concluida: false },
          { id: 9, titulo: "Classificação com K-NN", tipo: "video", duracao: "36:10", concluida: false },
        ]
      }
    ],
    recursos: [
      { id: 1, titulo: "Dataset para Prática", tipo: "pdf", url: "#" },
      { id: 2, titulo: "Jupyter Notebooks", tipo: "pdf", url: "#" },
    ],
  },
  {
    id: 4,
    titulo: "UI/UX Design Fundamentals",
    instrutor: {
      nome: "Prof. Carlos Lima",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Designer de Produto com 7 anos de experiência em UX Research.",
    },
    categoria: "Design",
    nivel: "Iniciante",
    status: "Rascunho",
    alunos: 0,
    avaliacao: 0,
    reviews: 0,
    dataCriacao: "2024-01-10",
    ultimoUpdate: "2024-01-18",
    thumbnail: "/placeholder.svg?height=100&width=150",
    descricao: "Introdução aos princípios de design de interfaces e experiência do usuário.",
    estiloAprendizagem: "Reflexivo",
    duracaoTotal: "40h",
    tags: ["Design", "UI", "UX"],
    modulos: [
      {
        id: 1,
        titulo: "Fundamentos de UI/UX",
        ordem: 1,
        aulas: [
          { id: 1, titulo: "Diferença entre UI e UX", tipo: "video", duracao: "22:30", concluida: false },
          { id: 2, titulo: "Princípios de Design Visual", tipo: "video", duracao: "28:45", concluida: false },
          { id: 3, titulo: "Psicologia das Cores", tipo: "video", duracao: "25:20", concluida: false },
        ]
      },
      {
        id: 2,
        titulo: "Ferramentas de Design",
        ordem: 2,
        aulas: [
          { id: 4, titulo: "Introdução ao Figma", tipo: "video", duracao: "35:15", concluida: false },
          { id: 5, titulo: "Componentes e Variants", tipo: "video", duracao: "32:40", concluida: false },
          { id: 6, titulo: "Prototipagem Interativa", tipo: "video", duracao: "29:50", concluida: false },
        ]
      }
    ],
    recursos: [
      { id: 1, titulo: "Kit de UI Elements", tipo: "pdf", url: "#" },
      { id: 2, titulo: "Guia de Acessibilidade", tipo: "pdf", url: "#" },
    ],
  },
  {
    id: 5,
    titulo: "Node.js e Express - Backend Completo",
    instrutor: {
      nome: "Prof. Roberto Oliveira",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Arquiteto de Software com 9 anos de experiência em Backend.",
    },
    categoria: "Programação",
    nivel: "Avançado",
    status: "Arquivado",
    alunos: 298,
    avaliacao: 4.8,
    reviews: 45,
    dataCriacao: "2023-08-15",
    ultimoUpdate: "2023-12-20",
    thumbnail: "/placeholder.svg?height=100&width=150",
    descricao: "Construa APIs robustas e escaláveis com Node.js e Express.",
    duracaoTotal: "40h",
    estiloAprendizagem: "Pragmático",
    tags: ["Node.js", "Express", "Backend"],
    modulos: [
      {
        id: 1,
        titulo: "Fundamentos do Node.js",
        ordem: 1,
        aulas: [
          { id: 1, titulo: "Event Loop e Async/Await", tipo: "video", duracao: "31:20", concluida: true },
          { id: 2, titulo: "Módulos e NPM", tipo: "video", duracao: "26:45", concluida: true },
          { id: 3, titulo: "File System e Streams", tipo: "video", duracao: "34:10", concluida: true },
        ]
      },
      {
        id: 2,
        titulo: "Express.js Framework",
        ordem: 2,
        aulas: [
          { id: 4, titulo: "Rotas e Middlewares", tipo: "video", duracao: "38:30", concluida: true },
          { id: 5, titulo: "Autenticação JWT", tipo: "video", duracao: "42:15", concluida: true },
          { id: 6, titulo: "Error Handling", tipo: "video", duracao: "29:50", concluida: true },
        ]
      },
      {
        id: 3,
        titulo: "Projeto - API REST",
        ordem: 3,
        aulas: [
          { id: 7, titulo: "Estrutura do Projeto", tipo: "video", duracao: "45:20", concluida: true },
          { id: 8, titulo: "Integração com MongoDB", tipo: "video", duracao: "51:30", concluida: true },
          { id: 9, titulo: "Deploy e DevOps", tipo: "video", duracao: "36:45", concluida: true },
        ]
      }
    ],
    recursos: [
      { id: 1, titulo: "API Documentation", tipo: "pdf", url: "#" },
      { id: 2, titulo: "Postman Collection", tipo: "pdf", url: "#" },
    ],
  },
  {
    id: 6,
    titulo: "Flutter - Desenvolvimento Mobile Cross-Platform",
    instrutor: {
      nome: "Prof. Juliana Almeida",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Desenvolvedora Mobile com 5 anos de experiência em Flutter e Dart.",
    },
    categoria: "Mobile",
    nivel: "Intermediário",
    status: "Publicado",
    alunos: 432,
    avaliacao: 4.6,
    reviews: 78,
    dataCriacao: "2023-09-10",
    ultimoUpdate: "2024-01-08",
    thumbnail: "/placeholder.svg?height=100&width=150",
    descricao: "Desenvolva aplicativos móveis para iOS e Android com Flutter.",
    estiloAprendizagem: "Ativista",
    duracaoTotal: "40h",
    tags: ["Flutter", "Dart", "Mobile"],
    modulos: [
      {
        id: 1,
        titulo: "Introdução ao Flutter",
        ordem: 1,
        aulas: [
          { id: 1, titulo: "Configurando Ambiente Flutter", tipo: "video", duracao: "33:25", concluida: true },
          { id: 2, titulo: "Widgets Básicos", tipo: "video", duracao: "29:40", concluida: true },
          { id: 3, titulo: "Layout com Column e Row", tipo: "video", duracao: "31:15", concluida: false },
        ]
      },
      {
        id: 2,
        titulo: "Estado e Navegação",
        ordem: 2,
        aulas: [
          { id: 4, titulo: "State Management Básico", tipo: "video", duracao: "37:50", concluida: false },
          { id: 5, titulo: "Navigator 2.0", tipo: "video", duracao: "34:20", concluida: false },
          { id: 6, titulo: "Provider Pattern", tipo: "video", duracao: "42:30", concluida: false },
        ]
      },
      {
        id: 3,
        titulo: "Projeto - App de Tarefas",
        ordem: 3,
        aulas: [
          { id: 7, titulo: "Criando a Interface", tipo: "video", duracao: "46:15", concluida: false },
          { id: 8, titulo: "Persistência de Dados", tipo: "video", duracao: "39:40", concluida: false },
          { id: 9, titulo: "Publicando na App Store", tipo: "video", duracao: "28:25", concluida: false },
        ]
      }
    ],
    recursos: [
      { id: 1, titulo: "Flutter SDK", tipo: "pdf", url: "#" },
      { id: 2, titulo: "UI Kit Flutter", tipo: "pdf", url: "#" },
    ],
  },
  {
    id: 7,
    titulo: "Machine Learning com Python",
    instrutor: {
      nome: "Prof. Ricardo Mendes",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "PhD em Ciência da Computação com foco em Machine Learning.",
    },
    categoria: "Data Science",
    nivel: "Avançado",
    status: "Publicado",
    alunos: 321,
    avaliacao: 4.9,
    reviews: 67,
    dataCriacao: "2023-07-20",
    ultimoUpdate: "2024-01-12",
    thumbnail: "/placeholder.svg?height=100&width=150",
    descricao: "Aprenda os conceitos e algoritmos de machine learning usando Python.",
    estiloAprendizagem: "Teórico",
    duracaoTotal: "40h",
    tags: ["Machine Learning", "Python", "Data Science"],
    modulos: [
      {
        id: 1,
        titulo: "Fundamentos de ML",
        ordem: 1,
        aulas: [
          { id: 1, titulo: "Introdução ao Machine Learning", tipo: "video", duracao: "40:15", concluida: true },
          { id: 2, titulo: "Pré-processamento de Dados", tipo: "video", duracao: "36:30", concluida: true },
          { id: 3, titulo: "Feature Engineering", tipo: "video", duracao: "42:45", concluida: false },
        ]
      },
      {
        id: 2,
        titulo: "Algoritmos Supervisionados",
        ordem: 2,
        aulas: [
          { id: 4, titulo: "Regressão Linear Múltipla", tipo: "video", duracao: "48:20", concluida: false },
          { id: 5, titulo: "Árvores de Decisão", tipo: "video", duracao: "45:35", concluida: false },
          { id: 6, titulo: "SVMs e Kernel Methods", tipo: "video", duracao: "51:10", concluida: false },
        ]
      },
      {
        id: 3,
        titulo: "Deep Learning",
        ordem: 3,
        aulas: [
          { id: 7, titulo: "Introdução às Redes Neurais", tipo: "video", duracao: "55:25", concluida: false },
          { id: 8, titulo: "CNNs para Imagens", tipo: "video", duracao: "59:40", concluida: false },
          { id: 9, titulo: "RNNs para Séries Temporais", tipo: "video", duracao: "53:15", concluida: false },
        ]
      }
    ],
    recursos: [
      { id: 1, titulo: "Datasets para Treinamento", tipo: "pdf", url: "#" },
      { id: 2, titulo: "Jupyter Notebooks Avançados", tipo: "pdf", url: "#" },
    ],
  },
  {
    id: 8,
    titulo: "Design System com Figma",
    instrutor: {
      nome: "Prof. Camila Rodrigues",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Product Designer especializada em Design Systems.",
    },
    categoria: "Design",
    nivel: "Intermediário",
    status: "Rascunho",
    alunos: 0,
    avaliacao: 0,
    reviews: 0,
    dataCriacao: "2024-01-15",
    ultimoUpdate: "2024-01-20",
    thumbnail: "/placeholder.svg?height=100&width=150",
    descricao: "Crie e gerencie design systems eficientes usando Figma.",
    estiloAprendizagem: "Reflexivo",
    duracaoTotal: "40h",
    tags: ["Design", "Figma", "UI"],
    modulos: [
      {
        id: 1,
        titulo: "Conceitos de Design System",
        ordem: 1,
        aulas: [
          { id: 1, titulo: "O que é um Design System?", tipo: "video", duracao: "24:30", concluida: false },
          { id: 2, titulo: "Atomic Design Methodology", tipo: "video", duracao: "28:45", concluida: false },
          { id: 3, titulo: "Tokenização de Design", tipo: "video", duracao: "32:20", concluida: false },
        ]
      },
      {
        id: 2,
        titulo: "Implementação no Figma",
        ordem: 2,
        aulas: [
          { id: 4, titulo: "Criando Componentes Base", tipo: "video", duracao: "36:15", concluida: false },
          { id: 5, titulo: "Variants e Auto Layout", tipo: "video", duracao: "39:40", concluida: false },
          { id: 6, titulo: "Documentação do Sistema", tipo: "video", duracao: "27:50", concluida: false },
        ]
      }
    ],
    recursos: [
      { id: 1, titulo: "Design System Kit", tipo: "pdf", url: "#" },
      { id: 2, titulo: "Guia de Componentes", tipo: "pdf", url: "#" },
    ],
  },
  {
    id: 9,
    titulo: "SQL e Banco de Dados Relacionais",
    instrutor: {
      nome: "Prof. Fernando Costa",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "DBA Senior com 12 anos de experiência em bancos relacionais.",
    },
    categoria: "Banco de Dados",
    nivel: "Iniciante",
    status: "Publicado",
    alunos: 678,
    avaliacao: 4.7,
    reviews: 123,
    dataCriacao: "2023-10-05",
    ultimoUpdate: "2024-01-14",
    thumbnail: "/placeholder.svg?height=100&width=150",
    descricao: "Aprenda SQL e como gerenciar bancos de dados relacionais.",
    estiloAprendizagem: "Pragmático",
    duracaoTotal: "40h",
    tags: ["SQL", "Banco de Dados", "Data"],
    modulos: [
      {
        id: 1,
        titulo: "SQL Básico",
        ordem: 1,
        aulas: [
          { id: 1, titulo: "Introdução ao SQL", tipo: "video", duracao: "19:25", concluida: true },
          { id: 2, titulo: "SELECT, FROM, WHERE", tipo: "video", duracao: "23:40", concluida: true },
          { id: 3, titulo: "JOINs entre Tabelas", tipo: "video", duracao: "31:15", concluida: false },
        ]
      },
      {
        id: 2,
        titulo: "SQL Intermediário",
        ordem: 2,
        aulas: [
          { id: 4, titulo: "Funções de Agregação", tipo: "video", duracao: "26:50", concluida: false },
          { id: 5, titulo: "Subqueries", tipo: "video", duracao: "29:20", concluida: false },
          { id: 6, titulo: "Views e Stored Procedures", tipo: "video", duracao: "34:30", concluida: false },
        ]
      },
      {
        id: 3,
        titulo: "Administração de Banco",
        ordem: 3,
        aulas: [
          { id: 7, titulo: "Backup e Recovery", tipo: "video", duracao: "28:15", concluida: false },
          { id: 8, titulo: "Otimização de Queries", tipo: "video", duracao: "32:40", concluida: false },
          { id: 9, titulo: "Segurança e Permissões", tipo: "video", duracao: "29:50", concluida: false },
        ]
      }
    ],
    recursos: [
      { id: 1, titulo: "Database de Exemplo", tipo: "pdf", url: "#" },
      { id: 2, titulo: "Exercícios Práticos", tipo: "pdf", url: "#" },
    ],
  },
  {
    id: 10,
    titulo: "DevOps e CI/CD com Docker e Kubernetes",
    instrutor: {
      nome: "Prof. Marcelo Oliveira",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Engenheiro de DevOps com certificações AWS e Kubernetes.",
    },
    categoria: "DevOps",
    nivel: "Avançado",
    status: "Publicado",
    alunos: 234,
    avaliacao: 4.8,
    reviews: 45,
    dataCriacao: "2023-08-25",
    ultimoUpdate: "2024-01-07",
    thumbnail: "/placeholder.svg?height=100&width=150",
    descricao: "Implemente práticas de DevOps e pipelines CI/CD usando Docker e Kubernetes.",
    estiloAprendizagem: "Ativista",
    duracaoTotal: "40h",
    tags: ["DevOps", "Docker", "Kubernetes"],
    modulos: [
      {
        id: 1,
        titulo: "Fundamentos de Docker",
        ordem: 1,
        aulas: [
          { id: 1, titulo: "Containers vs Virtual Machines", tipo: "video", duracao: "33:25", concluida: true },
          { id: 2, titulo: "Dockerfile e Imagens", tipo: "video", duracao: "38:40", concluida: true },
          { id: 3, titulo: "Docker Compose", tipo: "video", duracao: "42:15", concluida: false },
        ]
      },
      {
        id: 2,
        titulo: "Kubernetes em Produção",
        ordem: 2,
        aulas: [
          { id: 4, titulo: "Pods, Services e Deployments", tipo: "video", duracao: "46:50", concluida: false },
          { id: 5, titulo: "ConfigMaps e Secrets", tipo: "video", duracao: "39:20", concluida: false },
          { id: 6, titulo: "Auto-scaling", tipo: "video", duracao: "35:30", concluida: false },
        ]
      },
      {
        id: 3,
        titulo: "CI/CD Pipelines",
        ordem: 3,
        aulas: [
          { id: 7, titulo: "GitHub Actions", tipo: "video", duracao: "44:15", concluida: false },
          { id: 8, titulo: "Jenkins para CI/CD", tipo: "video", duracao: "51:40", concluida: false },
          { id: 9, titulo: "Monitoramento com Prometheus", tipo: "video", duracao: "48:25", concluida: false },
        ]
      }
    ],
    recursos: [
      { id: 1, titulo: "Docker Compose Files", tipo: "pdf", url: "#" },
      { id: 2, titulo: "Kubernetes Manifests", tipo: "pdf", url: "#" },
    ],
  }
]

// Função utilitária para buscar curso por ID
export const getCursoById = (id: number): Curso | undefined => {
  return mockCursos.find(curso => curso.id === id)
}

// Função para filtrar cursos por categoria
export const getCursosByCategoria = (categoria: string): Curso[] => {
  if (categoria === 'all') return mockCursos
  return mockCursos.filter(curso => curso.categoria === categoria)
}

// Função para filtrar cursos por status
export const getCursosByStatus = (status: string): Curso[] => {
  if (status === 'all') return mockCursos
  return mockCursos.filter(curso => curso.status === status)
}

// Função para buscar cursos por termo
export const searchCursos = (term: string): Curso[] => {
  if (!term) return mockCursos
  const lowerTerm = term.toLowerCase()
  return mockCursos.filter(curso => 
    curso.titulo.toLowerCase().includes(lowerTerm) ||
    curso.instrutor.nome.toLowerCase().includes(lowerTerm) ||
    curso.categoria.toLowerCase().includes(lowerTerm) ||
    curso.tags.some(tag => tag.toLowerCase().includes(lowerTerm))
  )
}

// Função para calcular progresso do curso
export const calcularProgressoCurso = (cursoId: number): number => {
  const curso = getCursoById(cursoId)
  if (!curso) return 0

  const totalAulas = curso.modulos.reduce((total, modulo) => total + modulo.aulas.length, 0)
  const aulasConcluidas = curso.modulos.reduce((total, modulo) => 
    total + modulo.aulas.filter(aula => aula.concluida).length, 0
  )

  return totalAulas > 0 ? (aulasConcluidas / totalAulas) * 100 : 0
}

// Função para obter duração total do curso
export const getDuracaoTotalCurso = (cursoId: number): string => {
  const curso = getCursoById(cursoId)
  if (!curso) return "0h"

  const totalMinutos = curso.modulos.reduce((total, modulo) => {
    return total + modulo.aulas.reduce((modTotal, aula) => {
      const [minutos] = aula.duracao.split(':').map(Number)
      return modTotal + minutos
    }, 0)
  }, 0)

  const horas = Math.floor(totalMinutos / 60)
  const minutos = totalMinutos % 60
  return `${horas}h ${minutos}m`
}