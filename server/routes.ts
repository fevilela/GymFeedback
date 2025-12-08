import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertCollaboratorSchema,
  insertFeedbackSchema,
  insertUserSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth routes
  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    // Simple auth for now since we don't have session setup in this file yet
    // In a real app we'd use passport or similar
    // For this prototype/demo, we'll check against database if user exists,
    // or just allow 'admin' hardcoded if database is empty or for specific user

    if (username === "admin" && password === "admin") {
      // Create admin user if not exists
      let user = await storage.getUserByUsername("admin");
      if (!user) {
        user = await storage.createUser({
          username: "admin",
          password: "admin",
        });
      }
      return res.json({ success: true, user });
    }

    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ success: true, user });
  });

  // Collaborators Routes
  app.get("/api/collaborators", async (req, res) => {
    const collaborators = await storage.getCollaborators();
    res.json(collaborators);
  });

  app.post("/api/collaborators", async (req, res) => {
    try {
      const data = insertCollaboratorSchema.parse(req.body);
      const collaborator = await storage.createCollaborator(data);
      res.json(collaborator);
    } catch (e) {
      if (e instanceof z.ZodError) {
        res.status(400).json(e.errors);
      } else {
        throw e;
      }
    }
  });

  app.put("/api/collaborators/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    try {
      const collaborator = await storage.updateCollaborator(id, req.body);
      res.json(collaborator);
    } catch (e) {
      res.status(500).json({ message: "Failed to update collaborator" });
    }
  });

  app.delete("/api/collaborators/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    await storage.deleteCollaborator(id);
    res.status(204).send();
  });

  // Feedbacks Routes
  app.get("/api/feedbacks", async (req, res) => {
    const feedbacks = await storage.getFeedbacks();
    res.json(feedbacks);
  });

  app.post("/api/feedbacks", async (req, res) => {
    try {
      const data = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(data);
      res.json(feedback);
    } catch (e) {
      if (e instanceof z.ZodError) {
        res.status(400).json(e.errors);
      } else {
        throw e;
      }
    }
  });

  return httpServer;
}
