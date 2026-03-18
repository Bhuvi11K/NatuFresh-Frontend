import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.scss',
})
export class ProductCatalog {
  private readonly cartService = inject(CartService);
  protected readonly wishlistService = inject(WishlistService);
  private readonly router = inject(Router);
  protected readonly selectedCategory = signal<string>('All');
  protected readonly addedProductId = signal<number | null>(null);

  protected readonly categories: string[] = [
    'All',
    'Cold-Pressed Oils',
    'Ghee & Dairy',
    'Millets',
    'Powders',
    'Sweeteners',
    'Honey & Natural',
  ];

  protected readonly products: Product[] = [
    {
      id: 1, name: 'Mara Chekku Ennai (Groundnut Oil)', tamilName: 'மரச்செக்கு நல்லெண்ணெய்',
      price: 449, originalPrice: 599, image: '', category: 'Cold-Pressed Oils',
      rating: 4.8, reviewCount: 234, badge: 'Bestseller',
      description: 'Stone-ground cold-pressed groundnut oil, rich in natural flavour.', unit: '1 Litre',
    },
    {
      id: 2, name: 'Mara Chekku Sesame Oil', tamilName: 'மரச்செக்கு நல்லெண்ணெய்',
      price: 399, originalPrice: 520, image: '', category: 'Cold-Pressed Oils',
      rating: 4.7, reviewCount: 189, badge: '',
      description: 'Traditional wood-pressed sesame oil for everyday cooking.', unit: '1 Litre',
    },
    {
      id: 3, name: 'Mara Chekku Coconut Oil', tamilName: 'மரச்செக்கு தேங்காய் எண்ணெய்',
      price: 349, originalPrice: 450, image: '', category: 'Cold-Pressed Oils',
      rating: 4.9, reviewCount: 312, badge: 'Popular',
      description: 'Pure virgin coconut oil extracted through wooden press.', unit: '500 ml',
    },
    {
      id: 4, name: 'A2 Cow Ghee', tamilName: 'நாட்டு பசு நெய்',
      price: 799, originalPrice: 999, image: '', category: 'Ghee & Dairy',
      rating: 4.9, reviewCount: 456, badge: 'Premium',
      description: 'Hand-churned A2 cow ghee from free-grazing native cows.', unit: '500 ml',
    },
    {
      id: 5, name: 'Buffalo Ghee', tamilName: 'எருமை நெய்',
      price: 649, originalPrice: 800, image: '', category: 'Ghee & Dairy',
      rating: 4.6, reviewCount: 128, badge: '',
      description: 'Rich and aromatic buffalo ghee for traditional recipes.', unit: '500 ml',
    },
    {
      id: 6, name: 'Ragi (Finger Millet)', tamilName: 'கேழ்வரகு',
      price: 129, originalPrice: 180, image: '', category: 'Millets',
      rating: 4.5, reviewCount: 198, badge: 'Organic',
      description: 'Organically grown ragi, great for porridge and dosa.', unit: '1 kg',
    },
    {
      id: 7, name: 'Kambu (Pearl Millet)', tamilName: 'கம்பு',
      price: 119, originalPrice: 160, image: '', category: 'Millets',
      rating: 4.4, reviewCount: 142, badge: '',
      description: 'Traditional pearl millet, perfect for koozh and dosai.', unit: '1 kg',
    },
    {
      id: 8, name: 'Thinai (Foxtail Millet)', tamilName: 'தினை',
      price: 139, originalPrice: 190, image: '', category: 'Millets',
      rating: 4.6, reviewCount: 115, badge: '',
      description: 'Nutrient-dense foxtail millet for rice replacement.', unit: '1 kg',
    },
    {
      id: 9, name: 'Dry Fruits Powder', tamilName: 'உலர் பழ பொடி',
      price: 349, originalPrice: 499, image: '', category: 'Powders',
      rating: 4.7, reviewCount: 267, badge: 'Bestseller',
      description: 'Blend of almonds, cashews, pistachios & dates — ideal for kids.', unit: '250 g',
    },
    {
      id: 10, name: 'Health Mix Powder', tamilName: 'சத்து மாவு',
      price: 279, originalPrice: 380, image: '', category: 'Powders',
      rating: 4.8, reviewCount: 340, badge: 'Popular',
      description: 'Multi-grain health mix with 12 ingredients for all ages.', unit: '500 g',
    },
    {
      id: 11, name: 'Turmeric Powder', tamilName: 'மஞ்சள் தூள்',
      price: 149, originalPrice: 200, image: '', category: 'Powders',
      rating: 4.5, reviewCount: 190, badge: 'Organic',
      description: 'Farm-fresh lakadong turmeric with high curcumin content.', unit: '250 g',
    },
    {
      id: 12, name: 'Moringa Powder', tamilName: 'முருங்கை இலை பொடி',
      price: 199, originalPrice: 280, image: '', category: 'Powders',
      rating: 4.6, reviewCount: 155, badge: '',
      description: 'Sun-dried moringa leaves powder, a superfood supplement.', unit: '200 g',
    },
    {
      id: 13, name: 'Palm Jaggery', tamilName: 'பனை வெல்லம்',
      price: 179, originalPrice: 250, image: '', category: 'Sweeteners',
      rating: 4.7, reviewCount: 210, badge: '',
      description: 'Unrefined palm jaggery, a healthier alternative to sugar.', unit: '500 g',
    },
    {
      id: 14, name: 'Sugarcane Jaggery', tamilName: 'கரும்பு வெல்லம்',
      price: 99, originalPrice: 140, image: '', category: 'Sweeteners',
      rating: 4.4, reviewCount: 178, badge: '',
      description: 'Chemical-free sugarcane jaggery, rich in minerals.', unit: '1 kg',
    },
    {
      id: 15, name: 'Wild Forest Honey', tamilName: 'காட்டு தேன்',
      price: 499, originalPrice: 650, image: '', category: 'Honey & Natural',
      rating: 4.9, reviewCount: 389, badge: 'Premium',
      description: 'Raw, unprocessed wild honey from Western Ghats forests.', unit: '500 g',
    },
    {
      id: 16, name: 'Multi-Flower Honey', tamilName: 'மலர் தேன்',
      price: 329, originalPrice: 420, image: '', category: 'Honey & Natural',
      rating: 4.5, reviewCount: 145, badge: '',
      description: 'Naturally harvested multi-flora honey, no additives.', unit: '500 g',
    },
  ];

  protected get filteredProducts(): Product[] {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.products;
    return this.products.filter(p => p.category === cat);
  }

  protected selectCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  protected addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.addedProductId.set(product.id);
    setTimeout(() => this.addedProductId.set(null), 1500);
  }

  protected isInCart(productId: number): boolean {
    return this.cartService.isInCart(productId);
  }

  protected getDiscount(product: Product): number {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }

  protected getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  protected getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  protected getGradient(product: Product): string {
    const gradients: Record<string, string> = {
      'Cold-Pressed Oils': 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      'Ghee & Dairy': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'Millets': 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)',
      'Powders': 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
      'Sweeteners': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'Honey & Natural': 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
    };
    return gradients[product.category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

  protected getIcon(product: Product): string {
    const icons: Record<string, string> = {
      'Cold-Pressed Oils': '🫒',
      'Ghee & Dairy': '🧈',
      'Millets': '🌾',
      'Powders': '🍃',
      'Sweeteners': '🍯',
      'Honey & Natural': '🐝',
    };
    return icons[product.category] || '🛒';
  }
}
