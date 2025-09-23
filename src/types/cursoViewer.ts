export interface Comentario {
  id: number
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
}

export interface CursoViewerState {
  isPlaying: boolean
  currentLesson: number
  showComments: boolean
  newComment: string
  isEnrolled: boolean
  isEnrolling: boolean
}