import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["CLIENT", "COOK"]).default("CLIENT"),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  locale: z.string().default("fr"),
});

export const cookProfileSchema = z.object({
  bio: z.string().optional(),
  specialty: z.string().optional(),
  kitchenType: z.string().optional(),
  deliveryRadius: z.number().min(0, "Must be positive"),
  minOrderAmount: z.number().min(0, "Must be positive"),
});

export const dishSchema = z.object({
  name: z.string().min(2, "Name is required"),
  nameEn: z.string().optional(),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  category: z.string().optional(),
  allergens: z.array(z.string()).default([]),
  prepTime: z.number().min(0, "Prep time must be positive"),
  isAvailable: z.boolean().default(true),
  isVegetarian: z.boolean().default(false),
  isVegan: z.boolean().default(false),
  isGlutenFree: z.boolean().default(false),
});

export const orderItemSchema = z.object({
  dishId: z.string().uuid(),
  quantity: z.number().int().min(1),
});

export const orderSchema = z.object({
  cookProfileId: z.string().uuid(),
  items: z.array(orderItemSchema).min(1, "Order must have at least one item"),
  note: z.string().optional(),
  type: z.enum(["PICKUP", "DELIVERY"]).default("PICKUP"),
});

export const reviewSchema = z.object({
  dishId: z.string().uuid().optional(),
  cookProfileId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});
