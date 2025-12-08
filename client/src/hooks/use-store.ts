import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import {
  type Collaborator,
  type Feedback,
  type InsertCollaborator,
  type InsertFeedback,
} from "@shared/schema";

export const UNITS = ["Unidade Centro", "Unidade Perimetral"];
export const ROLES = ["Recepcionista", "Professor", "Limpeza", "Gerente"];

export function useStore() {
  const { data: collaborators = [] } = useQuery<Collaborator[]>({
    queryKey: ["/api/collaborators"],
  });

  const { data: feedbacks = [] } = useQuery<Feedback[]>({
    queryKey: ["/api/feedbacks"],
  });

  const addCollaboratorMutation = useMutation({
    mutationFn: async (collab: InsertCollaborator) => {
      const res = await apiRequest("POST", "/api/collaborators", collab);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/collaborators"] });
    },
  });

  const updateCollaboratorMutation = useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: { id: number } & Partial<Collaborator>) => {
      const res = await apiRequest("PUT", `/api/collaborators/${id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/collaborators"] });
    },
  });

  const removeCollaboratorMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/collaborators/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/collaborators"] });
    },
  });

  const addFeedbackMutation = useMutation({
    mutationFn: async (feedback: InsertFeedback) => {
      // Check for duplicate feedback before sending
      if (feedback.personId && feedback.userEmail) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const existingFeedback = feedbacks.find((f) => {
          return (
            f.personId === feedback.personId &&
            f.userEmail === feedback.userEmail &&
            new Date(f.date) > oneWeekAgo
          );
        });

        if (existingFeedback) {
          throw new Error("Você já avaliou este profissional nesta semana.");
        }
      }

      const res = await apiRequest("POST", "/api/feedbacks", feedback);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/feedbacks"] });
    },
  });

  return {
    collaborators,
    feedbacks,
    units: UNITS,
    roles: ROLES,
    addCollaborator: addCollaboratorMutation.mutateAsync,
    updateCollaborator: (id: number, updates: Partial<Collaborator>) =>
      updateCollaboratorMutation.mutateAsync({ id, ...updates }),
    removeCollaborator: removeCollaboratorMutation.mutateAsync,
    addFeedback: async (feedback: InsertFeedback) => {
      try {
        await addFeedbackMutation.mutateAsync(feedback);
        return { success: true };
      } catch (e: any) {
        return {
          success: false,
          message: e.message || "Erro ao enviar feedback",
        };
      }
    },
  };
}
