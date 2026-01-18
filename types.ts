
export type Category = 'Game Pass' | 'Game Accounts' | 'Joki Services';

export interface Product {
  id: string;
  name: string;
  category: Category;
  basePrice: number; // The normal price before discount
  discount: number; // Discount percentage (0-99)
  platform: string;
  deliveryTime: string;
  image: string;
  description: string;
  isFeatured?: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  whatsapp: string;
  gameUsername?: string; // Changed from gameId to gameUsername for consistency with UI
  paymentMethod?: string; // New field for payment method
  email?: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  game: string;
}
