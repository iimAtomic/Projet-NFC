import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserProfile } from '../data/mock-users';
import { UserStorageService } from './user-storage.service';

const LOCAL_STORAGE_KEY = 'tapfolio_current_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<UserProfile | null>(readUserFromStorage());

  private readonly userStorageService = inject(UserStorageService);

  login(identifier: string, password: string): Observable<UserProfile | null> {
    const user = this.userStorageService.findUserByIdentifier(identifier);

    if (user && user.password === password) {
      this.currentUser.set(user);
      writeUserToStorage(user);
      return of(user).pipe(delay(500));
    }

    this.currentUser.set(null);
    clearUserFromStorage();
    return of(null).pipe(delay(500));
  }

  logout(): Observable<void> {
    this.currentUser.set(null);
    clearUserFromStorage();
    return of(void 0).pipe(delay(100));
  }

  register(userData: {
    username: string;
    email: string;
    password: string;
    fullName: string;
    bio: string;
  }): Observable<UserProfile | null> {
    // Vérifier si le username existe déjà
    if (this.userStorageService.isUsernameTaken(userData.username)) {
      return of(null).pipe(delay(800));
    }

    // Vérifier si l'email existe déjà
    if (this.userStorageService.isEmailTaken(userData.email)) {
      return of(null).pipe(delay(800));
    }

    try {
      // Créer le nouvel utilisateur
      const newUser = this.userStorageService.createUser({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        bio: userData.bio,
        role: 'USER',
        experiences: [],
        social: {
          website: '',
          github: '',
          linkedin: '',
          twitter: '',
        },
      });

      // Connecter automatiquement le nouvel utilisateur
      this.currentUser.set(newUser);
      writeUserToStorage(newUser);

      return of(newUser).pipe(delay(800));
    } catch (error) {
      console.error('Erreur lors de la création du compte:', error);
      return of(null).pipe(delay(800));
    }
  }

  /**
   * Met à jour le profil de l'utilisateur connecté
   */
  updateProfile(updates: Partial<UserProfile>): Observable<UserProfile | null> {
    const currentUser = this.currentUser();
    if (!currentUser) {
      return of(null);
    }

    const updatedUser = this.userStorageService.updateUser(currentUser.id, updates);
    if (updatedUser) {
      this.currentUser.set(updatedUser);
      writeUserToStorage(updatedUser);
    }

    return of(updatedUser).pipe(delay(500));
  }
}

function readUserFromStorage(): UserProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

function writeUserToStorage(user: UserProfile): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  } catch {
    console.error('Error writing user to storage');
  }
}

function clearUserFromStorage(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    console.error('Error clearing user from storage');
  }
}
