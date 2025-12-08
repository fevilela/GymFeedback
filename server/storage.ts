import {
  users,
  collaborators,
  feedbacks,
  type User,
  type InsertUser,
  type Collaborator,
  type InsertCollaborator,
  type Feedback,
  type InsertFeedback,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Collaborators
  getCollaborators(): Promise<Collaborator[]>;
  createCollaborator(collaborator: InsertCollaborator): Promise<Collaborator>;
  updateCollaborator(
    id: number,
    collaborator: Partial<Collaborator>
  ): Promise<Collaborator>;
  deleteCollaborator(id: number): Promise<void>;

  // Feedbacks
  getFeedbacks(): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getCollaborators(): Promise<Collaborator[]> {
    return await db.select().from(collaborators);
  }

  async createCollaborator(
    collaborator: InsertCollaborator
  ): Promise<Collaborator> {
    const [newCollaborator] = await db
      .insert(collaborators)
      .values(collaborator)
      .returning();
    return newCollaborator;
  }

  async updateCollaborator(
    id: number,
    collaborator: Partial<Collaborator>
  ): Promise<Collaborator> {
    const [updatedCollaborator] = await db
      .update(collaborators)
      .set(collaborator)
      .where(eq(collaborators.id, id))
      .returning();
    return updatedCollaborator;
  }

  async deleteCollaborator(id: number): Promise<void> {
    await db.delete(collaborators).where(eq(collaborators.id, id));
  }

  async getFeedbacks(): Promise<Feedback[]> {
    return await db.select().from(feedbacks).orderBy(desc(feedbacks.date));
  }

  async createFeedback(feedback: InsertFeedback): Promise<Feedback> {
    const [newFeedback] = await db
      .insert(feedbacks)
      .values(feedback)
      .returning();
    return newFeedback;
  }
}

export const storage = new DatabaseStorage();
