import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { USERS, UserProfile } from '../data/mock-users';

const LOCAL_STORAGE_KEY = 'tapfolio_current_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<UserProfile | null>(readUserFromStorage());

  login(identifier: string, password: string): Observable<UserProfile | null> {
    const user = USERS.find((u) =>
      (u.username.toLowerCase() === identifier.toLowerCase() || u.email.toLowerCase() === identifier.toLowerCase()) &&
      u.password === password
    );

    if (user) {
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


