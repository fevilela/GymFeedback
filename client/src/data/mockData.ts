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
  userEmail?: string;
  date: string;
}

export const INITIAL_FEEDBACKS: FeedbackItem[] = [];

export const CATEGORIES = [
  { id: "Recepção", icon: UserCircle, color: "#8b5cf6" }, // Violet
  { id: "Professores", icon: Users, color: "#ec4899" }, // Pink
  { id: "Equipamentos", icon: Dumbbell, color: "#eab308" }, // Yellow
  { id: "Limpeza", icon: SprayCan, color: "#06b6d4" }, // Cyan
  { id: "Estrutura", icon: Building, color: "#10b981" }, // Emerald
  { id: "Outros", icon: MessageSquare, color: "#64748b" }, // Slate
];
