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
  costPrice: number;
  sellingPrice: number;
  profit?: number;
  stock: number;
  description?: string | null;
  fabric?: string | null;
  weave?: string | null;
  color?: string | null;
  blousePiece: boolean;
  tags?: string | null;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
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

