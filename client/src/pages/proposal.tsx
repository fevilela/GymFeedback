import html2pdf from "html2pdf.js";
import { useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Monitor,
  Smartphone,
  Zap,
  Layout,
  Globe,
  Palette,
  ArrowRight,
  Code,
  Shield,
  Search,
  MessageCircle,
  Clock,
  Settings,
  HelpCircle,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoImage from "@assets/logo.png";
import heroImage from "@assets/gym-hero.jpg";

export default function Proposal() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    const element = contentRef.current;
    if (!element) return;

    const opt = {
      margin: 0,
      filename: "proposta-iron-paradise.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // @ts-ignore - html2pdf types are a bit strict/outdated
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div
      ref={contentRef}
      className="min-h-screen bg-black text-white selection:bg-primary selection:text-white font-sans"
    >
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 h-20 print:hidden">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={logoImage}
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="h-6 w-px bg-white/20 mx-2" />
            <span className="font-heading font-bold text-lg tracking-wider hidden sm:block">
              PROPOSTA COMERCIAL
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar PDF
            </Button>
            <Link href="/">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white"
              >
                Ver Site Ao Vivo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Proposal */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 via-black to-black" />
            <div className="absolute top-0 right-0 p-96 bg-primary/5 rounded-full blur-[128px] -mr-32 -mt-32" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                  <Zap className="w-4 h-4" /> Proposta de Desenvolvimento Web
                </div>
                <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 leading-tight">
                  TRANSFORMANDO A <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-blue-300 to-primary">
                    IRON PARADISE
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Uma plataforma digital de alta performance projetada para
                  converter visitantes em alunos, automatizar o atendimento e
                  fortalecer sua marca no ambiente online.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Live Preview Section */}
        <section className="py-20 bg-zinc-900/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4">
                EXPERIÊNCIA VISUAL & UX
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Previews interativos da interface proposta, focada em
                usabilidade e conversão.
              </p>
            </div>

            <div className="grid gap-12 max-w-6xl mx-auto">
              {/* Preview 1: Hero */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Monitor className="text-primary w-5 h-5" /> Home Page &
                    Impacto Visual
                  </h3>
                  <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">
                    Desktop View
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group h-[400px]">
                  {/* We use a scaled div to simulate the screenshot */}
                  <div className="w-[200%] h-[200%] origin-top-left transform scale-50 bg-black pointer-events-none select-none">
                    <img
                      src={heroImage}
                      className="w-full h-full object-cover opacity-60 absolute inset-0"
                    />
                    <div className="relative z-10 p-20 flex flex-col items-center justify-center h-full text-center">
                      <h1 className="text-8xl font-black italic text-white mb-8">
                        SUA MELHOR VERSÃO
                      </h1>
                      <Button
                        size="lg"
                        className="h-24 text-3xl px-12 bg-primary"
                      >
                        COMEÇAR AGORA
                      </Button>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium">
                      Design focado em conversão e impacto visual imediato
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview 2: Mobile */}
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Smartphone className="text-primary w-5 h-5" />{" "}
                      Responsividade Mobile
                    </h3>
                    <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">
                      Mobile View
                    </span>
                  </div>
                  <div className="rounded-3xl overflow-hidden border-8 border-zinc-800 shadow-2xl relative mx-auto w-[300px] h-[600px] bg-black">
                    <div className="h-full w-full overflow-hidden relative">
                      <img
                        src={heroImage}
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                      />
                      <div className="relative z-10 p-6 flex flex-col h-full justify-center">
                        <h2 className="text-4xl font-black italic text-white mb-4 leading-none">
                          SUA MELHOR VERSÃO
                        </h2>
                        <Button className="w-full bg-primary mb-4">
                          MATRICULE-SE
                        </Button>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                          <div className="bg-zinc-900/80 p-3 rounded-lg border border-white/10">
                            <Monitor className="w-4 h-4 text-primary mb-2" />
                            <div className="text-[10px] text-muted-foreground">
                              Musculação
                            </div>
                          </div>
                          <div className="bg-zinc-900/80 p-3 rounded-lg border border-white/10">
                            <Zap className="w-4 h-4 text-primary mb-2" />
                            <div className="text-[10px] text-muted-foreground">
                              Cross
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-8">
                  <div className="bg-card border border-white/10 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-2 text-white flex items-center gap-2">
                      <Layout className="w-5 h-5 text-primary" /> Arquitetura
                      SPA
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Navegação instantânea sem recarregamento de página. O
                      usuário flui entre as seções de planos, modalidades e
                      contato sem atrito, proporcionando uma experiência de app.
                    </p>
                  </div>
                  <div className="bg-card border border-white/10 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-2 text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" /> SEO Otimizado
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Estrutura de código limpa e semântica preparada para os
                      motores de busca (Google), garantindo que a academia seja
                      encontrada organicamente na região.
                    </p>
                  </div>
                  <div className="bg-card border border-white/10 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-2 text-white flex items-center gap-2">
                      <Palette className="w-5 h-5 text-primary" /> Design System
                      Exclusivo
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Identidade visual consistente com cores neon, tipografia
                      bold e modo escuro para transmitir a energia do ambiente
                      de treino e reforçar o branding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scope of Work - Detailed */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold mb-4">
                ESCOPO TÉCNICO DETALHADO
              </h2>
              <p className="text-muted-foreground">
                O que está incluso no desenvolvimento do projeto Full
                Experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-zinc-900/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="text-primary w-5 h-5" /> Front-end &
                    Interface
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Desenvolvimento em React.js + Vite (Alta Performance)
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Estilização com Tailwind CSS (Responsividade Total)
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Animações fluídas com Framer Motion
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Otimização de imagens (Lazy Loading)
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Compatibilidade Cross-Browser (Chrome, Safari, Firefox)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="text-primary w-5 h-5" />{" "}
                    Funcionalidades & Integrações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Integração direta com WhatsApp (API Link)
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Sistema de Avaliação de Satisfação (NPS)
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Dashboard Administrativo para métricas básicas
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Formulários de contato com validação
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Google Maps Embed (Localização das Unidades)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="text-primary w-5 h-5" /> Segurança &
                    Infraestrutura
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Certificado SSL (Site Seguro HTTPS)
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Proteção contra ataques básicos (DDoS via CDN)
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Hospedagem em Servidor de Alta Disponibilidade
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Monitoramento de Uptime 24/7
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="text-primary w-5 h-5" /> SEO & Marketing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Configuração de Meta Tags (Open Graph / Twitter Cards)
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Sitemap XML e Robots.txt
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Integração com Google Analytics 4
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Integração com Pixel do Facebook/Meta
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-zinc-900/30 border-y border-white/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold mb-4">
                CRONOGRAMA DE ENTREGA
              </h2>
              <p className="text-muted-foreground">
                Estimativa de 15 a 20 dias úteis para entrega completa.
              </p>
            </div>

            <div className="relative border-l border-white/10 ml-6 md:ml-12 space-y-12">
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-black shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Semana 1: Discovery & Design
                </h3>
                <p className="text-muted-foreground text-sm">
                  Reunião de briefing, definição de identidade visual, aprovação
                  de layout e coleta de materiais (fotos/textos).
                </p>
              </div>
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-black shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Semana 2: Desenvolvimento
                </h3>
                <p className="text-muted-foreground text-sm">
                  Codificação das páginas, implementação de funcionalidades,
                  integrações com WhatsApp e configuração do Dashboard.
                </p>
              </div>
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-black shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Semana 3: Testes & Conteúdo
                </h3>
                <p className="text-muted-foreground text-sm">
                  Inserção de conteúdo final, testes de responsividade em
                  múltiplos dispositivos, otimização de SEO e correções finais.
                </p>
              </div>
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-4 border-black shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Entrega Final
                </h3>
                <p className="text-muted-foreground text-sm">
                  Treinamento de uso do painel administrativo, entrega de
                  credenciais e publicação oficial do site (Go Live).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investment / Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold mb-4">
                INVESTIMENTO DO PROJETO
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Valores referentes ao desenvolvimento, configuração e publicação
                da plataforma.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic */}
              <Card className="bg-zinc-900/50 border-white/10 hover:border-white/20 transition-all flex flex-col">
                <CardHeader>
                  <CardTitle className="text-white text-xl">
                    Landing Page
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 flex flex-col h-full">
                  <div className="text-3xl font-bold text-primary mb-2">
                    R$ 2.500
                  </div>
                  <div className="text-xs text-muted-foreground mb-6">
                    Pagamento único
                  </div>
                  <ul className="space-y-3 mb-8 text-sm text-muted-foreground grow">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" /> Site
                      One-Page Responsivo
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" /> Seções
                      de Planos e Modalidades
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" /> Botões
                      de WhatsApp
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" /> 1 Mês
                      de Suporte
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Selecionar
                  </Button>
                </CardContent>
              </Card>

              {/* Pro - Featured */}
              <Card className="bg-zinc-900/80 border-primary shadow-[0_0_30px_rgba(37,99,235,0.15)] relative transform md:-translate-y-4 flex flex-col">
                <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
                <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                  Recomendado
                </div>
                <CardHeader>
                  <CardTitle className="text-white text-2xl">
                    Full Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 flex flex-col h-full">
                  <div className="text-4xl font-bold text-primary mb-2">
                    R$ 4.200
                  </div>
                  <div className="text-xs text-muted-foreground mb-6">
                    Pagamento único ou 2x
                  </div>
                  <ul className="space-y-3 mb-8 text-sm text-gray-300 grow">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" /> Tudo
                      do plano Landing Page
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />{" "}
                      <strong>Sistema de Feedback (NPS)</strong>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />{" "}
                      <strong>Dashboard do Gestor</strong>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />{" "}
                      Integração com Instagram
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />{" "}
                      Otimização Avançada de SEO
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" /> 3
                      Meses de Suporte
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                    Contratar Projeto
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise */}
              <Card className="bg-zinc-900/50 border-white/10 hover:border-white/20 transition-all flex flex-col">
                <CardHeader>
                  <CardTitle className="text-white text-xl">
                    E-commerce
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 flex flex-col h-full">
                  <div className="text-3xl font-bold text-primary mb-2">
                    Sob Consulta
                  </div>
                  <div className="text-xs text-muted-foreground mb-6">
                    Projeto Personalizado
                  </div>
                  <ul className="space-y-3 mb-8 text-sm text-muted-foreground grow">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" /> Tudo
                      do plano Full
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" /> Venda
                      de Planos Online (Gateway)
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" /> Área
                      do Aluno Logada
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />{" "}
                      Integração com Catraca
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Falar com Consultor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-zinc-900/30 border-t border-white/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary" /> PERGUNTAS
                FREQUENTES
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-white/10">
                <AccordionTrigger className="text-lg">
                  O site funciona no celular?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sim, totalmente. Utilizamos a abordagem "Mobile First",
                  garantindo que a experiência no celular seja tão boa ou até
                  melhor que no computador, já que a maioria dos seus alunos
                  acessará por lá.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-white/10">
                <AccordionTrigger className="text-lg">
                  Preciso pagar mensalidade?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  O valor do desenvolvimento é único. Após a entrega, você terá
                  apenas os custos básicos de infraestrutura (Hospedagem e
                  Domínio), que giram em torno de R$ 30 a R$ 50 mensais, pagos
                  diretamente aos provedores.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-white/10">
                <AccordionTrigger className="text-lg">
                  Consigo alterar os preços depois?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sim. No plano Full Experience, fornecemos um painel onde você
                  poderá editar informações básicas. Para alterações estruturais
                  maiores, oferecemos pacotes de manutenção ou suporte por hora.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-white/10">
                <AccordionTrigger className="text-lg">
                  O site aparece no Google?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sim. Entregamos o site com toda a estrutura de SEO (Otimização
                  para Motores de Busca) configurada. Isso ajuda sua academia a
                  aparecer nas pesquisas locais quando alguém buscar por
                  "academia no bairro X".
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 text-center text-muted-foreground text-sm bg-black">
          <p>Proposta válida por 15 dias.</p>
          <p className="mt-2">Desenvolvido com tecnologia React e Vite.</p>
        </footer>
      </main>
    </div>
  );
}
