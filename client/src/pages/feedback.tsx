import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Star,
  Send,
  ChevronLeft,
  CheckCircle2,
  Dumbbell,
  Users,
  SprayCan,
  Building,
  MessageSquare,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import logoImage from "@assets/399394586_722025015923170_6185085609781709026_n_1764870625217.jpg";

// Import generated assets
import receptionistFemale from "@assets/generated_images/professional_portrait_of_a_friendly_gym_receptionist,_female,_smiling,_uniform.png";
import receptionistMale from "@assets/generated_images/professional_portrait_of_a_friendly_gym_receptionist,_male,_smiling,_uniform.png";
import instructorMale from "@assets/generated_images/professional_portrait_of_a_fitness_instructor,_male,_muscular,_gym_background.png";
import instructorFemale from "@assets/generated_images/professional_portrait_of_a_fitness_instructor,_female,_athletic,_gym_background.png";
import { INITIAL_FEEDBACKS } from "@/data/mockData";

// Mock Data for People
const STAFF = {
  reception: [
    {
      id: "rec-1",
      name: "Ana Silva",
      role: "Recepcionista",
      image: receptionistFemale,
    },
    {
      id: "rec-2",
      name: "João Santos",
      role: "Recepcionista",
      image: receptionistMale,
    },
  ],
  instructors: [
    {
      id: "inst-1",
      name: "Carlos Oliveira",
      role: "Musculação",
      image: instructorMale,
    },
    {
      id: "inst-2",
      name: "Fernanda Lima",
      role: "Fit Dance",
      image: instructorFemale,
    },
    {
      id: "inst-3",
      name: "Pedro Souza",
      role: "Funcional",
      image: instructorMale,
    }, // Reusing image for demo
    {
      id: "inst-4",
      name: "Mariana Costa",
      role: "Pilates",
      image: instructorFemale,
    }, // Reusing image for demo
  ],
};

// Schema for validation
const feedbackSchema = z.object({
  category: z.string().min(1, "Selecione uma categoria"),
  personId: z.string().optional(),
  rating: z.number().min(1, "Selecione uma nota de 1 a 5"),
  message: z.string().optional(),
  userName: z.string().optional(),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

export default function Feedback() {
  const [step, setStep] = useState<
    "category" | "person" | "rating" | "success"
  >("category");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      category: "",
      personId: "",
      rating: 0,
      message: "",
      userName: "",
    },
  });

  const rating = watch("rating");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setValue("category", category);

    if (category === "Recepção" || category === "Professores") {
      setStep("person");
    } else {
      setStep("rating");
    }
  };

  const handlePersonSelect = (person: any) => {
    setSelectedPerson(person);
    setValue("personId", person.id);
    setStep("rating");
  };

  const handleRatingSelect = (value: number) => {
    setValue("rating", value);
  };

  const onSubmit = (data: FeedbackForm) => {
    console.log("Feedback submitted:", data);

    // Save to localStorage to simulate Google Sheets persistence
    const newFeedback = {
      id: Math.random().toString(36).substr(2, 9),
      category: data.category,
      personId: data.personId,
      personName: selectedPerson?.name,
      rating: data.rating,
      message: data.message,
      userName: data.userName,
      date: new Date().toISOString(),
    };

    const existingFeedbacks = JSON.parse(
      localStorage.getItem("feedbacks") || JSON.stringify(INITIAL_FEEDBACKS)
    );
    const updatedFeedbacks = [...existingFeedbacks, newFeedback];
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));

    // Dispatch event so dashboard updates if open in another tab
    window.dispatchEvent(new Event("storage"));

    setStep("success");
  };

  const handleBack = () => {
    if (step === "person") setStep("category");
    else if (step === "rating") {
      if (
        selectedCategory === "Recepção" ||
        selectedCategory === "Professores"
      ) {
        setStep("person");
      } else {
        setStep("category");
      }
    } else if (step === "category") {
      window.location.href = "/";
    }
  };

  const getPeopleList = () => {
    if (selectedCategory === "Recepção") return STAFF.reception;
    if (selectedCategory === "Professores") return STAFF.instructors;
    return [];
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <div className="absolute top-8 left-0 w-full text-center z-10">
        <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">
          <img
            src={logoImage}
            alt="Saúde Fit"
            className="h-8 w-auto object-contain"
          />
          <span className="font-heading text-xl font-bold tracking-wider ml-2 border-l border-white/20 pl-3">
            FEEDBACK
          </span>
        </div>
      </div>

      {step !== "success" && (
        <Button
          variant="ghost"
          className="absolute top-8 left-8 text-muted-foreground hover:text-white z-20 hidden md:flex"
          onClick={handleBack}
        >
          <ChevronLeft className="mr-2" /> Voltar
        </Button>
      )}

      <div className="w-full max-w-4xl z-10 relative pt-24 md:pt-0">
        <AnimatePresence mode="wait">
          {/* STEP 1: CATEGORY */}
          {step === "category" && (
            <motion.div
              key="category-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                  O QUE VOCÊ QUER AVALIAR?
                </h1>
                <p className="text-xl text-muted-foreground">
                  Escolha uma categoria para começar.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { id: "Recepção", icon: UserCircle, label: "Recepção" },
                  { id: "Professores", icon: Users, label: "Professores" },
                  { id: "Equipamentos", icon: Dumbbell, label: "Equipamentos" },
                  { id: "Limpeza", icon: SprayCan, label: "Limpeza" },
                  { id: "Estrutura", icon: Building, label: "Estrutura" },
                  { id: "Outros", icon: MessageSquare, label: "Outros" },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect(item.id)}
                    className="flex flex-col items-center justify-center p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all group gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon className="w-8 h-8 text-primary group-hover:text-white" />
                    </div>
                    <span className="font-heading font-bold text-lg tracking-wider">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: PERSON SELECTION */}
          {step === "person" && (
            <motion.div
              key="person-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <div className="text-center mb-12">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="mb-6 md:hidden"
                >
                  <ChevronLeft className="mr-2" /> Voltar
                </Button>
                <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                  QUEM TE ATENDEU?
                </h1>
                <p className="text-xl text-muted-foreground">
                  Selecione o profissional que você deseja avaliar.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {getPeopleList().map((person) => (
                  <motion.button
                    key={person.id}
                    whileHover={{ y: -5 }}
                    onClick={() => handlePersonSelect(person)}
                    className="relative group text-left"
                  >
                    <div className="aspect-3/2 rounded-xl overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-all relative">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-60" />
                      <div className="absolute bottom-0 left-0 p-4 w-full">
                        <p className="text-white font-bold text-lg truncate">
                          {person.name}
                        </p>
                        <p className="text-primary text-xs font-medium uppercase tracking-wider">
                          {person.role}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: RATING & FORM */}
          {step === "rating" && (
            <motion.div
              key="rating-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="mb-6 md:hidden">
                <Button variant="ghost" onClick={handleBack}>
                  <ChevronLeft className="mr-2" /> Voltar
                </Button>
              </div>

              <Card className="bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
                <div className="h-2 bg-muted w-full">
                  <div className="h-full bg-primary w-full" />
                </div>
                <CardContent className="p-8 md:p-12">
                  {selectedPerson && (
                    <div className="flex items-center gap-4 mb-8 p-4 bg-background/50 rounded-xl border border-white/5">
                      <img
                        src={selectedPerson.image}
                        alt={selectedPerson.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                      />
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">
                          Avaliando
                        </p>
                        <h3 className="text-xl font-bold text-white">
                          {selectedPerson.name}
                        </h3>
                      </div>
                    </div>
                  )}

                  {!selectedPerson && (
                    <div className="mb-8">
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">
                        Avaliando
                      </p>
                      <h3 className="text-2xl font-bold text-primary">
                        {selectedCategory}
                      </h3>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-4 text-center">
                      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground block mb-4">
                        Qual sua nota?
                      </label>
                      <div className="flex justify-center gap-2 md:gap-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRatingSelect(star)}
                            className="group relative p-2"
                          >
                            <Star
                              className={`w-10 h-10 md:w-14 md:h-14 transition-all duration-300 ${
                                rating >= star
                                  ? "fill-primary text-primary drop-shadow-[0_0_10px_rgba(220,20,60,0.5)]"
                                  : "text-muted fill-transparent group-hover:text-primary/50"
                              }`}
                            />
                          </motion.button>
                        ))}
                      </div>
                      {errors.rating && (
                        <p className="text-destructive text-sm">
                          {errors.rating.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Deixe seu comentário (Opcional)
                      </label>
                      <Textarea
                        {...register("message")}
                        placeholder={`Conte-nos mais sobre sua experiência com ${
                          selectedPerson
                            ? selectedPerson.name
                            : selectedCategory.toLowerCase()
                        }...`}
                        className="bg-background/50 border-input min-h-[120px] text-lg focus:border-primary/50 transition-colors resize-none"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Seu Nome (Opcional)
                      </label>
                      <Input
                        {...register("userName")}
                        placeholder="Ex: João Silva"
                        className="bg-background/50 border-input h-12 text-lg focus:border-primary/50 transition-colors"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
                    >
                      ENVIAR AVALIAÇÃO <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === "success" && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 ring-4 ring-green-500/10">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-4xl font-heading font-bold mb-4">
                OBRIGADO!
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
                Seu feedback foi registrado com sucesso. Agradecemos por ajudar
                a fazer da Saúde Fit um lugar melhor.
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setStep("category");
                  setValue("rating", 0);
                  setValue("message", "");
                  setValue("userName", "");
                  setSelectedCategory("");
                  setSelectedPerson(null);
                }}
                className="border-white/20 hover:bg-white/10"
              >
                NOVA AVALIAÇÃO
              </Button>
              <div className="mt-8">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-white"
                  >
                    Voltar para o Início
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
