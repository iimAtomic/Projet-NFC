import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'standard' | 'pro' | 'pack';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faqs = [{ open: false }, { open: false }, { open: false }, { open: false }];
  cartItems: CartItem[] = [];

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }

  /**
   * Ajoute un article au panier
   */
  addToCart(type: 'standard' | 'pro' | 'pack'): void {
    const items = {
      standard: { id: 'standard', name: 'Carte Standard', price: 25, type: 'standard' as const },
      pro: { id: 'pro', name: 'Carte Pro', price: 45, type: 'pro' as const },
      pack: { id: 'pack', name: 'Pack 3 Cartes', price: 60, type: 'pack' as const }
    };

    const item = items[type];
    this.cartItems.push(item);

    // Afficher une notification (optionnel)
    console.log(`${item.name} ajouté au panier !`);
  }

  /**
   * Vide le panier
   */
  clearCart(): void {
    this.cartItems = [];
  }

  /**
   * Calcule le prix total du panier
   */
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  /**
   * Procède au checkout
   */
  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      alert('Votre panier est vide !');
      return;
    }

    // Ici, vous pouvez rediriger vers une page de checkout ou ouvrir un modal
    const total = this.getTotalPrice();
    const message = `Commande de ${this.cartItems.length} article(s) pour un total de ${total}€\n\nArticles:\n${this.cartItems.map(item => `- ${item.name}: ${item.price}€`).join('\n')}\n\nVoulez-vous continuer ?`;

    if (confirm(message)) {
      // Redirection vers WhatsApp ou page de commande
      const whatsappMessage = `Bonjour ! Je souhaite commander des cartes NFC.\n\nArticles:\n${this.cartItems.map(item => `- ${item.name}: ${item.price}€`).join('\n')}\n\nTotal: ${total}€\n\nPouvez-vous me donner plus d'informations sur la livraison ?`;
      const whatsappUrl = `https://wa.me/33612345678?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      // Vider le panier après commande
      this.clearCart();
    }
  }
}
