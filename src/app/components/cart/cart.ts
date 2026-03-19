import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  protected readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  protected couponInput = '';
  protected readonly couponError = signal<string>('');

  protected applyCoupon(): void {
    if (!this.couponInput.trim()) {
      this.couponError.set('Please enter a coupon code');
      return;
    }
    const success = this.cartService.applyCoupon(this.couponInput);
    if (!success) {
      this.couponError.set('Invalid coupon code. Try ORGANIC20');
    } else {
      this.couponError.set('');
    }
  }

  protected removeCoupon(): void {
    this.cartService.removeCoupon();
    this.couponInput = '';
    this.couponError.set('');
  }

  protected proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  protected getGradient(category: string): string {
    const gradients: Record<string, string> = {
      'Cold-Pressed Oils': 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      'Ghee & Dairy': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'Millets': 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)',
      'Powders': 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
      'Sweeteners': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'Honey & Natural': 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
    };
    return gradients[category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

}
