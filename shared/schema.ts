import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const collaborators = pgTable("collaborators", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  unit: text("unit").notNull(),
  image: text("image"),
  active: boolean("active").notNull().default(true),
});

export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  personId: integer("person_id").references(() => collaborators.id),
  personName: text("person_name"),
  rating: integer("rating").notNull(),
  message: text("message"),
  userName: text("user_name"),
  userEmail: text("user_email"),
  date: timestamp("date").notNull().defaultNow(),
  unit: text("unit"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCollaboratorSchema = createInsertSchema(collaborators).omit({
  id: true,
});

export const insertFeedbackSchema = createInsertSchema(feedbacks).omit({
  id: true,
  date: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Collaborator = typeof collaborators.$inferSelect;
export type InsertCollaborator = z.infer<typeof insertCollaboratorSchema>;
export type Feedback = typeof feedbacks.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
