import { useState, useEffect } from "react";
import { INITIAL_FEEDBACKS } from "@/data/mockData";

// Types
export interface Collaborator {
  id: string;
  name: string;
  role: string;
  unit: string;
  image?: string;
  active: boolean;
}

export interface FeedbackItem {
  id: string;
  category: string;
  personId?: string;
  personName?: string;
  rating: number;
  message?: string;
  userName?: string;
  date: string;
  unit?: string; // Added unit to feedback
}

// Initial Mock Data for Collaborators
export const INITIAL_COLLABORATORS: Collaborator[] = [
  {
    id: "rec-1",
    name: "Ana Silva",
    role: "Recepcionista",
    unit: "Unidade Centro",
    active: true,
    image:
      "/attached_assets/generated_images/professional_portrait_of_a_friendly_gym_receptionist,_female,_smiling,_uniform.png",
  },
  {
    id: "inst-1",
    name: "Carlos Oliveira",
    role: "Professor",
    unit: "Unidade Centro",
    active: true,
    image:
      "/attached_assets/generated_images/professional_portrait_of_a_fitness_instructor,_male,_muscular,_gym_background.png",
  },
  {
    id: "inst-2",
    name: "Fernanda Lima",
    role: "Professor",
    unit: "Unidade Sul",
    active: true,
    image:
      "/attached_assets/generated_images/professional_portrait_of_a_fitness_instructor,_female,_athletic,_gym_background.png",
  },
];

export const UNITS = ["Unidade Centro", "Unidade Sul", "Unidade Norte"];
export const ROLES = ["Recepcionista", "Professor", "Limpeza", "Gerente"];

// Hook
export function useStore() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [units] = useState<string[]>(UNITS);
  const [roles] = useState<string[]>(ROLES);

  // Load initial data
  useEffect(() => {
    const loadData = () => {
      // Collaborators
      const storedCollabs = localStorage.getItem("collaborators");
      if (storedCollabs) {
        setCollaborators(JSON.parse(storedCollabs));
      } else {
        localStorage.setItem(
          "collaborators",
          JSON.stringify(INITIAL_COLLABORATORS)
        );
        setCollaborators(INITIAL_COLLABORATORS);
      }

      // Feedbacks
      const storedFeedbacks = localStorage.getItem("feedbacks");
      if (storedFeedbacks) {
        setFeedbacks(JSON.parse(storedFeedbacks));
      } else {
        localStorage.setItem("feedbacks", JSON.stringify(INITIAL_FEEDBACKS));
        setFeedbacks(INITIAL_FEEDBACKS);
      }
    };

    loadData();

    // Listen for storage events to sync across tabs
    const handleStorage = () => loadData();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addCollaborator = (collab: Omit<Collaborator, "id" | "active">) => {
    const newCollab: Collaborator = {
      ...collab,
      id: Math.random().toString(36).substr(2, 9),
      active: true,
      // Use a placeholder if no image provided, or we could generate one later
      image:
        collab.image ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${collab.name}`,
    };

    const updated = [...collaborators, newCollab];
    setCollaborators(updated);
    localStorage.setItem("collaborators", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const addFeedback = (feedback: Omit<FeedbackItem, "id" | "date">) => {
    const newFeedback: FeedbackItem = {
      ...feedback,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };

    // If personId is present, try to find their unit
    if (newFeedback.personId && !newFeedback.unit) {
      const person = collaborators.find((c) => c.id === newFeedback.personId);
      if (person) {
        newFeedback.unit = person.unit;
      }
    }

    const updated = [...feedbacks, newFeedback];
    setFeedbacks(updated);
    localStorage.setItem("feedbacks", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  return {
    collaborators,
    feedbacks,
    units,
    roles,
    addCollaborator,
    addFeedback,
  };
}
