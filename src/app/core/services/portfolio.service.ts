import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserProfile } from '../data/mock-users';
import { UserStorageService } from './user-storage.service';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly userStorageService = inject(UserStorageService);

  getAllUsers(): Observable<UserProfile[]> {
    return of(this.userStorageService.getAllUsers()).pipe(delay(500));
  }

  getProfileByUsername(username: string): Observable<UserProfile | undefined> {
    const user = this.userStorageService.findUserByUsername(username);
    return of(user || undefined).pipe(delay(500));
  }

  /**
   * Obtient les statistiques des utilisateurs
   */
  getUserStats(): Observable<{ total: number; normal: number; admin: number }> {
    return of(this.userStorageService.getUserStats()).pipe(delay(200));
  }
}
