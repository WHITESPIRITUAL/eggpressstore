import { pgTable, text, serial, integer, numeric, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const eggSizeEnum = pgEnum("egg_size", ["large", "medium", "small"]);
export const quantityTypeEnum = pgEnum("quantity_type", ["full_crate", "half_crate", "quarter_crate", "custom"]);
export const deliveryTypeEnum = pgEnum("delivery_type", ["delivery", "pickup"]);
export const orderStatusEnum = pgEnum("order_status", [
  "received",
  "payment_confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
]);
export const frequencyEnum = pgEnum("frequency", ["weekly", "biweekly", "monthly"]);
export const sellerStatusEnum = pgEnum("seller_status", ["pending", "approved", "rejected"]);

export const eggPricesTable = pgTable("egg_prices", {
  id: serial("id").primaryKey(),
  size: eggSizeEnum("size").notNull(),
  fullCrate: numeric("full_crate", { precision: 10, scale: 2 }).notNull(),
  halfCrate: numeric("half_crate", { precision: 10, scale: 2 }).notNull(),
  quarterCrate: numeric("quarter_crate", { precision: 10, scale: 2 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const ordersTable = pgTable("orders", {
  id: text("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  landmark: text("landmark"),
  deliveryNotes: text("delivery_notes"),
  eggSize: eggSizeEnum("egg_size").notNull(),
  quantityType: quantityTypeEnum("quantity_type").notNull(),
  customQuantity: integer("custom_quantity"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  deliveryType: deliveryTypeEnum("delivery_type").notNull(),
  deliveryDate: text("delivery_date"),
  status: orderStatusEnum("status").notNull().default("received"),
  referenceCode: text("reference_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptionsTable = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  eggSize: eggSizeEnum("egg_size").notNull(),
  quantityType: quantityTypeEnum("quantity_type").notNull(),
  frequency: frequencyEnum("frequency").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonialsTable = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  review: text("review").notNull(),
  rating: integer("rating").notNull(),
  verified: boolean("verified").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sellersTable = pgTable("sellers", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  ownerName: text("owner_name").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  landmark: text("landmark").notNull(),
  description: text("description"),
  status: sellerStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettingsTable = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  label: text("label").notNull().default(""),
  group: text("group").notNull().default("general"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, status: true, referenceCode: true, createdAt: true });
export const insertSubscriptionSchema = createInsertSchema(subscriptionsTable).omit({ id: true, active: true, createdAt: true });
export const insertSellerSchema = createInsertSchema(sellersTable).omit({ id: true, status: true, createdAt: true });

export type Order = typeof ordersTable.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type EggPrice = typeof eggPricesTable.$inferSelect;
export type Subscription = typeof subscriptionsTable.$inferSelect;
export type Testimonial = typeof testimonialsTable.$inferSelect;
export type Seller = typeof sellersTable.$inferSelect;
export type InsertSeller = z.infer<typeof insertSellerSchema>;
