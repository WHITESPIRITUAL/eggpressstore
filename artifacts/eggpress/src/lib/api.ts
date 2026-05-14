import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";

const BASE_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", Accept: "application/json", ...options?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  if (res.status === 204) return null as T;
  return res.json() as Promise<T>;
}

// ── Types ────────────────────────────────────────────────────────────────────

export type EggPriceSize = "large" | "medium" | "small";
export type OrderQuantityType = "full_crate" | "half_crate" | "quarter_crate" | "custom";
export type OrderDeliveryType = "delivery" | "pickup";
export type OrderStatus = "received" | "payment_confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered";
export type SubscriptionFrequency = "weekly" | "biweekly" | "monthly";
export type SubscriptionQuantityType = "full_crate" | "half_crate" | "quarter_crate" | "custom";

export interface EggPrice {
  id: number;
  size: EggPriceSize;
  fullCrate: number;
  halfCrate: number;
  quarterCrate: number;
  updatedAt: string;
}

export interface EggPriceInput {
  size: EggPriceSize;
  fullCrate: number;
  halfCrate: number;
  quarterCrate: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  landmark?: string | null;
  deliveryNotes?: string | null;
  eggSize: EggPriceSize;
  quantityType: OrderQuantityType;
  customQuantity?: number | null;
  totalAmount: number;
  deliveryType: OrderDeliveryType;
  deliveryDate?: string | null;
  status: OrderStatus;
  referenceCode?: string | null;
  createdAt: string;
}

export interface OrderInput {
  customerName: string;
  phone: string;
  address: string;
  landmark?: string;
  deliveryNotes?: string;
  eggSize: EggPriceSize;
  quantityType: OrderQuantityType;
  customQuantity?: number;
  totalAmount: number;
  deliveryType: OrderDeliveryType;
  deliveryDate?: string;
}

export interface OrderStatusUpdate {
  status: OrderStatus;
}

export interface Subscription {
  id: number;
  customerName: string;
  phone: string;
  address: string;
  eggSize: EggPriceSize;
  quantityType: SubscriptionQuantityType;
  frequency: SubscriptionFrequency;
  active: boolean;
  createdAt: string;
}

export interface SubscriptionInput {
  customerName: string;
  phone: string;
  address: string;
  eggSize: EggPriceSize;
  quantityType: SubscriptionQuantityType;
  frequency: SubscriptionFrequency;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  review: string;
  rating: number;
  verified: boolean;
  createdAt: string;
}

export interface AdminStats {
  totalOrders: number;
  deliveredOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  activeSubscriptions: number;
  todayOrders: number;
  pendingSellers: number;
}

export type SellerStatus = "pending" | "approved" | "rejected";

export interface Seller {
  id: number;
  businessName: string;
  ownerName: string;
  phone: string;
  address: string;
  landmark: string;
  description?: string | null;
  status: SellerStatus;
  createdAt: string;
}

export interface SellerInput {
  businessName: string;
  ownerName: string;
  phone: string;
  address: string;
  landmark: string;
  description?: string;
}

export interface SellerStatusUpdate {
  status: SellerStatus;
}

// ── Query keys ───────────────────────────────────────────────────────────────

export const getGetPricesQueryKey = () => ["/api/prices"] as const;
export const getGetAdminStatsQueryKey = () => ["/api/admin/stats"] as const;
export const getListOrdersQueryKey = () => ["/api/orders"] as const;
export const getGetOrderQueryKey = (id: string) => [`/api/orders/${id}`] as const;
export const getListSubscriptionsQueryKey = () => ["/api/subscriptions"] as const;
export const getListTestimonialsQueryKey = () => ["/api/testimonials"] as const;
export const getListSellersQueryKey = () => ["/api/sellers"] as const;
export const getListAllSellersQueryKey = () => ["/api/sellers/all"] as const;

// ── Query hooks ──────────────────────────────────────────────────────────────

export function useGetPrices(options?: { query?: Partial<UseQueryOptions<EggPrice[]>> }) {
  return useQuery<EggPrice[]>({
    queryKey: getGetPricesQueryKey(),
    queryFn: () => apiFetch<EggPrice[]>("/api/prices"),
    ...options?.query,
  });
}

export function useGetAdminStats(options?: { query?: Partial<UseQueryOptions<AdminStats>> }) {
  return useQuery<AdminStats>({
    queryKey: getGetAdminStatsQueryKey(),
    queryFn: () => apiFetch<AdminStats>("/api/admin/stats"),
    ...options?.query,
  });
}

export function useListOrders(options?: { query?: Partial<UseQueryOptions<Order[]>> }) {
  return useQuery<Order[]>({
    queryKey: getListOrdersQueryKey(),
    queryFn: () => apiFetch<Order[]>("/api/orders"),
    ...options?.query,
  });
}

export function useGetOrder(id: string, options?: { query?: Partial<UseQueryOptions<Order>> }) {
  return useQuery<Order>({
    queryKey: getGetOrderQueryKey(id),
    queryFn: () => apiFetch<Order>(`/api/orders/${id}`),
    enabled: !!id,
    ...options?.query,
  });
}

export function useListSubscriptions(options?: { query?: Partial<UseQueryOptions<Subscription[]>> }) {
  return useQuery<Subscription[]>({
    queryKey: getListSubscriptionsQueryKey(),
    queryFn: () => apiFetch<Subscription[]>("/api/subscriptions"),
    ...options?.query,
  });
}

export function useListTestimonials(options?: { query?: Partial<UseQueryOptions<Testimonial[]>> }) {
  return useQuery<Testimonial[]>({
    queryKey: getListTestimonialsQueryKey(),
    queryFn: () => apiFetch<Testimonial[]>("/api/testimonials"),
    ...options?.query,
  });
}

export function useListSellers(options?: { query?: Partial<UseQueryOptions<Seller[]>> }) {
  return useQuery<Seller[]>({
    queryKey: getListSellersQueryKey(),
    queryFn: () => apiFetch<Seller[]>("/api/sellers"),
    ...options?.query,
  });
}

export function useListAllSellers(options?: { query?: Partial<UseQueryOptions<Seller[]>> }) {
  return useQuery<Seller[]>({
    queryKey: getListAllSellersQueryKey(),
    queryFn: () => apiFetch<Seller[]>("/api/sellers/all"),
    ...options?.query,
  });
}

// ── Mutation hooks ───────────────────────────────────────────────────────────

export function useCreateOrder(options?: { mutation?: Partial<UseMutationOptions<Order, Error, { data: OrderInput }>> }) {
  return useMutation<Order, Error, { data: OrderInput }>({
    mutationFn: ({ data }) => apiFetch<Order>("/api/orders", { method: "POST", body: JSON.stringify(data) }),
    ...options?.mutation,
  });
}

export function useCreateSubscription(options?: { mutation?: Partial<UseMutationOptions<Subscription, Error, { data: SubscriptionInput }>> }) {
  return useMutation<Subscription, Error, { data: SubscriptionInput }>({
    mutationFn: ({ data }) => apiFetch<Subscription>("/api/subscriptions", { method: "POST", body: JSON.stringify(data) }),
    ...options?.mutation,
  });
}

export function useUpdateOrderStatus(options?: { mutation?: Partial<UseMutationOptions<Order, Error, { id: string; data: OrderStatusUpdate }>> }) {
  return useMutation<Order, Error, { id: string; data: OrderStatusUpdate }>({
    mutationFn: ({ id, data }) => apiFetch<Order>(`/api/orders/${id}/status`, { method: "PATCH", body: JSON.stringify(data) }),
    ...options?.mutation,
  });
}

export function useUpdatePrices(options?: { mutation?: Partial<UseMutationOptions<EggPrice, Error, { data: EggPriceInput }>> }) {
  return useMutation<EggPrice, Error, { data: EggPriceInput }>({
    mutationFn: ({ data }) => apiFetch<EggPrice>("/api/prices", { method: "PUT", body: JSON.stringify(data) }),
    ...options?.mutation,
  });
}

export function useRegisterSeller(options?: { mutation?: Partial<UseMutationOptions<Seller, Error, { data: SellerInput }>> }) {
  return useMutation<Seller, Error, { data: SellerInput }>({
    mutationFn: ({ data }) => apiFetch<Seller>("/api/sellers", { method: "POST", body: JSON.stringify(data) }),
    ...options?.mutation,
  });
}

export function useUpdateSellerStatus(options?: { mutation?: Partial<UseMutationOptions<Seller, Error, { id: number; data: SellerStatusUpdate }>> }) {
  return useMutation<Seller, Error, { id: number; data: SellerStatusUpdate }>({
    mutationFn: ({ id, data }) => apiFetch<Seller>(`/api/sellers/${id}/status`, { method: "PATCH", body: JSON.stringify(data) }),
    ...options?.mutation,
  });
}
