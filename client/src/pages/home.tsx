import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Star,
  ChevronRight,
  Dumbbell,
  Users,
  Clock,
  Trophy,
  Check,
  Snowflake,
  UserCog,
  Smartphone,
  ShieldCheck,
  Building2,
  Medal,
  ShowerHead,
  Armchair,
  Car,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

// Import generated assets
import heroImage from "@assets/gym-hero.jpg";
import runnerImage from "@assets/generated_images/athletic_person_running_with_motion_blur.png";
import logoImage from "@assets/logo.png";
import auraTechLogo from "@assets/aura.png";

import unit1Image from "@assets/generated_images/modern_gym_exterior_on_a_city_street_day_time.png";
import unit2Image from "@assets/generated_images/unidade2.png";

import sandCourtImage from "@assets/generated_images/outdoor_sand_court_for_beach_tennis_or_volleyball.png";
import danceClassImage from "@assets/generated_images/group_dance_class_in_a_gym_studio.png";
import weightTrainingImage from "@assets/generated_images/modern_weight_training_area_with_equipment.png";
import martialArtsImage from "@assets/generated_images/people_training_martial_arts_in_a_gym.png";

import { MapPin, Instagram } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-lg border-b border-white/10 h-20">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center z-50">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-background/95 border-r border-white/10"
              >
                <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                <div className="flex flex-col gap-8 mt-10">
                  <a
                    href="#modalidades"
                    onClick={(e) => handleScrollTo(e, "modalidades")}
                    className="text-xl font-medium hover:text-primary transition-colors"
                  >
                    MODALIDADES
                  </a>
                  <a
                    href="#planos"
                    onClick={(e) => handleScrollTo(e, "planos")}
                    className="text-xl font-medium hover:text-primary transition-colors"
                  >
                    PLANOS
                  </a>
                  <a
                    href="#unidades"
                    onClick={(e) => handleScrollTo(e, "unidades")}
                    className="text-xl font-medium hover:text-primary transition-colors"
                  >
                    UNIDADES
                  </a>
                  <div className="flex flex-col gap-4 mt-4">
                    <Link href="/dashboard">
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary w-full justify-start font-bold uppercase tracking-wider px-0"
                      >
                        Área do Gestor
                      </Button>
                    </Link>
                    <Link href="/feedback">
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full font-bold"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        AVALIAR
                      </Button>
                    </Link>
                    <Button
                      onClick={() =>
                        window.open(
                          "https://api.whatsapp.com/send/?phone=5535999384418&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20academia%20e%20gostaria%20de%20fazer%20a%20minha%20matricula!",
                          "_blank"
                        )
                      }
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold w-full"
                    >
                      MATRICULE-SE
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <nav className="hidden md:flex items-center gap-8 flex-1">
            <a
              href="#modalidades"
              onClick={(e) => handleScrollTo(e, "modalidades")}
              className="text-base font-medium hover:text-primary transition-colors"
            >
              MODALIDADES
            </a>
            <a
              href="#planos"
              onClick={(e) => handleScrollTo(e, "planos")}
              className="text-base font-medium hover:text-primary transition-colors"
            >
              PLANOS
            </a>
            <a
              href="#unidades"
              onClick={(e) => handleScrollTo(e, "unidades")}
              className="text-base font-medium hover:text-primary transition-colors"
            >
              UNIDADES
            </a>
          </nav>

          <div
            className="flex items-center justify-center flex-1 cursor-pointer"
            onClick={handleScrollTop}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <img
                src={logoImage}
                alt="Saúde Fit Logo"
                className="h-10 w-auto object-contain rounded-xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              />
            </motion.div>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-primary hidden lg:flex font-bold uppercase text-xs tracking-wider"
              >
                Área do Gestor
              </Button>
            </Link>
            <Link href="/feedback">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hidden sm:flex font-bold"
              >
                <Star className="w-4 h-4 mr-2" />
                AVALIAR
              </Button>
            </Link>
            <Button
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send/?phone=5535999384418&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20academia%20e%20gostaria%20de%20fazer%20a%20minha%20matricula!",
                  "_blank"
                )
              }
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            >
              MATRICULE-SE
            </Button>
          </div>
        </div>
      </header>

      <main className="grow pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Academia Moderna"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="max-w-3xl mt-24"
            >
              <motion.h1
                variants={fadeIn}
                className="text-6xl md:text-8xl font-black italic tracking-tight leading-tight mb-8"
              >
                <span className="text-white drop-shadow-lg block mb-2">
                  SUA MELHOR
                </span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-red-500 to-primary drop-shadow-[0_0_25px_rgba(220,20,60,0.8)] filter block mb-2">
                  VERSÃO
                </span>
                <span className="text-white drop-shadow-lg block">
                  COMEÇA{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-red-500 to-primary drop-shadow-[0_0_25px_rgba(220,20,60,0.8)] filter">
                    AGORA
                  </span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed"
              >
                Equipamentos de última geração, profissionais dedicados e o
                ambiente perfeito para você superar seus limites.
              </motion.p>

              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={() =>
                    window.open(
                      "https://api.whatsapp.com/send/?phone=5535999384418&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20academia%20e%20gostaria%20de%20fazer%20a%20minha%20matricula!",
                      "_blank"
                    )
                  }
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 text-lg px-8 h-14 font-bold border-0"
                >
                  COMEÇAR AGORA <ChevronRight className="ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-primary rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                POR QUE ESCOLHER A{" "}
                <span className="text-primary">SAÚDE FIT</span>?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {
                  title: "Máquinas de Alta Performance e Qualidade",
                  description:
                    "Contamos com equipamentos de última geração, garantindo o máximo de conforto e eficiência em cada treino.",
                  icon: Dumbbell,
                },
                {
                  title: "Ambiente 100% Climatizado",
                  description:
                    "Treine com conforto durante todo o ano! Nosso espaço é totalmente climatizado para você se sentir bem em qualquer estação.",
                  icon: Snowflake,
                },
                {
                  title: "Treinamento Personalizado",
                  description:
                    "Cada corpo é único. Nossos treinadores criam planos de treino que atendem suas necessidades e objetivos individuais.",
                  icon: UserCog,
                },
                {
                  title: "Quadras de Beach Tennis e Futevôlei",
                  subtitle: "Unidade Perimetral",
                  description:
                    "Oferecemos tudo o que você precisa para treinar e praticar esportes de forma eficaz e segura.",
                  icon: Trophy,
                },
                {
                  title: "Estacionamento Próprio",
                  subtitle: "Unidade Perimetral",
                  description:
                    "Estacione com segurança: temos vagas exclusivas para alunos.",
                  icon: Car,
                },
                {
                  title: "Aplicativo exclusivo de treino",
                  description:
                    "Acompanhe seu treino e todas sua evolução nosso aplicativo exclusivo.",
                  icon: Smartphone,
                },
                {
                  title: "Ambiente Seguro e Equipamentos Certificados",
                  description:
                    "Nossas máquinas são periodicamente inspecionadas e passam por manutenção regular, garantindo um treino seguro e eficaz para você.",
                  icon: ShieldCheck,
                },
                {
                  title: "Profissionais qualificados",
                  description:
                    "Treinadores especializados para acompanhar seu desempenho.",
                  icon: Medal,
                },
                {
                  title: "Vestiários Amplos com Chuveiros",
                  description: "Conforto e praticidade para sua rotina.",
                  icon: ShowerHead,
                },
                {
                  title: "Cadeiras de Massagem",
                  description: "Relaxe após o treino com máximo conforto.",
                  icon: Armchair,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative group h-full"
                >
                  <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-primary/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  <div className="relative p-6 h-full bg-card rounded-2xl border border-white/10 hover:border-transparent transition-colors duration-300 flex flex-col items-start overflow-hidden">
                    <div className="absolute top-0 right-0 p-24 bg-primary/5 rounded-full blur-3xl -mr-12 -mt-12 transition-all duration-500 group-hover:bg-primary/10" />

                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-inner shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-lg font-heading font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300 leading-tight">
                        {feature.title}
                      </h3>
                      {feature.subtitle && (
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1 block bg-primary/10 w-fit px-2 py-0.5 rounded">
                          {feature.subtitle}
                        </span>
                      )}
                      <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mt-2">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlight */}
        <section id="modalidades" className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
                <Carousel
                  className="w-full max-w-lg mx-auto"
                  opts={{ loop: true }}
                >
                  <CarouselContent>
                    {[
                      runnerImage,
                      sandCourtImage,
                      weightTrainingImage,
                      danceClassImage,
                      martialArtsImage,
                    ].map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <img
                            src={img}
                            alt={`Galeria da Academia ${index + 1}`}
                            className="aspect-square object-cover rounded-2xl shadow-2xl border border-white/10 w-full saturate-50 hover:saturate-100 transition-all duration-500"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </div>

              <div>
                <h2 className="text-5xl font-heading font-bold mb-6">
                  MAIS QUE UMA <span className="text-primary">ACADEMIA</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Oferecemos uma experiência completa de bem-estar. Desde
                  musculação de alta performance até aulas coletivas
                  energizantes, temos tudo o que você precisa para atingir seus
                  objetivos.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {[
                    "Musculação",
                    "Ritmos",
                    "Quadras de areia",
                    "Spinning",
                    "Boxe",
                    "Muay Thai",
                    "Dança",
                    "Ritbox",
                    "Jump",
                    "Funcional",
                    "Step",
                    "Pilates Solo",
                    "Jiu Jitsu (Adulto e Kids)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/feedback">
                  <div className="bg-card border border-primary/30 p-6 rounded-xl flex items-center gap-6 cursor-pointer hover:bg-card/80 transition-all group">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Star className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-bold mb-1">
                        SUA OPINIÃO IMPORTA
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Ajude-nos a melhorar. Deixe seu feedback.
                      </p>
                    </div>
                    <ChevronRight className="ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section
          id="planos"
          className="py-20 bg-background border-t border-white/5"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                ESCOLHA SEU <span className="text-primary">PLANO</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Opções flexíveis que se adaptam ao seu estilo de vida e
                objetivos.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Avulso */}
              <Card className="bg-card border-white/10 relative overflow-hidden hover:border-primary/50 transition-all">
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    AVULSO
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">
                      R$ 179,90
                    </span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-8 grow">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span>Acesso de 1 mês</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span>Acesso a apenas uma unidade</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span>Sem fidelidade</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold"
                    onClick={() =>
                      window.open(
                        "https://api.whatsapp.com/send/?phone=5535999384418&text=Ol%C3%A1%2C%20gostaria%20de%20me%20matricular%20no%20plano%20Avulso!",
                        "_blank"
                      )
                    }
                  >
                    ESCOLHER AVULSO
                  </Button>
                </CardContent>
              </Card>

              {/* Recorrente */}
              <Card className="bg-card border-primary relative overflow-hidden transform md:-translate-y-4 shadow-2xl shadow-primary/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded uppercase">
                  Popular
                </div>
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    RECORRENTE
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">
                      R$ 149,90
                    </span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-8 grow">
                    <li className="flex items-start gap-3 text-white">
                      <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span>Cobrança mensal automática</span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span>3 meses de fidelidade</span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span>
                        Acesso a <strong>AMBAS</strong> as unidades
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span>Apenas cartão de crédito</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 text-lg"
                    onClick={() =>
                      window.open(
                        "https://api.whatsapp.com/send/?phone=5535999384418&text=Ol%C3%A1%2C%20gostaria%20de%20me%20matricular%20no%20plano%20Recorrente!",
                        "_blank"
                      )
                    }
                  >
                    QUERO ESTE PLANO
                  </Button>
                </CardContent>
              </Card>

              {/* Anual */}
              <Card className="bg-card border-white/10 relative overflow-hidden hover:border-primary/50 transition-all">
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    ANUAL
                  </h3>
                  <div className="mb-1">
                    <span className="text-4xl font-bold text-white">
                      R$ 119,90
                    </span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-6">
                    Total de R$ 1438,80 (em até 12x)
                  </div>
                  <ul className="space-y-4 mb-8 grow">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span>
                        Acesso a <strong>AMBAS</strong> as unidades
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span>Direito a 30 dias de trancamento</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span>Compromete limite do cartão</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span>Melhor custo-benefício</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold"
                    onClick={() =>
                      window.open(
                        "https://api.whatsapp.com/send/?phone=5535999384418&text=Ol%C3%A1%2C%20gostaria%20de%20me%20matricular%20no%20plano%20Anual!",
                        "_blank"
                      )
                    }
                  >
                    ESCOLHER ANUAL
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Units Section */}
        <section
          id="unidades"
          className="py-20 bg-card/30 border-t border-white/5"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                NOSSAS <span className="text-primary">UNIDADES</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Encontre a Saúde Fit mais próxima de você e comece sua
                transformação hoje mesmo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Unit 1 */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-card">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={unit1Image}
                    alt="Unidade Vila São Francisco"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 saturate-50 group-hover:saturate-100"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    UNIDADE 1
                  </h3>
                  <div className="flex items-start gap-3 text-muted-foreground mb-4">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p>
                      R. Barão do Rio Branco, 37
                      <br />
                      Vila São Francisco, Lavras - MG
                      <br />
                      CEP: 37200-000
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-primary/50 text-primary hover:bg-primary hover:text-white font-bold"
                    onClick={() =>
                      window.open(
                        "https://maps.google.com/?q=R.+Barão+do+Rio+Branco,+37+-+Vila+Sao+Francisco,+Lavras+-+MG,+37200-000",
                        "_blank"
                      )
                    }
                  >
                    VER NO MAPA
                  </Button>
                </div>
              </div>

              {/* Unit 2 */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-card">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={unit2Image}
                    alt="Unidade Belo Horizonte"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 saturate-50 group-hover:saturate-100"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    UNIDADE 2
                  </h3>
                  <div className="flex items-start gap-3 text-muted-foreground mb-4">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p>
                      Av. Dr. Silvio Menicucci, 2126
                      <br />
                      Belo Horizonte, Lavras - MG
                      <br />
                      CEP: 37200-000
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-primary/50 text-primary hover:bg-primary hover:text-white font-bold"
                    onClick={() =>
                      window.open(
                        "https://maps.google.com/?q=Av.+Dr.+Silvio+Menicucci,+2126+-+Belo+Horizonte,+Lavras+-+MG,+37200-000",
                        "_blank"
                      )
                    }
                  >
                    VER NO MAPA
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img
              src={logoImage}
              alt="Saúde Fit Logo"
              className="h-8 w-auto object-contain opacity-80"
            />
          </div>

          <div className="flex justify-center mb-8">
            <a
              href="https://www.instagram.com/saudefitlavras/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all duration-300 group"
              aria-label="Siga-nos no Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>

          <p>&copy; 2025 Saúde Fit Academia. Todos os direitos reservados.</p>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground/60">
            <span>Desenvolvido por</span>
            <a
              href="https://www.instagram.com/auratechn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src={auraTechLogo}
                alt="Aura Tech"
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
