import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Users, Calendar } from "lucide-react"
import { Instrutor } from "@/types/curso"

interface InstrutorCardProps {
  instrutor: Instrutor
}

export function InstrutorCard({ instrutor }: InstrutorCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sobre o Instrutor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={instrutor.avatar} />
            <AvatarFallback>{instrutor.nome[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{instrutor.nome}</h3>
            <p className="text-sm text-gray-500">Instrutor Especialista</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">{instrutor.bio}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>4.9</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>15.2k estudantes</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>5 anos</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}