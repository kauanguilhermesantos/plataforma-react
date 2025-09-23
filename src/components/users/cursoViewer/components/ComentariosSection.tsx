import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageCircle } from "lucide-react"
import { Comentario } from "@/types/cursoViewer"

interface ComentariosSectionProps {
  comentarios: Comentario[]
  newComment: string
  showComments: boolean
  onCommentChange: (comment: string) => void
  onAddComment: () => void
}

export function ComentariosSection({ 
  comentarios, 
  newComment, 
  showComments, 
  onCommentChange, 
  onAddComment 
}: ComentariosSectionProps) {
  if (!showComments) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Comentários ({comentarios.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Novo Comentário */}
        <div className="space-y-2">
          <Textarea
            placeholder="Adicione um comentário..."
            value={newComment}
            onChange={(e) => onCommentChange(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end">
            <Button onClick={onAddComment} disabled={!newComment.trim()}>
              Comentar
            </Button>
          </div>
        </div>

        <Separator />

        {/* Lista de Comentários */}
        <div className="space-y-4">
          {comentarios.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{comment.user.name}</span>
                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Responder
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}