export interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  category: string;
  subcategory: string;
  image: string;
  isExpress?: boolean;
  expressTime?: string;
  rating?: number;
  reviewCount?: number;
  isBestseller?: boolean;
  description?: string;
  shelfLife?: string;
  countryOfOrigin?: string;
  nutritionInfo?: {
    energy?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  image: string;
  color: string;
  bgColor: string;
  itemCount: number;
  subcategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Location {
  id: string;
  title: string;
  address: string;
  pincode: string;
  city: string;
  deliveryTime: string;
  isAvailable: boolean;
  type: 'Home' | 'Work' | 'Other';
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  highlight: string;
  bgGradient: string;
  textColor: string;
  image: string;
  categoryLink: string;
  ctaText: string;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountAmount: number;
  minOrder: number;
  categoryRequirement?: string;
}
