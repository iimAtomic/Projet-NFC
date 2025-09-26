import { Injectable, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    // Effect pour rediriger automatiquement après déconnexion
    effect(() => {
      const currentUser = this.authService.currentUser();

      // Si l'utilisateur se déconnecte et qu'on est sur une page protégée
      if (!currentUser && this.isProtectedRoute()) {
        this.router.navigate(['/auth/login']);
      }
    });

    effect(() => {
      const currentUser = this.authService.currentUser();

      if (currentUser) {
        console.log(`User logged in: ${currentUser.username} (${currentUser.role})`);
      } else {
        console.log('User logged out');
      }
    });
  }

  private isProtectedRoute(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes('/dashboard') || currentUrl.includes('/admin');
  }
}
