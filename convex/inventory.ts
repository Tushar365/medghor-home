import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ===== Validators =====
const productFields = {
  name: v.string(),
};

const upcomingProductFields = {
  name: v.string(),
  expectedDate: v.number(),
};

// ===== PRODUCTS FUNCTIONS =====

export const addProduct = mutation({
  args: productFields,
  returns: v.id("products"),
  handler: async (ctx, args) => ctx.db.insert("products", args),
});

export const editProduct = mutation({
  args: {
    id: v.id("products"),
    ...productFields,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { name: args.name });
    return null;
  },
});

export const removeProduct = mutation({
  args: { id: v.id("products") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});

export const listProducts = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("products"),
      _creationTime: v.number(),
      _updateTime: v.optional(v.number()),
      ...productFields,
    })
  ),
  handler: async (ctx) => ctx.db.query("products").collect(),
});

// ===== UPCOMING PRODUCTS FUNCTIONS =====

export const addUpcomingProduct = mutation({
  args: upcomingProductFields,
  returns: v.id("upcomingProducts"),
  handler: async (ctx, args) => ctx.db.insert("upcomingProducts", args),
});

export const editUpcomingProduct = mutation({
  args: {
    id: v.id("upcomingProducts"),
    ...upcomingProductFields,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { name: args.name, expectedDate: args.expectedDate });
    return null;
  },
});

export const removeUpcomingProduct = mutation({
  args: { id: v.id("upcomingProducts") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});

export const listUpcomingProducts = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("upcomingProducts"),
      _creationTime: v.number(),
      _updateTime: v.optional(v.number()),
      ...upcomingProductFields,
    })
  ),
  handler: async (ctx) => ctx.db.query("upcomingProducts").collect(),
});

// ===== GENERIC PRODUCTS FUNCTIONS =====

export const addGenericProduct = mutation({
  args: productFields,
  returns: v.id("genericProducts"),
  handler: async (ctx, args) => ctx.db.insert("genericProducts", args),
});

export const editGenericProduct = mutation({
  args: {
    id: v.id("genericProducts"),
    ...productFields,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { name: args.name });
    return null;
  },
});

export const removeGenericProduct = mutation({
  args: { id: v.id("genericProducts") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});

export const listGenericProducts = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("genericProducts"),
      _creationTime: v.number(),
      _updateTime: v.optional(v.number()),
      ...productFields,
    })
  ),
  handler: async (ctx) => ctx.db.query("genericProducts").collect(),
});

// ===== UPCOMING GENERIC PRODUCTS FUNCTIONS =====

export const addUpcomingGenericProduct = mutation({
  args: upcomingProductFields,
  returns: v.id("upcomingGenericProducts"),
  handler: async (ctx, args) => ctx.db.insert("upcomingGenericProducts", args),
});

export const editUpcomingGenericProduct = mutation({
  args: {
    id: v.id("upcomingGenericProducts"),
    ...upcomingProductFields,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { name: args.name, expectedDate: args.expectedDate });
    return null;
  },
});

export const removeUpcomingGenericProduct = mutation({
  args: { id: v.id("upcomingGenericProducts") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});

export const listUpcomingGenericProducts = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("upcomingGenericProducts"),
      _creationTime: v.number(),
      _updateTime: v.optional(v.number()),
      ...upcomingProductFields,
    })
  ),
  handler: async (ctx) => ctx.db.query("upcomingGenericProducts").collect(),
});