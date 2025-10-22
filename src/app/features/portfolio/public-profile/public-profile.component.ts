import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserProfile, Product } from '../../../core/data/mock-users';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css',
})
export class PublicProfileComponent implements OnInit {
  user$: Observable<UserProfile | undefined> | undefined;

  private readonly route = inject(ActivatedRoute);
  private readonly portfolioService = inject(PortfolioService);

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.user$ = this.portfolioService.getProfileByUsername(username);
    }
  }

  /**
   * Formate le prix en euros
   */
  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }

  /**
   * Ouvre WhatsApp avec un message pour commander le produit
   */
  contactWhatsApp(product?: Product): void {
    let message: string;

    if (product) {
      message = `Bonjour ! Je suis intéressé(e) par votre produit "${product.name}" au prix de ${this.formatPrice(product.price)}. Pourriez-vous me donner plus d'informations ?`;
    } else {
      message = `Bonjour ! Je souhaite en savoir plus sur vos produits et services. Pourriez-vous me donner plus d'informations ?`;
    }

    const whatsappUrl = `https://wa.me/${this.getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  /**
   * Enregistre le contact dans les contacts du téléphone
   */
  saveContact(): void {
    // Créer un vCard pour le contact
    const vcard = this.generateVCard();

    // Créer un blob avec le vCard
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);

    // Créer un lien de téléchargement
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.getUserFullName()}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Nettoyer l'URL
    window.URL.revokeObjectURL(url);
  }

  /**
   * Ouvre l'application d'appel avec le numéro
   */
  callContact(): void {
    const phoneNumber = this.getPhoneNumber();
    window.open(`tel:${phoneNumber}`, '_self');
  }

  /**
   * Génère un vCard pour le contact
   */
  private generateVCard(): string {
    const user = this.getCurrentUser();
    if (!user) return '';

    return `BEGIN:VCARD
VERSION:3.0
FN:${user.fullName}
ORG:${user.fullName}
TEL:${this.getPhoneNumber()}
EMAIL:${user.email}
URL:${user.social?.website || ''}
NOTE:${user.bio}
END:VCARD`;
  }

  /**
   * Obtient le nom complet de l'utilisateur
   */
  private getUserFullName(): string {
    const user = this.getCurrentUser();
    return user ? user.fullName : 'Contact';
  }

  /**
   * Obtient l'utilisateur actuel depuis l'observable
   */
  private getCurrentUser(): any {
    // Cette méthode devrait récupérer l'utilisateur depuis l'observable
    // Pour l'instant, on retourne null
    return null; // TODO: Implémenter la récupération de l'utilisateur
  }

  /**
   * Obtient le numéro de téléphone
   */
  private getPhoneNumber(): string {
    // Récupérer le numéro depuis l'utilisateur
    // Pour l'instant, on utilise un numéro par défaut
    return '+33612345678'; // TODO: Récupérer depuis user.phoneNumber
  }

  /**
   * Obtient le numéro WhatsApp formaté
   */
  private getWhatsAppNumber(): string {
    // Récupérer le numéro depuis l'utilisateur actuel
    // Pour l'instant, on utilise un numéro par défaut
    return '33612345678'; // TODO: Récupérer depuis user.whatsappNumber
  }
}
