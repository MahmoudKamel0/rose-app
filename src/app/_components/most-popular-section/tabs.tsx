import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export default function tabs() {
  return (
          <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Wedding</TabsTrigger>
          <TabsTrigger value="password">Birthday</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Wedding</CardTitle>
              <CardDescription>
                weddingggggg products...
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
             hiiiiii
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Birthday</CardTitle>
              <CardDescription>
                happy birthday to yooooooooou
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
             hhhhhhhhhhhh
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
  )
}
