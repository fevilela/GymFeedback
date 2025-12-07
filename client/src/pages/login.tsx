import { useState } from "react";
import { useLocation } from "wouter";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import logoImage from "@assets/399394586_722025015923170_6185085609781709026_n_1764870625217.jpg";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [_, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      setLocation("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl z-10">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-heading font-bold">
            Área Restrita
          </CardTitle>
          <CardDescription>
            Acesso exclusivo para gestores da Saúde Fit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Digite a senha de acesso"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`bg-background/50 border-white/10 h-12 text-center text-lg tracking-widest ${
                  error ? "border-red-500 ring-red-500/50" : ""
                }`}
              />
              {error && (
                <p className="text-red-500 text-xs text-center font-medium animate-pulse">
                  Senha incorreta. Tente "admin".
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-12 font-bold text-lg bg-primary hover:bg-primary/90"
            >
              ACESSAR <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              className="text-muted-foreground hover:text-white"
              onClick={() => setLocation("/")}
            >
              Voltar para o Início
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
