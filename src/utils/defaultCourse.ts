// src/components/admin/course-editor/utils/defaultCourse.ts
import { Curso } from '@/types/curso';

export const defaultCourse: Curso = {
  id: "new",
  titulo: "JavaScript Completo - Do Básico ao Avançado",
  descricao: "Aprenda JavaScript desde os conceitos básicos até técnicas avançadas de programação.",
  thumbnail: "/placeholder.svg?height=200&width=300",
  categoria: "Programação",
  nivel: "Intermediário",
  estiloAprendizagem: "Teórico",
  tags: ["JavaScript", "Web Development", "Frontend"],
  instrutor: {
    nome: "Prof. Maria Silva",
    bio: "Desenvolvedora Full Stack com mais de 8 anos de experiência em JavaScript e tecnologias web.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  modulos: [
    {
      id: 1,
      titulo: "Introdução ao JavaScript",
      descricao: "Conceitos básicos e fundamentos da linguagem",
      aulas: [
        {
          id: 1,
          titulo: "O que é JavaScript?",
          duracao: "15:30",
          tipo: "video",
          videoUrl: "https://example.com/video1",
          descricao: "Uma introdução completa ao JavaScript e sua importância no desenvolvimento web.",
        },
        {
          id: 2,
          titulo: "Configurando o Ambiente",
          duracao: "12:45",
          tipo: "video",
          videoUrl: "https://example.com/video2",
          descricao: "Como configurar seu ambiente de desenvolvimento para JavaScript.",
        },
      ],
    },
  ],
  recursos: [
    {
      id: 1,
      titulo: "Guia de Referência JavaScript",
      tipo: "pdf",
      url: "https://example.com/guide.pdf",
    },
  ],
  isPublished: true,
  alunos: 1250,
  avaliacao: 4.8,
  reviews: 324,
};