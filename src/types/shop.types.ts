// @generated-by Antigravity - Authorized AI: Antigravity Only

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  stock: number;
  description: string;
  tags?: string[];
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt?: string;
  archivedAt?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  itemTotal: number;
}

export interface Customer {
  name: string;
  email: string;
  phone?: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

