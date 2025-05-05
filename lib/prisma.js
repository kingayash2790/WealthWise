// Import PrismaClient from @prisma/client
import { PrismaClient } from "@prisma/client";

// Initialize Prisma client with a global caching mechanism
// This prevents multiple instances of PrismaClient in development
export const db = globalThis.prisma || new PrismaClient();

// In development, cache the PrismaClient instance globally
// This helps prevent too many connections to the database during development
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
