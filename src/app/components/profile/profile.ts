import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Address, Order, UserProfile } from '../../models/product.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  protected readonly activeTab = signal<'personal' | 'addresses' | 'orders'>('personal');
  protected readonly editMode = signal<boolean>(false);
  protected readonly savedMessage = signal<string>('');

  protected user: UserProfile = {
    name: 'Bhuvanesh Kumar',
    email: 'bhuvanesh@natufresh.in',
    phone: '+91 98765 43210',
    avatar: '',
    memberSince: 'January 2025',
  };

  protected editUser: UserProfile = { ...this.user };

  protected addresses: Address[] = [
    {
      id: 1, name: 'Bhuvanesh Kumar', phone: '+91 98765 43210',
      line1: '42, Gandhipuram', line2: 'Near RS Puram Bus Stop',
      city: 'Coimbatore', state: 'Tamil Nadu', pincode: '641012',
      isDefault: true, label: 'Home',
    },
    {
      id: 2, name: 'Bhuvanesh Kumar', phone: '+91 98765 43210',
      line1: 'Tech Park, 3rd Floor', line2: 'Saravanampatti',
      city: 'Coimbatore', state: 'Tamil Nadu', pincode: '641035',
      isDefault: false, label: 'Work',
    },
  ];

  protected orders: Order[] = [
    {
      id: 'NF-2026-001',
      items: [
        { product: { id: 1, name: 'Mara Chekku Ennai (Groundnut Oil)', tamilName: 'மரச்செக்கு நல்லெண்ணெய்', price: 449, originalPrice: 599, image: '', category: 'Cold-Pressed Oils', rating: 4.8, reviewCount: 234, badge: 'Bestseller', description: '', unit: '1 Litre' }, quantity: 2, priceAtPurchase: 449 },
        { product: { id: 4, name: 'A2 Cow Ghee', tamilName: 'நாட்டு பசு நெய்', price: 799, originalPrice: 999, image: '', category: 'Ghee & Dairy', rating: 4.9, reviewCount: 456, badge: 'Premium', description: '', unit: '500 ml' }, quantity: 1, priceAtPurchase: 799 },
      ],
      total: 1697, status: 'Delivered', date: '10 Mar 2026',
      address: this.addresses[0], paymentMethod: 'UPI',
    },
    {
      id: 'NF-2026-002',
      items: [
        { product: { id: 9, name: 'Dry Fruits Powder', tamilName: 'உலர் பழ பொடி', price: 349, originalPrice: 499, image: '', category: 'Powders', rating: 4.7, reviewCount: 267, badge: 'Bestseller', description: '', unit: '250 g' }, quantity: 3, priceAtPurchase: 349 },
      ],
      total: 1047, status: 'Shipped', date: '15 Mar 2026',
      address: this.addresses[0], paymentMethod: 'Credit Card',
    },
    {
      id: 'NF-2026-003',
      items: [
        { product: { id: 15, name: 'Wild Forest Honey', tamilName: 'காட்டு தேன்', price: 499, originalPrice: 650, image: '', category: 'Honey & Natural', rating: 4.9, reviewCount: 389, badge: 'Premium', description: '', unit: '500 g' }, quantity: 1, priceAtPurchase: 499 },
        { product: { id: 6, name: 'Ragi (Finger Millet)', tamilName: 'கேழ்வரகு', price: 129, originalPrice: 180, image: '', category: 'Millets', rating: 4.5, reviewCount: 198, badge: 'Organic', description: '', unit: '1 kg' }, quantity: 2, priceAtPurchase: 129 },
      ],
      total: 757, status: 'Processing', date: '17 Mar 2026',
      address: this.addresses[1], paymentMethod: 'Cash on Delivery',
    },
  ];

  protected readonly expandedOrder = signal<string | null>(null);

  protected switchTab(tab: 'personal' | 'addresses' | 'orders'): void {
    this.activeTab.set(tab);
  }

  protected startEdit(): void {
    this.editUser = { ...this.user };
    this.editMode.set(true);
    this.savedMessage.set('');
  }

  protected cancelEdit(): void {
    this.editMode.set(false);
  }

  protected saveProfile(): void {
    this.user = { ...this.editUser };
    this.editMode.set(false);
    this.savedMessage.set('Profile updated successfully!');
    setTimeout(() => this.savedMessage.set(''), 3000);
  }

  protected setDefaultAddress(id: number): void {
    this.addresses = this.addresses.map(a => ({ ...a, isDefault: a.id === id }));
  }

  protected deleteAddress(id: number): void {
    this.addresses = this.addresses.filter(a => a.id !== id);
  }

  protected toggleOrder(orderId: string): void {
    this.expandedOrder.set(
      this.expandedOrder() === orderId ? null : orderId
    );
  }

  protected getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      'Delivered': '#52b788',
      'Shipped': '#f4a261',
      'Processing': '#4895ef',
      'Cancelled': '#e76f51',
    };
    return colors[status] || '#999';
  }

  protected getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
