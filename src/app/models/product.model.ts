export interface Product {
  id: number;
  name: string;
  tamilName: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
  unit: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: number;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  label: string; // 'Home' | 'Work' | 'Other'
}

export interface OrderItem {
  product: Product;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  address: Address;
  paymentMethod: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
}
