import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-md mx-4 bg-card border-white/10 backdrop-blur-md">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-heading font-bold text-white">PÁGINA NÃO ENCONTRADA</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>

          <div className="mt-8">
            <Link href="/">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                <ChevronLeft className="mr-2 h-4 w-4" />
                VOLTAR PARA O INÍCIO
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}