src/
├── components/
│   ├── admin/
│   │   ├── course-editor/
│   │   │   ├── CourseEditor.tsx          # Componente principal
│   │   │   ├── CourseInfoTab.tsx         # Aba informações básicas
│   │   │   ├── ContentTab.tsx            # Aba conteúdo (módulos/aulas)
│   │   │   ├── ResourcesTab.tsx          # Aba recursos
│   │   │   ├── SettingsTab.tsx           # Aba configurações
│   │   │   ├── Modals/                   # Modais específicos
│   │   │   │   ├── DeleteModuleModal.tsx
│   │   │   │   ├── DeleteLessonModal.tsx
│   │   │   │   ├── PublishModal.tsx
│   │   │   │   ├── DeleteCourseModal.tsx
│   │   │   │   └── LearningStylesModal.tsx
│   │   │   ├── Components/               # Componentes reutilizáveis
│   │   │   │   ├── LessonItem.tsx
│   │   │   │   ├── ModuleItem.tsx
│   │   │   │   ├── ResourceItem.tsx
│   │   │   │   ├── ThumbnailUpload.tsx
│   │   │   │   └── InstructorInfo.tsx
│   │   │   └── hooks/                    # Hooks customizados
│   │   │       ├── useCourseEditor.ts
│   │   │       ├── useFileUpload.ts
│   │   │       └── useCourseState.ts
│   │   └── admin-layout.tsx
│   └── ui/                               # Componentes do shadcn
├── types/
│   └── course.ts                         # Tipos TypeScript
├── hooks/
│   └── use-toast.ts                      # Hooks globais
└── utils/
    └── course-helpers.ts                 # Funções utilitárias