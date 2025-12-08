import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import {
  LayoutDashboard,
  ArrowLeft,
  Star,
  TrendingUp,
  Users,
  MessageSquare,
  Filter,
  X,
  Settings,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDateRangePicker } from "@/components/ui/custom-calendar";
import { CATEGORIES } from "@/data/mockData";
import {
  format,
  isWithinInterval,
  startOfDay,
  endOfDay,
  subDays,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useStore } from "@/hooks/use-store";

// DateRange interface matching the custom calendar
interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export default function Dashboard() {
  const { feedbacks: allFeedbacks, collaborators, units } = useStore();
  const [filteredFeedbacks, setFilteredFeedbacks] = useState(allFeedbacks);

  // Filters
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [selectedPerson, setSelectedPerson] = useState<string>("all");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");

  // Apply filters
  useEffect(() => {
    let result = [...allFeedbacks];

    // Filter by Date
    if (date?.from) {
      result = result.filter((item) => {
        const itemDate = new Date(item.date);
        return isWithinInterval(itemDate, {
          start: startOfDay(date.from!),
          end: endOfDay(date.to || date.from!),
        });
      });
    }

    // Filter by Person
    if (selectedPerson && selectedPerson !== "all") {
      result = result.filter(
        (item) => item.personId === parseInt(selectedPerson)
      );
    }

    // Filter by Unit
    if (selectedUnit && selectedUnit !== "all") {
      // If feedback has explicit unit, use it.
      // Otherwise try to find unit via personId if available.
      result = result.filter((item) => {
        if (item.unit) return item.unit === selectedUnit;
        if (item.personId) {
          const person = collaborators.find((c) => c.id === item.personId);
          return person?.unit === selectedUnit;
        }
        return false; // No unit info, filter out
      });
    }

    setFilteredFeedbacks(result);
  }, [allFeedbacks, date, selectedPerson, selectedUnit, collaborators]);

  // METRICS CALCULATION (using filtered data)
  const totalFeedbacks = filteredFeedbacks.length;
  const averageRating =
    totalFeedbacks > 0
      ? (
          filteredFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) /
          totalFeedbacks
        ).toFixed(1)
      : "0.0";

  const feedbacksToday = filteredFeedbacks.filter((f) => {
    const today = new Date();
    const date = new Date(f.date);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }).length;

  // DATA FOR GRAPHS

  // 1. Average Rating per Category
  const categoryData = CATEGORIES.map((cat) => {
    const catFeedbacks = filteredFeedbacks.filter((f) => f.category === cat.id);
    const avg =
      catFeedbacks.length > 0
        ? catFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) /
          catFeedbacks.length
        : 0;
    return {
      name: cat.id,
      rating: Number(avg.toFixed(1)),
      count: catFeedbacks.length,
      color: cat.color,
    };
  }).filter((d) => d.count > 0);

  // 2. Rating Distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    name: `${star} Estrelas`,
    value: filteredFeedbacks.filter((f) => f.rating === star).length,
    star: star,
  }));

  // 3. Top Staff
  const staffMap = new Map<
    number,
    { name: string; total: number; count: number; image?: string | null }
  >();

  filteredFeedbacks.forEach((f) => {
    if (f.personId) {
      const person = collaborators.find((c) => c.id === f.personId);

      // Only include if person exists in the current collaborators list
      if (person) {
        const personName = person.name;
        const personImage = person.image;

        const current = staffMap.get(f.personId) || {
          name: personName,
          total: 0,
          count: 0,
          image: personImage,
        };

        staffMap.set(f.personId, {
          name: personName,
          total: current.total + f.rating,
          count: current.count + 1,
          image: personImage,
        });
      }
    }
  });

  const topStaff = Array.from(staffMap.values())
    .map((s) => ({ ...s, average: s.total / s.count }))
    .sort((a, b) => {
      // Primary sort: Average rating (descending)
      if (b.average !== a.average) {
        return b.average - a.average;
      }
      // Secondary sort: Number of evaluations (descending) - Tie breaker
      return b.count - a.count;
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            Dashboard de Avaliações
          </h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe o desempenho e feedback dos alunos em tempo real.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/collaborators">
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" /> Gerenciar Equipe
            </Button>
          </Link>
          <Link href="/">
            <Button variant="default" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Voltar para Início
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Filters Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-card/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 md:col-span-1">
            <Filter className="w-5 h-5 text-primary" />
            <span className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
              Filtros
            </span>
          </div>

          {/* Custom Calendar */}
          <div className="md:col-span-1">
            <CalendarDateRangePicker
              date={date}
              setDate={setDate}
              className="w-full"
            />
          </div>

          {/* Collaborator Filter */}
          <div className="md:col-span-1">
            <Select value={selectedPerson} onValueChange={setSelectedPerson}>
              <SelectTrigger className="w-full bg-card/50 border-white/10">
                <SelectValue placeholder="Todos os Colaboradores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Colaboradores</SelectItem>
                {collaborators.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Unit Filter */}
          <div className="md:col-span-1">
            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
              <SelectTrigger className="w-full bg-card/50 border-white/10">
                <SelectValue placeholder="Todas as Unidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Unidades</SelectItem>
                {units.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Média Geral
              </CardTitle>
              <Star className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                {averageRating}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                de 5.0 estrelas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Avaliações
              </CardTitle>
              <MessageSquare className="w-4 h-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                {totalFeedbacks}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                no período selecionado
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Hoje
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                {feedbacksToday}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                novas avaliações
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Performance Bar Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10 col-span-1">
            <CardHeader>
              <CardTitle>Desempenho por Categoria</CardTitle>
              <CardDescription>Média de avaliação por setor</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff10"
                    horizontal={false}
                  />
                  <XAxis type="number" domain={[0, 5]} hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      color: "#fff",
                    }}
                    cursor={{ fill: "#ffffff05" }}
                  />
                  <Bar dataKey="rating" radius={[0, 4, 4, 0]} barSize={30}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Rating Distribution Pie Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10 col-span-1">
            <CardHeader>
              <CardTitle>Distribuição de Notas</CardTitle>
              <CardDescription>
                Volume de avaliações por estrelas
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ratingDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ratingDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.star === 5
                            ? "#22c55e" // Green
                            : entry.star === 4
                            ? "#84cc16" // Lime
                            : entry.star === 3
                            ? "#eab308" // Yellow
                            : entry.star === 2
                            ? "#f97316" // Orange
                            : "#ef4444" // Red
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      color: "#fff",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Top Staff & Recent Feedbacks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Staff */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Destaques da Equipe
              </CardTitle>
              <CardDescription>Profissionais melhor avaliados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topStaff.map((staff, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold overflow-hidden border-2 ${
                          idx === 0
                            ? "border-yellow-500/50"
                            : idx === 1
                            ? "border-gray-400/50"
                            : "border-orange-700/50"
                        }`}
                      >
                        {staff.image ? (
                          <img
                            src={staff.image}
                            alt={staff.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs">{idx + 1}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{staff.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {staff.count} avaliações
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                      <span className="font-bold text-primary">
                        {staff.average.toFixed(1)}
                      </span>
                      <Star className="w-3 h-3 text-primary fill-primary" />
                    </div>
                  </div>
                ))}
                {topStaff.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    Nenhum dado para o período selecionado.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Feedbacks List */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" /> Feedbacks
                Recentes
              </CardTitle>
              <CardDescription>Últimos comentários enviados</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {filteredFeedbacks.length > 0 ? (
                    filteredFeedbacks
                      .slice()
                      .reverse()
                      .map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl bg-background/40 border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs px-2 py-1 rounded bg-primary/20 text-primary-foreground">
                                {item.category}
                              </span>
                              {item.personName && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1 border-l border-white/10 pl-2">
                                  {item.personName}
                                </span>
                              )}
                              {item.unit && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1 border-l border-white/10 pl-2">
                                  <Building2 className="w-3 h-3" />
                                  {item.unit}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-white">
                                {item.rating}
                              </span>
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            </div>
                          </div>

                          {item.message && (
                            <p className="text-sm text-gray-300 mb-2 italic">
                              "{item.message}"
                            </p>
                          )}

                          <div className="flex justify-between items-center text-xs text-muted-foreground mt-2 pt-2 border-t border-white/5">
                            <span>{item.userName || "Anônimo"}</span>
                            <span>
                              {format(
                                new Date(item.date),
                                "dd 'de' MMMM 'às' HH:mm",
                                { locale: ptBR }
                              )}
                            </span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum feedback encontrado para este filtro.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
