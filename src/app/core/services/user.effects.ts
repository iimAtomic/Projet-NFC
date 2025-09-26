import { Injectable, effect, inject } from '@angular/core';
import { UserStorageService } from './user-storage.service';

/**
 * Service pour gérer les effets liés aux utilisateurs
 * Utilise les Effects Angular pour réagir aux changements d'état
 */
@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  private readonly userStorageService = inject(UserStorageService);

  constructor() {
    // Effect pour synchroniser les données utilisateurs avec localStorage
    effect(() => {
      const users = this.userStorageService.users();

      // Log des statistiques utilisateurs en temps réel
      if (users.length > 0) {
        const stats = this.userStorageService.getUserStats();
        console.log(
          `Users updated: ${stats.total} total, ${stats.normal} normal, ${stats.admin} admin`,
        );
      }
    });

    // Effect pour surveiller les changements de stockage
    effect(() => {
      const users = this.userStorageService.users();

      // Sauvegarder automatiquement les changements
      if (users.length > 0) {
        this.autoSaveUsers();
      }
    });
  }

  /**
   * Sauvegarde automatique des utilisateurs
   */
  private autoSaveUsers(): void {
    try {
      // Simulation d'une sauvegarde automatique
      console.log('Auto-saving users data...');

      // Ici on pourrait ajouter une logique de sauvegarde
      // vers un serveur distant ou une base de données
    } catch (error) {
      console.error('Error auto-saving users:', error);
    }
  }
}
