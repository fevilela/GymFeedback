import {
  UserCircle,
  Users,
  Dumbbell,
  SprayCan,
  Building,
  MessageSquare,
} from "lucide-react";

export interface FeedbackItem {
  id: string;
  category: string;
  personId?: string;
  personName?: string;
  rating: number;
  message?: string;
  userName?: string;
  date: string;
}

export const INITIAL_FEEDBACKS: FeedbackItem[] = [
  {
    id: "1",
    category: "Recepção",
    personId: "rec-1",
    personName: "Ana Silva",
    rating: 5,
    message: "Muito atenciosa e simpática!",
    userName: "Marcos",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "2",
    category: "Professores",
    personId: "inst-1",
    personName: "Carlos Oliveira",
    rating: 5,
    message: "Melhor treino que já fiz.",
    userName: "Julia",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "3",
    category: "Equipamentos",
    rating: 4,
    message: "Alguns halteres estão descascando, mas o resto é top.",
    userName: "Anonimo",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: "4",
    category: "Limpeza",
    rating: 5,
    message: "Banheiros impecáveis.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
  },
  {
    id: "5",
    category: "Professores",
    personId: "inst-2",
    personName: "Fernanda Lima",
    rating: 5,
    message: "A aula de Fit Dance é incrível!",
    userName: "Carla",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: "6",
    category: "Recepção",
    personId: "rec-2",
    personName: "João Santos",
    rating: 3,
    message: "Demorou um pouco para atender.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 100).toISOString(),
  },
];

export const CATEGORIES = [
  { id: "Recepção", icon: UserCircle, color: "#8b5cf6" }, // Violet
  { id: "Professores", icon: Users, color: "#ec4899" }, // Pink
  { id: "Equipamentos", icon: Dumbbell, color: "#eab308" }, // Yellow
  { id: "Limpeza", icon: SprayCan, color: "#06b6d4" }, // Cyan
  { id: "Estrutura", icon: Building, color: "#10b981" }, // Emerald
  { id: "Outros", icon: MessageSquare, color: "#64748b" }, // Slate
];
