import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, ChevronRight, Dumbbell, Users, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Import generated assets
import heroImage from "@assets/generated_images/modern_dark_gym_interior_with_neon_lighting.png";
import runnerImage from "@assets/generated_images/athletic_person_running_with_motion_blur.png";
import logoImage from "@assets/399394586_722025015923170_6185085609781709026_n_1764870625217.jpg";

import unit1Image from "@assets/generated_images/modern_gym_exterior_on_a_city_street_day_time.png";
import unit2Image from "@assets/generated_images/modern_gym_exterior_on_a_wide_avenue_day_time.png";
import { MapPin } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoImage} alt="Saúde Fit Logo" className="h-12 w-auto object-contain rounded-md" />
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#modalidades" className="text-sm font-medium hover:text-primary transition-colors">MODALIDADES</a>
            <a href="#planos" className="text-sm font-medium hover:text-primary transition-colors">PLANOS</a>
            <a href="#unidades" className="text-sm font-medium hover:text-primary transition-colors">UNIDADES</a>
          </nav>

          <div className="flex items-center gap-4">
             <Link href="/feedback">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hidden sm:flex font-bold">
                <Star className="w-4 h-4 mr-2" />
                AVALIAR
              </Button>
            </Link>
            <Button 
              onClick={() => window.open("https://api.whatsapp.com/send/?phone=5535999384418&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20academia%20e%20gostaria%20de%20fazer%20a%20minha%20matricula!", "_blank")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            >
              MATRICULE-SE
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={heroImage} alt="Academia Moderna" className="w-full h-full object-cover saturate-0 brightness-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-heading font-bold leading-tight mb-6">
                SUA MELHOR <br />
                <span className="text-primary">VERSÃO</span> COMEÇA <br />
                AGORA
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Equipamentos de última geração, profissionais dedicados e o ambiente perfeito para você superar seus limites.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => window.open("https://api.whatsapp.com/send/?phone=5535999384418&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20academia%20e%20gostaria%20de%20fazer%20a%20minha%20matricula!", "_blank")}
                  size="lg" 
                  className="bg-primary text-white hover:bg-primary/90 text-lg px-8 h-14 font-bold border-0"
                >
                  COMEÇAR AGORA <ChevronRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-lg px-8 h-14">
                  CONHECER A ACADEMIA
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

        {/* Stats Section */}
        <section className="py-20 bg-background border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "24/7", label: "HORÁRIO LIVRE", icon: Clock },
                { number: "150+", label: "EQUIPAMENTOS", icon: Dumbbell },
                { number: "30+", label: "AULAS DIÁRIAS", icon: Users },
                { number: "15", label: "ANOS DE HISTÓRIA", icon: Trophy },
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 glass-panel rounded-xl hover:border-primary/50 transition-colors group">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-4xl font-heading font-bold text-white mb-2">{stat.number}</h3>
                  <p className="text-sm text-muted-foreground font-medium tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlight */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
                <img 
                  src={runnerImage} 
                  alt="Treino Funcional" 
                  className="relative rounded-2xl shadow-2xl border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-500 saturate-50" 
                />
              </div>
              
              <div>
                <h2 className="text-5xl font-heading font-bold mb-6">
                  MAIS QUE UMA <span className="text-primary">ACADEMIA</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Oferecemos uma experiência completa de bem-estar. Desde musculação de alta performance até aulas coletivas energizantes, temos tudo o que você precisa para atingir seus objetivos.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {[
                    "Spinning",
                    "Boxe",
                    "Muay Thai",
                    "Dança",
                    "Ritbox",
                    "Jump",
                    "Funcional",
                    "Step",
                    "Pilates Solo",
                    "Jiu Jitsu (Adulto e Kids)"
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
                      <h4 className="font-heading text-xl font-bold mb-1">SUA OPINIÃO IMPORTA</h4>
                      <p className="text-sm text-muted-foreground">Ajude-nos a melhorar. Deixe seu feedback.</p>
                    </div>
                    <ChevronRight className="ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Units Section */}
        <section id="unidades" className="py-20 bg-card/30 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">NOSSAS <span className="text-primary">UNIDADES</span></h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Encontre a Saúde Fit mais próxima de você e comece sua transformação hoje mesmo.
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
                  <h3 className="text-2xl font-heading font-bold mb-2">UNIDADE 1</h3>
                  <div className="flex items-start gap-3 text-muted-foreground mb-4">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p>R. Barão do Rio Branco, 37<br/>Vila São Francisco, Lavras - MG<br/>CEP: 37200-000</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/50 text-primary hover:bg-primary hover:text-white font-bold"
                    onClick={() => window.open("https://maps.google.com/?q=R.+Barão+do+Rio+Branco,+37+-+Vila+Sao+Francisco,+Lavras+-+MG,+37200-000", "_blank")}
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
                  <h3 className="text-2xl font-heading font-bold mb-2">UNIDADE 2</h3>
                  <div className="flex items-start gap-3 text-muted-foreground mb-4">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p>Av. Dr. Silvio Menicucci, 2126<br/>Belo Horizonte, Lavras - MG<br/>CEP: 37200-000</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/50 text-primary hover:bg-primary hover:text-white font-bold"
                    onClick={() => window.open("https://maps.google.com/?q=Av.+Dr.+Silvio+Menicucci,+2126+-+Belo+Horizonte,+Lavras+-+MG,+37200-000", "_blank")}
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
            <img src={logoImage} alt="Saúde Fit Logo" className="h-8 w-auto object-contain opacity-80" />
          </div>
          <p>&copy; 2025 Saúde Fit Academia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}