import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Products table
  products: defineTable({
    name: v.string(),
  }),

  // Upcoming products table
  upcomingProducts: defineTable({
    name: v.string(),
    expectedDate: v.number(), // Unix timestamp
  }),

  // Generic products table
  genericProducts: defineTable({
    name: v.string(),
  }),

  // Upcoming Generic products table
  upcomingGenericProducts: defineTable({
    name: v.string(),
    expectedDate: v.number(), // Unix timestamp
  }),
});

