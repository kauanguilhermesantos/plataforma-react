import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize } from "lucide-react"
import { Aula } from "@/types/curso"

interface VideoPlayerProps {
  aula: Aula
  isPlaying: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
}

export function VideoPlayer({ aula, isPlaying, onPlayPause, onNext, onPrevious }: VideoPlayerProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative bg-black rounded-t-lg aspect-video">
          <img
            src="/placeholder.svg?height=400&width=600"
            // alt={aula.titulo}
            alt="Placeholder de vídeo"
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" className="rounded-full w-16 h-16" onClick={onPlayPause}>
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={onPrevious}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onPlayPause}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={onNext}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* <h2 className="text-xl font-semibold mb-2">{aula.titulo}</h2> */}
          <h2 className="text-xl font-semibold mb-2">Aula 1</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {/* {aula.descricao || "Nesta aula você aprenderá conceitos fundamentais."} */}
            {"Nesta aula você aprenderá conceitos fundamentais."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}