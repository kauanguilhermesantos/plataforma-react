import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Archive, Image, Code } from "lucide-react"
import { Recurso } from "@/types/curso"

interface RecursosTabProps {
  recursos: Recurso[]
}

export function RecursosTab({ recursos }: RecursosTabProps) {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />
      case 'zip':
      case 'rar':
        return <Archive className="h-4 w-4 text-yellow-500" />
      case 'jpg':
      case 'png':
      case 'svg':
        return <Image className="h-4 w-4 text-green-500" />
      case 'figma':
        return <Code className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getFileTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return 'PDF'
      case 'zip': return 'ZIP'
      case 'csv': return 'CSV'
      case 'figma': return 'Figma'
      case 'sql': return 'SQL'
      case 'yaml': return 'YAML'
      case 'json': return 'JSON'
      case 'dart': return 'Dart'
      default: return type.toUpperCase()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recursos do Curso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recursos.map((recurso) => (
          <div key={recurso.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              {getFileIcon(recurso.tipo)}
              <div>
                <p className="text-sm font-medium">{recurso.titulo}</p>
                <p className="text-xs text-gray-500 uppercase">{getFileTypeLabel(recurso.tipo)}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {recursos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nenhum recurso disponível</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}