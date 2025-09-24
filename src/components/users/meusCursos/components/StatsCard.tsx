import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  value: number | string
  label: string
  color?: "blue" | "green" | "orange" | "purple" | "yellow"
}

export function StatsCard({ value, label, color = "blue" }: StatsCardProps) {
  const colorClasses = {
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    orange: "text-orange-600 dark:text-orange-400",
    purple: "text-purple-600 dark:text-purple-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
  }

  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
      </CardContent>
    </Card>
  )
}