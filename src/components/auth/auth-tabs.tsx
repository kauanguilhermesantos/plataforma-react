"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"

export function AuthTabs() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState<string>("login")

  return (
    <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1">
        <TabsTrigger value="login" className="data-[state=active]:bg-koda-blue data-[state=active]:text-white">
          Login
        </TabsTrigger>
        <TabsTrigger value="signup" className="data-[state=active]:bg-koda-blue data-[state=active]:text-white">
          Cadastro
        </TabsTrigger>
      </TabsList>
      <div className="p-4">
        <TabsContent value="login" className="mt-0">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup" className="mt-0">
          <SignupForm />
        </TabsContent>
      </div>
    </Tabs>
  )
}
