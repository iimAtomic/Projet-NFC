import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile, Experience, GalleryImage, Product, PortfolioType } from '../../core/data/mock-users';
import { GalleryComponent } from '../portfolio/gallery/gallery.component';
import { ProductsComponent } from '../portfolio/products/products.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GalleryComponent, ProductsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: UserProfile | null = null;
  isSaving = false;
  saveMessage = '';
  galleryImages: GalleryImage[] = [];
  products: Product[] = [];
  portfolioType: PortfolioType = 'PORTFOLIO';
  galleryEnabled = true;
  whatsappNumber = '';

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      bio: ['', [Validators.required, Validators.minLength(10)]],
      photoUrl: [''],
      portfolioType: ['PORTFOLIO'],
      phoneNumber: [''],
      whatsappNumber: [''],
      galleryEnabled: [true],
      social: this.fb.group({
        website: [''],
        github: [''],
        linkedin: [''],
        twitter: [''],
      }),
      experiences: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    if (this.currentUser) {
      this.loadUserData();
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  get experiencesFormArray(): FormArray {
    return this.profileForm.get('experiences') as FormArray;
  }

  private loadUserData(): void {
    if (this.currentUser) {
      this.profileForm.patchValue({
        fullName: this.currentUser.fullName,
        bio: this.currentUser.bio,
        photoUrl: this.currentUser.photoUrl || '',
        portfolioType: this.currentUser.portfolioType || 'PORTFOLIO',
        phoneNumber: this.currentUser.phoneNumber || '',
        whatsappNumber: this.currentUser.whatsappNumber || '',
        galleryEnabled: this.currentUser.galleryEnabled !== undefined ? this.currentUser.galleryEnabled : true,
        social: {
          website: this.currentUser.social?.website || '',
          github: this.currentUser.social?.github || '',
          linkedin: this.currentUser.social?.linkedin || '',
          twitter: this.currentUser.social?.twitter || '',
        },
      });

      // Load experiences
      this.experiencesFormArray.clear();
      if (this.currentUser.experiences) {
        this.currentUser.experiences.forEach((exp) => {
          this.addExperience(exp);
        });
      }

      // Load gallery images
      this.galleryImages = this.currentUser.gallery || [];

      // Load products
      this.products = this.currentUser.products || [];

      // Load portfolio settings
      this.portfolioType = this.currentUser.portfolioType || 'PORTFOLIO';
      this.galleryEnabled = this.currentUser.galleryEnabled !== undefined ? this.currentUser.galleryEnabled : true;
      this.whatsappNumber = this.currentUser.whatsappNumber || '';
    }
  }

  addExperience(experience?: Experience): void {
    const experienceForm = this.fb.group({
      company: [experience?.company || '', [Validators.required]],
      role: [experience?.role || '', [Validators.required]],
      startDate: [experience?.startDate || '', [Validators.required]],
      endDate: [experience?.endDate || ''],
      description: [experience?.description || '', [Validators.required]],
    });

    this.experiencesFormArray.push(experienceForm);
  }

  removeExperience(index: number): void {
    this.experiencesFormArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      this.saveMessage = '';

      const formData = this.profileForm.value;

      // Préparer les données pour la sauvegarde
      const updates = {
        fullName: formData.fullName,
        bio: formData.bio,
        photoUrl: formData.photoUrl,
        portfolioType: formData.portfolioType,
        phoneNumber: formData.phoneNumber,
        whatsappNumber: formData.whatsappNumber,
        galleryEnabled: formData.galleryEnabled,
        social: formData.social,
        experiences: formData.experiences,
        products: this.products,
        gallery: this.galleryImages,
      };

      this.authService.updateProfile(updates).subscribe({
        next: (updatedUser) => {
          this.isSaving = false;
          if (updatedUser) {
            this.saveMessage = 'Profil sauvegardé avec succès !';
            this.currentUser = updatedUser;

            setTimeout(() => {
              this.saveMessage = '';
            }, 3000);
          } else {
            this.saveMessage = 'Erreur lors de la sauvegarde';
          }
        },
        error: (error) => {
          this.isSaving = false;
          this.saveMessage = 'Erreur lors de la sauvegarde';
          console.error('Erreur de sauvegarde:', error);
        },
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  /**
   * Obtient l'URL du profil public
   */
  getPublicProfileUrl(): string {
    return this.currentUser ? `/p/${this.currentUser.username}` : '';
  }

  /**
   * Ouvre le profil public dans un nouvel onglet
   */
  viewPublicProfile(): void {
    if (this.currentUser) {
      window.open(this.getPublicProfileUrl(), '_blank');
    }
  }

  /**
   * Gestion de la galerie d'images
   */
  onAddImage(image: GalleryImage): void {
    this.galleryImages.push(image);
  }

  onRemoveImage(imageId: string): void {
    this.galleryImages = this.galleryImages.filter(img => img.id !== imageId);
  }

  onUpdateImage(updatedImage: GalleryImage): void {
    const index = this.galleryImages.findIndex(img => img.id === updatedImage.id);
    if (index !== -1) {
      this.galleryImages[index] = updatedImage;
    }
  }

  /**
   * Gestion des produits e-commerce
   */
  onAddProduct(product: Product): void {
    this.products.push(product);
  }

  onRemoveProduct(productId: string): void {
    this.products = this.products.filter(prod => prod.id !== productId);
  }

  onUpdateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(prod => prod.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  /**
   * Changement de type de portfolio
   */
  onPortfolioTypeChange(): void {
    this.portfolioType = this.profileForm.get('portfolioType')?.value;
  }

  /**
   * Vérifie si le portfolio est de type e-commerce
   */
  isEcommerceMode(): boolean {
    return this.portfolioType === 'ECOMMERCE';
  }
}
