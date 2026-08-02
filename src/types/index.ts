// ============================================================
// HomePlate — TypeScript Type Definitions
// ============================================================
// These types mirror the Prisma schema but are defined manually
// so the project builds without requiring prisma generate.
// Once Prisma is configured, you can replace these with
// imports from '@prisma/client'.
// ============================================================

// --- Enums ---

export enum Role {
  CLIENT = 'CLIENT',
  COOK = 'COOK',
  ADMIN = 'ADMIN',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  PICKED_UP = 'PICKED_UP',
  CANCELLED = 'CANCELLED',
}

export enum OrderType {
  PICKUP = 'PICKUP',
  DELIVERY = 'DELIVERY',
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

// --- Models ---

export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  avatar: string | null;
  role: Role;
  phone: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  locale: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CookProfile = {
  id: string;
  userId: string;
  bio: string | null;
  specialty: string | null;
  kitchenType: string | null;
  rating: number;
  totalOrders: number;
  isVerified: boolean;
  isActive: boolean;
  deliveryRadius: number;
  minOrderAmount: number;
  coverImage: string | null;
  createdAt: Date;
};

export type Dish = {
  id: string;
  cookProfileId: string;
  name: string;
  nameEn: string | null;
  description: string | null;
  descriptionEn: string | null;
  price: number;
  image: string | null;
  category: string;
  allergens: string | null;
  prepTime: number;
  isAvailable: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  createdAt: Date;
};

export type Order = {
  id: string;
  clientId: string;
  cookProfileId: string;
  status: OrderStatus;
  totalAmount: number;
  deliveryAddress: string | null;
  note: string | null;
  type: OrderType;
  estimatedReady: Date | null;
  createdAt: Date;
};

export type OrderItem = {
  id: string;
  orderId: string;
  dishId: string;
  quantity: number;
  unitPrice: number;
};

export type Review = {
  id: string;
  userId: string;
  dishId: string | null;
  cookProfileId: string | null;
  rating: number;
  comment: string | null;
  createdAt: Date;
};

export type Availability = {
  id: string;
  cookProfileId: string;
  dayOfWeek: DayOfWeek;
  openTime: string;
  closeTime: string;
  isActive: boolean;
};

// --- Composite Types ---

export type SafeUser = Omit<User, 'passwordHash'>;

export type CookProfileWithUser = CookProfile & {
  user: SafeUser;
};

export type CookProfileWithDishes = CookProfile & {
  dishes: Dish[];
};

export type FullCookProfile = CookProfile & {
  user: SafeUser;
  dishes: Dish[];
  reviews: Review[];
  availabilities: Availability[];
};

export type OrderWithItems = Order & {
  items: (OrderItem & { dish: Dish })[];
};

export type FullOrder = Order & {
  items: (OrderItem & { dish: Dish })[];
  client: SafeUser;
  cookProfile: CookProfile & { user: SafeUser };
};

export type ReviewWithUser = Review & {
  user: SafeUser;
};

// --- UI Specific Types ---

export type CartItem = {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  cookProfileId: string;
};

export type Locale = 'fr' | 'en';
