import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Star, 
  Send, 
  ThumbsUp, 
  MessageSquare, 
  ChevronLeft, 
  CheckCircle2,
  Dumbbell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

// Schema for validation
const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  category: z.string().min(1, "Selecione uma categoria"),
  message: z.string().optional(),
  name: z.string().optional(),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

export default function Feedback() {
  const [step, setStep] = useState<'rating' | 'details' | 'success'>('rating');
  const [rating, setRating] = useState(0);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      category: "",
      message: "",
      name: ""
    }
  });

  const handleRatingSelect = (value: number) => {
    setRating(value);
    setValue("rating", value);
    setTimeout(() => setStep('details'), 300); // Small delay for visual feedback
  };

  const onSubmit = (data: FeedbackForm) => {
    console.log("Feedback submitted:", data);
    // Here you would send data to backend
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header for Kiosk */}
      <div className="absolute top-8 left-0 w-full text-center z-10">
        <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">
          <Dumbbell className="w-6 h-6 text-primary" />
          <span className="font-heading text-xl font-bold tracking-wider">SAÚDE<span className="text-primary">FIT</span> FEEDBACK</span>
        </div>
      </div>

      <Link href="/">
        <Button variant="ghost" className="absolute top-8 left-8 text-muted-foreground hover:text-white z-20">
          <ChevronLeft className="mr-2" /> Voltar ao Site
        </Button>
      </Link>

      <div className="w-full max-w-2xl z-10 relative">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: RATING */}
          {step === 'rating' && (
            <motion.div
              key="rating-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                COMO FOI SEU TREINO?
              </h1>
              <p className="text-xl text-muted-foreground mb-12">
                Sua avaliação nos ajuda a melhorar a cada dia.
              </p>

              <div className="flex justify-center gap-4 mb-12">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRatingSelect(star)}
                    className="group relative"
                  >
                    <Star 
                      className={`w-16 h-16 md:w-24 md:h-24 transition-all duration-300 ${
                        rating >= star 
                          ? "fill-primary text-primary drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]" 
                          : "text-muted fill-transparent group-hover:text-primary/50"
                      }`} 
                    />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity text-primary uppercase">
                      {star === 1 ? "Ruim" : star === 5 ? "Excelente" : ""}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 'details' && (
            <motion.div
              key="details-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <Card className="bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
                <div className="h-2 bg-muted w-full">
                  <div className="h-full bg-primary w-1/2" />
                </div>
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-8">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setStep('rating')}
                      className="rounded-full hover:bg-white/10"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <h2 className="text-2xl font-heading font-bold">CONTE MAIS DETALHES</h2>
                    <div className="ml-auto flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-5 h-5 ${rating >= star ? "fill-primary text-primary" : "text-muted"}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Sobre o que você quer falar?</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['Equipamentos', 'Limpeza', 'Atendimento', 'Aulas', 'Estrutura', 'Outros'].map((cat) => (
                          <label 
                            key={cat}
                            className="cursor-pointer relative"
                          >
                            <input 
                              type="radio" 
                              value={cat} 
                              {...register("category")}
                              className="peer sr-only"
                            />
                            <div className="p-4 rounded-lg border border-input bg-background/50 hover:bg-accent/10 hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:text-primary transition-all text-center font-medium">
                              {cat}
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.category && <p className="text-destructive text-sm">{errors.category.message}</p>}
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Deixe seu comentário (Opcional)</label>
                      <Textarea 
                        {...register("message")}
                        placeholder="Elogios, sugestões ou reclamações..." 
                        className="bg-background/50 border-input min-h-[120px] text-lg focus:border-primary/50 transition-colors resize-none"
                      />
                    </div>
                    
                    <div className="space-y-4">
                       <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Seu Nome (Opcional)</label>
                       <Input 
                          {...register("name")}
                          placeholder="Ex: João Silva"
                          className="bg-background/50 border-input h-12 text-lg focus:border-primary/50 transition-colors"
                       />
                    </div>

                    <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
                      ENVIAR FEEDBACK <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 ring-4 ring-green-500/10">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-4xl font-heading font-bold mb-4">OBRIGADO!</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
                Seu feedback foi registrado com sucesso. Agradecemos por ajudar a fazer da Saúde Fit um lugar melhor.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => {
                  setStep('rating');
                  setRating(0);
                }}
                className="border-white/20 hover:bg-white/10"
              >
                NOVA AVALIAÇÃO
              </Button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}